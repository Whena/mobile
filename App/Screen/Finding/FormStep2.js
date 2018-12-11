import React, { Component } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import {
    ScrollView, Text, FlatList, TextInput, TouchableOpacity, View, Image, Modal,
    BackHandler, Alert
} from 'react-native';
import {
    Container,
    Content,
    Spinner
} from 'native-base';
import R, { isEmpty, isNil } from 'ramda'
import Colors from '../../Constant/Colors'
import Fonts from '../../Constant/Fonts'
import Icon from 'react-native-vector-icons/MaterialIcons'
import RadioGroup from 'react-native-custom-radio-group'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import Contact from '../../Component/Contact'
import SlidingUpPanel from 'rn-sliding-up-panel'
import FastImage from 'react-native-fast-image'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import TaskServices from '../../Database/TaskServices'
import { getUUID } from '../../Lib/Utils'
import random from 'random-string'
import IIcon from 'react-native-vector-icons/Ionicons'
import Carousel from 'react-native-looped-carousel'
import { dirPicutures } from '../../Lib/dirStorage'

const radioGroupList = [{
    label: 'HIGH',
    value: 'HIGH'
}, {
    label: 'MED',
    value: 'MED'
}, {
    label: 'LOW',
    value: 'LOW'
}];

class FormStep2 extends Component {
    constructor(props) {
        super(props);
        var user = TaskServices.getAllData('TR_LOGIN')[0];
        this.state = {
            user,
            keterangan: "",
            priority: "",
            batasWaktu: "",
            tugasKepada: "",
            assignto: "",
            category: "",
            categoryid: "",
            blok: "",
            contacts: TaskServices.getAllData('TR_CONTACT'),
            categories: TaskServices.getAllData('TR_CATEGORY'),
            isDateTimePickerVisible: false,
            isContactVisible: false,
            isImageFullVisible: false,
            isCategoryVisible: false,
            isMapsVisible: false,
            allowDragging: true,
            latitude: 0,
            longitude: 0,
            error: null,
            foto: props.navigation.state.params,
            stepper: [
                { step: '1', title: 'Ambil Photo' },
                { step: '2', title: 'Tulis Keterangan' }
            ],
            TRANS_CODE: 'F' + user.USER_AUTH_CODE + random({ length: 3 }).toUpperCase()
        }
    }

    componentDidMount() {
        //alert(JSON.stringify(this.state.categories))
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );

