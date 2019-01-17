import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableHighlight, Button, Alert, Image, ActivityIndicator,Modal
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {
    Container,
    Content,
    Spinner,
    Card
} from 'native-base'
import TaskServices from '../Database/TaskServices'

import ImagePickerCrop from 'react-native-image-crop-picker'

import apisauce from 'apisauce';
import RNFetchBlob from 'rn-fetch-blob';

const user = TaskServices.getAllData('TR_LOGIN')
// ------
let api = api = apisauce.create({
  baseURL: 'http://149.129.245.230:3012/image/upload-file/',
  headers: {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization : `Bearer ${user[0].ACCESS_TOKEN}`,
  }
  // timeout: 15000
});
class TestUpload extends Component{
    constructor(props) {
      super(props);
      this.state = {
        srcImg: '',
        uri: '',
        fileName: '',
        loading: false,
      };
    }
 
  
  choosePicture = () => {
      var ImagePicker = require('react-native-image-picker');
      var options = {
          title: 'Pilih Gambar',
          storageOptions: {
            skipBackup: true,
            path: 'file:///storage/emulated/0/MobileInspection'//'images'
          }
      };

      ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }else {
            console.log(response.path)
            this.setState({
              srcImg: { uri: response.path },
              uri: response.path,
              fileName: response.fileName
            });
          }
      });
  };
 
  uploadPicture = () => {
 
    const data = new FormData();
    data.append('IMAGE_CODE', 'P0000000ZC4')
    data.append('IMAGE_PATH_LOCAL','/path/local/mobile')
    data.append('TR_CODE', 'F0000002weR')
    data.append('STATUS_IMAGE', 'BEFORE')
    data.append('STATUS_SYNC', 'SYNC')
    data.append('SYNC_TIME', '2018-10-12 01:01:01')
    data.append('INSERT_TIME', '2018-10-12 01:01:01')
    data.append('INSERT_USER', 'TAC00004')
    //data.append('id', 'id apa saja'); // you can append anyone.
    data.append('FILENAME', {
      uri: 'file://'+this.state.uri, //'file:///storage/emulated/0/MobileInspection/diagram.jpg',
      type: 'image/jpeg',
      name: this.state.fileName,
    });

    const url= "http://149.129.245.230:3012/image/upload-file/"
    console.log(JSON.stringify(data))

    fetch(url, {
      method: 'POST',
      headers: {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization : `Bearer ${user[0].ACCESS_TOKEN}`,
      },
      body: data
      
    })
    .then((response) => response.json())
    .then((responseJson) => {
        // return responseJson  
        console.log(responseJson)   
    }).catch((error) => {
        console.error(error);
    });
  }

  _takePicture() { 
    this.choosePicture()
    // ImagePickerCrop.openCamera({
    //     width: 640,
    //     height: 480,
    //     cropping: false,
    // }).then(image => {
    //     // this.setState({ image: image.path })
    //     alert('ok');
    //     console.log(image)
    // });
}

  render(){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>      
        <Card style={[styles.cardContainer, {marginLeft: 15}]}>
            <TouchableHighlight style={{ padding: 40 }}
                onPress={() => { this._takePicture() }}>
                <Image style={{
                    alignSelf: 'center', alignItems: 'stretch',
                    width: 30, height: 30
                }}
                source={require('../Images/icon/ic_camera_big.png')}></Image>
            </TouchableHighlight>
        </Card>
        <TouchableHighlight style={{ padding: 40 }}
          onPress={()=>{this.uploadPicture()}}>
        
        <Text>Upload</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default TestUpload;
 
const styles = StyleSheet.create({
  conMain : {
    flex:1
  },
  conHeader : {
    flex:1,
    backgroundColor: '#6200EE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textHeader : {
    fontSize: 20,
    color :'white'
  },
  conPreview: {
    flex:8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  conButton: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  uploadAvatar: {
    height: 400,
    width: 400
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});