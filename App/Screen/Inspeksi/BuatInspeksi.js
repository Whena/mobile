import React, { Component } from 'react';
import {
    Text, Keyboard, Alert, TextInput, TouchableOpacity, View, Image, StatusBar,
    KeyboardAvoidingView, BackHandler
} from 'react-native';
import {
    Container,
    Content,
    Card,
    CardItem,
    Title,
} from 'native-base';
import Colors from '../../Constant/Colors'
import Fonts from '../../Constant/Fonts'
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconLoc from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Ionicons';
import CardView from 'react-native-cardview';
import MapView, {PROVIDER_GOOGLE, ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';
import {convertTimestampToDate, getTodayDate, getUUID} from '../../Lib/Utils'
import TaskService from '../../Database/TaskServices';
// import KeyboardListener from 'react-native-keyboard-listener';
import Dialog from "react-native-dialog";
import { ProgressDialog } from 'react-native-simple-dialogs';
import Autocomplete from 'react-native-autocomplete-input';
import { utils } from 'redux-saga';
var uuid = require('react-native-uuid');
import Geojson from 'react-native-geojson';

const alcatraz = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [-6.2292229, 106.8253967],
          latitudeDelta:0.015,
          longitudeDelta:0.0121 //[-122.42305755615234, 37.82687023785448],
        }
      }
    ]
};

class BuatInspeksiRedesign extends Component {

