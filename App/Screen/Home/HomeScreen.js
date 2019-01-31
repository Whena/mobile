import React from 'react';
import { ImageBackground, StatusBar, TouchableOpacity, View, ScrollView, Image, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../Constant/Colors'
import TaskServices from '../../Database/TaskServices'
import CategoryAction from '../../Redux/CategoryRedux'
import ContactAction from '../../Redux/ContactRedux'
import RegionAction from '../../Redux/RegionRedux'
import Moment from 'moment';
import R, { isEmpty } from 'ramda';
var RNFS = require('react-native-fs');
import { dirPhotoInspeksiBaris, dirPhotoInspeksiSelfie, dirPhotoTemuan, dirPhotoKategori } from '../../Lib/dirStorage';

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
      thumnailImage: '',
      dataMore7Hari: [],
      dataMore7HariHeader: [],
      dataMore7HariDetail: [],
      dataMore7HariBaris: []
    }
  }

  willFocus = this.props.navigation.addListener(
    'willFocus',
    () => {
      this._initData();// this._changeFilterList();
    }
  )

  componentWillUnmount() {
    this.willFocus.remove();
  }

  componentDidMount() {
    RNFS.copyFile(TaskServices.getPath(), 'file:///storage/emulated/0/MobileInspection/data.realm');
    // this._changeFilterList();
    this._deleteFinding();
    this._deleteInspeksiHeader();

    
    RNFS.mkdir(dirPhotoInspeksiBaris);
    RNFS.mkdir(dirPhotoInspeksiSelfie);
    RNFS.mkdir(dirPhotoTemuan);
    RNFS.mkdir(dirPhotoKategori);
  }

  _initData() {
    this.setState({ data: this._filterHome() })
  }

  _filterHome() {
    const login = TaskServices.getAllData('TR_LOGIN');
    const user_auth = login[0].USER_AUTH_CODE;
    const ref_role = login[0].REFFERENCE_ROLE;
    const loc_code = login[0].LOCATION_CODE;

    console.log("USER AUTH CODE : " + user_auth);
    console.log("REFFERENCE ROLE : " + ref_role);
    console.log("LOCATION CODE : " + loc_code);

    var finding = TaskServices.getAllData('TR_FINDING');
    var findingSorted = finding.sorted('INSERT_TIME', true);
    var findingFilter;

    if (ref_role == 'REGION_CODE') {
      // findingFilter = findingSorted.filtered(`WERKS CONTAINS[c] "${region_code}"`);
      var estate = TaskServices.getAllData('TM_EST');
      var estateFilter = estate.filtered(`REGION_CODE = "${loc_code}"`);

      let wersArr = [];
      estateFilter.map(item => {
        const werksEst = item.WERKS
        wersArr.push(werksEst);
      });

      var query = 'WERKS == ';
      for (var i = 0; i < wersArr.length; i++) {
        query += `"${wersArr[i]}"`;
        if (i + 1 < wersArr.length) {
          query += ` OR WERKS == `
        }
      }
      findingFilter = findingSorted.filtered(`${query} AND ASSIGN_TO != "${user_auth}"`);

    } else if (ref_role == 'COMP_CODE') {
      findingFilter = findingSorted.filtered(`WERKS CONTAINS[c] "${loc_code}" AND ASSIGN_TO != "${user_auth}"`);
    } else if (ref_role == 'WERKS') {
      findingFilter = findingSorted.filtered(`WERKS = "${loc_code}" AND ASSIGN_TO != "${user_auth}"`);
    } else if (ref_role == 'AFD_CODE') {
      const werks = loc_code.substring(0, 4);
      const afd_code = loc_code.substring(4, 5);

      findingFilter = findingSorted.filtered(`WERKS = "${werks}" AND AFD_CODE = "${afd_code}" AND ASSIGN_TO != "${user_auth}"`);
    } else {
      findingFilter = finding.sorted('INSERT_TIME', true);
    }

    this.setState({ data: findingFilter })
  }

  _getStatus() {
    if (this.state.data.PROGRESS == 100) {
      return "After"
    } else if (this.state.data.PROGRESS == 0) {
      return "Before"
    }
  }

  _deleteFinding() {
    var data = TaskServices.query('TR_FINDING', 'PROGRESS = 100');
    var dataMore7Hari = []
    var dataNoDate = []
    var now = Moment(new Date())

    data.map(item => {
      if (isEmpty(item.DUE_DATE)) {
        dataNoDate.push(item)
      } else {
        var diff = Moment(new Date(item.DUE_DATE)).diff(now, 'day');
        if (diff > 7) {
          this.setState({ dataMore7Hari: dataMore7Hari.push(item) })
        }
      }
    })

    // console.log("Data Query Splash : " + JSON.stringify(this.state.dataMore7Hari));
    let allData = this.state.dataMore7Hari;
    if (this.state.dataMore7Hari.length > 0) {
      this.state.dataMore7Hari.map(item => {
        let indexData = R.findIndex(R.propEq('FINDING_CODE', item.FINDING_CODE))(allData);
        this._deleteImageFinding(item.FINDING_CODE);
        TaskServices.deleteRecord('TR_FINDING', indexData);
      });
    }
  }

  _deleteInspeksiHeader() {
    var data = TaskServices.getAllData('TR_BLOCK_INSPECTION_H');
    // console.log("TR_BLOCK_INSPECTION_H : " + JSON.stringify(data));
    var dataMore7Hari = [];
    var dataNoDate = [];
    var now = Moment(new Date());

    data.map(item => {
      // console.log("INSERT_TIME : " + item.INSERT_TIME);
      if (isEmpty(item.INSERT_TIME)) {
        dataNoDate.push(item)
      } else {
        var diff = Moment(new Date(item.INSERT_TIME)).diff(now, 'day');
        if (diff > 7) {
          this.setState({ dataMore7HariHeader: dataMore7Hari.push(item) })
        }
      }
    })

    // console.log("Data Query Inspection Header : " + JSON.stringify(this.state.dataMore7HariHeader));
    let allData = this.state.dataMore7HariHeader;
    if (this.state.dataMore7HariHeader.length > 0) {
      this.state.dataMore7HariHeader.map(item => {
        let indexData = R.findIndex(R.propEq('TR_BLOCK_INSPECTION_H', item.BLOCK_INSPECTION_CODE))(allData);
        this._deleteInspeksiDetail(item.BLOCK_INSPECTION_CODE);
        this._deleteImageInspeksi(item.BLOCK_INSPECTION_CODE);
        this._deleteInspeksiBaris(item.BLOCK_INSPECTION_CODE)
        TaskServices.deleteRecord('TR_BLOCK_INSPECTION_H', indexData);
      });
    }
  }

  _deleteInspeksiDetail(BLOCK_INSPECTION_CODE) {
    let allData = TaskServices.findBy2('TR_BLOCK_INSPECTION_D', 'BLOCK_INSPECTION_CODE', BLOCK_INSPECTION_CODE);
    let indexData = R.findIndex(R.propEq('TR_BLOCK_INSPECTION_D', BLOCK_INSPECTION_CODE))(allData);
    TaskServices.deleteRecord('TR_BLOCK_INSPECTION_D', indexData);
  }

  _deleteInspeksiBaris(BLOCK_INSPECTION_CODE) {
    let allData = TaskServices.findBy2('TR_BARIS_INSPECTION', 'BLOCK_INSPECTION_CODE', BLOCK_INSPECTION_CODE);
    let indexData = R.findIndex(R.propEq('TR_BARIS_INSPECTION', BLOCK_INSPECTION_CODE))(allData);
    TaskServices.deleteRecord('TR_BARIS_INSPECTION', indexData);
  }

  _deleteImageFinding(TR_CODE) {
    let allData = TaskServices.findBy2('TR_IMAGE', 'TR_CODE', FINDING_CODE);
    let indexData = R.findIndex(R.propEq('TR_IMAGE', TR_CODE))(allData);
    this.deleteImageFileTemuan(allData.IMAGE_PATH_LOCAL);
    TaskServices.deleteRecord('TR_IMAGE', indexData);
  }

  _deleteImageInspeksi(TR_CODE) {
    let allData = TaskServices.findBy2('TR_IMAGE', 'TR_CODE', BLOCK_INSPECTION_CODE);
    let indexData = R.findIndex(R.propEq('TR_IMAGE', TR_CODE))(allData);
    this.deleteImageFileInspeksi(allData.IMAGE_PATH_LOCAL);
    TaskServices.deleteRecord('TR_IMAGE', indexData);
  }

  deleteImageFileTemuan(filepath) {
    RNFS.exists(filepath)
      .then((result) => {
        console.log("file exists: ", result);
        if (result) {
          return RNFS.unlink(filepath)
            .then(() => {
              console.log('FILE DELETED');
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
              console.log(err.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  deleteImageFileInspeksi(filepath) {
    RNFS.exists(filepath)
      .then((result) => {
        console.log("file exists: ", result);
        if (result) {
          return RNFS.unlink(filepath)
            .then(() => {
              console.log('FILE DELETED');
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
              console.log(err.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  _changeFilterList = data => {
    // console.log("Data Filter Home : " + JSON.stringify(data));
    if (data == undefined) {
      this._initData();
      console.log("Masuk Default")
    } else {
      this._initFilterData(data);
      console.log("Masuk Filter")
    }
  }

  _initFilterData(dataFilter) {
    // console.log("Array Data Filter : " + JSON.stringify(dataFilter));
    dataFilter.map(item => {

      // console.log("Data Filter Ba : " + item.ba);
      // console.log("Data Filter User Auth : " + item.userAuth);
      // console.log("Data Filter Status : " + item.status);
      // console.log("Data Filter Start Batas Waktu : " + item.stBatasWaktu);
      // console.log("Data Filter End Batas Waktu : " + item.endBatasWaktu);
      // console.log("Data Filter Val Batas Waktu : " + item.valBatasWaktu);
      // console.log("Data Filter Val Assignto : " + item.valAssignto);


      // let oldContacts = realm.objects('Contact').filtered('age > 2');
      let ba = item.ba;
      let userAuth = item.userAuth;
      let status = item.status;
      let stBatasWaktu = item.stBatasWaktu;
      let endBatasWaktu = item.endBatasWaktu.substring(0, 8) + '235959';
      let valBatasWaktu = item.valBatasWaktu;
      let valAssignto = item.valAssignto;

      let varBa = ' AND WERKS = ' + `"${ba}"`
      let varUserAuth = ' AND INSERT_USER = ' + `"${userAuth}"`
      let varStatus = ' AND STATUS = ' + `"${status}"`
      let varInsertTime = ' AND INSERT_TIME >= ' + `"${stBatasWaktu}"` + ' AND INSERT_TIME <= ' + `"${endBatasWaktu}"`
      // console.log("Query All : " + (varBa + varUserAuth + varStatus + varInsertTime));

      let stBa;
      if (ba == 'Pilih Lokasi') {
        stBa = ' AND WERKS CONTAINS ' + `"${""}"`
      } else {
        stBa = varBa
      }

      let stUserAuth;
      if (valAssignto == 'Pilih Pemberi Tugas') {
        stUserAuth = ' AND INSERT_USER CONTAINS ' + `"${""}"`
      } else {
        stUserAuth = varUserAuth
      }

      let stStatus;
      if (status == 'Pilih Status') {
        stStatus = ' AND STATUS CONTAINS ' + `"${""}"`
      } else {
        stStatus = varStatus
      }

      let stInsertTime;
      if (valBatasWaktu == 'Pilih Batas Waktu') {
        stInsertTime = ' AND STATUS CONTAINS ' + `"${""}"`
      } else {
        stInsertTime = varInsertTime
      }

      let data;
      if (ba == 'Pilih Lokasi' && valAssignto == 'Pilih Pemberi Tugas' && status == 'Pilih Status' && valBatasWaktu == 'Pilih Batas Waktu') {
        data = this._filterHome();
      } else {
        data = this._filterHome().filtered(`AFD_CODE CONTAINS ""${stBa}${stUserAuth}${stStatus}${stInsertTime}`);
      }
      this.setState({ data });
    })
  }

  getColor(param) {
    switch (param) {
      case 'SELESAI':
        return 'rgba(35, 144, 35, 0.7)';
      case 'SEDANG DIPROSES':
        return 'rgba(254, 178, 54, 0.7)';
      case 'BARU':
        return 'rgba(255, 77, 77, 0.7)';
      case 'Batas waktu belum ditentukan':
        return 'red';
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

  getContactName = (userAuth) => {
    try {
      let data = TaskServices.findBy2('TR_CONTACT', 'USER_AUTH_CODE', userAuth);
      return data.FULLNAME;
    } catch (error) {
      return ''
    }
  }

  getEstateName(werks) {
    try {
      let data = TaskServices.findBy2('TM_EST', 'WERKS', werks);
      return data.EST_NAME;
    } catch (error) {
      return '';
    }
  }

  getBlokName(blockCode) {
    try {
      let data = TaskServices.findBy2('TM_BLOCK', 'BLOCK_CODE', blockCode);
      return data.BLOCK_NAME;
    } catch (error) {
      return ''
    }
  }

  getStatusBlok(werk_afd_blok_code) {
    try {
      let data = TaskService.findBy2('TM_LAND_USE', 'WERKS_AFD_BLOCK_CODE', werk_afd_blok_code);
      return data.MATURITY_STATUS;
    } catch (error) {
      return ''
    }
  }

  _renderItem = (item, index) => {

    const nav = this.props.navigation
    const INSERT_USER = TaskServices.findBy2('TR_CONTACT', 'USER_AUTH_CODE', item.INSERT_USER);
    let user = INSERT_USER == undefined ? 'User belum terdaftar. Hubungi Admin.' : INSERT_USER.FULLNAME

    Moment.locale();
    let dtInsertTime = Moment(this.state.data.INSERT_TIME).format('LLL');
    let batasWaktu = item.DUE_DATE == '' ? 'Batas waktu belum ditentukan' : Moment(item.DUE_DATE).format('LL');
    
    const image = TaskServices.findBy2('TR_IMAGE', 'TR_CODE', item.FINDING_CODE);
    let sources = image == undefined ? require('../../Images/background.png') : { uri: "file://" + image.IMAGE_PATH_LOCAL }

    return (
      <View key={index}>
        <TouchableOpacity style={{ marginTop: 12 }} key={item.id} onPress={() => { nav.navigate('DetailFinding', { ID: item.FINDING_CODE }) }}>
          <Card >
            <CardItem>
              <Left>
                <Thumbnail style={{ borderColor: 'grey', borderWidth: 0.5, height: 48, width: 48 }} source={require('../../Images/img_no_photo.jpg')} />
                <Body>
                  <Text style={{ fontSize: 14 }}>{user}</Text>
                  <Text style={{ fontSize: 12 }}>{dtInsertTime}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <ImageBackground source={sources} style={{ height: 210, width: null, flex: 1, flexDirection: 'column-reverse' }} >
                <View style={{ alignContent: 'center', paddingTop: 2, paddingLeft: 12, flexDirection: 'row', height: 42, backgroundColor: this.getColor(item.STATUS) }} >
                  <Image style={{ marginTop: 2, height: 28, width: 28 }} source={require('../../Images/icon/ic_new_timeline.png')}></Image>
                  <Text style={{ marginLeft: 12, color: 'white', fontSize: 14 }}>{item.STATUS}</Text>
                </View>
              </ImageBackground>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={{fontSize: 14}}>Lokasi : {this.getBlokName(item.BLOCK_CODE)}/{this.getEstateName(`${item.WERKS}${item.AFD_CODE}${item.BLOCK_CODE}`)}/{this.getEstateName(item.WERKS)}</Text>
                <Text style={{ marginTop: 6, fontSize: 14 }}>Kategori : {this.getCategoryName(item.FINDING_CATEGORY)}</Text>
                <Text style={{ marginTop: 6, fontSize: 14 }}>Ditugaskan kepada : {this.getContactName(item.ASSIGN_TO)}</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={{ marginTop: 6, fontSize: 14 }}>Batas Waktu : </Text>
                  <Text style={{ marginTop: 6, color: this.getColor(batasWaktu), fontSize: 14 }}>{batasWaktu}</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }

  _validasiData(param) {
    if (param == 0) {
      return this._renderNoData();
    } else {
      return this._renderData();
    }
  }

  _renderNoData() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch', alignContent: 'center' }}>
        <Text style={{ fontSize: 16, alignSelf: 'center', marginTop: 200 }}>'Belum ada temuan di area Kamu'</Text>
      </View>
    )
  }

  _renderData() {
    return (
      <View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {this.state.data.map((item, index) => this._renderItem(item, index))}
        </ScrollView>
      </View>
    )
  }

  render() {
    return (
      <Container style={{ padding: 16 }}>
        <Content>
          <StatusBar hidden={false} backgroundColor={Colors.tintColor} barStyle="light-content" />
          <View style={styles.sectionTimeline}>
            <Text style={styles.textTimeline}>Temuan di Wilayahmu</Text>
            <View style={styles.rightSection}>
              <Text style={styles.textFilter}>Filter</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Filter', { _changeFilterList: this._changeFilterList })} >
                <Icons name="filter-list" size={28} style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
          </View>
          {this._validasiData(this.state.data.length)}
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
    width: 250,
    fontSize: 14,
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