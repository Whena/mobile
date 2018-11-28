import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import R from 'ramda';

export default class HistoryFinding extends Component {
  constructor(props) {
    super(props)

    var history = ["Martin Sulaeman", "Ahmad Cherudin", "Nadirsyah Hosen"]

    this.state = {
      history,
			refreshing: false
    }
  }

  renderList(nav) {
    const Row = item => (
      <TouchableOpacity
        style={styles.sectionCardView}	>
        <Image style={{ alignItems: 'stretch', width: 65, height: 65, borderRadius: 10 }} source={require('../../Images/background.png')}></Image>
        <View style={styles.sectionDesc} >
          <Text style={{ fontSize: 12, color: 'grey' }}>No: 20 | Blok: 10</Text>
          <Text style={{ fontSize: 12, color: 'black' }}>Tugas Untuk: {item}</Text>
          <Text style={{ fontSize: 12, color: 'black' }}>Status: <Text style={{ color: 'green' }}>Selesai</Text ></Text>
        </View>
      </TouchableOpacity>
    );

    return R.map(Row, this.state.history)
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
    padding: 10,
  }
});