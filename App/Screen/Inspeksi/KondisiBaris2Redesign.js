import React, {Component} from 'react';
import {TouchableOpacity, ScrollView, Text, View, Switch, Alert } from 'react-native';
import Colors from '../../Constant/Colors'
import Fonts from '../../Constant/Fonts'
import BtnStyles from './ButtonStyle'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';


class KondisiBaris2Redesign extends Component{

    constructor(props){
        super(props);
        this.state = { 
            
            //piringan  
            piringan: '',
            btnPiringanBaik: BtnStyles.btnBiasa,
            btnPiringanSedang: BtnStyles.btnBiasa,
            btnPiringanBuruk: BtnStyles.btnBiasa,

            //passar pikul
            sarKul: '',
            btnSarKulBaik: BtnStyles.btnBiasa,
            btnSarKulSedang: BtnStyles.btnBiasa,
            btnSarKulBuruk: BtnStyles.btnBiasa,

            //TPH
            TPH:'',
            btnTPHBaik:BtnStyles.btnBiasa,
            btnTPHSedang:BtnStyles.btnBiasa,
            btnTPHBuruk:BtnStyles.btnBiasa,
            
            //GAWANGAN
            GWG:'',
            btnGWGBaik:BtnStyles.btnBiasa,
            btnGWGSedang:BtnStyles.btnBiasa,
            btnGWGBuruk:BtnStyles.btnBiasa,
            
            //PRUNNINGAN
            PRUN:'',
            btnPRUNBaik:BtnStyles.btnBiasa,
            btnPRUNSedang:BtnStyles.btnBiasa,
            btnPRUNBuruk:BtnStyles.btnBiasa,
            
            //TITI PANEN
            TPH:'',
            btnTIPABaik:BtnStyles.btnBiasa,
            btnTIPASedang:BtnStyles.btnBiasa,
            btnTIPABuruk:BtnStyles.btnBiasa,
            
            //SISTEM PENABURAN
            PENABUR:'',
            btnPENABURBaik:BtnStyles.btnBiasa,
            btnPENABURSedang:BtnStyles.btnBiasa,
            btnPENABURBuruk:BtnStyles.btnBiasa,
            
            //KONDISI PUPUK
            PUPUK:'',
            btnPUPUKBaik:BtnStyles.btnBiasa,
            btnPUPUKSedang:BtnStyles.btnBiasa,
            btnPUPUKBuruk:BtnStyles.btnBiasa,

            switchTPH: false,
            switchTIPA: false
 
        }
    }

    componentDidMount(){
        // this.setParameter();
    }

    setParameter(){
        var blokInspectionCodeD = this.state.order.NIK+'-'+getTodayDate('YYYYMMDD')+'-'+this.state.order.BA+
        '-'+this.state.order.AFD+'-D-'+TaskServices.getTotalData('TR_BLOCK_INSPECTION_D')+1;         

        var data = {
            BLOCK_INSPECTION_CODE_D: blokInspectionCodeD,
            BLOCK_INSPECTION_CODE: this.state.order.BLOCK_INSPECTION_CODE,
            CONTENT_INSPECTION_CODE:'',
            AREAL: this.state.order.BARIS,
            VALUE: '', 
            STATUS_SYNC: 'N'
        }

        this.setState({dataModel:data});
    }

