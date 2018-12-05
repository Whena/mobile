
import React, { Component } from 'react';
import { ImageBackground, StatusBar, Text, Alert } from 'react-native';
import { Container } from 'native-base'
import { NavigationActions, StackActions } from 'react-navigation';
import { getPermission } from '../Lib/Utils'
import TaskServices from '../Database/TaskServices'
// import RealmSchema from '../Database/RealmSchema';
var RNFS = require('react-native-fs');

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

        // let list = TaskServices.getAllData("TR_TRACK_INSPECTION");        
        // let list = TaskServices.findBy("TR_TRACK_INSPECTION", "TRACK_INSPECTION_CODE", "000789-20181130-4122-H-A-T-1");

        // this.setState({json: JSON.stringify(list)})
        // Alert.alert(JSON.stringify(list))

        var isAllGrandted = await getPermission();
        if (isAllGrandted === true) {
            //buat folder internal      
            RNFS.mkdir(RNFS.ExternalDirectoryPath + '/Photo/Inspeksi');

            //buat Folder DiExtrnal
            RNFS.mkdir('file:///storage/emulated/0/MobileInspection');

            // var sda = TaskServices.getPath()
            // RNFS.copyFile(sda, 'file:///storage/emulated/0/MobileInspection/data.realm');

            //delete record
            // TaskServices.deleteAllData('t_login',{user_auth_code:'auth'})

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

export default SplashScreen;
