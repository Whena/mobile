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
} from 'native-base'
import R, { isEmpty, isNil } from 'ramda'
import Colors from '../../Constant/Colors'
import Fonts from '../../Constant/Fonts'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconLoc from 'react-native-vector-icons/FontAwesome5';
import RadioGroup from 'react-native-custom-radio-group'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import Contact from '../../Component/Contact'
import SlidingUpPanel from 'rn-sliding-up-panel'
import FastImage from 'react-native-fast-image'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import TaskServices from '../../Database/TaskServices'
import { getUUID, getTodayDate } from '../../Lib/Utils'
import random from 'random-string'
import IIcon from 'react-native-vector-icons/Ionicons'
import Carousel from 'react-native-looped-carousel'
import { dirPhotoTemuan } from '../../Lib/dirStorage'
import Autocomplete from 'react-native-autocomplete-input';
import layer from '../../Data/kalimantantimur.json'
import SearchContact from './Component/SearchContact'
import Geojson from 'react-native-geojson';
import { dirPhotoKategori } from '../../Lib/dirStorage';
// var RNFS = require('react-native-fs');
// const FILE_PREFIX = Platform.OS === "ios" ? "" : "file://";


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

const alcatraz = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [-6.2292229, 106.8253967],
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121 //[-122.42305755615234, 37.82687023785448],
            }
        }
    ]
};

class FormStep2 extends Component {

