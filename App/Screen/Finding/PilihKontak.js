
'use strict';

import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, ListView, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import TaskService from '../../Database/TaskServices';
import Colors from '../../Constant/Colors'

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class PilihKontak extends Component {  

//   static propTypes = {
// 		onSelect: PropTypes.func,
//   };
  
//   // Defaults for props
// 	static defaultProps = {
// 		onSelect: () => {},
//   };

  constructor(props) {
    super(props);

    this.state = {
      searchedAdresses: [],
      adresses: [],
      user: null
    };
  };

  static navigationOptions = {
    headerStyle: {
        backgroundColor: Colors.tintColor
    },
    title: 'Pilih Kontak',
    headerTintColor: '#fff',
    headerTitleStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '400'
    },
};

  onSelect(user){
    this.props.navigation.state.params.changeContact(user);
    this.props.navigation.goBack();
  };

  componentDidMount(){
    let data = TaskService.getAllData('TR_CONTACT');
    let arr = [];
    for(var i=0; i<data.length; i++){
      arr.push({
          userAuth: data[i].USER_AUTH_CODE, 
          fullName: data[i].FULLNAME,   
          userRole: data[i].USER_ROLE,            
      });
      this.setState({adresses: arr, searchedAdresses: arr})
    }
  }

  searchedAdresses = (searchedText) => {
    var searchedAdresses = this.state.adresses.filter(function(adress) {
      return adress.fullName.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
    });
    this.setState({searchedAdresses: searchedAdresses});
  };

  renderAdress = (user) => {
    return (
      <View style={{flex:1, padding:5}}>
        <TouchableOpacity onPress = {()=>{this.onSelect(user)}}>
          <Text style={{ fontSize: 15, color: 'black' }}>{user.fullName}</Text>
					<Text style={{ fontSize: 13, color: 'grey', marginTop: 3 }}>{user.userRole}</Text>
        </TouchableOpacity>        
      </View>
    );
  };
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', backgroundColor: '#DDDDDD', padding:10}}>
          <TextInput 
            style={styles.textinput}
            onChangeText={this.searchedAdresses}
            placeholder="Cari nama" />
        </View>
        <View style={{marginTop: 5}}>
          <ListView 
            dataSource={ds.cloneWithRows(this.state.searchedAdresses)}
            renderRow={this.renderAdress} 
            renderSeparator={(sectionId, rowId)=><View key={rowId} style={styles.separator} />}
            />
        </View>
        
      </View>
    );
  };
}

export default PilihKontak;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },  
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
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