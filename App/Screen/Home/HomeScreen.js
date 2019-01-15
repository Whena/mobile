import React from 'react';
import { ImageBackground, StatusBar, TouchableOpacity, View, ScrollView, Image, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../Constant/Colors'
import homeData from '../../Data/home'
import TaskServices from '../../Database/TaskServices'
import CategoryAction from '../../Redux/CategoryRedux'
import ContactAction from '../../Redux/ContactRedux'
import RegionAction from '../../Redux/RegionRedux'
import Moment from 'moment';
var RNFS = require('react-native-fs');

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
      <TouchableOpacity onPress={() => navigation.navigate('Inbox')}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingRight: 12 }}>
          <Image style={{ width: 28, height: 28 }} source={require('../../Images/icon/ic_inbox.png')} />
        </View>
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('Sync')}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 12 }}>
          <Image style={{ width: 28, height: 28 }} source={require('../../Images/icon/ic_sync.png')} />
        </View>
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);

    this.state = {
      // user: TaskServices.getAllData('TR_LOGIN'),
      data: [],
      // images,
      // bukti
      thumnailImage: ''
    }
  }

  // loadAllImages() {
  //   let images = [];
  //   this.state.images.map(item => {
  //     var img = {
  //       path: item,
  //       status: before
  //     }
  //     images.push(img);
  //   })
  // }

  _getStatus() {
    if (this.state.data.PROGRESS == 100) {
      return "After"
    } else if (this.state.data.PROGRESS == 0) {
      return "Before"
    }
  }

  willFocus = this.props.navigation.addListener(
    'willFocus',
    () => {
      this._initData()
    }
  )

  _initData() {
    // var 
    var data = TaskServices.getAllData('TR_FINDING');
    this.setState({ data })
  }

  componentWillUnmount() {
    this.willFocus.remove()
  }

  async componentDidMount() {
    RNFS.copyFile(TaskServices.getPath(), 'file:///storage/emulated/0/MobileInspection/data.realm');
  }

  // getCategoryName = (categoryCode) =>{
  //   try {
  //       let data = TaskServices.findBy2('TR_CATEGORY', 'CATEGORY_CODE', categoryCode);
  //       return data.CATEGORY_NAME;            
  //   } catch (error) {
  //       return ''
  //   }
  // }

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

  alertItemName = (item) => {
    alert(item.STATUS)
  }

  _renderItem = item => {

    // const thumnailImage = "";

    const nav = this.props.navigation
    const image = TaskServices.findBy2('TR_IMAGE_FINDING', 'TR_CODE', item.FINDING_CODE);
    const name = TaskServices.findBy2('TR_CONTACT', 'USER_AUTH_CODE', item.ASSIGN_TO);

    const dt = item.DUE_DATE;
    Moment.locale();

    // if (image.IMAGE_PATH_LOCAL[""]) {
    //   this.setState({ thumnailImage: require('../../Images/dummy_image.png') });
    // } else {
    //   this.setState({ thumnailImage: image.IMAGE_PATH_LOCAL });
    // }

    // const path = uri: "file://" + image.IMAGE_PATH_LOCAL
    // var images = TaskServices.query('TR_IMAGE_FINDING', `TR_CODE='${item.FINDING_CODE}' AND STATUS_IMAGE='SEBELUM'`);
    // var bukti = TaskServices.query('TR_IMAGE_FINDING', `TR_CODE='${item.FINDING_CODE}' AND STATUS_IMAGE='SESUDAH'`);

    const BLOCK_NAME = TaskServices.findBy2('TM_BLOCK', 'BLOCK_CODE', item.BLOCK_CODE)
    const MATURITY_STATUS = TaskServices.findBy2('TM_LAND_USE', 'BLOCK_CODE', item.BLOCK_CODE)
    const EST_NAME = TaskServices.findBy2('TM_EST', 'WERKS', item.WERKS)
    return (
      <View>
        <TouchableOpacity style={{ marginTop: 12 }} key={item.id} onPress={() => { nav.navigate('DetailFinding', { ID: item.FINDING_CODE }) }}>
          <Card >
            <CardItem>
              <Left>
                <Thumbnail style={{ borderColor: 'grey', borderWidth: 0.5, height: 48, width: 48 }} source={require('../../Images/img_no_photo.jpg')} />
                <Body><Text>{name.FULLNAME}</Text></Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <ImageBackground source={require('../../Images/background.png')} style={{ height: 210, width: null, flex: 1, flexDirection: 'column-reverse' }} >
                <View style={{ alignContent: 'center', paddingTop: 2, paddingLeft: 12, flexDirection: 'row', height: 42, backgroundColor: this.getColor(item.STATUS) }} >
                  <Image style={{ marginTop: 2, height: 28, width: 28 }} source={require('../../Images/icon/ic_new_timeline.png')}></Image>
                  <Text style={{ marginLeft: 12, color: 'white' }}>{item.STATUS}</Text>
                </View>
              </ImageBackground>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{Moment(dt).format('LL')}</Text>
                <Text style={{ marginTop: 6 }}>Lokasi : {BLOCK_NAME.BLOCK_NAME}/{MATURITY_STATUS.MATURITY_STATUS}/{EST_NAME.EST_NAME}</Text>
                <Text style={{ marginTop: 6 }}>{item.FINDING_DESC}</Text>
              </Body>
            </CardItem>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }

  render() {

    // var A = realm.objects('test'); 
    // var myJSON = JSON.stringify(A); 

    return (
      <Container style={{ padding: 16 }}>
        <StatusBar hidden={false} backgroundColor={Colors.tintColor} barStyle="light-content" />
        <Content>
          <View style={styles.sectionTimeline}>
            <Text style={styles.textTimeline}>Timeline</Text>
            <View style={styles.rightSection}>
              <Text style={styles.textFilter}>Filter</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Filter')}>
                <Icons name="filter-list" size={28} style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {this.state.data.map(this._renderItem)}
          </ScrollView>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  sectionTimeline: {
    height: 48,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    categoryRequest: () => dispatch(CategoryAction.categoryRequest()),
    contactRequest: () => dispatch(ContactAction.contactRequest()),
    regionRequest: () => dispatch(RegionAction.regionRequest())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);