    changeColor(param, value){        
        if(param == 'PIRINGAN' && value == 'BAIK'){
            this.setState({btnPiringanBaik:BtnStyles.btnBaik, btnPiringanSedang:BtnStyles.btnBiasa, btnPiringanBuruk:BtnStyles.btnBiasa});
        }else if(param == 'PIRINGAN' && value == 'SEDANG'){
            this.setState({btnPiringanBaik:BtnStyles.btnBiasa, btnPiringanSedang:BtnStyles.btnSedang, btnPiringanBuruk:BtnStyles.btnBiasa});
        }else if(param == 'PIRINGAN' && value == 'BURUK'){
            this.setState({btnPiringanBaik:BtnStyles.btnBiasa, btnPiringanSedang:BtnStyles.btnBiasa, btnPiringanBuruk:BtnStyles.btnBuruk});
        }else if(param == 'SARKUL' && value == 'BAIK'){
            this.setState({btnSarKulBaik:BtnStyles.btnBaik, btnSarKulSedang:BtnStyles.btnBiasa, btnSarKulBuruk:BtnStyles.btnBiasa});
        }else if(param == 'SARKUL' && value == 'SEDANG'){
            this.setState({btnSarKulBaik:BtnStyles.btnBiasa, btnSarKulSedang:BtnStyles.btnSedang, btnSarKulBuruk:BtnStyles.btnBiasa});
        }else if(param == 'SARKUL' && value == 'BURUK'){
            this.setState({btnSarKulBaik:BtnStyles.btnBiasa, btnSarKulSedang:BtnStyles.btnBiasa, btnSarKulBuruk:BtnStyles.btnBuruk});
        }else if(param == 'TPH' && value == 'BAIK'){
            this.setState({btnTPHBaik:BtnStyles.btnBaik, btnTPHSedang:BtnStyles.btnBiasa, btnTPHBuruk:BtnStyles.btnBiasa});
        }else if(param == 'TPH' && value == 'SEDANG'){
            this.setState({btnTPHBaik:BtnStyles.btnBiasa, btnTPHSedang:BtnStyles.btnSedang, btnTPHBuruk:BtnStyles.btnBiasa});
        }else if(param == 'TPH' && value == 'BURUK'){
            this.setState({btnTPHBaik:BtnStyles.btnBiasa, btnTPHSedang:BtnStyles.btnBiasa, btnTPHBuruk:BtnStyles.btnBuruk});
        }else if(param == 'GWG' && value == 'BAIK'){
            this.setState({btnGWGBaik:BtnStyles.btnBaik, btnGWGSedang:BtnStyles.btnBiasa, btnGWGBuruk:BtnStyles.btnBiasa});
        }else if(param == 'GWG' && value == 'SEDANG'){
            this.setState({btnGWGBaik:BtnStyles.btnBiasa, btnGWGSedang:BtnStyles.btnSedang, btnGWGBuruk:BtnStyles.btnBiasa});
        }else if(param == 'GWG' && value == 'BURUK'){
            this.setState({btnGWGBaik:BtnStyles.btnBiasa, btnGWGSedang:BtnStyles.btnBiasa, btnGWGBuruk:BtnStyles.btnBuruk});
        }else if(param == 'PRUN' && value == 'BAIK'){
            this.setState({btnPRUNBaik:BtnStyles.btnBaik, btnPRUNSedang:BtnStyles.btnBiasa, btnPRUNBuruk:BtnStyles.btnBiasa});
        }else if(param == 'PRUN' && value == 'SEDANG'){
            this.setState({btnPRUNBaik:BtnStyles.btnBiasa, btnPRUNSedang:BtnStyles.btnSedang, btnPRUNBuruk:BtnStyles.btnBiasa});
        }else if(param == 'PRUN' && value == 'BURUK'){
            this.setState({btnPRUNBaik:BtnStyles.btnBiasa, btnPRUNSedang:BtnStyles.btnBiasa, btnPRUNBuruk:BtnStyles.btnBuruk});
        }else if(param == 'TIPA' && value == 'BAIK'){
            this.setState({btnTIPABaik:BtnStyles.btnBaik, btnTIPASedang:BtnStyles.btnBiasa, btnTIPABuruk:BtnStyles.btnBiasa});
        }else if(param == 'TIPA' && value == 'SEDANG'){
            this.setState({btnTIPABaik:BtnStyles.btnBiasa, btnTIPASedang:BtnStyles.btnSedang, btnTIPABuruk:BtnStyles.btnBiasa});
        }else if(param == 'TIPA' && value == 'BURUK'){
            this.setState({btnTIPABaik:BtnStyles.btnBiasa, btnTIPASedang:BtnStyles.btnBiasa, btnTIPABuruk:BtnStyles.btnBuruk});
        }else if(param == 'PENABUR' && value == 'BAIK'){
            this.setState({btnPENABURBaik:BtnStyles.btnBaik, btnPENABURSedang:BtnStyles.btnBiasa, btnPENABURBuruk:BtnStyles.btnBiasa});
        }else if(param == 'PENABUR' && value == 'SEDANG'){
            this.setState({btnPENABURBaik:BtnStyles.btnBiasa, btnPENABURSedang:BtnStyles.btnSedang, btnPENABURBuruk:BtnStyles.btnBiasa});
        }else if(param == 'PENABUR' && value == 'BURUK'){
            this.setState({btnPENABURBaik:BtnStyles.btnBiasa, btnPENABURSedang:BtnStyles.btnBiasa, btnPENABURBuruk:BtnStyles.btnBuruk});
        }else if(param == 'PUPUK' && value == 'BAIK'){
            this.setState({btnPUPUKBaik:BtnStyles.btnBaik, btnPUPUKSedang:BtnStyles.btnBiasa, btnPUPUKBuruk:BtnStyles.btnBiasa});
        }else if(param == 'PUPUK' && value == 'SEDANG'){
            this.setState({btnPUPUKBaik:BtnStyles.btnBiasa, btnPUPUKSedang:BtnStyles.btnSedang, btnPUPUKBuruk:BtnStyles.btnBiasa});
        }else if(param == 'PUPUK' && value == 'BURUK'){
            this.setState({btnPUPUKBaik:BtnStyles.btnBiasa, btnPUPUKSedang:BtnStyles.btnBiasa, btnPUPUKBuruk:BtnStyles.btnBuruk});
        }
    }
    

