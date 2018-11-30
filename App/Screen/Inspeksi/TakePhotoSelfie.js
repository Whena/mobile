import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Dimensions, BackHandler
  } from 'react-native';
import Colors from '../../Constant/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RNCamera as Camera } from 'react-native-camera';
import imgTakePhoto from '../../Images/icon/ic_take_photo.png';
import imgNextPhoto from '../../Images/icon/ic_next_photo.png';


const moment = require('moment');
var RNFS = require('react-native-fs');

class TakePhotoSelfie extends Component{

    constructor(props){
        super(props);
        // let params = props.navigation.state.params;
        // let order = R.clone(params.data);

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state={
          hasPhoto: false,
          path: null,          
          pathImg: null,
          dataModel: null,
          // order
        }
    }

    componentDidMount(){
      // this.setParameter();
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  
    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    setParameter(){
      var imgCode = this.state.order.NIK+'-'+getTodayDate('YYYYMMDD')+'-'+this.state.order.BA+'-'+this.state.order.AFD+'-I-'+TaskServices.getTotalData('TR_IMAGE')+1;
      var trCode = this.state.order.NIK+'-'+getTodayDate('YYYYMMDD')+'-'+this.state.order.BA+'-'+this.state.order.AFD+'-D-'+TaskServices.getTotalData('TR_IMAGE')+1;
      var imageName = 'IMG-'+imgCode+'.jpg';
      
      var image = {
          IMAGE_CODE: IMAGE_CODE,
          TR_CODE: trCode,
          IMAGE_NAME:imageName,
          IMAGE_PATH: RNFS.ExternalDirectoryPath + '/Photo/Inspeksi',
          STATUS_IMAGE: '', 
          STATUS_SYNC: 'N'
  
          // SYNC_TIME: '',
          // INSERT_USER: '', 
          // INSERT_TIME: '',
          // UPDATE_USER: '', 
          // UPDATE_TIME:'',
          // DELETE_USER:'',
          // DELETE_TIME:'',
      }
  
      this.setState({dataModel:image});
    }

    insertDB(){
      TaskService.saveData('TR_IMAGE', this.state.dataModel);
    }
  
    handleBackButtonClick() {
      if(this.state.hasPhoto){
        RNFS.unlink(FILE_PREFIX+RNFS.ExternalDirectoryPath + '/Photo/selfie.jpg')
          .then(() => {
            console.log('FILE DELETED');
        });
      }
      this.props.navigation.goBack(null);
      return true;
    }

    takePicture = async () => {
      try {
        if(this.state.hasPhoto){
          this.props.navigation.navigate('KondisiBarisAkhir');        
        }else{
          const data = await this.camera.takePictureAsync();
          this.setState({ path: data.uri, pathImg: RNFS.ExternalDirectoryPath + '/Photo/Inspeksi', hasPhoto: true });
          RNFS.copyFile(data.uri, RNFS.ExternalDirectoryPath + '/Photo/Inspeksi/'+this.state.dataModel.IMAGE_NAME);
        }
        
      } catch (err) {
        console.log('err: ', err);
      }
    };
  
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