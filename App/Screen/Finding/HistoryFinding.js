import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import TaskServices from '../../Database/TaskServices'
import { getFormatDate } from '../../Lib/Utils'
import moment from 'moment'



export default class HistoryFinding extends Component {
  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
      data: []
    }
  }

  willFocus = this.props.navigation.addListener(
    'willFocus',
    () => {
      this._initData()
    }
  )

  _initData() {
    var data = TaskServices.getAllData('TR_FINDING');
    this.setState({ data })
  }

  componentWillUnmount() {
    this.willFocus.remove()
  }

  getCategoryName = (categoryCode) => {
    try {
      let data = TaskServices.findBy2('TR_CATEGORY', 'CATEGORY_CODE', categoryCode);
      return data.CATEGORY_NAME;
    } catch (error) {
      return ''
    }
  }

  getColor(param) {
    switch (param) {
      case 'SELESAI':
        return 'rgba(35, 144, 35, 0.7)';
      case 'SEDANG DIPROSES':
        return 'rgba(254, 178, 54, 0.7)';
      case 'BARU':
        return 'rgba(255, 77, 77, 0.7)';
      default:
        return '#ff7b25';
    }
  }

  _renderItem = item => {
    const nav = this.props.navigation
    const image = TaskServices.findBy2('TR_IMAGE_FINDING', 'TR_CODE', item.FINDING_CODE)
    const BLOCK_NAME = TaskServices.findBy2('TM_BLOCK', 'BLOCK_CODE', item.BLOCK_CODE)
    const MATURITY_STATUS = TaskServices.findBy2('TM_LAND_USE', 'BLOCK_CODE', item.BLOCK_CODE)
    const EST_NAME = TaskServices.findBy2('TM_EST', 'WERKS', item.WERKS)

    return (
      <TouchableOpacity
        style={styles.sectionCardView}
        onPress={() => { nav.navigate('DetailFinding', { ID: item.FINDING_CODE }) }}
      >
        {/* source={{ uri: "file://" + image.IMAGE_PATH_LOCAL }} */}
        <Image style={{ alignItems: 'stretch', width: 65, height: 65, borderRadius: 10 }} source={require('../../Images/background.png')} />
        <View style={styles.sectionDesc} >
          <Text style={{ fontSize: 12, color: 'black' }}>Lokasi : <Text style={{ color: 'grey' }}>{BLOCK_NAME.BLOCK_NAME}/{MATURITY_STATUS.MATURITY_STATUS}/{EST_NAME.EST_NAME}</Text></Text>
          <Text style={{ fontSize: 12, color: 'black' }}>Tanggal dibuat : <Text style={{ color: 'grey' }}>{item.INSERT_TIME}</Text></Text>
          <Text style={{ fontSize: 12, color: 'black' }}>Kategori : <Text style={{ color: 'grey' }}>{this.getCategoryName(item.FINDING_CATEGORY)}</Text ></Text>
          <Text style={{ fontSize: 12, color: 'black' }}>Status : <Text style={{ color: this.getColor(item.STATUS) }}>{item.STATUS}</Text ></Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const nav = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <View style={{ paddingTop: 4, paddingRight: 16, paddingLeft: 16, paddingBottom: 16 }}>
          <View style={{ marginTop: 12 }}>
            {this.state.data.map(this._renderItem)}
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