    onSlideRight = () => {
        //perform Action on slide success.
        // TaskServices.saveData('TR_BLOCK_INSPECTION_D', this.state.dataModel)   
        this.props.navigation.navigate('TakePhotoSelfie'); 
        // this.props.navigation.navigate('TakePhotoSelfie', {data: this.state.order})
    };

    render(){

        return(            
            <ScrollView style={styles.mainContainer}>

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
                        <View style={[styles.stepperNumber,{backgroundColor:Colors.brand}]}>
                            <Text style={styles.stepperNumberText}>2</Text>
                        </View>
                        <Text style={[Fonts.style.caption,{paddingLeft: 3,color:Colors.brand}]}>Kondisi Baris</Text>
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
                            <Text style={styles.stepperNumberText}>2</Text>
                        </View>
                        <Text style={[Fonts.style.caption,{paddingLeft: 3,color:Colors.textSecondary}]}>Summary</Text>
                    </View>
                </View>
                
                {/*LABEL*/}
                <View style={styles.containerLabel}>
                    <View style={{flex:2}}>

                    </View>
                    <View style={{flex:7}}>
                        <Text style={{fontSize:12}}>Diujung Baris</Text>
                        <Text style={{fontSize:10, color:'grey'}}>Ini untuk kamu input nilai baris.</Text>
                    </View>
                </View>

                {/*border*/}
                <View style={{height:10, backgroundColor:'#F5F5F5', marginTop:10}}/>
                

                {/*INPUT*/}
                <View style={{backgroundColor:'white', padding:20}}>
                    <Text>Perawatan</Text>
                    <View style={{height: 1, backgroundColor:'#989898', marginBottom:5, marginTop:5}}/>

                    <View style={{marginTop:15}}>
                        <Text style={{color:'grey'}}>Piringan</Text>
                        <View style={{flexDirection:'row', marginTop:10}}>
                            <TouchableOpacity style={this.state.btnPiringanBaik}
                                onPress={() => this.changeColor('PIRINGAN','BAIK')}>
                                <Text style={styles.buttonText}>Baik</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.btnPiringanSedang}
                                onPress={() => this.changeColor('PIRINGAN','SEDANG')}>
                                <Text style={styles.buttonText}>Sedang</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.btnPiringanBuruk}
                                onPress={() => this.changeColor('PIRINGAN','BURUK')}>
                                <Text style={styles.buttonText}>Buruk</Text>
                            </TouchableOpacity>
                        </View>                            
                    </View>

