import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import Colors from '../../Constant/Colors'
import InspectionNavigator from './InspectionNavigator'

export default class InspectionScreen extends Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: Colors.tintColor
    },
    headerTitleStyle: {
      textAlign: "center",
      flex: 1,
      fontSize: 18,
      fontWeight: '400',
      marginHorizontal: 12
    },
    title: 'Inspeksi',
    headerTintColor: '#fff',
    headerRight: (
      <TouchableOpacity onPress={() => alert('Underconstruc')}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingRight: 12 }}>
          <Image style={{ width: 28, height: 28 }} source={require('../../Images/icon/ic_inbox.png')} />
        </View>
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity onPress={() => alert('This is a button!')}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 12 }}>
          <Image style={{ width: 28, height: 28 }} source={require('../../Images/icon/ic_sync.png')} />
        </View>
      </TouchableOpacity>
    )
  };

  render() {
    return (
      <InspectionNavigator />
    )
  }
}