        this.handleAndroidBackButton(this.exitAlert);
    }

    navigateScreen(screenName) {
        const navigation = this.props.navigation;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: screenName })],
        });
        navigation.dispatch(resetAction);
    }

    exitAlert = () => {
        Alert.alert(
            'Peringatan',
            'Transaksi kamu tidak akan tersimpan, kamu yakin akan melanjutkan?',
            [
                { text: 'NO', style: 'cancel' },
                { text: 'YES', onPress: () => this.props.navigation.goBack(null) }
            ]
        );
    };

    handleAndroidBackButton = callback => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            callback();
            return true;
        });
    };

    _onBtnSaveClicked = () => {
        var valid = true;
        if (
            isEmpty(this.state.keterangan) ||
            isEmpty(this.state.blok) ||
            isEmpty(this.state.category) ||
            isEmpty(this.state.priority) ||
            (isEmpty(this.tugasKepada) && isEmpty(this.batasWaktu))) {
            valid = false;
        }

        if (!valid) {
            Alert.alert(
                'Peringatan',
                "Semua isian dengan tanda * harus diisi"
            );
        } else {
            var data = {
                FINDING_CODE: this.state.TRANS_CODE,
                WERKS: "",
                AFD_CODE: "",
                BLOCK_CODE: this.state.blok,
                FINDING_CATEGORY: this.state.categoryid,
                FINDING_DESC: this.state.keterangan,
                FINDING_PRIORITY: this.state.priority,
                DUE_DATE: this.state.batasWaktu,
                ASSIGN_TO: this.state.assignto,
                PROGRESS: "0",
                LAT_FINDING: this.state.latitude,
                LONG_FINDING: this.state.longitude,
                REFFERENCE_INS_CODE: "",
                INSERT_USER: this.state.user.USER_AUTH_CODE,
                INSERT_TIME: moment(new Date()).format("YYYY-MM-DD"),
                UPDATE_USER: "",
                UPDATE_TIME: "",
                DELETE_USER: "",
                DELETE_TIME: ""
            }

            TaskServices.saveData('TR_FINDING', data);

            this.state.foto.map((image, i) => {
                var imagetr = {
                    IMAGE_CODE: image.replace(".jpg", ""),
                    TR_CODE: this.state.TRANS_CODE,
                    IMAGE_NAME: image,
                    IMAGE_PATH: dirPicutures + "/" + image,
                    STATUS_IMAGE: '',
                    STATUS_SYNG: '',
                    SYNG_TIME: '',
                    INSERT_USER: this.state.user.USER_AUTH_CODE,
                    INSERT_TIME: moment(new Date()).format("YYYY-MM-DD"),
                    UPDATE_USER: '',
                    UPDATE_TIME: '',
                    DELETE_USER: '',
                    DELETE_TIME: ''
                }

                TaskServices.saveData('TR_IMAGE_FINDING', imagetr);
            })
            
            this.props.navigation.goBack(null);
        }
    }

    _onContactSelected = user => {
        this.setState({
            isContactVisible: false,
            tugasKepada: user.EMPLOYEE_NIK,
            assignto: user.EMPLOYEE_NIK
        })
    }

    _renderContact = user => {
        return <Contact onSelect={this._onContactSelected} user={user} />;
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({ batasWaktu: moment(date).format("YYYY-MM-DD") })
        this._hideDateTimePicker();
    };

    _showLocation = () => {
        this.setState({
            isMapsVisible: true
        })
    }

    render() {
        return (
            <Container style={{ flex: 1, backgroundColor: 'white' }}>
                <Content style={{ flex: 1, paddingHorizontal: 16, }}>
                    {/* STEPPER */}
                    <FlatList
                        style={[style.stepperContainer, { margin: 15, alignSelf: 'center' }]}
                        horizontal
                        data={this.state.stepper}
                        getItemLayout={this.getItemLayout}
                        initialScrollIndex={1}
                        initialNumToRender={2}
                        renderItem={({ item: rowData }) => {
                            return (
                                <TouchableOpacity>
                                    <View
                                        style={[
                                            style.stepperListContainer,
                                            { paddingRight: rowData.step === '2' ? 16 : 0 }
                                        ]}
                                    >
                                        <View
                                            style={[
                                                style.stepperNumber,
                                                {
                                                    backgroundColor: Colors.brand
                                                }
                                            ]}
                                        >
                                            <Text style={style.stepperNumberText}>{rowData.step}</Text>
                                        </View>
                                        <Text
                                            style={[
                                                Fonts.style.caption,
                                                { paddingLeft: 3, color: rowData.step == Colors.brand }
                                            ]}
                                        >
                                            {rowData.title}
                                        </Text>
                                        {rowData.step !== '2' && (
                                            <View style={{ flex: 1 }}>
                                                <Icon
                                                    name="chevron-right"
                                                    size={24}
                                                    color={Colors.buttonDisabled}
                                                    style={style.stepperNext}
                                                />
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ height: 80, flex: 1 }}>
                            <Text style={{ fontSize: 14 }}>Keterangan <Text style={style.mandatory}>*</Text></Text>

                            <TextInput style={{ flex: 1, textAlignVertical: "top" }}
                                multiline
                                placeholder="Tulis di sini..."
                                onChangeText={(keterangan) => this.setState({ keterangan })}
                            />
                        </View>
                        <View style={{ alignSelf: 'flex-end', height: 80, width: 80, marginLeft: 10 }}>
                            <TouchableOpacity onPress={() => { this.setState({ isImageFullVisible: true }) }}>
                                <Image resizeMode={'cover'}
                                    style={{ height: 80, width: 80, borderRadius: 5 }}
                                    source={{ uri: "file://" + dirPicutures + "/" + this.state.foto[0] }}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={style.line} />

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={style.label}>Lokasi <Text style={style.mandatory}>*</Text></Text>
                        {isEmpty(this.state.blok) && (
                            <Text onPress={this._showLocation} style={{ fontSize: 14, color: '#999' }}> Set Location </Text>)}
                        {!isEmpty(this.state.blok) && (
                            <Text onPress={this._showLocation} style={{ fontSize: 14 }}> {this.state.blok} </Text>)}
                    </View>

                    <View style={style.line} />

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={style.label}>Kategori <Text style={style.mandatory}>*</Text></Text>
                        {isEmpty(this.state.category) && (
                            <Text onPress={() => this.setState({ isCategoryVisible: true })} style={{ fontSize: 14, color: '#999' }}> Pilih Kategori </Text>)}
                        {!isEmpty(this.state.category) && (
                            <Text onPress={() => this.setState({ isCategoryVisible: true })} style={{ fontSize: 14 }}> {this.state.category} </Text>)}

                    </View>

                    <View style={[style.line]} />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={[style.label, { marginTop: 3 }]}>Priority <Text style={style.mandatory}>*</Text></Text>
                        <RadioGroup
                            onChange={(priority) => this.setState({ priority })}
                            style={style.item}
                            containerStyle={{}}
                            buttonContainerStyle={{ borderRadius: 10, padding: 5, marginRight: 3, width: 55 }}
                            buttonTextStyle={{ fontSize: 12 }}
                            buttonContainerActiveStyle={{ backgroundColor: Colors.brand, borderColor: Colors.brandSecondary, borderWidth: 0.5, }}
                            buttonContainerInactiveStyle={{ backgroundColor: "#ddd", borderColor: "#CCC", borderWidth: 0.5, }}
                            radioGroupList={radioGroupList} />
                    </View>

                    <View style={style.line} />

                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={style.label}>Batas Waktu {isEmpty(this.state.tugasKepada) && (<Text style={style.mandatory}>*</Text>)}</Text>
                            <View style={[style.item, { flex: 1, flexDirection: 'row' }]}>
                                <Image style={{ alignItems: 'stretch', width: 20, height: 20, marginRight: 5 }}
                                    source={require('../../Images/icon/ic_calendar.png')} />
                                {isEmpty(this.state.batasWaktu) && (
                                    <Text onPress={this._showDateTimePicker} style={{ fontSize: 14, color: '#999' }}> Select Calendar </Text>)}
                                {!isEmpty(this.state.batasWaktu) && (
                                    <Text onPress={this._showDateTimePicker} style={{ fontSize: 14 }}> {this.state.batasWaktu} </Text>)}

                            </View>
                        </View>
                        <DateTimePicker
                            minimumDate={new Date()}
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        />
                    </View>

                    <View style={style.line} />

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={style.label}> Ditugaskan Kepada </Text>
                        {isEmpty(this.state.tugasKepada) && (
                            <Text onPress={() => this.setState({ isContactVisible: true })} style={{ fontSize: 14, color: '#999' }}> Pilih Karyawan </Text>)}
                        {!isEmpty(this.state.tugasKepada) && (
                            <Text onPress={() => this.setState({ isContactVisible: true })} style={{ fontSize: 14 }}> {this.state.tugasKepada} </Text>)}
                    </View>

                    <View style={[style.line]} />

                    <TouchableOpacity style={[style.button, { margin: 16 }]}
                        onPress={this._onBtnSaveClicked}>
                        <Text style={style.buttonText}>Simpan</Text>
                    </TouchableOpacity>
                </Content>

                <Modal
                    transparent={false}
                    visible={this.state.isImageFullVisible}>
                    <View style={{ flex: 1 }}>
                        <Carousel
                            style={{ flex: 1 }}
                            autoplay={false}
                            currentPage={this.state.foto.length - 1}
                            onAnimateNextPage={p => console.log(p)}>
                            {this.state.foto.map((image, i) => (
                                <View style={{ flex: 1, backgroundColor: 'black' }}>
                                    <Image resizeMode={"contain"} style={{ flex: 1 }}
                                        source={{ uri: "file://" + dirPicutures + "/" + image }} />
                                </View>
                            ))}
                        </Carousel>
                        <IIcon style={{
                            position: 'absolute',
                            right: 16,
                            top: 10,
                        }} color={'white'} name="ios-close-circle-outline" size={45} onPress={() => { this.setState({ isImageFullVisible: false }) }} />
                    </View>
                </Modal>

                <SlidingUpPanel
                    // height={340}
                    // draggableRange={{ top: 420, bottom: 0 }}
                    visible={this.state.isMapsVisible}
                    onRequestClose={() => this.setState({ isMapsVisible: false })}>
                    <View style={[style.containerSlidingUpPanel]}>
                        <View style={{ width: '100%', height: 20 }} onPress={() => this.setState({ isMapsVisible: false })}>
                            <View
                                style={{
                                    backgroundColor: '#CCC', alignSelf: 'center',
                                    height: 4, width: 80
                                }}
                            ></View>
                        </View>

                        <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>Tentukan Lokasi</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[style.label, { height: 35, textAlignVertical: 'center' }]}> Blok </Text>
                            <TextInput style={style.inputloc}
                                onChangeText={(blok) => this.setState({ blok })}
                                value={this.state.blok} />
                        </View>

                        <View style={{ marginTop: 10, width: '100%' }}>
                            <TouchableOpacity style={[style.buttonSetLoc, { alignSelf: 'flex-end' }]}
                                onPress={() =>
                                    this.setState({ isMapsVisible: false })
                                }>
                                <Text style={style.buttonText}>Set Lokasi</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={style.line} />

                        <Text style={{ color: Colors.brand, textAlign: 'center', paddingHorizontal: 25, marginBottom: 10, fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>Pastikan kamu telah berada di lokasi yang benar</Text>

                        <MapView
                            style={{ height: 300, borderRadius: 10 }}
                            provider={PROVIDER_GOOGLE}
                            region={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta: 3,
                                longitudeDelta: 3
                            }}
                        >

                            {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                                coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
                                title={"Your Location"}
                            />}
                        </MapView>
                    </View>
                </SlidingUpPanel>

                <SlidingUpPanel
                    visible={this.state.isContactVisible}
                    onRequestClose={() => this.setState({ isContactVisible: false })}>
                    <View style={style.containerSlidingUpPanel}>
                        <View style={{ width: '100%', height: 20 }} onPress={() => this.setState({ isContactVisible: false })}>
                            <View
                                style={{
                                    backgroundColor: '#CCC', alignSelf: 'center',
                                    height: 4, width: 80
                                }}
                            ></View>
                        </View>

                        <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>Contact</Text>
                        <ScrollView
                            onTouchEnd={() => this.setState({ allowDragging: true })}
                            onTouchCancel={() => this.setState({ allowDragging: true })}
                            onTouchStart={() => this.setState({ allowDragging: false })}>
                            {this.state.contacts.map(this._renderContact)}
                        </ScrollView>
                    </View>
                </SlidingUpPanel>

                <SlidingUpPanel
                    height={340}
                    draggableRange={{ top: 420, bottom: 0 }}
                    visible={this.state.isCategoryVisible}
                    onRequestClose={() => this.setState({ isCategoryVisible: false })}>
                    <View style={[style.containerSlidingUpPanel]}>
                        <View style={{ width: '100%', height: 20 }} onPress={() => this.setState({ isCategoryVisible: false })}>
                            <View
                                style={{
                                    backgroundColor: '#CCC', alignSelf: 'center',
                                    height: 4, width: 80
                                }}
                            ></View>
                        </View>

                        <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>Pilih Kategori</Text>
                        <FlatList
                            data={this.state.categories}
                            keyExtractor={item => item.id}
                            numColumns={4}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                isCategoryVisible: false,
                                                category: item.CATEGORY_NAME,
                                                categoryid: item._id
                                            })
                                        }}
                                        style={style.itemCategory}>
                                        <FastImage style={{ width: 40, height: 40 }}
                                            resizeMode={FastImage.resizeMode.contain}
                                            source={{
                                                uri: "https://s.kaskus.id/user/avatar/2014/02/16/avatar6457006_1.gif",
                                                priority: FastImage.priority.normal,
                                            }} />
                                        <Text style={style.textCategory}>{item.CATEGORY_NAME}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </SlidingUpPanel>
            </Container >
        )
    }
}

