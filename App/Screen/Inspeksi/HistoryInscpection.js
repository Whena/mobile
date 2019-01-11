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
  }

  componentDidMount(){   
    this.renderAll();
  }
  
  renderAll =()=>{
    let data = Taskservice.getAllData('TR_BLOCK_INSPECTION_H');
    if (data !== null){
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push(this.renderList(data[i], i));
      }
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
    let imgBaris = Taskservice.findBy('TR_IMAGE', 'BLOCK_INSPECTION_CODE', data.BLOCK_INSPECTION_CODE);
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
    if(data.INSPECTION_RESULT === 'string'){
      let imgBaris = Taskservice.findBy('TR_IMAGE', 'BLOCK_INSPECTION_CODE', data.BLOCK_INSPECTION_CODE);
      let imgSelfie = Taskservice.findBy('TR_IMAGE_SELFIE', 'BLOCK_INSPECTION_CODE', data.BLOCK_INSPECTION_CODE);
      let arrBaris = Taskservice.findBy('TR_BARIS_INSPECTION', 'BLOCK_INSPECTION_CODE', data.BLOCK_INSPECTION_CODE);

      let strInspecCode = data.BLOCK_INSPECTION_CODE;
      let arrCode = strInspecCode.split('-');

      let fotoBaris = imgBaris[imgBaris.length-1];
      let fotoSelfie = imgSelfie[imgSelfie.length-1];
      let dataBaris = arrBaris[arrBaris.length-1];

      let kondisiBaris1 = this.getBaris1(data.BLOCK_INSPECTION_CODE);
      let kondisiBaris2 = this.getBaris2(data.BLOCK_INSPECTION_CODE);
      let statusBlok = data.STATUS_BLOCK;
      let barisBlok = dataBaris.VALUE;

      let dataUsual = {
        NIK: arrCode[0],
        BA: arrCode[3],
        AFD: arrCode[4],
        BLOK: arrCode[5], 
        BARIS: barisBlok,
        BLOCK_INSPECTION_CODE: strInspecCode
      }

      var modelInspeksiH = {
        BLOCK_INSPECTION_CODE: data.BLOCK_INSPECTION_CODE,
        WERKS: data.WERKS,
        AFD_CODE: data.AFD_CODE,
        BLOCK_CODE: data.BLOCK_CODE,
        STATUS_BLOCK: data.STATUS_BLOCK,
        INSPECTION_DATE: data.INSPECTION_DATE, //getTodayDate('DD MMM YYYY HH:mm:ss'), //12 oct 2018 01:01:01
        INSPECTION_SCORE:'string',
        INSPECTION_RESULT:'string',
        STATUS_SYNC:'N',
        SYNC_TIME:'',
        START_INSPECTION: getTodayDate('YYYY-MM-DD HH:mm:ss'),
        END_INSPECTION: data.END_INSPECTION,
        LAT_START_INSPECTION: data.LAT_START_INSPECTION, //this.state.latitude.toString(),
        LONG_START_INSPECTION: data.LONG_START_INSPECTION,//this.state.longitude.toString(),
        LAT_END_INSPECTION: data.LAT_END_INSPECTION,
        LONG_END_INSPECTION: data.LONG_END_INSPECTION,
        ASSIGN_TO:''
    }

    // alert(JSON.stringify(modelInspeksiH))

    this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'KondisiBarisAkhir', params: { 
        fotoSelfie: fotoSelfie,
        inspeksiHeader: modelInspeksiH, 
        fotoBaris: fotoBaris,
        kondisiBaris1: kondisiBaris1, 
        kondisiBaris2: kondisiBaris2, 
        dataUsual: dataUsual,
        statusBlok:statusBlok,
        baris:barisBlok,
        from: 'history' }}));

    }else{
      this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'DetailHistoryInspeksi', params: { data: data }}));
    }
    
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