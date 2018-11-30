import React, {Component} from 'react';
import {Text, Dimensions, Alert, TextInput, StyleSheet, TouchableOpacity, View, Switch, StatusBar,
    Button,} from 'react-native';
import {
	Container,
	Content,  
	Card,
	CardItem,
} from 'native-base';
import Colors from '../../Constant/Colors'
import Fonts from '../../Constant/Fonts'
import Icon from 'react-native-vector-icons/MaterialIcons';
//import MapView, {PROVIDER_GOOGLE, ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';


class KondisiBarisAkhir extends Component{

    constructor(props){
        super(props);
        this.state = {
            latitude:null,
            longitude:null,
            error:null,
            switchLanjut: true,
            txtBaris:'',
            tumbButtonSlide:{
                width: 55,
                height:45,
                borderRadius: 20,
                borderWidth:1,
                borderColor:'#C8C8C8',
                backgroundColor: Colors.tintColor,
            },
        };
    }

    componentDidMount(){
        this.getLocation()
    }

    getLocation(){
		navigator.geolocation.getCurrentPosition(
			(position) => {
                var lat = parseFloat(position.coords.latitude);
                var lon = parseFloat(position.coords.longitude);
                // var initialRegion = new AnimatedRegion({
                //     latitude:lat,
                //     longitude:lon,
                //     latitudeDelta:0.015,
                //     longitudeDelta:0.0121
                // });
                // this.setState({initialPosition:initialRegion});
                // this.setState({initialMarker:initialRegion});
                this.setState({latitude:lat, longitude:lon});

			},
			(error) => {
				// this.setState({ error: error.message, fetchingLocation: false })
				let message = error && error.message ? error.message : 'Terjadi kesalahan ketika mencari lokasi anda !';
				if (error && error.message == "No location provider available.") {
					message = "Mohon nyalakan GPS anda terlebih dahulu.";
				}
				// Alert.alert('Informasi', message);
				console.log(message);
			}, // go here if error while fetch location
			{ enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }, //enableHighAccuracy : aktif highaccuration , timeout : max time to getCurrentLocation, maximumAge : using last cache if not get real position 
        );
    }

    onSlideRight = () => {
        //perform Action on slide success.
        // this.props.navigation.navigate('TakePhotoSelfie')
        Alert.alert('selesai');
    };

    changeColorSlide(){  
        var btn;
        if(!this.state.switchLanjut){
            btn = {
                width: 55,
                height:45,
                borderRadius: 20,
                borderWidth:1,
                borderColor:'#C8C8C8',
                backgroundColor: Colors.tintColor,
            }
        }else{
            btn = {
                width: 55,
                height:45,
                borderRadius: 20,
                borderWidth:1,
                borderColor:'#C8C8C8',
                backgroundColor: Colors.brandSecondary,
            }
        }
        this.setState({tumbButtonSlide:btn})
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                {/*STEPPER*/}
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

                {/*MAPS*/}
                {!!this.state.latitude && !!this.state.longitude &&
                    <View style={styles.containerMap}>
                        {/* <MapView 
                            style={styles.map}
                            initialRegion={{
                                latitude:this.state.latitude,
                                longitude:this.state.longitude,
                                latitudeDelta:0.015,
                                longitudeDelta:0.0121
                            }}
                            // initialRegion={this.state.initialPosition}
                            > */}

                            {/* <MapView.Marker coordinate={this.state.initialMarker}>
                            </MapView.Marker> */}
                            {/* <Marker
                                coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                }}
                                centerOffset={{ x: -42, y: -60 }}
                                anchor={{ x: 0.84, y: 1 }}
                            >
                            </Marker>
                        </MapView> */}

                        <View style={{height:250, marginLeft:20, marginRight:20}}>
                            <Card style={[styles.cardContainer]}>
                                <CardItem>
                                    <View style={{flex:1}}>
                                        <Text style={{color:'black'}}>Total Waktu dan Jarak:</Text>
                                        <Text style={{color:'black'}}>30 Menit dan 1,2m</Text>
                                        <View style={{flexDirection:'row', marginTop:10}}>
                                            <Text style={{color:'grey'}}>Lanjut Baris Berikutnya ?</Text>
                                            <Switch
                                                onValueChange={(value) => {this.setState({switchLanjut:value}); this.changeColorSlide()}}
                                                style={{marginBottom: 10, position:'absolute', right:0}}
                                                value={this.state.switchLanjut} />
                                        </View>
                                        {!!this.state.switchLanjut &&
                                            <View style={{flexDirection:'row', marginTop:15}}>
                                                <Text style={{color:'grey', marginTop:15}}>ke Baris Berapa ?</Text>
                                                <TextInput
                                                    underlineColorAndroid={'transparent'}
                                                    style={[styles.searchInput,{marginBottom:10, position:'absolute', right:0}]}
                                                    value={this.state.txtBaris}                                    
                                                    onChangeText={(baris) => { this.setState({ txtBaris: baris }) }}/>
                                            </View>
                                        }
                                        {/*SLIDER*/}
                                        <View style={{padding:10, alignItems:'center', marginTop:15}}>
                                            <RNSlidingButton
                                                style={styles.buttonSlide}
                                                height={45}
                                                onSlidingSuccess={this.onSlideRight}
                                                slideDirection={SlideDirection.RIGHT}>
                                                <View style={{flexDirection:'row'}}>
                                                    <TouchableOpacity style={[styles.bubble, this.state.tumbButtonSlide] } onPress={()=>{}}>
                                                        <Icon name={"chevron-right"}  size={20} color="white" />
                                                    </TouchableOpacity>
                                                    <Text numberOfLines={1} style={[styles.titleText,{alignItems:'center'}]}>
                                                        {this.state.switchLanjut ? 'Lanjut': 'Selesai'}
                                                    </Text>
                                                </View>
                                                </RNSlidingButton>
                                        </View>
                                    </View>
                                </CardItem>
                            </Card>
                        </View>
                    
                    </View>
                }
            </View>
        )
    }
}

export default KondisiBarisAkhir;

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
    cardContainer : {
        width:300,
        paddingTop:10,
        paddingBottom:5,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    searchInput: {
        width:60,
        height: 40,
        padding: 10,
        marginRight: 5,
        marginLeft:5,
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#989898',
        color: 	'#808080',
        textAlign:'center'
    },
    buttonSlide: {
        width: 200,
        borderRadius: 20,
        backgroundColor: '#DCDCDC',
    },
    bubble: {
        backgroundColor: Colors.tintColor,
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    titleText: {
        fontSize: 15,
        textAlign: 'center',
        color: '#A9A9A9',
        paddingHorizontal: 18,
        paddingVertical: 12,
        
    }
    // bubble: {
    //     backgroundColor: '#ff8080',
    //     paddingHorizontal: 18,
    //     paddingVertical: 12,
    //     borderRadius: 20,
    // },
    // buttonText: {
    //     fontSize:17,
    //     color:'#ffffff',
    //     textAlign:'center'
    // },
    // button: {
    //     width: 200,
    //     paddingHorizontal: 12,
    //     alignItems: 'center',
    //     marginHorizontal: 10,
    //     padding:10 ,
    // },
    // buttonContainer: {
    //     flexDirection: 'row',
    //     marginVertical: 20,
    //     backgroundColor: 'transparent',
    // },
}