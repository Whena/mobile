import React, { Component } from 'react';
import {
    Text, Keyboard, ListView, TextInput, TouchableOpacity, View, Image, StatusBar,
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


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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

class PilihBlok extends Component {

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
    };  

    constructor(props) {
        super(props);
        this.state = {
            latitude: 0.0,
            longitude: 0.0,
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
            werksAfdBlokCode: '',
            afdCode: '',
            clickLOV: false,
            arrBlok : [],
            arrBlokSearched : [],
        };
    }

    findPerson(query){
        if (query === '') {
            return [];
        }
        const { person } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return person.filter(person => person.allShow.search(regex) >= 0);
        
    }

    componentDidMount() {
        let data = TaskService.getAllData('TM_BLOCK');
        let arr = [];
        for(var i=0; i<data.length; i++){
            let statusBlok= this.getStatusBlok(data[i].WERKS_AFD_BLOCK_CODE);
            let estateName = this.getEstateName(data[i].WERKS);
            arr.push({
                blokCode: data[i].BLOCK_CODE, 
                blokName: data[i].BLOCK_NAME, 
                afdCode: data[i].AFD_CODE,
                werks: data[i].WERKS,
                estateName: estateName, 
                werksAfdBlokCode: data[i].WERKS_AFD_BLOCK_CODE,
                statusBlok: statusBlok,
                compCode: data[i].COMP_CODE,
                allShow: `${data[i].BLOCK_NAME}/${statusBlok}/${estateName}`            
            });
            this.setState({arrBlok: arr, arrBlokSearched: arr})
        }
        // let data = TaskService.getAllData('TM_BLOCK');
        // for(var i=0; i<data.length; i++){
        //     let statusBlok= this.getStatusBlok(data[i].WERKS_AFD_BLOCK_CODE);
        //     let estateName = this.getEstateName(data[i].WERKS);
        //     this.state.person.push({
        //         blokCode: data[i].BLOCK_CODE, 
        //         blokName: data[i].BLOCK_NAME, 
        //         afdCode: data[i].AFD_CODE,
        //         werks: data[i].WERKS,
        //         estateName: estateName, 
        //         werksAfdBlokCode: data[i].WERKS_AFD_BLOCK_CODE,
        //         statusBlok: statusBlok,
        //         compCode: data[i].COMP_CODE,
        //         allShow: `${data[i].BLOCK_NAME}/${statusBlok}/${estateName}`
        //     });
        // }
        this.getLocation();
    }  

    searchedBloks = (searchedText) => {
        var searchedAdresses = this.state.arrBlok.filter(function(bloks) {
          return bloks.allShow.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
        });
        this.setState({arrBlokSearched: searchedAdresses});
      };

      renderBloks = (blok) => {
        return (
          <View style={{flex:1, padding:5}}>
            <TouchableOpacity onPress = {()=>{this.onSelect(blok)}}>
              <Text style={{ fontSize: 15, color: 'black' }}>{blok.allShow}</Text>
                        {/* <Text style={{ fontSize: 13, color: 'grey', marginTop: 3 }}>{user.userRole}</Text> */}
            </TouchableOpacity>        
          </View>
        );
      };

    hideAndShowBaris(param){
        if(param.length > 0){
            this.setState({showBaris: false, clickLOV: false});
        }else{
            this.setState({showBaris: true, clickLOV: false});
        }
        
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var lat = parseFloat(position.coords.latitude);
                var lon = parseFloat(position.coords.longitude);
                this.setState({latitude:lat, longitude:lon, fetchLocation: false});

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
            alert('Blok Belum diisi !');
        } else if (this.state.baris === '') {
            alert('Baris Belum diisi !');
        } else if(statusBlok === ''){
            alert('Anda tidak bisa Inspeksi di Blok ini, silahkan hubungi IT Site');
        } else if(!this.state.clickLOV){
            alert('Blok harus dipilih dari LOV');
        }else {
            this.insertDB(statusBlok);
        }    
    }

    getAfdeling(werk_afd_code){
        try {
            let data = TaskService.findBy2('TM_AFD', 'WERKS_AFD_CODE', werk_afd_code);
            return data.AFD_NAME.substring(data.AFD_NAME.indexOf(' ')+1);
        } catch (error) {
            return '';
        }
        
    }

    getStatusBlok(werk_afd_blok_code){
        try {
            let data = TaskService.findBy2('TM_LAND_USE', 'WERKS_AFD_BLOCK_CODE', werk_afd_blok_code);
            return data.MATURITY_STATUS;            
        } catch (error) {
            return ''
        }
    }

    insertDB(param) {
        let dataLogin = TaskService.getAllData('TR_LOGIN');
        var NIK = dataLogin[0].NIK;
        var DATE = getTodayDate('YYYYMMDD');
        var WERKS = TaskService.getWerks();
        var AFD = this.state.afdCode;
        var BLOK = this.state.blok;
        var UNIQ_CODE = getUUID();
        UNIQ_CODE = UNIQ_CODE.substring(0,UNIQ_CODE.indexOf('-'));
        var blok_inspection_code_h = NIK+"-INS-"+DATE+'-'+WERKS+'-'+AFD+'-'+BLOK+'-'+UNIQ_CODE;

        let modelInspeksiH = {
            BLOCK_INSPECTION_CODE: blok_inspection_code_h,
            WERKS: WERKS,
            AFD_CODE: AFD,
            BLOCK_CODE: BLOK,
            STATUS_BLOCK: param,
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

    getEstateName(werks){
        try {
            let data = TaskService.findBy2('TM_EST', 'WERKS', werks);
            return data.EST_NAME;
        } catch (error) {
            return '';
        }
        
    }

    potong(param){
        let brs = param;
        if(brs.charAt(0) == '0'){
            brs = brs.substring(1);
            
        }
        this.setState({ baris: brs });
    }

    render() {        
        const { query } = this.state;
        const person = this.findPerson(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <View style={[styles.containerSlidingUpPanel]}>
                
                <View style={{ width: '100%', height: 20 }} onPress={() => this.setState({ isMapsVisible: false })}>
                    <View style={{
                            backgroundColor: '#CCC', alignSelf: 'center',
                            height: 4, width: 80
                        }}
                    />
                </View>

                 <View style={{flex:1, margin:10}}>
                     {/* <Text style={{ color: '#696969' }}>Blok</Text>
                     <View style={{flexDirection:'row', backgroundColor: '#DDDDDD', padding:10}}>
                     <TextInput 
                        style={styles.autocompleteContainer}
                        onChangeText={this.searchedBloks}
                        placeholder="Cari nama" />
                    </View> */}
                    <View style={{ flex: 1, margin:10 }}>
                        <Text style={{ color: '#696969' }}>Blok</Text>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            style={[styles.searchInput]}
                            onChangeText={this.searchedBloks}
                            placeholder="Cari nama blok" />
                    </View>
                    <View style={{marginTop: 55}}>
                    <ListView 
                        dataSource={ds.cloneWithRows(this.state.arrBlokSearched)}
                        renderRow={this.renderBloks} 
                        renderSeparator={(sectionId, rowId)=><View key={rowId} style={styles.separator} />}
                        />
                    </View>
                </View>

                <View style={styles.line} />

                <Text style={{ color: Colors.brand, textAlign: 'center', paddingHorizontal: 25, marginBottom: 10, fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>Pastikan kamu telah berada di lokasi yang benar</Text>
                <View style={styles.containerMap}>
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
                    <IconLoc
                        onPress={() => { this.getLocation() }}
                        name="location-arrow"
                        size={24}
                        style={{ alignSelf: 'flex-end', marginBottom: 325, marginRight: 10 }} />
                </View>                        
            </View>
            // <View style={styles.mainContainer}>
            //     {/*INPUT*/}
            //     <View style={{flex:1, margin:10}}>
            //         <Text style={{ color: '#696969' }}>Blok</Text>
            //         <View style={{flexDirection:'row', backgroundColor: '#DDDDDD', padding:10}}>
            //             <TextInput 
            //                 style={styles.autocompleteContainer}
            //                 onChangeText={this.searchedBloks}
            //                 placeholder="Cari nama" />
            //             </View>
            //             <View style={{marginTop: 5}}>
            //             <ListView 
            //                 dataSource={ds.cloneWithRows(this.state.arrBlokSearched)}
            //                 renderRow={this.renderBloks} 
            //                 renderSeparator={(sectionId, rowId)=><View key={rowId} style={styles.separator} />}
            //                 />
            //             </View>
            //     </View>
                
            //     <View style={styles.containerMap}>
            //         {!!this.state.latitude && !!this.state.longitude &&
            //             <MapView
            //                 style={styles.map}>
            //                 <Geojson geojson={alcatraz} />
            //                 <Marker
            //                     coordinate={{
            //                     latitude: this.state.latitude,
            //                     longitude: this.state.longitude,
            //                     }}
            //                     centerOffset={{ x: -42, y: -60 }}
            //                     anchor={{ x: 0.84, y: 1 }}
            //                 >
            //                 </Marker>                      
            //             </MapView>
            //         }                 

            //         <IconLoc
            //             onPress={()=>{this.setState({fetchLocation: true}); this.getLocation()}}
            //             name="location-arrow"
            //             size={24}
            //             style={{ alignSelf: 'flex-end', marginBottom:130, marginRight: 10}}/>  

            //         <View style={styles.buttonContainer}>
            //             <TouchableOpacity style={[styles.bubble, styles.button] } onPress={()=>{this.validation()}}>
            //                 <Text style={styles.buttonText}>Mulai Inspeksi</Text>
            //             </TouchableOpacity>                        
            //         </View>
            //     </View>

            //     {<ProgressDialog
            //             visible={this.state.fetchLocation}
            //             activityIndicatorSize="large"
            //             message="Mencari Lokasi..."
            //     />}
        )
    }
}

export default PilihBlok;

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
    // buttonText: {
    //     fontSize: 17,
    //     color: '#ffffff',
    //     textAlign: 'center'
    // },
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
    containerSlidingUpPanel: {
        marginTop: 5,
        flex: 1,
        zIndex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white'
    },
    label: {
        width: '40%',
        fontSize: 14
    },
    buttonSetLoc: {
        width: 100,
        backgroundColor: Colors.brand,
        borderRadius: 5,
        padding: 5,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    line: {
        marginTop: 16,
        marginBottom: 16,
        borderBottomColor: "#CCC",
        borderBottomWidth: 1
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center'
    },
}