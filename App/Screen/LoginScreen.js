import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ImageBackground,
    KeyboardAvoidingView,
    Keyboard,
    AsyncStorage
} from 'react-native';

import FormLogin from '../Component/FormLogin'
import { connect } from 'react-redux';
import AuthAction from '../Redux/AuthRedux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { NavigationActions, StackActions } from 'react-navigation';
import Colors from '../Constant/Colors';
import { isNil } from 'ramda';
import TaskServices from '../Database/TaskServices';
import CategoryAction from '../Redux/CategoryRedux';
import ContactAction from '../Redux/ContactRedux';
import RegionAction from '../Redux/RegionRedux';
import BlockAction from '../Redux/BlockRedux';
const IMEI = require('react-native-imei');


class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            user_id: '',
            user_name: '',
            token: '',
            imei: ''
            // imei: IMEI.getImei()
        }
    }

    get_IMEI_Number() {
        var IMEI_2 = IMEI.getImei();
        this.setState({ imei: IMEI_2 });
        return IMEI_2;
    }

    static navigationOptions = {
        header: null,
    }

    insertUser(user) {
        //AsyncStorage.setItem("token", user.ACCESS_TOKEN);

        var data = {
            NIK: user.NIK,
            ACCESS_TOKEN: user.ACCESS_TOKEN,
            JOB_CODE: user.JOB_CODE,
            LOCATION_CODE: user.LOCATION_CODE,
            REFFERENCE_ROLE: user.REFFERENCE_ROLE,
            USERNAME: user.USERNAME,
            USER_AUTH_CODE: user.USER_AUTH_CODE,
            USER_ROLE: user.USER_ROLE
        };

        TaskServices.saveData('TR_LOGIN', data);
    }

    componentWillReceiveProps(newProps) {
        if (!isNil(newProps.auth)) {
            this.setState({ fetching: newProps.auth.fetching });
        }
        if (!isNil(newProps.auth.user)) {
            this.insertUser(newProps.auth.user);
            // this.props.categoryRequest();
            // this.props.contactRequest();
            // this.props.regionRequest();
            // this.props.blockRequest();
            this.navigateScreen('MainMenu');
        }
    }

    navigateScreen(screenName) {
        const navigation = this.props.navigation;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: screenName })],
        });
        navigation.dispatch(resetAction);
    }

    onLogin(username, password) {
        Keyboard.dismiss();
        var Imei = this.get_IMEI_Number();
        console.log("Imei Handphone : " + Imei)

        this.props.authRequest({
            username: username,
            password: password,
            imei: Imei
        });
    }

    render() {

        return (
            <ImageBackground source={require('../Images/background_login.png')} style={styles.container}>
                <KeyboardAvoidingView behavior="padding">
                    <StatusBar hidden={false} backgroundColor={Colors.tintColor} barStyle="light-content" />
                    {/* <FormLogin
                        onBtnClick={data => {
                            console.log(data)
                            this.props.navigation.navigate('MainTabs')
                        }} /> */}
                    <FormLogin
                        onBtnClick={data => { this.onLogin(data.strEmail, data.strPassword) }} />
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>{'\u00A9'} 2018 Triputra Agro Persada. All Rights Reserved.</Text>
                    </View>
                    <ProgressDialog
                        visible={this.state.fetching}
                        activityIndicatorSize="large"
                        message="Loading..."
                    />
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        // region: state.region,
        // block:state.block
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authRequest: obj => dispatch(AuthAction.authRequest(obj)),
        categoryRequest: () => dispatch(CategoryAction.categoryRequest()),
        contactRequest: () => dispatch(ContactAction.contactRequest()),
        // regionRequest: () => dispatch(RegionAction.regionRequest()),
        // regionPost: obj => dispatch(RegionAction.regionPost(obj)),
        // blockRequest: () => dispatch(BlockAction.blockRequest()),
        // blockPost: obj => dispatch(BlockAction.blockPost(obj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerView: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    footerText: {
        color: '#51a977',
        fontSize: 12,
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    }
});