    // static navigationOptions = {
    //     headerStyle: {
    //         backgroundColor: Colors.tintColor
    //     },
    //     title: 'Buat Inspeksi',
    //     headerTintColor: '#fff',
    //     headerTitleStyle: {
    //         flex: 1,
    //         fontSize: 18,
    //         fontWeight: '400'
    //     },
    //     headerLeft: (
    //         <TouchableOpacity onPress={() => navigation.goBack}>
    //             <Icons style={{marginLeft: 12}} name={'ios-arrow-round-back'} size={24} color={'white'} />
    //         </TouchableOpacity>
    //     )
    // };

    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.tintColor
        },
        title: 'Buat Inspeksi',
        headerTintColor: '#fff',
        headerTitleStyle: {
            textAlign: "left",
            flex: 1,
            fontSize: 18,
            fontWeight: '400',
            marginHorizontal: 12
        },
        // headerRight: (
        //     <TouchableOpacity onPress={() => params.inbox()}>
        //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingRight: 12 }}>
        //         <Image style={{ width: 28, height: 28 }} source={require('../../Images/icon/loc.png')} />
        //       </View>
        //     </TouchableOpacity>
        // )
    };  

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            modelInspeksiH: null,
            modelTrack: null,
            date: '',
            blok: '',
            baris: '',
            inspectionCode: '',
            keyboardOpen: false,
            showConfirm: false,
            fetchLocation: false,
            showBaris: true,
            query: '',
            person:[],
            werksAfdCode: '',
            werksAfdBlokCode: ''
        };
    }

    findPerson(query){
        if (query === '') {
            return [];
        }
        const { person } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return person.filter(person => person.blokCode.search(regex) >= 0);
        // var letters = /^[A-Za-z]+$/;
        // if(query.match(letters)){
        //     console.log('osan');
            // return person.filter(person => person.blokName.search(regex) >= 0);
        // }else{
        //     console.log('asdasdd');
            // return person.filter(person => person.blokCode.search(regex) >= 0);
        // }
        
      }

    componentDidMount() {
        let data = TaskService.getAllData('TM_BLOCK');
        for(var i=0; i<data.length; i++){
            this.state.person.push({
                blokCode: data[i].BLOCK_CODE, 
                blokName: data[i].BLOCK_NAME, 
                werksAfdCode: data[i].WERKS_AFD_CODE, 
                werksAfdBlokCode: data[i].WERKS_AFD_BLOCK_CODE,
                statusBlok: this.getStatusBlok(data[i].WERKS_AFD_BLOCK_CODE),
                compCode: data[i].COMP_CODE
            });
        }
        this.getLocation();
    }

    hideAndShowBaris(param){
        if(param.length > 0){
            this.setState({showBaris: false});
        }else{
            this.setState({showBaris: true});
        }
        if(param.length > 2){
            this.setState({blok: param, showBaris: true});
        }
        
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var lat = parseFloat(position.coords.latitude);
                var lon = parseFloat(position.coords.longitude);
                // const timestamp = convertTimestampToDate(position.timestamp, 'DD/MM/YYYY HH:mm:ss')//moment(position.timestamp).format('DD/MM/YYYY HH:mm:ss');
                // console.log(timestamp);
                // console.log(lat + ' ' + lon);
                alert(lat + ' ' + lon);
                this.setState({latitude:lat, longitude:lon, fetchLocation: false});
                // alert(position.coords.latitude)

            },
            (error) => {
                // this.setState({ error: error.message, fetchingLocation: false })
                let message = error && error.message ? error.message : 'Terjadi kesalahan ketika mencari lokasi anda !';
                if (error && error.message == "No location provider available.") {
                    message = "Mohon nyalakan GPS anda terlebih dahulu.";
                }
                this.setState({fetchLocation:false})
                alert('Informasi', message);
                // console.log(message);
            }, // go here if error while fetch location
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }, //enableHighAccuracy : aktif highaccuration , timeout : max time to getCurrentLocation, maximumAge : using last cache if not get real position
        );
    }

    validation() {
        let statusBlok = this.getStatusBlok(this.state.werksAfdBlokCode);
        if (this.state.blok === '') {
            Alert.alert('Blok Belum diisi !');
        } else if (this.state.baris === '') {
            Alert.alert('Baris Belum diisi !');
        } else if(statusBlok === ''){
            alert('Anda tidak bisa Inspeksi di Blok ini, silahkan hubungi IT Site')
        } else {
            this.insertDB(statusBlok);
        }    
    }

    getAfdeling(werk_afd_code){
        let data = TaskService.findBy2('TM_AFD', 'WERKS_AFD_CODE', werk_afd_code);
        return data.AFD_NAME.substring(data.AFD_NAME.indexOf(' ')+1);
    }

    getStatusBlok(werk_afd_blok_code){
        let data = TaskService.findBy2('TM_LAND_USE', 'WERKS_AFD_BLOCK_CODE', werk_afd_blok_code);
        return data.MATURITY_STATUS;
    }

    insertDB(param) {
        // alert(this.getStatusBlok(this.state.werksAfdBlokCode));
        let dataLogin = TaskService.getAllData('TR_LOGIN');
        var NIK = dataLogin[0].NIK;
        var DATE = getTodayDate('YYYYMMDD');
        var WERKS = TaskService.getWerks();
        var AFD = this.getAfdeling(this.state.werksAfdCode);
        var BLOK = this.state.blok;
        var UNIQ_CODE = getUUID();
        UNIQ_CODE = UNIQ_CODE.substring(0,UNIQ_CODE.indexOf('-'));
        var blok_inspection_code_h = NIK+"-INS-"+DATE+'-'+WERKS+'-'+AFD+'-'+BLOK+'-'+UNIQ_CODE;

        let modelInspeksiH = {
            BLOCK_INSPECTION_CODE: blok_inspection_code_h,
            WERKS: WERKS,
            AFD_CODE: AFD,
            BLOCK_CODE: BLOK,
            INSPECTION_DATE: getTodayDate('YYYY-MM-DD HH:mm:ss'), //getTodayDate('DD MMM YYYY HH:mm:ss'), //12 oct 2018 01:01:01
            INSPECTION_SCORE: 'string',
            INSPECTION_RESULT: 'string',
            STATUS_SYNC: 'N',
            SYNC_TIME: '',
            START_INSPECTION: getTodayDate('YYYY-MM-DD HH:mm:ss'),//getTodayDate('DD MMM YYYY HH:mm:ss'),
            END_INSPECTION: '',
            LAT_START_INSPECTION: this.state.latitude.toString(),
            LONG_START_INSPECTION: this.state.longitude.toString(),
            LAT_END_INSPECTION: '',
            LONG_END_INSPECTION: '',
            ASSIGN_TO: ''
        }

        let params = {
            NIK: NIK,
            BA: WERKS,
            AFD: AFD,
            BLOK: this.state.blok,
            BARIS: this.state.baris,
            BLOCK_INSPECTION_CODE: blok_inspection_code_h
        }

        this.setState({ inspectionCode: blok_inspection_code_h, showConfirm: false });
        
        this.props.navigation.navigate('TakeFotoBaris', {
            inspeksiHeader: modelInspeksiH,
            dataUsual: params,
            statusBlok: param,//this.getStatusBlok(this.state.werksAfdBlokCode),
            baris:this.state.baris,
            waktu: getTodayDate('YYYY-MM-DD  HH:mm:ss')
        });
    }

    getEstateName(compCode){
        let data = TaskService.findBy2('TM_EST', 'COMP_CODE', compCode);
        return data.EST_NAME
    }

    render() {        
        const { query } = this.state;
        const person = this.findPerson(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <View style={styles.mainContainer}>

                <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                    <View style={styles.containerStepper}>
                        <View style={[styles.stepperNumber, { backgroundColor: Colors.brand }]}>
                            <Text style={styles.stepperNumberText}>1</Text>
                        </View>
                        <Text style={[Fonts.style.caption, { paddingLeft: 3, color: Colors.brand }]}>Pilih Lokasi</Text>
                        <View>
                            <Icon
                                name="chevron-right"
                                size={24}
                                color={Colors.brand}
                                style={styles.stepperNext} />
                        </View>
                    </View>

                    <View style={styles.containerStepper}>
                        <View style={[styles.stepperNumber, { backgroundColor: Colors.buttonDisabled }]}>
                            <Text style={styles.stepperNumberText}>2</Text>
                        </View>
                        <Text style={[Fonts.style.caption, { paddingLeft: 3, color: Colors.textSecondary }]}>Kondisi Baris</Text>
                        <View>
                            <Icon
                                name="chevron-right"
                                size={24}
                                color={Colors.buttonDisabled}
                                style={styles.stepperNext} />
                        </View>
                    </View>

                    <View style={styles.containerStepper}>
                        <View style={[styles.stepperNumber, { backgroundColor: Colors.buttonDisabled }]}>
                            <Text style={styles.stepperNumberText}>3</Text>
                        </View>
                        <Text style={[Fonts.style.caption, { paddingLeft: 3, color: Colors.textSecondary }]}>Summary</Text>
                    </View>
                </View>

                {/*INPUT*/}
                <View style={{ height: 200, marginLeft: 20, marginRight: 20 }}>
                    <Card style={[styles.cardContainer]}>
                        <View style={{flex:1, margin:10}}>
                            <Text style={{ color: '#696969' }}>Blok</Text>
                            <Autocomplete
                                autoCapitalize="none"
                                autoCorrect={false}
                                containerStyle={styles.autocompleteContainer}
                                data={person.length === 1 && comp(query, person[0].blokCode) ? [] : person}
                                defaultValue={query}
                                onChangeText={text => {
                                    this.setState({ query: text }); 
                                    this.hideAndShowBaris(text)}
                                }
                                renderItem={({ blokCode, blokName, werksAfdCode, werksAfdBlokCode, statusBlok, compCode}) => (
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ 
                                            blok : blokCode, 
                                            query: `${blokName}/${statusBlok}/${this.getEstateName(compCode)}`, 
                                            werksAfdCode: werksAfdCode, 
                                            werksAfdBlokCode:werksAfdBlokCode, 
                                            showBaris: true }
                                        )}}>
                                        <View style={{padding:10}}>
                                            <Text style = {{fontSize: 15,margin: 2}}>{blokName}/{statusBlok}/{this.getEstateName(compCode)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        {this.state.showBaris && 
                        <View style={{ flex: 1, margin:10 }}>
                            <Text style={{ color: '#696969' }}>Baris</Text>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                style={[styles.searchInput]}
                                keyboardType={'numeric'}
                                maxLength={3}
                                value={this.state.baris}
                                onChangeText={(text) => { text = text.replace(/[^0-9]/g, ''); this.setState({ baris: text }) }} />
                        </View>}
                    </Card>
                </View>

                <Text style={styles.textLabel}>
                    Pastikan kamu telah berada dilokasi yang benar
                </Text>
                
                <View style={styles.containerMap}>
                    {!!this.state.latitude && !!this.state.longitude &&
                        <MapView
                            style={styles.map}>
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
                    }                 

                    <IconLoc
                        onPress={()=>{this.setState({fetchLocation: true}); this.getLocation()}}
                        name="location-arrow"
                        size={24}
                        style={{ alignSelf: 'flex-end', marginBottom:130, marginRight: 10}}/>  

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.bubble, styles.button] } onPress={()=>{this.validation()}}>
                            <Text style={styles.buttonText}>Mulai Inspeksi</Text>
                        </TouchableOpacity>                        
                    </View>
                </View>
                


                {/* {!!this.state.latitude && !!this.state.longitude &&
                    <View style={styles.containerMap}>
                        <MapView 
                            style={styles.map}
                            initialRegion={{
                                latitude:this.state.latitude,
                                longitude:this.state.longitude,
                                latitudeDelta:0.015,
                                longitudeDelta:0.0121
                            }}
                            // initialRegion={this.state.initialPosition}
                            >
                            
                            <Marker
                                coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                }}
                                centerOffset={{ x: -42, y: -60 }}
                                anchor={{ x: 0.84, y: 1 }}
                            >
                            </Marker>
                            
                            <IconLoc
                                onPress={()=>{this.setState({fetchLocation: true}); this.getLocation()}}
                                name="location-arrow"
                                size={24}
                                style={{margin: 15, alignSelf:'flex-end'}}/>
                        </MapView>

                        {!this.state.keyboardOpen &&
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={[styles.bubble, styles.button] } onPress={()=>{this.setState({showConfirm:true})}}>
                                    <Text style={styles.buttonText}>Mulain Inspeksi</Text>
                                </TouchableOpacity>                        
                            </View>
                        }
                    
                    </View>
                }*/}

                {/* <ProgressDialog
                        visible={this.state.fetchLocation}
                        activityIndicatorSize="large"
                        message="Mencari Lokasi..."
                    />  */}
            </View>
        )
    }
}

