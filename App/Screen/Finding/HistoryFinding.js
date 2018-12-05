import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import R from 'ramda';

export default class HistoryFinding extends Component {
  constructor(props) {
    super(props)

    var lokasi = ["GAWI INTI 1-A-A01/001", "GAWI INTI 1-A-A01/001", "GAWI INTI 1-A-A02/002"]

    this.state = {
      lokasi,
      refreshing: false
    }
  }

  renderList(nav) {
    const Row = item => (
      <TouchableOpacity
        style={styles.sectionCardView}	>
        <Image style={{ alignItems: 'stretch', width: 65, height: 65, borderRadius: 10 }} source={require('../../Images/background.png')}></Image>
        <View style={styles.sectionDesc} >
          <Text style={{ fontSize: 12, color: 'black' }}>Lokasi : <Text style={{ color: 'grey' }}>{item}</Text></Text>
          <Text style={{ fontSize: 12, color: 'black' }}>Tanggal dibuat : <Text style={{ color: 'grey' }}>05 Dec 2018</Text></Text>
          <Text style={{ fontSize: 12, color: 'black' }}>Kategori : <Text style={{ color: 'grey' }}>Pokok Abnormal</Text ></Text>
          <Text style={{ fontSize: 12, color: 'black' }}>Status : <Text style={{ color: 'green' }}>Baru</Text ></Text>
        </View>
      </TouchableOpacity>
    );

    return R.map(Row, this.state.lokasi)
  }

  render() {
    const nav = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <View style={{ paddingTop: 4, paddingRight: 16, paddingLeft: 16, paddingBottom: 16 }}>
          <View style={{ marginTop: 12 }}>
            {this.renderList(nav)}
          </View>
        </View>
      </ScrollView >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  sectionCardView: {
    alignItems: 'stretch',
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textValue: {
    fontSize: 28,
    fontWeight: '500',
    paddingRight: 24
  },
  sectionDesc: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 80,
    paddingTop: 7,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  }
});