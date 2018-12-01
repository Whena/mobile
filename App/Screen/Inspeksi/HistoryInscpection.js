import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import CardView from 'react-native-cardview';

export default class HistoryInspection extends Component {

  render() {
    return (
      <ScrollView style={styles.container}>

        <View style={{ marginTop: 12 }}>
          <CardView cardElevation={5} cardMaxElevation={5} cornerRadius={5}>
            <View style={styles.sectionCardView}>
              <View style={{ flexDirection: 'row', height: 120 }} >
                <View style={{ alignItems: 'stretch', width: 8, backgroundColor: 'red' }} />
                <Image style={{ alignItems: 'stretch', width: 120 }} source={require('../../Images/background.png')}></Image>
              </View>
              <View style={styles.sectionDesc} >
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>GAWI INTI - 1</Text>
                <Text style={{ fontSize: 12 }}>A-001/A01</Text>
                <Text style={{ fontSize: 12 }}>01 Nov 2018, 10.56</Text>
                <Text style={{ fontSize: 12, color: 'grey' }}>Sudah Terkirim</Text>
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.textValue}>A</Text>
              </View>
            </View>
          </CardView>
        </View>

        <View style={{ marginTop: 12 }}>
          <CardView cardElevation={5} cardMaxElevation={5} cornerRadius={5}>
            <View style={styles.sectionCardView}>
              <View style={{ flexDirection: 'row', height: 120 }} >
                <View style={{ alignItems: 'stretch', width: 8, backgroundColor: 'yellow' }} />
                <Image style={{ alignItems: 'stretch', width: 120 }} source={require('../../Images/background.png')}></Image>
              </View>
              <View style={styles.sectionDesc} >
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>GAWI INTI - 1</Text>
                <Text style={{ fontSize: 12 }}>B-001/A01</Text>
                <Text style={{ fontSize: 12 }}>01 Nov 2018, 10.56</Text>
                <Text style={{ fontSize: 12, color: 'red' }}>Belum Terkirim</Text>
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.textValue}>B</Text>
              </View>
            </View>
          </CardView>
        </View>

        <View style={{ marginTop: 12 }}>
          <CardView cardElevation={5} cardMaxElevation={5} cornerRadius={5}>
            <View style={styles.sectionCardView}>
              <View style={{ flexDirection: 'row', height: 120 }} >
                <View style={{ alignItems: 'stretch', width: 8, backgroundColor: 'green' }} />
                <Image style={{ alignItems: 'stretch', width: 120 }} source={require('../../Images/background.png')}></Image>
              </View>
              <View style={styles.sectionDesc} >
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>GAWI INTI - 1</Text>
                <Text style={{ fontSize: 12 }}>C-001/A01</Text>
                <Text style={{ fontSize: 12 }}>01 Nov 2018, 10.56</Text>
                <Text style={{ fontSize: 12, color: 'grey' }}>Sudah Terkirim</Text>
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.textValue}>C</Text>
              </View>
            </View>
          </CardView>
        </View>

      </ScrollView >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  }
});