export default FormStep2;

const style = {
    stepperContainer: {
        flexDirection: 'row',
        height: 48,
    },
    stepperListContainer: { flexDirection: 'row', flex: 1, alignItems: 'center' },
    stepperNumber: {
        height: 24,
        width: 24,
        backgroundColor: Colors.buttonDisabled,
        borderRadius: 12,
        justifyContent: 'center'
    },
    stepperNumberText: [Fonts.style.caption, { textAlign: 'center', color: Colors.textDark }],
    stepperNext: { alignSelf: 'flex-end', paddingRight: 4 },
    sectionHeader: [
        Fonts.style.caption,
        { color: Colors.textSecondary, paddingLeft: 16, paddingTop: 16, paddingBottom: 8 }
    ],

    txtLabel: {
        color: Colors.brand,
        fontSize: 17,
        padding: 10, textAlign: 'center', fontWeight: '400'
    },
    button: {
        width: 200,
        backgroundColor: Colors.brand,
        borderRadius: 25,
        padding: 15,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonSetLoc: {
        width: 100,
        backgroundColor: Colors.brand,
        borderRadius: 5,
        padding: 5,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center'
    },
    label: {
        width: '40%',
        fontSize: 14
    }, item: {
        width: '60%',
        color: "#999",
        fontSize: 14
    }, line: {
        marginTop: 16,
        marginBottom: 16,
        borderBottomColor: "#CCC",
        borderBottomWidth: 1
    }, containerSlidingUpPanel: {
        marginTop: 5,
        flex: 1,
        zIndex: 1,
        padding: 16,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white'
    }, itemCategory: {
        alignItems: "center",
        flexGrow: 1,
        flex: 1,
        margin: 4,
        padding: 5,
        flexBasis: 0,
    },
    textCategory: {
        textAlign: 'center',
        fontSize: 9,
        color: "#333333"
    },
    inputloc: {
        width: '60%',
        height: 40,
        fontSize: 14,
        paddingHorizontal: 10,
        textAlign: 'left',
        textAlignVertical: 'center',
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 0.5
    },
    mandatory: {
        fontSize: 12,
        color: 'red',
    }
};