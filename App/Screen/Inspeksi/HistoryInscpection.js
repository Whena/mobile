import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import CardView from 'react-native-cardview';
import {Card,CardItem} from 'native-base';
import Colors from '../../Constant/Colors';
import Taskservice from '../../Database/TaskServices'
import { NavigationActions, StackActions  } from 'react-navigation';
import {getTodayDate} from '../../Lib/Utils'
import TaskServices from '../../Database/TaskServices';
var RNFS = require('react-native-fs');
const FILE_PREFIX = Platform.OS === "ios" ? "" : "file://";

export default class HistoryInspection extends Component {

  constructor(props){
    super(props);
    this.state = {      
      dataLogin: TaskServices.getAllData('TR_LOGIN'),
    }
  }

  componentDidMount(){   
    this.renderAll();
  }
  
  renderAll =()=>{    
    var dataSorted = TaskServices.getAllData('TR_BARIS_INSPECTION');
    let data = dataSorted.sorted('INSPECTION_DATE', true); //Taskservice.getAllData('TR_BLOCK_INSPECTION_H');
    if (data !== null){
      let arr = [];
      data.map((item,index) => {
        arr.push(this.renderList(item, index));
      })
      return <View>{arr}</View>;
    }
  }

  getEstateName(werks){
    try {
        let data = TaskServices.findBy2('TM_EST', 'WERKS', werks);
        return data.EST_NAME;
    } catch (error) {
        return '';
    }    
  }

  renderList = (data, index) => {
    let status = '', colorStatus = '';
    if (data.STATUS_SYNC == 'N'){
      status = 'Belum Dikirim'
      colorStatus = 'red';
    }else{
      status = 'Sudah Terkirim'
      colorStatus = Colors.brand
    }
    let color = this.getColor(data.INSPECTION_RESULT);    
    let imgBaris = Taskservice.findBy('TR_IMAGE', 'TR_CODE', data.BLOCK_INSPECTION_CODE);
    let imgName = imgBaris[0].IMAGE_NAME
    let path = `${FILE_PREFIX}${RNFS.ExternalDirectoryPath}/Photo/Inspeksi/Baris/${imgName}`;   

    
    let dataBlock = Taskservice.findBy2('TM_BLOCK', 'BLOCK_CODE', data.BLOCK_CODE);

    return(
      <TouchableOpacity 
        style={{ marginTop: 12 }} 
        onPress={()=> this.actionButtonClick(data)}
        key={index}>
          <Card style={[styles.cardContainer]}>
            <View style={styles.sectionCardView}>
              <View style={{ flexDirection: 'row', height: 120 }} >
                <Image style={{ alignItems: 'stretch', width: 100, borderRadius:10 }} source={{uri: path}}></Image>
              </View>
              <View style={styles.sectionDesc} >
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{this.getEstateName(dataBlock.WERKS)}</Text>
                <Text style={{ fontSize: 12 }}>{dataBlock.BLOCK_NAME}/{data.BLOCK_CODE.toLocaleUpperCase()}</Text>
                <Text style={{ fontSize: 12 }}>{data.INSPECTION_DATE}</Text>
                <Text style={{ fontSize: 12, color: colorStatus }}>{status}</Text>
              </View>
              <View style={{flexDirection:'row', height:120}}>
                <Text style={[styles.textValue,{marginTop: 40}]}>{data.INSPECTION_RESULT == 'string' ? '': data.INSPECTION_RESULT}</Text>
                <View style={{ alignItems: 'stretch', width: 8, backgroundColor: color, borderRadius:10 }} />
              </View>
            </View>
          </Card>
        </TouchableOpacity>
    );    
  }  

  getBaris1(blockInsCode){
    let arrCompBaris1 = ['CC0002', 'CC0003', 'CC0004', 'CC0005', 'CC0006'];
    let arrKondisiBaris1 = [];
    arrCompBaris1.map(item =>{
      var data = Taskservice.findByWithList('TR_BLOCK_INSPECTION_D', ['CONTENT_INSPECTION_CODE', 'BLOCK_INSPECTION_CODE'], [item, blockInsCode]);
      if(data.length > 0){
        let dataAkhir = data[data.length-1]
        arrKondisiBaris1.push(dataAkhir);
      }
    });
    return arrKondisiBaris1; 
    
  }

  getBaris2(blockInsCode){
    let arrCompBaris2 = ['CC0007', 'CC0008', 'CC0009', 'CC0010', 'CC0011', 'CC0012', 'CC0013', 'CC0014', 'CC0015', 'CC0016'];
    let arrKondisiBaris2 = [];
    arrCompBaris2.map(item =>{
      var data = Taskservice.findByWithList('TR_BLOCK_INSPECTION_D', ['CONTENT_INSPECTION_CODE', 'BLOCK_INSPECTION_CODE'], [item, blockInsCode]);
      if(data.length > 0){
        let dataAkhir = data[data.length-1]
        arrKondisiBaris2.push(dataAkhir);
      }
    });
    return arrKondisiBaris2; 
    
  }

