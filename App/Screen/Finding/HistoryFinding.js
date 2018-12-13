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
    var data = TaskServices.findBy('TR_FINDING', 'PROGRESS', 100)

    this.setState({ data })
  }

  componentWillUnmount() {
    this.willFocus.remove()
  }



  _renderItem = item => {
    const nav = this.props.navigation
    const image = TaskServices.findBy2('TR_IMAGE_FINDING', 'TR_CODE', item.FINDING_CODE)
    const category = TaskServices.findBy2('TR_CATEGORY', '_id', item.FINDING_CATEGORY)

    return (
      <TouchableOpacity
        style={styles.sectionCardView}
        onPress={() => { nav.navigate('DetailFinding', { ID: item.FINDING_CODE }) }}
      >
        <Image style={{ alignItems: 'stretch', width: 65, height: 65, borderRadius: 10 }} source={{ uri: "file://" + image.IMAGE_PATH }} />
        <View style={styles.sectionDesc} >
          <Text style={{ fontSize: 12, color: 'black' }}>Lokasi : <Text style={{ color: 'grey' }}>{item.BLOCK_CODE}</Text></Text>
          <Text style={{ fontSize: 12, color: 'black' }}>Tanggal dibuat : <Text style={{ color: 'grey' }}>{item.INSERT_TIME}</Text></Text>
          <Text style={{ fontSize: 12, color: 'black' }}>Kategori : <Text style={{ color: 'grey' }}>{category.CATEGORY_NAME}</Text ></Text>
          <Text style={{ fontSize: 12, color: 'black' }}>Status : <Text style={{ color: 'green' }}>Selesai</Text ></Text>
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