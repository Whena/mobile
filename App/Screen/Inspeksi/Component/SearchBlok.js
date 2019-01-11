
'use strict';

import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, ListView, TouchableOpacity } from 'react-native';
import TaskService from '../Database/TaskServices';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class SampleApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedAdresses: [],
      adresses: []
    };
  };

  static navigationOptions = {
    header: null
}

  componentDidMount(){
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
          werksAfdCode: data[i].WERKS_AFD_CODE, 
          werksAfdBlokCode: data[i].WERKS_AFD_BLOCK_CODE,
          statusBlok: statusBlok,
          compCode: data[i].COMP_CODE,
          allShow: `${data[i].BLOCK_NAME}/${statusBlok}/${estateName}`
    });
    this.setState({adresses: arr, searchedAdresses: arr})
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

  getEstateName(werks){
    try {
        let data = TaskService.findBy2('TM_EST', 'WERKS', werks);
        return data.EST_NAME;
    } catch (error) {
        return '';
    }    
  }

  searchedAdresses = (searchedText) => {
    var searchedAdresses = this.state.adresses.filter(function(adress) {
      return adress.allShow.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
    });
    this.setState({searchedAdresses: searchedAdresses});
  };

  renderBlok = (blok) => {
    return (
      <View style={{flex:1, padding:5}}>
        <TouchableOpacity onPress = {()=>{alert(blok.allShow)}}>
          <Text style = {{fontSize: 15,margin: 2}}>{blok.allShow}</Text>
        </TouchableOpacity>        
      </View>
    );
  };

  renderHeader = (blok) => {
    return(
        <View style={{flexDirection:'row', backgroundColor: '#DDDDDD', padding:10}}>
          <TextInput 
            style={styles.textinput}
            onChangeText={this.searchedAdresses}
            placeholder="Type your adress here" />
        </View>
    )
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={ds.cloneWithRows(this.state.searchedAdresses)}
        renderRow={this.renderBlok}
        renderSeparator={(sectionId, rowId)=><View key={rowId} style={styles.separator} />}
        renderHeader= {this.renderHeader}/>
      // <View style={styles.container}>
      //   <View style={{flexDirection:'row', marginTop: 60, backgroundColor: '#DDDDDD', padding:10}}>
      //     <TextInput 
      //       style={styles.textinput}
      //       onChangeText={this.searchedAdresses}
      //       placeholder="Ketik Blok yang kamu cari" />
      //   </View>
      //   <View style={{marginTop: 5}}>
      //     <ListView 
      //       style={{flex:1}}
      //       dataSource={ds.cloneWithRows(this.state.searchedAdresses)}
      //       renderRow={this.renderBlok} />
      //   </View>
        
      // </View>
    );
  };
}

export default SampleApp;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#FFFFFF',
  // },
  textinput: {
    flex:1,
    paddingLeft: 5,
    marginLeft:5,
    marginRight:5,
    height: 45,
    backgroundColor:'#f2f2f2',
    ...border
  }
});
const border = {
  borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: 3
};