                    <View style={{marginTop:15}}>
                        <Text style={{color:'grey'}}>Pasar Pikul</Text>
                        <View style={{flexDirection:'row',marginTop:10}}>
                            <TouchableOpacity style={this.state.btnSarKulBaik}
                                onPress={() => this.changeColor('SARKUL','BAIK')}>
                                <Text style={styles.buttonText}>Baik</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.btnSarKulSedang}
                                onPress={() => this.changeColor('SARKUL','SEDANG')}>
                                <Text style={styles.buttonText}>Sedang</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.btnSarKulBuruk}
                                onPress={() => this.changeColor('SARKUL','BURUK')}>
                                <Text style={styles.buttonText}>Buruk</Text>
                            </TouchableOpacity>
                        </View>                            
                    </View>

                    {/* <SwitchSelector options={options} initial={0} borderWidth={2} borderColor={Colors.brand} onPress={value => console.log(`Call onPress with value: ${value}`)} /> */}

                    <View style={{marginTop:15}}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <Text style={{color:'grey'}}>TPH</Text>
                            <Switch
                                onValueChange={(value) => this.setState({switchTPH:value})}
                                style={{marginBottom: 10, position:'absolute', right:0}}
                                value={this.state.switchTPH} />
                        </View>
                        
                        {this.state.switchTPH &&
                            <View style={{flexDirection:'row', marginTop:10}}>
                                <TouchableOpacity style={this.state.btnTPHBaik}
                                    onPress={() => this.changeColor('TPH','BAIK')}>
                                    <Text style={styles.buttonText}>Baik</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.btnTPHSedang}
                                    onPress={() => this.changeColor('TPH','SEDANG')}>
                                    <Text style={styles.buttonText}>Sedang</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.btnTPHBuruk}
                                    onPress={() => this.changeColor('TPH','BURUK')}>
                                    <Text style={styles.buttonText}>Buruk</Text>
                                </TouchableOpacity>
                            </View>   
                        }                        
                    </View>

                    <View style={{marginTop:15}}>
                        <Text style={{color:'grey'}}>Gawangan</Text>
                        <View style={{flexDirection:'row',marginTop:10}}>
                            <TouchableOpacity style={this.state.btnGWGBaik}
                                onPress={() => this.changeColor('GWG','BAIK')}>
                                <Text style={styles.buttonText}>Baik</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.btnGWGSedang}
                                onPress={() => this.changeColor('GWG','SEDANG')}>
                                <Text style={styles.buttonText}>Sedang</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.btnGWGBuruk}
                                onPress={() => this.changeColor('GWG','BURUK')}>
                                <Text style={styles.buttonText}>Buruk</Text>
                            </TouchableOpacity>
                        </View>                           
                    </View>

                    <View style={{marginTop:15}}>
                        <Text style={{color:'grey'}}>Prunning</Text>
                        <View style={{flexDirection:'row',marginTop:10}}>
                            <TouchableOpacity style={this.state.btnPRUNBaik}
                                onPress={() => this.changeColor('PRUN','BAIK')}>
                                <Text style={styles.buttonText}>Baik</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.btnPRUNSedang}
                                onPress={() => this.changeColor('PRUN','SEDANG')}>
                                <Text style={styles.buttonText}>Sedang</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.btnPRUNBuruk}
                                onPress={() => this.changeColor('PRUN','BURUK')}>
                                <Text style={styles.buttonText}>Buruk</Text>
                            </TouchableOpacity>
                        </View>                        
                    </View>

                    <View style={{marginTop:15}}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <Text style={{color:'grey'}}>Titi Panen</Text>
                            <Switch
                                onValueChange={(value) => this.setState({switchTIPA:value})}
                                style={{marginBottom: 10, position:'absolute', right:0}}
                                value={this.state.switchTIPA} />
                        </View>

                        {this.state.switchTIPA &&                        
                            <View style={{flexDirection:'row', marginTop:10}}>
                                <TouchableOpacity style={this.state.btnTIPABaik}
                                    onPress={() => this.changeColor('TIPA','BAIK')}>
                                    <Text style={styles.buttonText}>Baik</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.btnTIPASedang}
                                    onPress={() => this.changeColor('TIPA','SEDANG')}>
                                    <Text style={styles.buttonText}>Sedang</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.btnTIPABuruk}
                                    onPress={() => this.changeColor('TIPA','BURUK')}>
                                    <Text style={styles.buttonText}>Buruk</Text>
                                </TouchableOpacity>
                            </View>
                        }                          
                    </View>
                </View>

                
                {/*border*/}
                <View style={{height:10, backgroundColor:'#F5F5F5', marginTop:10}}/>

                <View style={{backgroundColor:'white', padding:20}}>
                    <Text>Pemupukan</Text>
                    <View style={{height: 1, backgroundColor:'#989898', marginBottom:5, marginTop:5}}/>

                    <View style={{marginTop:15}}>
                        <Text style={{color:'grey'}}>Sistem Penaburan</Text>
                        <View style={{flexDirection:'row', marginTop:10}}>
                            <TouchableOpacity style={this.state.btnPENABURBaik}
                                onPress={() => this.changeColor('PENABUR','BAIK')}>
                                <Text style={styles.buttonText}>Baik</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.btnPENABURSedang}
                                onPress={() => this.changeColor('PENABUR','SEDANG')}>
                                <Text style={styles.buttonText}>Sedang</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.btnPENABURBuruk}
                                onPress={() => this.changeColor('PENABUR','BURUK')}>
                                <Text style={styles.buttonText}>Buruk</Text>
                            </TouchableOpacity>
                        </View>                           
                    </View>

                    <View style={{marginTop:15}}>
                        <Text style={{color:'grey'}}>Kondisi Pupuk</Text>
                        <View style={{flexDirection:'row', marginTop:10}}>
                            <TouchableOpacity style={this.state.btnPUPUKBaik}
                                onPress={() => this.changeColor('PUPUK','BAIK')}>
                                <Text style={styles.buttonText}>Baik</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.btnPUPUKSedang}
                                onPress={() => this.changeColor('PUPUK','SEDANG')}>
                                <Text style={styles.buttonText}>Sedang</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.btnPUPUKBuruk}
                                onPress={() => this.changeColor('PUPUK','BURUK')}>
                                <Text style={styles.buttonText}>Buruk</Text>
                            </TouchableOpacity>
                        </View>                            
                    </View>
                </View>

                {/*SLIDER*/}

                <View style={{padding:10, alignItems:'center', marginTop:30}}>
                    <RNSlidingButton
                        style={styles.buttonSlide}
                        height={45}
                        onSlidingSuccess={this.onSlideRight}
                        slideDirection={SlideDirection.RIGHT}>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={[styles.bubble, styles.tumbButtonSlide] } onPress={()=>{}}>
                                <Icon name={"chevron-right"}  size={20} color="white" />
                            </TouchableOpacity>
                            <Text numberOfLines={1} style={[styles.titleText,{alignItems:'center'}]}>
                                Selesai Baris Ini
                            </Text>
                        </View>
                        </RNSlidingButton>
                </View>
                

                {/*CIRCLE*/}
                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent: 'center', marginTop:20, marginBottom:20}}>
                    <TouchableOpacity style={styles.cicle} onPress={()=>{}}>
                        {/* <Icon name={"chevron-left"}  size={10} color="white" /> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.cicle, {marginLeft:10}]} onPress={()=>{}}>
                        {/* <Icon name={"chevron-right"}  size={10} color="white" /> */}
                    </TouchableOpacity>
                </View>           
                    
            </ScrollView>
        )
    }
}

export default KondisiBaris2Redesign;

const styles = {

    mainContainer:{
        backgroundColor:'white',
        flex:1
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
    
    containerLabel : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },  
    txtLabel: {
        flex:3,
        color: 'grey',
        fontSize: 15,
        
    },
    containerInput: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        
    },
    cicle:{
        borderWidth:3,
        borderColor:'#C8C8C8',
        alignItems:'center',
        justifyContent:'center',
        width:30,
        height:30,
        backgroundColor: '#D8D8D8',
        borderRadius:100,
    },   
    button: {
        width:100,
        backgroundColor: '#DCDCDC',
        borderRadius: 25, 
        margin:5,  
        padding:10 ,
        alignSelf:'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize:15,
        color:'#ffffff',
        textAlign:'center'
    },
    buttonSlide: {
        width: 250,
        borderRadius: 20,
        backgroundColor: '#DCDCDC',
    },
    tumbButtonSlide:{
        width: 55,
        height:45,
        borderRadius: 20,
        borderWidth:1,
        borderColor:'#C8C8C8',
        backgroundColor: Colors.tintColor,
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
}