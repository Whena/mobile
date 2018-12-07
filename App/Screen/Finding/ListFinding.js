import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import R from 'ramda'
import ActionButton from 'react-native-action-button'
import Colors from '../../Constant/Colors'
import Dash from 'react-native-dash'
import Icon from 'react-native-vector-icons'
import TaskServices from '../../Database/TaskServices'

export default class ListFinding extends Component {

  constructor(props) {
    super(props);

    var data = [1, 2, 3, 4, 5]
    this.state = {
      data,
      refreshing: false
    }
  }

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
    title: 'Temuan',
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

  actionButtonClick() {
    this.props.navigation.navigate('FindingFormNavigator')
  }

  renderList(nav) {
    const Row = item => (
      <TouchableOpacity
        onPress={() => { nav.navigate('DetailFinding') }}
      >
        <View style={{ height: 120, width: 120, marginLeft: 16 }}>
          <Image style={{ alignItems: 'stretch', width: 120, height: 120, borderRadius: 10 }} source={require('../../Images/forest.jpg')}></Image>

          <View style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: 'rgba(244, 131, 65, 0.7)', width: 120, padding: 5, position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 10, color: 'white' }}>Gawi Inti A-001/A01</Text>
          </View>
        </View>
      </TouchableOpacity>
    );

    return R.map(Row, this.state.data)
  }

  onResume() {
		alert(JSON.stringify(TaskServices.getAllData('TR_FINDING')));
	}

  render() {
    const nav = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }} >
          <Text style={{ fontSize: 16, fontWeight: 'bold', paddingHorizontal: 16 }}>
            Lewat
        </Text>
          <Dash
            dashColor={'#ccc'}
            dashThickness={1}
            dashGap={5}
            style={{
              height: 1, marginLeft: 16, marginRight: 16, marginTop: 10
            }} />

          <View style={{ marginTop: 16, height: 120 }}>
            <ScrollView contentContainerStyle={{ paddingRight: 16 }} horizontal={true} showsHorizontalScrollIndicator={false}>
              {this.renderList(nav)}
            </ScrollView >
          </View>

          <View
            style={{ marginBottom: 16, marginTop: 16, backgroundColor: '#ccc', height: 10 }}
          />

          <Text style={{ fontSize: 16, fontWeight: 'bold', paddingHorizontal: 16 }}>
            5 Hari Lagi
        </Text>

          <Dash
            dashColor={'#ccc'}
            dashThickness={1}
            dashGap={5}
            style={{
              height: 1, marginLeft: 16, marginRight: 16, marginTop: 10
            }} />

          <View style={{ marginTop: 16, height: 120 }}>
            <ScrollView contentContainerStyle={{ paddingRight: 16 }} horizontal={true} showsHorizontalScrollIndicator={false}>
              {this.renderList(nav)}
            </ScrollView >
          </View>
        </ScrollView>

        <ActionButton style={{ marginEnd: -10, marginBottom: -10 }}
          buttonColor={Colors.tintColor}
          onPress={() => { this.actionButtonClick() }}>
          <Icon name="pen" style={styles.actionButtonIcon} />
        </ActionButton>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#fff'
  },
  ActionButtonStyle: {
    color: Colors.tintColor,
    backgroundColor: Colors.tintColor
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
});
