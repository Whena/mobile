import React from 'react';
import { View, StatusBar, Image, TouchableOpacity, StyleSheet, Text, ScrollView, Alert } from 'react-native';

import Colors from '../../Constant/Colors'
// import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import CardView from 'react-native-cardview';

import Icon from 'react-native-vector-icons/MaterialIcons'

class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
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
    title: 'Beranda',
    headerTintColor: '#fff',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('BuatInspeksi')}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingRight: 12 }}>
          <Image style={{ width: 28, height: 28 }} source={require('../../Images/icon/ic_inbox.png')} />
        </View>
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('BuatInspeksi')}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 12 }}>
          <Image style={{ width: 28, height: 28 }} source={require('../../Images/icon/ic_sync.png')} />
        </View>
      </TouchableOpacity>
    )
  });

  // constructor(props){
  //   super(props);
  //   const params = props.navigation.state.params;
    // if(params != null){
    //   Alert.alert(params.logout);
    // }
    
    // Alert.alert('params');
  // }

  // componentWillReceiveProps(newProps){
  //   // const { navigation } = this.newProps;
  //   const itemId = newProps.getParam('logout', 'N');
  //   Alert.alert(itemId)
  // }

  // componentDidMount(){
  //   const { navigation } = this.props;
  //   const itemId = navigation.getParam('logout', 'N');
  //   Alert.alert(itemId)
  // }

  render() {
    
    // var A = realm.objects('test'); 
    // var myJSON = JSON.stringify(A);
    return (
      <ScrollView style={styles.container}>
        <StatusBar hidden={false} backgroundColor={Colors.tintColor} barStyle="light-content" />
        <View style={styles.sectionTimeline}>
          <Text style={styles.textTimeline}>Timeline</Text>
          <View style={styles.rightSection}>
            <Text style={styles.textFilter}>Filter</Text>
            <TouchableOpacity>
              <Icon name="filter-list" size={28} style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionCardView}>
          <CardView cardElevation={5} cardMaxElevation={5} cornerRadius={10}>
            <View style={{ height: 64, flexDirection: 'row', padding: 12, alignItems: 'center' }}>
              <TouchableOpacity>
                <Image style={{ width: 36, height: 36, borderRadius: 50, marginRight: 12 }} source={require('../../Images/background.png')}></Image>
              </TouchableOpacity>
              <Text >Aminju Muhammad</Text>
            </View>
            <Image style={{ alignItems: 'stretch', height: 250, paddingRight: 50 }} source={require('../../Images/background.png')}></Image>
            <View style={{ padding: 16 }}>
              <Text style={{ color: 'grey', fontSize: 10 }}>25 Oktober 2018</Text>
              <Text style={{ color: 'black', fontSize: 14 }} >Lokasi : GAWI INTI-A-001/A01</Text>
              <Text >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at lorem eu neque mollis ornare. Quisque sodales velit tempus, eleifend massa eget, lobortis eros.</Text>
            </View>
          </CardView>
        </View>
        
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    flex: 1
  },
  sectionTimeline: {
    height: 48,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sectionCardView: {
    marginTop: 8,
    alignItems: 'stretch',
    height: 400,
    backgroundColor: 'white'
  },
  rightSection: {
    flexDirection: 'row'
  },
  containerHorizontal: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  textTimeline: {
    width: 120,
    fontSize: 20,
    color: 'black'
  },
  textFilter: {
    textAlign: 'center',
    fontSize: 16,
    color: 'grey'
  }
});

export default HomeScreen;