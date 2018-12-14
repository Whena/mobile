import React, {Component} from 'react';
import {Text, Keyboard, Alert, TextInput, TouchableOpacity, View, Image, StatusBar,
    KeyboardAvoidingView ,} from 'react-native';
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
import CardView from 'react-native-cardview';
// import MapView,{ PROVIDER_GOOGLE } from 'react-native-maps'
import MapView, {PROVIDER_GOOGLE, ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';
import {convertTimestampToDate, getTodayDate, getUUID} from '../../Lib/Utils'
import TaskService from '../../Database/TaskServices';
// import KeyboardListener from 'react-native-keyboard-listener';
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
          coordinates: [-122.42305755615234, 37.82687023785448],
        }
      }
    ]
  };

class BuatInspeksiRedesign extends Component{
    constructor(props){
        
        // let params = props.navigation.state.params;
        super(props);
        this.state = {
            latitude:null,
            longitude:null,
            error:null,
            modelInspeksiH:null,
            modelTrack:null,
            date:'',
            blok:'',
            baris:'',
            inspectionCode:'',
            keyboardOpen: false
        };
    }

    // componentWillMount () {
    //     this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    //     this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    // }

    // componentWillUnmount () {
    //     this.keyboardDidShowListener.remove();
    //     this.keyboardDidHideListener.remove();
    // }

    // _keyboardDidShow () {
    //     this.setState({keyboardOpen:true});
    // }
    
    //   _keyboardDidHide () {
    //     this.setState({keyboardOpen:false});
    // }

    componentDidMount(){
        this.getLocation()
    }

    getLocation(){
		navigator.geolocation.getCurrentPosition(
			(position) => {
                var lat = parseFloat(position.coords.latitude);
                var lon = parseFloat(position.coords.longitude);
                // const timestamp = convertTimestampToDate(position.timestamp, 'DD/MM/YYYY HH:mm:ss')//moment(position.timestamp).format('DD/MM/YYYY HH:mm:ss');
                // console.log(timestamp);
                this.setState({latitude:lat, longitude:lon});
                // alert(position.coords.latitude)

			},
			(error) => {
				// this.setState({ error: error.message, fetchingLocation: false })
				let message = error && error.message ? error.message : 'Terjadi kesalahan ketika mencari lokasi anda !';
				if (error && error.message == "No location provider available.") {
					message = "Mohon nyalakan GPS anda terlebih dahulu.";
				}
				Alert.alert('Informasi', message);
				// console.log(message);
			}, // go here if error while fetch location
			{ enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }, //enableHighAccuracy : aktif highaccuration , timeout : max time to getCurrentLocation, maximumAge : using last cache if not get real position 
        );
    }

    validation(){
        if(this.state.blok === ''){
            Alert.alert('Blok Belum diisi !');
        }else if(this.state.baris === ''){
            Alert.alert('Baris Belum diisi !');
        }else{
            this.insertDB();
        }   
        // this.props.navigation.dispatch({ type: 'Navigation/BACK' })  ;   
    }

