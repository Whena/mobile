
import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    CameraRoll,
    Platform,
    BackHandler,
    Alert,
    Dimensions,
    TouchableHighlight,
    Text
  } from 'react-native';
import Colors from '../../Constant/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
const FILE_PREFIX = Platform.OS === "ios" ? "" : "file://";
import imgTakePhoto from '../../Images/icon/ic_take_photo.png';
import imgNextPhoto from '../../Images/icon/ic_next_photo.png';
import { RNCamera as Camera } from 'react-native-camera';
import { getTodayDate, getUUID } from '../../Lib/Utils'
import TaskServices from '../../Database/TaskServices';
import { NavigationActions, StackActions } from 'react-navigation';
import ImageResizer from 'react-native-image-resizer';

const moment = require('moment');
var RNFS = require('react-native-fs');
import R from 'ramda';

class TakeFoto extends Component{

    static navigationOptions = {
        headerStyle: {
          backgroundColor: Colors.tintColor
        },
        title: 'Ambil Foto',
        headerTintColor: '#fff',
        headerTitleStyle: {
          flex: 1,
          fontSize: 18,
          fontWeight: '400'
        },
      };
    
      constructor(props) {
        super(props);
    
        // let params = props.navigation.state.params;
        // let inspeksiHeader = R.clone(params.inspeksiHeader);
        // let dataUsual = R.clone(params.dataUsual);
        // let from = R.clone(params.from);
        // let statusBlok = R.clone(params.statusBlok);
        // let waktu = R.clone(params.waktu);
        // let baris = R.clone(params.baris);
    
        // console.log(inspeksiHeader)
    
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    
        this.state = {
          hasPhoto: false,
          path: null,
          pathImg: null,
          dataModel: null,
        //   from,
          pathCache: '',
        };
      }
    
      componentDidMount(){
        this.setParameter();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
    
      componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      }
    
      handleBackButtonClick() { 
        if(this.state.hasPhoto){
    
          RNFS.unlink(FILE_PREFIX+RNFS.ExternalDirectoryPath + '/Photo/Temuan/'+this.state.dataModel.IMAGE_NAME)
            .then(() => {
              console.log(`FILE ${this.state.dataModel.IMAGE_NAME} DELETED`);
            });
          RNFS.unlink(this.state.path)
          this.setState({ path: null, hasPhoto: false });
        }
    
        // if (this.state.from !== 'undefined') {
          this.props.navigation.goBack(null);
        // } else {
        //   //harus ditambah pertanyaan sebelum back
        //   const navigation = this.props.navigation;
        //   const resetAction = StackActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: 'InspectionNavigator' })]
        //   });
        //   navigation.dispatch(resetAction);
        // }
    
        return true;
      }
    
      setParameter() {
        var UNIQ_CODE = getUUID();
        UNIQ_CODE = UNIQ_CODE.substring(0, UNIQ_CODE.indexOf('-'));
        var imgCode = 'T' + UNIQ_CODE;
    
        UNIQ_CODE = getUUID();
        UNIQ_CODE = UNIQ_CODE.substring(0, UNIQ_CODE.indexOf('-'));
        var trCode = 'TM' + UNIQ_CODE;
        var imageName = imgCode + '.jpg';
    
        var image = {
          IMAGE_CODE: imgCode,
          TR_CODE: trCode,
          BLOCK_INSPECTION_CODE: 'Askadas',//this.state.inspeksiHeader.BLOCK_INSPECTION_CODE,
          IMAGE_NAME: imageName,
          IMAGE_PATH: RNFS.ExternalDirectoryPath + '/Photo/Temuan',
          STATUS_IMAGE: '',
          STATUS_SYNC: 'N'
        }
    
        this.setState({ dataModel: image });
    
      }
    
      takePicture = async () => {
        try {
          if(this.state.hasPhoto){  
            this.goBack();     
          }else{
            const takeCameraOptions = {
              // quality : 0.5,  //just in case want to reduce the quality too
              skipProcessing: false,
              fixOrientation: true
            };
            const data = await this.camera.takePictureAsync(takeCameraOptions);
            this.setState({ path: data.uri, pathImg: RNFS.ExternalDirectoryPath + '/Photo/Temuan', hasPhoto: true });
            RNFS.copyFile(data.uri, RNFS.ExternalDirectoryPath + '/Photo/Temuan/' + this.state.dataModel.IMAGE_NAME);
            this.resize(RNFS.ExternalDirectoryPath + '/Photo/Temuan/' + this.state.dataModel.IMAGE_NAME);
          }
    
        } catch (err) {
          console.log('err: ', err);
        }
      };
    
      resize(data) {
        ImageResizer.createResizedImage(data, 640, 480, 'JPEG', 80, 0, RNFS.ExternalDirectoryPath + '/Photo/Temuan').then((response) => {
          RNFS.copyFile(response.path, RNFS.ExternalDirectoryPath + '/Photo/Temuan/' + this.state.dataModel.IMAGE_NAME);
          this.setState({
            path: response.uri,
            pathCache: response.path
          });
        }).catch((err) => {
          console.log(err)
        });
      }
    
      renderCamera() {
        return (
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            flashMode={Camera.Constants.FlashMode.auto}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
          >
          </Camera>
        );
      }
    
      goBack() {
        this.props.navigation.state.params.onRefresh(this.state.pathCache);
        this.props.navigation.goBack();
        
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
    
      renderIcon = () => {
        var imgSource = this.state.hasPhoto ? imgNextPhoto : imgTakePhoto;
        return (
          <Image
            style={styles.icon}
            source={imgSource}
          />
        );
      }
    
      render() {
        return (
          <View style={styles.container}>
            <View style={{ flex: 2 }}>
              {this.state.path ? this.renderImage() : this.renderCamera()}
            </View>
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={[styles.takePicture, { marginTop: 15 }]} onPress={this.takePicture.bind(this)}>
                {this.renderIcon()}
              </TouchableOpacity>
            </View>
          </View>
        );
      }
}

export default TakeFoto;

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

