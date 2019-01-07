
import React, { Component } from 'react';
import { ImageBackground, StatusBar, Text, Alert } from 'react-native';
import { Container } from 'native-base'
import { NavigationActions, StackActions } from 'react-navigation';
import { getPermission } from '../Lib/Utils'
import { connect } from 'react-redux';
import TaskServices from '../Database/TaskServices'
import CategoryAction from '../Redux/CategoryRedux'
import ContactAction from '../Redux/ContactRedux'
import RegionAction from '../Redux/RegionRedux'
var RNFS = require('react-native-fs');
import { dirPhotoTemuan, dirPhotoInspeksiBaris, dirPhotoInspeksiSelfie } from '../Lib/dirStorage'

class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            json: ''
        }
    }

    static navigationOptions = {
        header: null
    }

    navigateScreen(screenName) {
        const navigation = this.props.navigation;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: screenName })],
        });
        navigation.dispatch(resetAction);
    }

    async componentDidMount() {

        var isAllGrandted = await getPermission();
        if (isAllGrandted === true) {
            //buat folder internal      
            // RNFS.mkdir(RNFS.ExternalDirectoryPath + '/Photo/Inspeksi/Baris');
            // RNFS.mkdir(RNFS.ExternalDirectoryPath + '/Photo/Inspeksi/Selfie');
            // RNFS.mkdir(RNFS.ExternalDirectoryPath + '/Photo/Temuan');

            
            //buat Folder DiExtrnal
            RNFS.mkdir('file:///storage/emulated/0/MobileInspection');

            RNFS.mkdir(dirPhotoInspeksiBaris);
            RNFS.mkdir(dirPhotoInspeksiSelfie);
            RNFS.mkdir(dirPhotoTemuan);


            setTimeout(() => {
                if (TaskServices.getTotalData('TR_LOGIN') > 0) {
                    this.navigateScreen('MainMenu');
                } else {
                    this.navigateScreen('Login');
                }
            }, 2000);
        } else {
            Alert.alert('Seluruh Permission harus di hidupkan')
        }
    }

    render() {
        return (
            <Container>
                <StatusBar
                    hidden={true}
                    barStyle="light-content"
                />
                <ImageBackground source={require('../Images/splash.png')} style={{ flex: 1 }} />
                {/* <Text>{this.state.json}</Text> */}

            </Container>

        )
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