    insertDB(){
        let dataLogin = TaskService.getAllData('TR_LOGIN');
        var NIK = dataLogin[0].NIK;
        var DATE = getTodayDate('YYYYMMDD');
        var BA = '4122';
        var AFD = 'H';
        var BLOK = this.state.blok;
        var UNIQ_CODE = getUUID();
        UNIQ_CODE = UNIQ_CODE.substring(0,UNIQ_CODE.indexOf('-'));
        var blok_inspection_code_h = NIK+"-INS-"+DATE+'-'+BA+'-'+AFD+'-'+BLOK+'-'+UNIQ_CODE;
        // var track_ins_code = NIK+"-"+DATE+'-'+BA+'-'+AFD+'-'+BLOK+'-T-'+ (parseInt(TaskService.getTotalData('TR_TRACK_INSPECTION'))+1);

        let modelInspeksiH = {
            BLOCK_INSPECTION_CODE: blok_inspection_code_h,
            WERKS: BA,
            AFD_CODE: AFD,
            BLOCK_CODE: BLOK,
            INSPECTION_DATE: getTodayDate('DD MMM YYYY HH:mm:ss'), //12 oct 2018 01:01:01
            INSPECTION_SCORE:'string',
            INSPECTION_RESULT:'string',
            STATUS_SYNC:'N',
            SYNC_TIME:'',
            START_INSPECTION: getTodayDate('DD MMM YYYY HH:mm:ss'),
            END_INSPECTION:'',
            LAT_START_INSPECTION: this.state.latitude.toString(),
            LONG_START_INSPECTION: this.state.longitude.toString(),
            LAT_END_INSPECTION:'',
            LONG_END_INSPECTION:'',
            ASSIGN_TO:''
        }

        // let modelTrack = {
        //     TRACK_INSPECTION_CODE: track_ins_code,
        //     BLOCK_INSPECTION_CODE: blok_inspection_code_h,
        //     DATE_TRACK: getTodayDate('DD MMM YYYY HH:mm:ss'),
        //     LAT_TRACK: this.state.latitude.toString(),
        //     LONG_TRACK: this.state.longitude.toString()
        // }

        let  params = {
            NIK: NIK,
            BA: BA,
            AFD: AFD,
            BLOK: this.state.blok, 
            BARIS: this.state.baris,
            BLOCK_INSPECTION_CODE: blok_inspection_code_h
        }

        this.setState({inspectionCode:blok_inspection_code_h})
        this.props.navigation.navigate('TakeFotoBaris', {inspeksiHeader:modelInspeksiH, dataUsual: params});
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <View style={{flexDirection:'row', marginLeft:20, marginRight:20, marginTop:10}}>
                    <View style={styles.containerStepper}>
                        <View style={[styles.stepperNumber,{backgroundColor:Colors.brand}]}>
                            <Text style={styles.stepperNumberText}>1</Text>
                        </View>
                        <Text style={[Fonts.style.caption,{paddingLeft: 3,color:Colors.brand}]}>Pilih Lokasi</Text>
                        <View>
                            <Icon
                            name="chevron-right"
                            size={24}
                            color={Colors.brand}
                            style={styles.stepperNext}/>
                        </View>
                    </View>

                    <View style={styles.containerStepper}>
                        <View style={[styles.stepperNumber,{backgroundColor:Colors.buttonDisabled}]}>
                            <Text style={styles.stepperNumberText}>2</Text>
                        </View>
                        <Text style={[Fonts.style.caption,{paddingLeft: 3,color:Colors.textSecondary}]}>Kondisi Baris</Text>
                        <View>
                            <Icon
                            name="chevron-right"
                            size={24}
                            color={Colors.buttonDisabled}
                            style={styles.stepperNext}/>
                        </View>
                    </View>

                    <View style={styles.containerStepper}>
                        <View style={[styles.stepperNumber,{backgroundColor:Colors.buttonDisabled}]}>
                            <Text style={styles.stepperNumberText}>3</Text>
                        </View>
                        <Text style={[Fonts.style.caption,{paddingLeft: 3,color:Colors.textSecondary}]}>Summary</Text>
                    </View>
                </View>
                
                {/*INPUT*/}
                <View style={{height:200, marginLeft:20, marginRight:20}}>
                    <Card style={[styles.cardContainer]}>
                        <CardItem>
                            <View style={{flex:1}}>
                            <Text style={{color:'#696969'}}>Blok</Text>
                            {/* <Autocomplete
                                    containerStyle={styles.autocompleteContainer}
                                    autoCapitalize={'characters'}
                                    underlineColorAndroid={'transparent'}
                                    // style={styles.searchInput}
                                    value={this.state.blok.toLocaleUpperCase()}
                                    onChangeText={(text)=>{this.setState({blok:text})}}
                                /> */}
                                <TextInput
                                    autoCapitalize={'characters'}
                                    underlineColorAndroid={'transparent'}
                                    style={[styles.searchInput]}
                                    value={this.state.blok.toLocaleUpperCase()}
                                    onChangeText={(text)=>{this.setState({blok:text})}}/>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style={{flex:1}}>
                                <Text style={{color:'#696969'}}>Baris</Text>
                                <TextInput
                                    underlineColorAndroid={'transparent'}
                                    style={[styles.searchInput]}
                                    keyboardType={'numeric'}
								    maxLength={3}
                                    value={this.state.baris}
                                    onChangeText={(text)=>{text = text.replace(/[^0-9]/g, ''); this.setState({baris:text})}}/>
                            </View>
                        </CardItem>
                    </Card>
                </View>
                
                <Text style = {styles.textLabel}>
                    Pastikan kamu telah berada dilokasi yang benar
                </Text>

{/* <View style={styles.containerMap}>
<MapView
style={styles.map}>
    <Geojson geojson={alcatraz} />
  </MapView>
</View> */}
                


                {!!this.state.latitude && !!this.state.longitude &&
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

                            {/* <MapView.Marker coordinate={this.state.initialMarker}>
                            </MapView.Marker> */}
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

                        {!this.state.keyboardOpen &&
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={[styles.bubble, styles.button] } onPress={()=>{this.validation()}}>
                                    <Text style={styles.buttonText}>Mulai Inspeksi</Text>
                                </TouchableOpacity>                        
                            </View>
                        }
                    
                    </View>
                }

            </View>
        )
    }
}

export default BuatInspeksiRedesign;

const styles = {
    mainContainer:{
        flex:1,
        backgroundColor:'white'
        // padding:20
    },
    containerStepper:{        
        flexDirection:'row',
        alignItems:'center',
        height:40,
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
    cardContainer : {
        flex: 1,
        marginTop:10,
        paddingTop:10,
        paddingBottom:5,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    searchInput: {
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
        marginRight: 5,
        fontSize: 15,
        borderBottomWidth:1,
        borderBottomColor:'#808080',
        color: 	'#808080',
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 20,
        zIndex: 1
    //     borderRadius: 4,
    // borderColor: '#cccccc',
    // borderWidth: 1,
    // marginBottom: 18,
    },
    textLabel:
        [Fonts.style.caption,{color:Colors.brand, textAlign:'center', fontSize:16, marginTop:10, marginRight:20, marginLeft:20}]
    ,
    containerMap:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        marginTop:10
    },
    map: {
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0
    },
    bubble: {
        backgroundColor: '#ff8080',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    buttonText: {
        fontSize:17,
        color:'#ffffff',
        textAlign:'center'
    },
    button: {
        width: 200,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
        padding:10 ,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
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