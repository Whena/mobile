import React, {Component} from 'react';
import {Text, BackHandler, Alert, TextInput, StyleSheet, TouchableOpacity, View, Switch, StatusBar,
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
import MapView, {PROVIDER_GOOGLE, ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import TaskService from '../../Database/TaskServices';
import {getTodayDate} from '../../Lib/Utils'
import { NavigationActions, StackActions  } from 'react-navigation';
import R from 'ramda';


class KondisiBarisAkhir extends Component{

    constructor(props){
        super(props);

        let params = props.navigation.state.params;
        let fotoBaris = R.clone(params.fotoBaris);
        let fotoSelfie = R.clone(params.fotoSelfie);
        let inspeksiHeader = R.clone(params.inspeksiHeader);
        let trackInspeksi = R.clone(params.trackInspeksi);
        let kondisiBaris1 = R.clone(params.kondisiBaris1);
        let kondisiBaris2 = R.clone(params.kondisiBaris2);
        let dataUsual = R.clone(params.dataUsual);

        // console.log(fotoBaris)
        // console.log(fotoSelfie)
        // console.log(inspeksiHeader)
        // console.log(trackInspeksi)
        // console.log(kondisiBaris1)
        // console.log(kondisiBaris2)
        // console.log(dataUsual)


        this.state = {
            latitude:null,
            longitude:null,
            error:null,
            switchLanjut: true,
            fulFillMandatory: false,
            txtBaris:'',
            tumbButtonSlide:{
                width: 55,
                height:45,
                borderRadius: 20,
                borderWidth:1,
                borderColor:'#C8C8C8',
                backgroundColor: Colors.tintColor,
            },
            fotoBaris,
            fotoSelfie,
            inspeksiHeader,
            trackInspeksi,
            kondisiBaris1,
            kondisiBaris2,
            dataUsual,
            idBaris:0
        };
    }

    componentDidMount(){
        this.getLocation();
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

    changeColorSlide(){  
        var btn;        
        let total = TaskService.findBy('TR_BARIS_INSPECTION', 'BLOCK_INSPECTION_CODE', this.state.dataUsual.BLOCK_INSPECTION_CODE).length;
        if(total >= 1){
            this.setState({fulFillMandatory:true})
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
        }else{
            this.setState({switchLanjut: true})
            Alert.alert('Maaf, harap lanjutkan 1 baris lagi ');
        }
        
    }

    onSlideRight = () => {
        this.validation()
    };

    validation(){
        if(this.state.txtBaris == '' && this.state.switchLanjut){
            Alert.alert('Masukan baris');
        }else{
            this.saveData();
        }
    }

    calculate(){
        let barisPembagi = TaskService.findBy('TR_BARIS_INSPECTION', 'BLOCK_INSPECTION_CODE', this.state.inspeksiHeader.BLOCK_INSPECTION_CODE).length;

        var piringan = TaskService.findBy('TR_BLOCK_INSPECTION_D', 'CONTENT_INSPECTION_CODE', 'CC0007');
        var sarkul = TaskService.findBy('TR_BLOCK_INSPECTION_D', 'CONTENT_INSPECTION_CODE', 'CC0008');
        var tph = TaskService.findBy('TR_BLOCK_INSPECTION_D', 'CONTENT_INSPECTION_CODE', 'CC0009');
        var gawangan = TaskService.findBy('TR_BLOCK_INSPECTION_D', 'CONTENT_INSPECTION_CODE', 'CC0010');
        var prunning = TaskService.findBy('TR_BLOCK_INSPECTION_D', 'CONTENT_INSPECTION_CODE', 'CC0011');
        
        var jmlNilaiPiringan = this.getTotalNilaiComponent(piringan);
        var jmlNilaiSarkul = this.getTotalNilaiComponent(sarkul);
        var jmlNilaiTph = this.getTotalNilaiComponent(tph);
        var jmlNilaiGwg = this.getTotalNilaiComponent(gawangan);
        var jmlNilaiPrun = this.getTotalNilaiComponent(prunning);

        var avg_piringan = jmlNilaiPiringan/barisPembagi;
        var avg_sarkul = jmlNilaiSarkul/barisPembagi;
        var avg_tph = jmlNilaiTph/barisPembagi;
        var avg_gwg = jmlNilaiGwg/barisPembagi;
        var avg_prun = jmlNilaiPrun/barisPembagi;

        let bobotPiringan = 4;
        let bobotSarkul = 5;
        let bobotTph = 1;
        let bobotGwg = 3;
        let bobotPrun = 2;

        var nilai = ((avg_piringan*bobotPiringan) + (avg_sarkul*bobotSarkul) + (avg_gwg*bobotGwg) + (avg_tph*bobotTph) + (avg_prun*bobotPrun)) / (bobotPiringan + bobotSarkul + bobotTph + bobotGwg + bobotPrun);
        var result =  this.getKonversiNilaiKeHuruf(nilai);

        let param = [nilai.toString(), result, getTodayDate('DD MMM YYYY HH:mm:ss'), this.state.latitude.toString(), this.state.longitude.toString()]
        TaskService.updateInspectionHScore(this.state.inspeksiHeader.BLOCK_INSPECTION_CODE, param);
        
        // this.navigateScreen('BuatInspeksi', '', '');
        this.props.navigation.goBack(null);

    }

    getKonversiNilaiKeHuruf(param){
        if(param > 2.5 && param <= 3){
            return 'A';
        }else if(param > 2 && param <= 2.5){
            return 'B';
        }else if(param > 1 && param <= 2){
            return 'C';
        }else if(param >= 0 && param <= 1){
            return 'F';
        }
    }

    getTotalNilaiComponent(allComponent){
        var val = 0;
        for(var i=0; i < allComponent.length; i++){
            if(i==0){
                val = this.getKonversiNilai(allComponent[i].VALUE);
            }else{
                val = val + this.getKonversiNilai(allComponent[i].VALUE);
            }
        }
        return val;
    }

    getKonversiNilai(param){
        if(param === 'REHAB'){
            return 0;
        }else if(param === 'KURANG'){
            return 1;
        }else if(param === 'SEDANG'){
            return 2;
        }else if(param === 'BAIK'){
            return 3;
        }
    }

    saveData(){
        var endInspeksi = this.state.switchLanjut ? '' : getTodayDate('DD MMM YYYY HH:mm:ss');
        var endLat = this.state.switchLanjut ? '' : this.state.latitude.toString();
        var endLon = this.state.switchLanjut ? '' : this.state.longitude.toString();

        
        var modelInspeksiH = {
            BLOCK_INSPECTION_CODE: this.state.inspeksiHeader.BLOCK_INSPECTION_CODE,
            WERKS: this.state.inspeksiHeader.WERKS,
            AFD_CODE: this.state.inspeksiHeader.AFD_CODE,
            BLOCK_CODE: this.state.inspeksiHeader.BLOCK_CODE,
            INSPECTION_DATE: this.state.inspeksiHeader.INSPECTION_DATE, //getTodayDate('DD MMM YYYY HH:mm:ss'), //12 oct 2018 01:01:01
            INSPECTION_SCORE:'string',
            INSPECTION_RESULT:'string',
            STATUS_SYNC:'N',
            SYNC_TIME:'',
            START_INSPECTION: this.state.inspeksiHeader.START_INSPECTION,//getTodayDate('DD MMM YYYY HH:mm:ss'),
            END_INSPECTION: endInspeksi,
            LAT_START_INSPECTION: this.state.inspeksiHeader.LAT_START_INSPECTION, //this.state.latitude.toString(),
            LONG_START_INSPECTION: this.state.inspeksiHeader.LAT_START_INSPECTION,//this.state.longitude.toString(),
            LAT_END_INSPECTION: endLat,
            LONG_END_INSPECTION: endLon,
            ASSIGN_TO:''
        }        
        TaskService.saveData('TR_BLOCK_INSPECTION_H', modelInspeksiH);

        var image = {
            IMAGE_CODE: this.state.fotoBaris.IMAGE_CODE,
            TR_CODE: this.state.fotoBaris.TR_CODE,
            IMAGE_NAME: this.state.fotoBaris.IMAGE_NAME,
            IMAGE_PATH: this.state.fotoBaris.IMAGE_PATH,
            STATUS_IMAGE: '', 
            STATUS_SYNC: 'N'
        }
        TaskService.saveData('TR_IMAGE', image);

        var selfie = {
            IMAGE_CODE: this.state.fotoSelfie.IMAGE_CODE,
            TR_CODE: this.state.fotoSelfie.TR_CODE,
            IMAGE_NAME: this.state.fotoSelfie.IMAGE_NAME,
            IMAGE_PATH: this.state.fotoSelfie.IMAGE_PATH,
            STATUS_IMAGE: '', 
            STATUS_SYNC: 'N'
        }        
        TaskService.saveData('TR_IMAGE', selfie);

        if(this.state.kondisiBaris1 !== 'undefined'){
            for(var i=0; i<this.state.kondisiBaris1.length; i++){
                var model = this.state.kondisiBaris1[i];
                TaskService.saveData('TR_BLOCK_INSPECTION_D', model);
            }
        }        

        if(this.state.kondisiBaris2 !== 'undefined'){
            for(var i=0; i<this.state.kondisiBaris2.length; i++){
                var model = this.state.kondisiBaris2[i];
                TaskService.saveData('TR_BLOCK_INSPECTION_D', model);        
            }
        }

        let total = TaskService.findBy('TR_BARIS_INSPECTION', 'BLOCK_INSPECTION_CODE', this.state.dataUsual.BLOCK_INSPECTION_CODE).length;
        var baris = {
            ID: parseInt(total+1),
            BLOCK_INSPECTION_CODE: this.state.dataUsual.BLOCK_INSPECTION_CODE
        }
        TaskService.saveData('TR_BARIS_INSPECTION', baris)

        var params = {
            NIK: this.state.dataUsual.NIK,
            BA: this.state.dataUsual.BA,
            AFD: this.state.dataUsual.AFD,
            BLOK: this.state.dataUsual.BLOK, 
            BARIS: this.state.txtBaris,
            BLOCK_INSPECTION_CODE: this.state.dataUsual.BLOCK_INSPECTION_CODE
        }

        if(this.state.fulFillMandatory){
            this.calculate();
        }else{
            this.navigateScreen('TakeFotoBaris', params, modelInspeksiH);
        }
        
        
    }

    navigateScreen(screenName, params, inspeksiH) {
        const navigation = this.props.navigation;
        const resetAction = StackActions.reset({
            index: 0,            
			actions: [NavigationActions.navigate({ routeName: screenName, params : { dataUsual : params, inspeksiHeader: inspeksiH, from: 'kondisiBaris' } })]
        });
        navigation.dispatch(resetAction);
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
                                                    keyboardType={'numeric'}
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