import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Colors from '../../Constant/Colors'

export default class FindingScreen extends Component {

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
    title: 'EBCC Validasi',
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
      <View style={styles.container}>
        <Image source={require('../../Images/coming_soon.png')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    padding: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});