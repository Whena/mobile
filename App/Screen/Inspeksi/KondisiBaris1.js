import React, {Component} from 'react';
import {TouchableOpacity, Alert, TextInput } from 'react-native';
import {
	Container,
	Content,
	Body,
	Text,
    View,
	ListItem
} from 'native-base';
import Colors from '../../Constant/Colors'
import Fonts from '../../Constant/Fonts'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import R from 'ramda';
import TaskServices from '../../Database/TaskServices'
import {getTodayDate} from '../../Lib/Utils'


class KondisiBaris1 extends Component{

    constructor(props){
        super(props);
        
        // let params = props.navigation.state.params;
        // let order = R.clone(params.data);

        this.state = {        
            pokokPanen : '0',
            buahTinggal : '0',
            brondolPinggir :'0',
            brondolTPH : '0',
            pokokTdkPupuk: '0',
            dataModel: null,
            // order
            // intPokokPanen:0,
        }
    }

    componentDidMount(){
        // this.setParameter();
    }



    setParameter(){
        var blokInspectionCodeD = this.state.order.NIK+'-'+getTodayDate('YYYYMMDD')+'-'+this.state.order.BA+
        '-'+this.state.order.AFD+'-D-'+ (parseInt(TaskServices.getTotalData('TR_BLOCK_INSPECTION_D'))+1);         

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

    insertDB(){

        // var blokInspectionCodeD = this.state.order.NIK+'-'+getTodayDate('YYYYMMDD')+'-'+this.state.order.BA+
        // '-'+this.state.order.AFD+'-D-'+TaskServices.getTotalData('TR_BLOCK_INSPECTION_D')+1;         

        // var data = {
        //     BLOCK_INSPECTION_CODE_D: blokInspectionCodeD,
        //     BLOCK_INSPECTION_CODE: this.state.order.BLOCK_INSPECTION_CODE,
        //     CONTENT_INSPECTION_CODE:'CC0001',
        //     AREAL: this.state.order.BARIS,
        //     VALUE: this.state.pokokPanen, 
        //     STATUS_SYNC: 'N'
        // }
        // TaskServices.saveData('TR_BLOCK_INSPECTION_D', data);
        
        // data = {
        //     BLOCK_INSPECTION_CODE_D: blokInspectionCodeD,
        //     BLOCK_INSPECTION_CODE: this.state.order.BLOCK_INSPECTION_CODE,
        //     CONTENT_INSPECTION_CODE:'CC0002',
        //     AREAL: this.state.order.BARIS,
        //     VALUE: this.state.buahTinggal, 
        //     STATUS_SYNC: 'N'
        // }
        // TaskServices.saveData('TR_BLOCK_INSPECTION_D', data)

        // data = {
        //     BLOCK_INSPECTION_CODE_D: blokInspectionCodeD,
        //     BLOCK_INSPECTION_CODE: this.state.order.BLOCK_INSPECTION_CODE,
        //     CONTENT_INSPECTION_CODE:'CC0003',
        //     AREAL: this.state.order.BARIS,
        //     VALUE: this.state.brondolPinggir, 
        //     STATUS_SYNC: 'N'
        // }
        // TaskServices.saveData('TR_BLOCK_INSPECTION_D', data)

        // data = {
        //     BLOCK_INSPECTION_CODE_D: blokInspectionCodeD,
        //     BLOCK_INSPECTION_CODE: this.state.order.BLOCK_INSPECTION_CODE,
        //     CONTENT_INSPECTION_CODE:'CC0004',
        //     AREAL: this.state.order.BARIS,
        //     VALUE: this.state.brondolTPH, 
        //     STATUS_SYNC: 'N'
        // }
        // TaskServices.saveData('TR_BLOCK_INSPECTION_D', data)

        // data = {
        //     BLOCK_INSPECTION_CODE_D: blokInspectionCodeD,
        //     BLOCK_INSPECTION_CODE: this.state.order.BLOCK_INSPECTION_CODE,
        //     CONTENT_INSPECTION_CODE:'CC0005',
        //     AREAL: this.state.order.BARIS,
        //     VALUE: this.state.pokokTdkPupuk, 
        //     STATUS_SYNC: 'N'
        // }
        // TaskServices.saveData('TR_BLOCK_INSPECTION_D', data)
              
        // this.props.navigation.navigate('KondisiBaris2', {data: this.state.order});   
        this.props.navigation.navigate('KondisiBaris2');      
    }

    increaseNumber(param){
        var sum = 0;
        switch(param){
            case 'PP':
                sum = parseInt(this.state.pokokPanen)+1;
                this.setState({pokokPanen: sum.toString()})
                break;
            case 'BT':
                sum = parseInt(this.state.buahTinggal)+1;
                this.setState({buahTinggal: sum.toString()})
                break;
            case 'BP':
                sum = parseInt(this.state.brondolPinggir)+1;
                this.setState({brondolPinggir: sum.toString()})
                break;
            case 'BTP':
                sum = parseInt(this.state.brondolTPH)+1;
                this.setState({brondolTPH: sum.toString()})
                break;
            case 'PTP':
                sum = parseInt(this.state.pokokTdkPupuk)+1;
                this.setState({pokokTdkPupuk: sum.toString()})
                break;
            default:
                break;

        }
    }

    decreaseNumber(param){
        var sum = 0;
        switch(param){
            case 'PP':
                if(parseInt(this.state.pokokPanen)>0){
                    sum = parseInt(this.state.pokokPanen)-1;
                    this.setState({pokokPanen: sum.toString()})
                }                
                break;
            case 'BT':
                if(parseInt(this.state.buahTinggal)>0){
                    sum = parseInt(this.state.buahTinggal)-1;
                    this.setState({buahTinggal: sum.toString()})                        
                }                
                break;
            case 'BP':
                if(parseInt(this.state.brondolPinggir)>0){
                    sum = parseInt(this.state.brondolPinggir)-1;
                    this.setState({brondolPinggir: sum.toString()})       
                }                
                break;
            case 'BTP':
                if(parseInt(this.state.brondolTPH)>0){
                    sum = parseInt(this.state.brondolTPH)-1;
                    this.setState({brondolTPH: sum.toString()})       
                }
            case 'PTP':
                if(parseInt(this.state.pokokTdkPupuk)>0){
                    sum = parseInt(this.state.pokokTdkPupuk)-1;
                    this.setState({pokokTdkPupuk: sum.toString()})       
                }
                break;
            default:
                break;

        }
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
                            <Text style={styles.stepperNumberText}>3</Text>
                        </View>
                        <Text style={[Fonts.style.caption,{paddingLeft: 3,color:Colors.textSecondary}]}>Summary</Text>
                    </View>
                </View>
                
                {/*LABEL*/}
                <View style={styles.containerLabel}>
                    <View style={{flex:2, backgroundColor:Colors.brandSecondary}}>

                    </View>
                    <View style={{flex:7}}>
                        <Text style={{fontSize:12}}>Sambil Jalan</Text>
                        <Text style={{fontSize:10, color:'grey'}}>Kamu bisa input ini ketika berjalan disepanjang baris.</Text>
                    </View>
                </View>

                <View style={{height:10, backgroundColor:'#F5F5F5', marginTop:10}}/>

                {/*INPUT*/}
                <View style={{backgroundColor:'white'}}>                        
                    <View style={styles.containerLabel}>
                        <Text style={styles.txtLabel}>Pokok Panen</Text>
                        <View style={[styles.containerInput, {flex:5}]}>
                            <TouchableOpacity style={styles.btnMinus} onPress={()=>{this.decreaseNumber('PP')}}>
                                <Icon2 name={"minus"}  size={20} color="white" />
                            </TouchableOpacity>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                style={[styles.searchInput]}
                                value={this.state.pokokPanen}                                    
                                onChangeText={(pokokPanen) => { this.setState({ pokokPanen: pokokPanen }) }}/>
                            <TouchableOpacity style={styles.btnAdd} onPress={()=>{this.increaseNumber('PP')}}>
                                <Icon name={"add"}  size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerLabel}>
                        <Text style={styles.txtLabel}>Buah Tinggal</Text>
                        <View style={[styles.containerInput, {flex:5}]}>
                            <TouchableOpacity 
                                style={styles.btnMinus}
                                onPress={() => this.decreaseNumber('BT')} >
                                <Icon2 name={"minus"}  size={20} color="white" />
                            </TouchableOpacity>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                style={[styles.searchInput]}
                                value={this.state.buahTinggal}                                    
                                onChangeText={(buahTinggal) => { this.setState({ buahTinggal: buahTinggal }) }}/>
                            <TouchableOpacity 
                                style={styles.btnAdd}
                                onPress={() => this.increaseNumber('BT')}>
                                <Icon name={"add"}  size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerLabel}>
                        <Text style={styles.txtLabel}>Brodol di Pinggiran</Text>
                        <View style={[styles.containerInput, {flex:5}]}>
                            <TouchableOpacity style={styles.btnMinus}
                                onPress={()=>{this.decreaseNumber('BP')}}>
                                <Icon2 name={"minus"}  size={20} color="white" />
                            </TouchableOpacity>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                style={[styles.searchInput]}
                                value={this.state.brondolPinggir}                                    
                                onChangeText={(brondolPinggir) => { this.setState({ brondolPinggir: brondolPinggir }) }}/>
                            <TouchableOpacity style={styles.btnAdd} onPress={()=>{this.increaseNumber('BP')}}>
                                <Icon name={"add"}  size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerLabel}>
                        <Text style={[styles.txtLabel,{fontWeight:'300'}]}>Brondol di TPH</Text>
                        <View style={[styles.containerInput, {flex:5}]}>
                            <TouchableOpacity style={styles.btnMinus}
                                onPress={()=>{this.decreaseNumber('BTP')}}>
                                <Icon2 name={"minus"}  size={20} color="white" />
                            </TouchableOpacity>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                style={[styles.searchInput]}                                    
                                value={this.state.brondolTPH}                                    
                                onChangeText={(brondolTPH) => { this.setState({ brondolTPH: brondolTPH }) }}/>
                            <TouchableOpacity style={styles.btnAdd} onPress={()=>{this.increaseNumber('BTP')}}>
                                <Icon name={"add"}  size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerLabel}>
                        <Text style={[styles.txtLabel,{fontWeight:'300'}]}>Pokok Tidak di Pupuk</Text>
                        <View style={[styles.containerInput, {flex:5}]}>
                            <TouchableOpacity style={styles.btnMinus}
                                onPress={()=>{this.decreaseNumber('PTP')}}>
                                <Icon2 name={"minus"}  size={20} color="white" />
                            </TouchableOpacity>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                style={[styles.searchInput]}                                    
                                value={this.state.pokokTdkPupuk}                                    
                                onChangeText={(pokokTdkPupuk) => { this.setState({ pokokTdkPupuk: pokokTdkPupuk }) }}/>
                            <TouchableOpacity style={styles.btnAdd} onPress={()=>{this.increaseNumber('PTP')}}>
                                <Icon name={"add"}  size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/*CIRCLE*/}
                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.cicle} onPress={()=>{}}>
                        {/* <Icon name={"chevron-left"}  size={10} color="white" /> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.cicle, {marginLeft:10}]} onPress={()=>{this.insertDB()}}>
                        {/* <Icon name={"chevron-right"}  size={10} color="white" /> */}
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default KondisiBaris1;

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
    
    containerLabel : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft:20,
        paddingRight:20,
        marginTop:20
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
    btnMinus:{
        borderWidth:3,
        borderColor:'#cca300',
        alignItems:'center',
        justifyContent:'center',
        width:35,
        height:35,
        backgroundColor:'#e6b800',
        borderRadius:100,
            
    },
    btnAdd:{
        borderWidth:3,
        borderColor:'#00e639',
        alignItems:'center',
        justifyContent:'center',
        width:35,
        height:35,
        backgroundColor: Colors.brand,
        borderRadius:100,
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
    searchInput: {
        height: 40,
        padding: 10,
        marginRight: 5,
        marginLeft:5,
        flex: 1,
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#989898',
        color: 	'#808080',
        textAlign:'center'
    },
}