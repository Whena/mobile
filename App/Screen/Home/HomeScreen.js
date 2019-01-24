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
import { changeFormatDate } from '../../Lib/Utils';
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
      this._changeFilterList();
    }
  )

  _initData() {
    // var 
    var dataSorted = TaskServices.getAllData('TR_FINDING');
    var data = dataSorted.sorted('INSERT_TIME', true);
    this.setState({ data })
  }

  componentWillUnmount() {
    this.willFocus.remove()
  }

  // componentWillMount(){
  //   this._initData()
  // }

  async componentDidMount() {
    this._changeFilterList();
    RNFS.copyFile(TaskServices.getPath(), 'file:///storage/emulated/0/MobileInspection/data.realm');

    var query = TaskServices.getAllData('TR_FINDING');
    console.log("TR_FINDING : " + JSON.stringify(query));
  }

  _changeFilterList = data => {
    console.log("Data Filter Home : " + JSON.stringify(data));
    if (data == undefined) {
      this._initData();
      console.log("Masuk Default")
    } else {
      this._initFilterData(data);
      console.log("Masuk Filter")
    }
  }

  _initFilterData(dataFilter) {
    console.log("Array Data Filter : " + JSON.stringify(dataFilter));
    dataFilter.map(item => {
      var query = TaskServices.getAllData('TR_FINDING');

      console.log("Data Filter Ba : " + item.ba);
      console.log("Data Filter Status : " + item.status);
      console.log("Data Filter Start Batas Waktu : " + item.stBatasWaktu);
      console.log("Data Filter End Batas Waktu : " + item.endBatasWaktu);

      // let oldContacts = realm.objects('Contact').filtered('age > 2');
      let ba = item.ba;
      let status = item.status;
      let stBatasWaktu = item.stBatasWaktu;
      let endBatasWaktu = item.endBatasWaktu.substring(0, 8) + '235959';

      let queryBa;
      if (ba == "Cari BA") {
        queryBa = ""
      } else {
        queryBa = "WERKS" + ' == \"' + ba + '\" ';
      }

      let queryStatus = "AND STATUS" + ' == \"' + status + '\" ';

      let queryAll = query.filtered(queryBa + queryStatus);
      console.log("Data Query : " + JSON.stringify(queryAll));

      // queryBa = query.filtered(`WERKS${" == "}${ba}${" AND STATUS"}${" == "}${status}`);
      // console.log("Data Query : " + JSON.stringify(queryBa));



      // let queryBatasWaktu;
      // if (ba == "Cari BA") {
      //   queryBa = ""
      // } else {
      //   queryBa = "AND WERKS" + ' == \"' + ba + '\" ';
      // }

      // let queryBatasWaktu;
      // if(status)

      // let queryBatasWaktu = "INSERT_TIME" + ' => \"' + stBatasWaktu + '\" ' + "AND INSERT_TIME" + ' <= \"' + endBatasWaktu + '\" ';

      // this.setState({ data });
    })
  }

  getColorBatasWaktu(param) {
    switch (param) {
      case 'Batas waktu belum ditentukan':
        return 'red';
      default:
        return '#000000';
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

  alertItemName = (item) => {
    alert(item.STATUS)
  }

  getCategoryName = (categoryCode) => {
    try {
      let data = TaskServices.findBy2('TR_CATEGORY', 'CATEGORY_CODE', categoryCode);
      return data.CATEGORY_NAME;
    } catch (error) {
      return ''
    }
  }

  _renderItem = (item, index) => {

    const nav = this.props.navigation
    const insert_user = TaskServices.findBy2('TR_CONTACT', 'USER_AUTH_CODE', item.INSERT_USER);
    const assign_to = TaskServices.findBy2('TR_CONTACT', 'USER_AUTH_CODE', item.ASSIGN_TO);
    const BLOCK_NAME = TaskServices.findBy2('TM_BLOCK', 'BLOCK_CODE', item.BLOCK_CODE)
    const MATURITY_STATUS = TaskServices.findBy2('TM_LAND_USE', 'BLOCK_CODE', item.BLOCK_CODE)
    const EST_NAME = TaskServices.findBy2('TM_EST', 'WERKS', item.WERKS)

    const dt = changeFormatDate("" + item.DUE_DATE, "YYYY-MM-DD hh-mm-ss");
    console.log('Date Time : ' + dt)
    Moment.locale();
    let batasWaktu;
    if (dt == 0) {
      batasWaktu = 'Batas waktu belum ditentukan';
    } else {
      batasWaktu = Moment(dt).format('LL');
    }


    const image = TaskServices.findBy2('TR_IMAGE', 'TR_CODE', item.FINDING_CODE);
    let sources;
    if (image == undefined) {
      sources = require('../../Images/background.png')
    } else {
      sources = { uri: "file://" + image.IMAGE_PATH_LOCAL }
    }

    return (
      <View key={index}>
        <TouchableOpacity style={{ marginTop: 12 }} key={item.id} onPress={() => { nav.navigate('DetailFinding', { ID: item.FINDING_CODE }) }}>
          <Card >
            <CardItem>
              <Left>
                <Thumbnail style={{ borderColor: 'grey', borderWidth: 0.5, height: 48, width: 48 }} source={require('../../Images/img_no_photo.jpg')} />
                <Body><Text>{insert_user.FULLNAME}</Text></Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <ImageBackground source={sources} style={{ height: 210, width: null, flex: 1, flexDirection: 'column-reverse' }} >
                <View style={{ alignContent: 'center', paddingTop: 2, paddingLeft: 12, flexDirection: 'row', height: 42, backgroundColor: this.getColor(item.STATUS) }} >
                  <Image style={{ marginTop: 2, height: 28, width: 28 }} source={require('../../Images/icon/ic_new_timeline.png')}></Image>
                  <Text style={{ marginLeft: 12, color: 'white' }}>{item.STATUS}</Text>
                </View>
              </ImageBackground>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Lokasi : {BLOCK_NAME.BLOCK_NAME}/{MATURITY_STATUS.MATURITY_STATUS}/{EST_NAME.EST_NAME}</Text>
                <Text style={{ marginTop: 6 }}>Kategori : {this.getCategoryName(item.FINDING_CATEGORY)}</Text>
                <Text style={{ marginTop: 6 }}>Ditugaskan kepada : {assign_to.FULLNAME}</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={{ marginTop: 6 }}>Batas Waktu : </Text>
                  <Text style={{ marginTop: 6, color: this.getColorBatasWaktu(batasWaktu) }}>{batasWaktu}</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }

  render() {

    return (
      <Container style={{ padding: 16 }}>
        <StatusBar hidden={false} backgroundColor={Colors.tintColor} barStyle="light-content" />
        <Content>
          <View style={styles.sectionTimeline}>
            <Text style={styles.textTimeline}>Timeline</Text>
            <View style={styles.rightSection}>
              <Text style={styles.textFilter}>Filter</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Filter', { _changeFilterList: this._changeFilterList })} >
                <Icons name="filter-list" size={28} style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {this.state.data.map((item, index) => this._renderItem(item, index))}
          </ScrollView>
        </Content>
      </Container >
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