export default BuatInspeksiRedesign;

const styles = {
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
        // padding:20
    },
    containerStepper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
    },
    stepperNumber: {
        height: 24,
        width: 24,
        backgroundColor: Colors.buttonDisabled,
        borderRadius: 12,
        justifyContent: 'center'
    },
    stepperNumberText: [Fonts.style.caption, { textAlign: 'center', color: Colors.textDark }],
    stepperNext: { alignSelf: 'flex-end', paddingRight: 4 },
    cardContainer: {
        flex: 1,
        padding:10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    searchInput: {
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
        marginRight: 5,
        fontSize: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#808080',
        color: '#808080',
    },
    autocompleteContainer: {
        flex: 1,
        // left: 0,
        // position: 'absolute',
        // right: 0,
        // top: 20,
        // zIndex: 1
    },
    textLabel:
        [Fonts.style.caption, { color: Colors.brand, textAlign: 'center', fontSize: 16, marginTop: 10, marginRight: 20, marginLeft: 20 }]
    ,
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
    bubble: {
        backgroundColor: '#ff8080',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 17,
        color: '#ffffff',
        textAlign: 'center'
    },
    button: {
        width: 200,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
    // titleText: {
    //     fontSize: 18,
    //     fontWeight: '500',
    //     marginBottom: 10,
    //     marginTop: 10,
    //     textAlign: 'center'
    //   },
    //   directorText: {
    //     color: 'grey',
    //     fontSize: 12,
    //     marginBottom: 10,
    //     textAlign: 'center'
    //   },
    // container: {
    //     position:'absolute',
    //     top:0,
    //     left:0,
    //     right:0,
    //     bottom:0,
    //     justifyContent:'flex-end',
    //     alignItems:'center'
    //   },
    //   map: {
    //     position:'absolute',
    //     top:0,
    //     left:0,
    //     right:0,
    //     bottom:0
    //   },
}