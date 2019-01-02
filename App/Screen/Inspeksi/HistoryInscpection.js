import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import CardView from 'react-native-cardview';
import {Card,CardItem} from 'native-base';
import Colors from '../../Constant/Colors';
import Taskservice from '../../Database/TaskServices'
import { NavigationActions, StackActions  } from 'react-navigation';
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

  renderList = (data, index) => {
    const nav = this.props.navigation
    let status = '';
    if (data.STATUS_SYNC == 'N'){
      status = 'Belum Dikirim'
    }else{
      status = 'Sudah Terkirim'
    }

    let color = this.getColor(data.INSPECTION_RESULT);
    
    let dataImage = Taskservice.findBy2('TR_IMAGE', 'BLOCK_INSPECTION_CODE', data.BLOCK_INSPECTION_CODE);
    let imgName = dataImage.IMAGE_NAME

    let path = `${FILE_PREFIX}${RNFS.ExternalDirectoryPath}/Photo/Inspeksi/Baris/${imgName}`;
    // console.log(path);
    // alert(path)
    // if(dataImage.length > 0){
    //   path = `${FILE_PREFIX}${dataImage.IMAGE_PATH}/${dataImage.IMAGE_NAME}`
    // }
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
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{data.WERKS}</Text>
                <Text style={{ fontSize: 12 }}>{data.BLOCK_CODE.toLocaleUpperCase()}</Text>
                <Text style={{ fontSize: 12 }}>{data.INSPECTION_DATE}</Text>
                <Text style={{ fontSize: 12, color: 'red' }}>{status}</Text>
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

  getColor(param){
    switch(param){
      case 'A':
        return Colors.brand;
      case 'B':
        return '#ff7b25';
      case 'C':
        return '#feb236';
      case 'F':
        return 'red';
      case 'string':
        return '#C8C8C8'
      default:
        return '#C8C8C8';
    }
  }

  actionButtonClick(data) {  
    this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'DetailHistoryInspeksi', params: { data: data }}));
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