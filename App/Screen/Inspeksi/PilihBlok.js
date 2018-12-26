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
          coordinates: [-122.42305755615234, 37.82687023785448],// [-6.2292229, 106.8253967]
        }
      }
    ]
};

class PilihBlok  extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.tintColor
        },
        title: 'Buat Inspeksi',
        headerTintColor: '#fff',
        headerTitleStyle: {
            flex: 1,
            fontSize: 18,
            fontWeight: '400'
        },
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack}>
                <Icons style={{marginLeft: 12}} name={'ios-arrow-round-back'} size={24} color={'white'} />
            </TouchableOpacity>
        )
    };

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var lat = parseFloat(position.coords.latitude);
                var lon = parseFloat(position.coords.longitude);
                // const timestamp = convertTimestampToDate(position.timestamp, 'DD/MM/YYYY HH:mm:ss')//moment(position.timestamp).format('DD/MM/YYYY HH:mm:ss');
                // console.log(timestamp);
                console.log(lat + ' ' + lon);
                alert(lat + ' ' + lon);
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
            }, // go here if error while fetch location
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }, //enableHighAccuracy : aktif highaccuration , timeout : max time to getCurrentLocation, maximumAge : using last cache if not get real position
        );
    }


    render(){
        return(
            <View>

            </View>
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
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 5,
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
}