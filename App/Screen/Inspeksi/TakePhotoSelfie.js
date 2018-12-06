import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Dimensions, BackHandler,Platform
  } from 'react-native';
import Colors from '../../Constant/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RNCamera as Camera } from 'react-native-camera';
import imgTakePhoto from '../../Images/icon/ic_take_photo.png';
import imgNextPhoto from '../../Images/icon/ic_next_photo.png';
import R from 'ramda';
import {getTodayDate} from '../../Lib/Utils'
import TaskServices from '../../Database/TaskServices'


const FILE_PREFIX = Platform.OS === "ios" ? "" : "file://";
const moment = require('moment');
var RNFS = require('react-native-fs');

class TakePhotoSelfie extends Component{

    constructor(props){
        super(props);

        let params = props.navigation.state.params;
        let fotoBaris = R.clone(params.fotoBaris);
        let inspeksiHeader = R.clone(params.inspeksiHeader);
        // let trackInspeksi = R.clone(params.trackInspeksi);
        let kondisiBaris1 = R.clone(params.kondisiBaris1);
        let kondisiBaris2 = R.clone(params.kondisiBaris2);
        let dataUsual = R.clone(params.dataUsual);

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        this.state={
          hasPhoto: false,
          path: null,          
          pathImg: null,
          dataModel: null,
          fotoBaris,
          inspeksiHeader,
          // trackInspeksi,
          kondisiBaris1,
          kondisiBaris2,
          dataUsual
        }
    }

    componentDidMount(){
      this.setParameter();
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  
    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    setParameter(){
      var imgCode = this.state.dataUsual.NIK+'-'+getTodayDate('YYYYMMDD')+'-'+this.state.dataUsual.BA+'-'+this.state.dataUsual.AFD+'-IS-'+TaskServices.getTotalData('TR_IMAGE')+1;
      var trCode = this.state.dataUsual.NIK+'-'+getTodayDate('YYYYMMDD')+'-'+this.state.dataUsual.BA+'-'+this.state.dataUsual.AFD+'-DS-'+TaskServices.getTotalData('TR_IMAGE')+1;
      var imageName = 'IMG-'+imgCode+'.jpg';
      
      var image = {
          IMAGE_CODE: imgCode,
          TR_CODE: trCode,
          IMAGE_NAME:imageName,
          IMAGE_PATH: RNFS.ExternalDirectoryPath + '/Photo/Inspeksi',
          STATUS_IMAGE: '', 
          STATUS_SYNC: 'N'
      }
  
      this.setState({dataModel:image});
    }
  
    handleBackButtonClick =()=> {
      if(this.state.hasPhoto){
        RNFS.unlink(FILE_PREFIX+RNFS.ExternalDirectoryPath + '/Photo/Inspeksi/'+this.state.dataModel.IMAGE_NAME)
          .then(() => {
            console.log('FILE DELETED');
        });
        RNFS.unlink(this.state.path)
        this.setState({path: null, hasPhoto:false});
      }
      this.props.navigation.goBack(null);
      return true;
    }

    takePicture = async () => {
      try {
        if(this.state.hasPhoto){    
          this.insertDB() 
        }else{
          const data = await this.camera.takePictureAsync();
          this.setState({ path: data.uri, pathImg: RNFS.ExternalDirectoryPath + '/Photo/Inspeksi', hasPhoto: true });      
          RNFS.copyFile(data.uri, RNFS.ExternalDirectoryPath + '/Photo/Inspeksi/'+this.state.dataModel.IMAGE_NAME);
        }
        
      } catch (err) {
        console.log('err: ', err);
      }
    };

    insertDB(){ 
      this.props.navigation.navigate('KondisiBarisAkhir',{
        fotoSelfie: this.state.dataModel,
        inspeksiHeader: this.state.inspeksiHeader, 
        fotoBaris: this.state.fotoBaris,
        // trackInspeksi: this.state.trackInspeksi,
        kondisiBaris1: this.state.kondisiBaris1, 
        kondisiBaris2: this.state.kondisiBaris2, 
        dataUsual: this.state.dataUsual});    

    }
  
    renderCamera() {
      return (
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          flashMode={Camera.Constants.FlashMode.off}
          type={'front'}
          mirrorImage={true}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        >
        </Camera>
      );
    }
  
    renderImage() {
      return (
        <View>
          <Image
            source={{ uri: this.state.path }}
            style={styles.preview}
          />
        </View>
      );
    }
  
    renderIcon=()=>{
      var imgSource = this.state.hasPhoto? imgNextPhoto : imgTakePhoto;
      return (
        <Image
          style={ styles.icon }
          source={ imgSource }
        />
      );
    }
    
    render(){
        return (
          <View style={styles.container}>
              <View style={{flex:2}}>
                {this.state.path ? this.renderImage() : this.renderCamera()}
              </View>
              <View style={{flex:0.5, alignItems:'center', justifyContent:'center'}}>
                  <TouchableOpacity style={[styles.takePicture, {marginTop:15}]} onPress={this.takePicture.bind(this)}>
                      {this.renderIcon()}
                  </TouchableOpacity>
              </View>
          </View>
        );
    }
}

export default TakePhotoSelfie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
  icon: {
      alignContent: 'flex-end',
      height: 64,
      width: 64,
      resizeMode: 'stretch',
      alignItems: 'center',
  }
});