    constructor(props) {
        super(props);

        // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        let params = props.navigation.state.params;
        let foto = R.clone(params.image);
        let latitude = R.clone(params.lat);
        let longitude = R.clone(params.lon);

        var user = TaskServices.getAllData('TR_LOGIN')[0];
        this.state = {
            user,
            keterangan: "",
            priority: "",
            batasWaktu: "",
            tugasKepada: "",
            assignto: "",
            category: "",
            categoryCode: "",
            blok: "",
            blockCode: '',
            werks: '',
            afdCode: '',
            contacts: TaskServices.getAllData('TR_CONTACT'),
            categories: TaskServices.getAllData('TR_CATEGORY'),
            isDateTimePickerVisible: false,
            isContactVisible: false,
            isImageFullVisible: false,
            isCategoryVisible: false,
            isMapsVisible: false,
            allowDragging: true,
            latitude,
            longitude,
            regionLat: -2.20773509068532,
            regionLon: 105.382972196639997,
            error: null,
            foto,
            stepper: [
                { step: '1', title: 'Ambil Photo' },
                { step: '2', title: 'Tulis Keterangan' }
            ],
            TRANS_CODE: `F${user.USER_AUTH_CODE}${getTodayDate('YYMMDDHHmmss')}`,//'F' + user.USER_AUTH_CODE + random({ length: 3 }).toUpperCase(),
            colorPriority: '#ddd',
            query: '',
            person: [],
            disableCalendar: true
        }
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.tintColor
        },
        title: 'Buat Laporan Temuan',
        headerTintColor: '#fff',
        headerTitleStyle: {
            flex: 1,
            fontSize: 18,
            fontWeight: '400'
        },
    };

    componentDidMount() {
        // let data = TaskServices.getAllData('TM_BLOCK');
        // for (var i = 0; i < data.length; i++) {
        //     let statusBlok = this.getStatusBlok(data[i].WERKS_AFD_BLOCK_CODE);
        //     let estateName = this.getEstateName(data[i].WERKS);
        //     this.state.person.push({
        //         blokCode: data[i].BLOCK_CODE,
        //         blokName: data[i].BLOCK_NAME,
        //         afdCode: data[i].AFD_CODE,
        //         werks: data[i].WERKS,
        //         werksAfdCode: data[i].WERKS_AFD_CODE,
        //         werksAfdBlokCode: data[i].WERKS_AFD_BLOCK_CODE,
        //         statusBlok: this.getStatusBlok(data[i].WERKS_AFD_BLOCK_CODE),
        //         compCode: data[i].COMP_CODE,
        //         allShow: `${data[i].BLOCK_NAME}/${statusBlok}/${estateName}`
        //     });
        // }
        this.getLocation();
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        // this.handleAndroidBackButton(this.exitAlert);
    }

    componentWillUnmount() {
        // alert(JSON.stringify(this.state.foto))
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackButtonClick() {
        Alert.alert(
            'Peringatan',
            'Transaksi kamu tidak akan tersimpan, kamu yakin akan melanjutkan?',
            [
                { text: 'NO', style: 'cancel' },
                { text: 'YES', onPress: () => this.props.navigation.goBack(null) }
            ]
        );
        return true;
    }

    getStatusBlok(werk_afd_blok_code) {
        try {
            let data = TaskServices.findBy2('TM_LAND_USE', 'WERKS_AFD_BLOCK_CODE', werk_afd_blok_code);
            return data.MATURITY_STATUS;
        } catch (error) {
            return ''
        }
    }

    getEstateName(werks) {
        try {
            let data = TaskServices.findBy2('TM_EST', 'WERKS', werks);
            return data.EST_NAME;
        } catch (error) {
            return '';
        }
    }

    getLocation() {
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

    validation() {
        let isSameUser = this.state.assignto == this.state.user.USER_AUTH_CODE ? true : false;
        if (isEmpty(this.state.keterangan)) {
            Alert.alert(
                'Peringatan',
                "Keterangan harus diisi"
            );
        } else if (isEmpty(this.state.blok)) {
            Alert.alert(
                'Peringatan',
                "Lokasi Blok harus diisi"
            );
        } else if (isEmpty(this.state.category)) {
            Alert.alert(
                'Peringatan',
                "Kategori harus diisi"
            );
        } else if (isEmpty(this.state.priority)) {
            Alert.alert(
                'Peringatan',
                "Prioritas harus diisi"
            );
        } else if (isEmpty(this.state.tugasKepada)) {
            Alert.alert(
                'Peringatan',
                "Ditugaskan kepada harus diisi"
            );
        }else if (isSameUser && isEmpty(this.state.batasWaktu)) {
            Alert.alert(
                'Peringatan',
                "Batas waktu harus diisi"
            );
        } else {
            this.saveData()
        }
    }

    saveData() {
        var data = {
            FINDING_CODE: this.state.TRANS_CODE,
            WERKS: this.state.werks,
            AFD_CODE: this.state.afdCode,
            BLOCK_CODE: this.state.blockCode,
            FINDING_CATEGORY: this.state.categoryCode,
            FINDING_DESC: this.state.keterangan,
            FINDING_PRIORITY: this.state.priority,
            DUE_DATE: this.state.batasWaktu,
            STATUS: 'BARU',
            ASSIGN_TO: this.state.assignto,
            PROGRESS: 0,
            LAT_FINDING: this.state.latitude.toString(),
            LONG_FINDING: this.state.longitude.toString(),
            REFFERENCE_INS_CODE: "",
            INSERT_USER: this.state.user.USER_AUTH_CODE,
            INSERT_TIME: getTodayDate('YYYY-MM-DD HH:mm:ss')
        }

        TaskServices.saveData('TR_FINDING', data);

        this.state.foto.map((image, i) => {
            var imagetr = {
                TR_CODE: this.state.TRANS_CODE,
                IMAGE_CODE: image.replace(".jpg", ""),
                IMAGE_NAME: image,
                IMAGE_PATH_LOCAL: dirPhotoTemuan + "/" + image,
                IMAGE_URL: '',
                STATUS_IMAGE: 'SEBELUM',
                STATUS_SYNC: 'N',
                INSERT_USER: this.state.user.USER_AUTH_CODE,
                INSERT_TIME: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            }

            TaskServices.saveData('TR_IMAGE', imagetr);
        });
        this.props.navigation.goBack(null);
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

    changeColorPriority(priority) {
        switch (priority) {
            case 'HIGH':
                this.setState({ colorPriority: 'red', priority: priority });
                break;
            case 'MED':
                this.setState({ colorPriority: '#feb236', priority: priority });
                break;
            case 'LOW':
                this.setState({ colorPriority: 'blue', priority: priority });
                break;
            default:
                break;
        }
    }

    findPerson(query) {
        if (query === '') {
            return [];
        }
        const { person } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return person.filter(person => person.allShow.search(regex) >= 0);
    }

    changeContact = data => {        
        let isSameUser = data.userAuth == this.state.user.USER_AUTH_CODE ? true : false;
        if(isSameUser){
            this.setState({disableCalendar:false})
        }
        this.setState({tugasKepada:data.fullName,assignto:data.userAuth})
    }

    changeCategory = data => {
        this.setState({category: data.CATEGORY_NAME,categoryCode: data.CATEGORY_CODE})
    }

    changeBlok = data => {
        this.setState({blok: data.allShow, blockCode:data.blokCode, werks: data.werks, afdCode:data.afdCode});
    }

    render() {
        const { query } = this.state;
        const person = this.findPerson(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

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
                                    source={{ uri: "file://" + dirPhotoTemuan + "/" + this.state.foto[0] }}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={style.line} />


                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={style.label}>Lokasi <Text style={style.mandatory}>*</Text></Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PilihBlok', {changeBlok: this.changeBlok})}>
                            {isEmpty(this.state.blok) && (<Text style={{ fontSize: 14, color: '#999' }}> Set Location </Text>)}
                            {!isEmpty(this.state.blok) && (<Text style={{ fontSize: 14 }}> {this.state.blok} </Text>)}
                        </TouchableOpacity>
                    </View>

                    <View style={style.line} />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={style.label}>Kategori <Text style={style.mandatory}>*</Text></Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PilihKategori', {changeCategory: this.changeCategory})}>
                            {isEmpty(this.state.category) && (<Text style={{ fontSize: 14, color: '#999' }}> Pilih Kategori </Text>)}
                            {!isEmpty(this.state.category) && (<Text style={{ fontSize: 14 }}> {this.state.category} </Text>)}
                        </TouchableOpacity>

                    </View>


                    <View style={[style.line]} />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={[style.label, { marginTop: 3 }]}>Priority <Text style={style.mandatory}>*</Text></Text>
                        <RadioGroup
                            onChange={(priority) => { this.changeColorPriority(priority) }}
                            style={style.item}
                            containerStyle={{}}
                            buttonContainerStyle={{ borderRadius: 10, padding: 5, marginRight: 3, width: 55 }}
                            buttonTextStyle={{ fontSize: 12 }}
                            buttonContainerActiveStyle={{ backgroundColor: this.state.colorPriority, borderColor: Colors.brandSecondary, borderWidth: 0.5, }}
                            buttonContainerInactiveStyle={{ backgroundColor: "#ddd", borderColor: "#CCC", borderWidth: 0.5, }}
                            radioGroupList={radioGroupList} />
                    </View>

                    <View style={style.line} />

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={style.label}> Ditugaskan Kepada<Text style={style.mandatory}>*</Text></Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PilihKontak', {changeContact: this.changeContact})}>
                            {isEmpty(this.state.tugasKepada) && (
                                <Text style={{ fontSize: 14, color: '#999' }}> Pilih Karyawan </Text>)}
                            {!isEmpty(this.state.tugasKepada) && (
                                <Text style={{ fontSize: 14 }}> {this.state.tugasKepada} </Text>)}
                        </TouchableOpacity>
                    </View>

                    <View style={style.line} />

                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={style.label}>Batas Waktu {isEmpty(this.state.tugasKepada) && (<Text style={style.mandatory}>*</Text>)}</Text>
                            <View style={[style.item, { flex: 1, flexDirection: 'row' }]}>
                                <Image style={{ alignItems: 'stretch', width: 20, height: 20, marginRight: 5 }}
                                    source={require('../../Images/icon/ic_calendar.png')} />
                                <TouchableOpacity onPress={this._showDateTimePicker} disabled ={this.state.disableCalendar}>
                                    {isEmpty(this.state.batasWaktu) && (
                                        <Text style={{ fontSize: 14, color: '#999' }}> Select Calendar </Text>)}
                                    {!isEmpty(this.state.batasWaktu) && (
                                        <Text  style={{ fontSize: 14 }}> {this.state.batasWaktu} </Text>)}
                                </TouchableOpacity>                                

                            </View>
                        </View>
                        <DateTimePicker
                            minimumDate={new Date()}
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        />
                    </View>                   

                    <View style={[style.line]} />

                    <TouchableOpacity style={[style.button, { margin: 16 }]}
                        onPress={() => { this.validation() }}>
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
                                        source={{ uri: "file://" + dirPhotoTemuan + "/" + image }} />
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
                            <Autocomplete
                                autoCapitalize="none"
                                autoCorrect={false}
                                containerStyle={{ width: '60%' }}
                                data={person.length === 1 && comp(query, person[0].allShow) ? [] : person}
                                defaultValue={query}
                                onChangeText={text => {
                                    this.setState({ query: text })
                                }
                                }
                                renderItem={({ blokCode, blokName, statusBlok, allShow, werks, afdCode }) => (
                                    <TouchableOpacity onPress={() => {
                                        // alert(allShow)
                                        this.setState({
                                            werks: werks,
                                            afdCode: afdCode,
                                            blok: allShow,//blokCode, 
                                            blockCode: blokCode,
                                            query: allShow
                                        }
                                        )
                                    }}>
                                        <View style={{ padding: 10 }}>
                                            <Text style={{ fontSize: 15, margin: 2 }}>{blokName}/{statusBlok}/{this.getEstateName(werks)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>

                        <View style={{ marginTop: 10, width: '100%' }}>
                            <TouchableOpacity style={[style.buttonSetLoc, { alignSelf: 'flex-end' }]}
                                onPress={() => {
                                    alert(this.state.blok);
                                    this.setState({ isMapsVisible: false })
                                }
                                }>
                                <Text style={style.buttonText}>Set Lokasi</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={style.line} />

                        <Text style={{ color: Colors.brand, textAlign: 'center', paddingHorizontal: 25, marginBottom: 10, fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>Pastikan kamu telah berada di lokasi yang benar</Text>
                        <View style={style.containerMap}>
                            <MapView
                                style={style.map}>
                                <Geojson geojson={alcatraz} />
                                <Marker
                                    coordinate={{
                                        latitude: this.state.latitude,
                                        longitude: this.state.longitude,
                                    }}
                                    centerOffset={{ x: -42, y: -60 }}
                                    anchor={{ x: 0.84, y: 1 }}
                                >
                                </Marker>
                            </MapView>
                            <IconLoc
                                onPress={() => { this.getLocation() }}
                                name="location-arrow"
                                size={24}
                                style={{ alignSelf: 'flex-end', marginBottom: 325, marginRight: 10 }} />
                        </View>

                        {/* <View>   
                            <IconLoc
                                onPress={()=>{this.getLocation()}}
                                name="location-arrow"
                                size={24}
                                style={{ alignSelf: 'flex-end', marginTop: 30, marginRight: 10}}/>  

                            <MapView
                                style={{ height: 300, borderRadius: 10 }}
                                provider={PROVIDER_GOOGLE}
                                region={{
                                    latitude: this.state.regionLat,
                                    longitude: this.state.regionLon,
                                    latitudeDelta: 3,
                                    longitudeDelta: 3
                                }}
                            >

                                {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                                    coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
                                    title={"Your Location"}
                                />}
                            </MapView>
                        </View>                         */}
                    </View>
                </SlidingUpPanel>

                {/* slidingup contacts */}
                {/* <SlidingUpPanel
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
                        <SearchContact onSelect={user => {
                            this.setState({
                                isContactVisible: false,
                                tugasKepada: user.user.fullName,
                                assignto: user.user.userAuth
                            })
                            
                            let isSameUser = user.user.userAuth == this.state.user.USER_AUTH_CODE ? true : false;
                            if(isSameUser){
                                this.setState({disableCalendar: false})
                            }
                        }} />
                    </View>
                </SlidingUpPanel> */}

                {/* slidingup category */}
                {/* <SlidingUpPanel
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
                                                categoryCode: item.CATEGORY_CODE
                                            })
                                        }}
                                        style={style.itemCategory}>
                                        <FastImage style={{ width: 40, height: 40 }}
                                            resizeMode={FastImage.resizeMode.contain}
                                            source={{
                                                uri: `file://${dirPhotoKategori}/${item.ICON}`,
                                                priority: FastImage.priority.normal,
                                            }} />
                                        <Text style={style.textCategory}>{item.CATEGORY_NAME}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </SlidingUpPanel> */}
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
    },
    containerMap: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
};