  getColor(param){
    switch(param){
      case 'A':
        return Colors.brand;
      case 'B':
        return '#feb236';
      case 'C':
        return '#ff7b25';
      case 'F':
        return 'red';
      case 'string':
        return '#C8C8C8'
      default:
        return '#C8C8C8';
    }
  }

  actionButtonClick(data) {  
    if(data.INSPECTION_RESULT === ''){
      
      let dataBaris = Taskservice.findBy('TR_BLOCK_INSPECTION_H', 'ID_INSPECTION', data.ID_INSPECTION);
      if(dataBaris > 1){
        dataBaris = dataBaris[dataBaris.length-1]
      }else{
        dataBaris = dataBaris[0]
      }

      let modelInspeksiH = {
        BLOCK_INSPECTION_CODE: dataBaris.BLOCK_INSPECTION_CODE,
        ID_INSPECTION: dataBaris.ID_INSPECTION,
        WERKS: dataBaris.WERKS,
        AFD_CODE: dataBaris.AFD_CODE,
        BLOCK_CODE: dataBaris.BLOCK_CODE,
        AREAL: '',
        INSPECTION_TYPE: "PANEN",
        STATUS_BLOCK: dataBaris.STATUS_BLOCK,
        INSPECTION_DATE: data.INSPECTION_DATE,
        INSPECTION_SCORE: '',
        INSPECTION_RESULT: '',
        STATUS_SYNC: 'N',
        SYNC_TIME: '',
        START_INSPECTION: '',
        END_INSPECTION: '',
        LAT_START_INSPECTION: dataBaris.LAT_START_INSPECTION,
        LONG_START_INSPECTION: dataBaris.LONG_START_INSPECTION,
        LAT_END_INSPECTION: '',
        LONG_END_INSPECTION: '',
        INSERT_TIME: '', 
        INSERT_USER: '',
        TIME: dataBaris.TIME,
        DISTANCE: dataBaris.DISTANCE
      }

      var dataUsual = {
        USER_AUTH: this.state.dataLogin[0].USER_AUTH_CODE,
        BA: dataBaris.WERKS,
        AFD: dataBaris.AFD_CODE,
        BLOK: dataBaris.BLOCK_CODE, 
        BARIS: dataBaris.AREAL,
        ID_INSPECTION: dataBaris.ID_INSPECTION,
        BLOCK_INSPECTION_CODE: dataBaris.BLOCK_INSPECTION_CODE
        
      }

      let id = setInterval(()=> this.getLocation2(dataBaris.BLOCK_INSPECTION_CODE), 10000);
      this.setState({intervalId:id})

      this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'KondisiBarisAkhir', params: { 
        inspeksiHeader: modelInspeksiH, 
        statusBlok:dataBaris.STATUS_BLOCK,
        dataInspeksi: data,
        dataUsual: dataUsual,
        intervalId: id,
        from: 'history' }}));

    }else{
      this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'DetailHistoryInspeksi', params: { data: data }}));
    }
    
  }

  getLocation2(blokInsCode) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            var lat = parseFloat(position.coords.latitude);
            var lon = parseFloat(position.coords.longitude);
            this.insertTrackLokasi(blokInsCode, lat, lon)               
        },
        (error) => {
            // this.setState({ error: error.message, fetchingLocation: false })
            let message = error && error.message ? error.message : 'Terjadi kesalahan ketika mencari lokasi anda !';
            if (error && error.message == "No location provider available.") {
                message = "Mohon nyalakan GPS anda terlebih dahulu.";
            }
            // console.log(message);
        }, // go here if error while fetch location
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }, //enableHighAccuracy : aktif highaccuration , timeout : max time to getCurrentLocation, maximumAge : using last cache if not get real position
    );
  }

  insertTrackLokasi(blokInsCode, lat, lon){
    var trInsCode = `T${this.state.dataLogin[0].USER_AUTH_CODE}${getTodayDate('YYMMDDHHmmss')}`;
    var today = getTodayDate('YYYY-MM-DD HH:mm:ss');
    data = {
        TRACK_INSPECTION_CODE: trInsCode,
        BLOCK_INSPECTION_CODE: blokInsCode,
        DATE_TRACK: today,
        LAT_TRACK: lat.toString(),
        LONG_TRACK: lon.toString(),
        INSERT_USER: this.state.dataLogin[0].USER_AUTH_CODE,
        INSERT_TIME: today,
        STATUS_SYNC: 'N'
    }
    TaskService.saveData('TM_INSPECTION_TRACK', data)
    //alert('ok')
  }

  render() {
    return (  
      <ScrollView style={styles.container}>
        {this.renderAll()}     
      </ScrollView >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 4,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16,
  },
  sectionCardView: {
    alignItems: 'stretch',
    height: 120,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textValue: {
    fontSize: 28,
    fontWeight: '500',
    paddingRight: 24
  },
  sectionDesc: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 120,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 20
  },
  cardContainer: {
    flex: 1,
    padding:7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
});