import React, { Component } from 'react';
import {
    ScrollView, Text, FlatList, TextInput, TouchableOpacity, View, Image
} from 'react-native';
import {
    Container,
    Content,
    Spinner
} from 'native-base';
import Colors from '../../Constant/Colors'
import Fonts from '../../Constant/Fonts'
import Icon from 'react-native-vector-icons/MaterialIcons'
import R, { isEmpty } from 'ramda'
import RadioGroup from 'react-native-custom-radio-group'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import Contact from '../../Component/Contact'
import SlidingUpPanel from 'rn-sliding-up-panel'
import FastImage from 'react-native-fast-image'
import ImageCarousel from 'react-native-image-page'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import TaskServices from '../../Database/TaskServices'

const radioGroupList = [{
    label: 'Hight',
    value: 'Hight'
}, {
    label: 'Med',
    value: 'Med'
}, {
    label: 'Low',
    value: 'Low'
}];

class FormStep2 extends Component {
    constructor(props) {
        super(props);
        var contacts = [
            { name: "Nurul Husnah", departemen: "Staf Marketing", photo: "http://res.rankedgaming.com/resources/images/profile/default-avatar-male.png" },
            { name: "Nur Hasanah", departemen: "Staf Accounting", photo: "https://s.kaskus.id/user/avatar/2014/02/16/avatar6457006_1.gif" },
            { name: "Nurul Arifin", departemen: "Staf IT", photo: "https://s.kaskus.id/user/avatar/2013/08/23/avatar5791311_2.gif" }]

        this.state = {
            keterangan: "",
            priority: "",
            batasWaktu: "",
            tugasKepada: "",
            contactid: "",
            category: "",
            categoryid: "",
            blok: "",
            baris: "",
            contacts: TaskServices.getAllData('TR_CONTACT'),
            categories: TaskServices.getAllData('TR_CATEGORY'),
            isDateTimePickerVisible: false,
            isContactVisible: false,
            isCategoryVisible: false,
            isMapsVisible: false,
            allowDragging: true,
            latitude: null,
            longitude: null,
            error: null,
            foto: props.navigation.state.params,
            stepper: [
                { step: '1', title: 'Ambil Photo' },
                { step: '2', title: 'Tulis Keterangan' }
            ],
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
    }

    _onBtnClick = () => {
        //console.tron.log(this.props.navigation.state.params.foto1)
    }

    _onContactSelected = user => {
        this.setState({
            isContactVisible: false,
            tugasKepada: user.EMPLOYEE_NIK,
            contactid: user.EMPLOYEE_NIK
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
                            <Text style={{ fontSize: 14 }}> Keterangan </Text>

                            <TextInput style={{ flex: 1, textAlignVertical: "top" }}
                                multiline
                                placeholder="Tulis di sini..."
                                onChangeText={(keterangan) => this.setState({ keterangan })}
                            />
                        </View>
                        <View style={{ alignSelf: 'flex-end', height: 80, width: 80, marginLeft: 10 }}>
                            <ImageCarousel
                                height={80}
                                width={80}
                                animate={false}
                                indicatorSize={10}
                                indicatorColor="red"
                                images={this.state.foto}
                            />
                        </View>
                    </View>

                    <View style={style.line} />

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={style.label}> Lokasi </Text>
                        {isEmpty(this.state.blok) && (
                            <Text onPress={this._showLocation} style={{ fontSize: 14, color: '#999' }}> Set Location </Text>)}
                        {!isEmpty(this.state.blok) && (
                            <Text onPress={this._showLocation} style={{ fontSize: 14 }}> {this.state.blok} </Text>)}

                    </View>

                    <View style={style.line} />

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={style.label}> Kategori </Text>
                        {isEmpty(this.state.category) && (
                            <Text onPress={() => this.setState({ isCategoryVisible: true })} style={{ fontSize: 14, color: '#999' }}> Pilih Kategori </Text>)}
                        {!isEmpty(this.state.category) && (
                            <Text onPress={() => this.setState({ isCategoryVisible: true })} style={{ fontSize: 14 }}> {this.state.category} </Text>)}

                    </View>

                    <View style={[style.line]} />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={[style.label, { marginTop: 3 }]}> Priority </Text>
                        <RadioGroup
                            onChangeText={(priority) => this.setState({ priority })}
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
                            <Text style={style.label}> Batas Waktu </Text>
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
                        onPress={() => this._onBtnClick}>
                        <Text style={style.buttonText}>Simpan</Text>
                    </TouchableOpacity>
                </Content>

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

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={[style.label, { height: 35, textAlignVertical: 'center' }]}> Baris </Text>
                            <TextInput style={style.inputloc}
                                onChangeText={(baris) => this.setState({ baris })}
                                value={this.state.baris} />
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

                        {this.state.latitude && this.state.longitude && (
                            <MapView
                                style={{ height: 200, borderRadius: 10 }}
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
                        )}
                        {!this.state.latitude && !this.state.longitude && (
                            <View style={style.loading}>
                                <Spinner color={Colors.brand} />
                            </View>)}
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
    }
};