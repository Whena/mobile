

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Keyboard,
    StatusBar,
    ImageBackground,Alert
  } from 'react-native';
  
// import {Container, Content, Header} from 'native-base'
// import Logo from '../Component/Logo';
import Form from '../Component/Form';
import { connect } from 'react-redux';
import AuthAction from '../Redux/AuthRedux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { NavigationActions, StackActions  } from 'react-navigation';
import {isNil } from 'ramda';
import LoginTaskService from '../Database/TaskLoginService'

// var Realm = require('realm'); 
// let realm ;

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            fetching: false,
            user_id:'',
            user_name:'',
            token:'',
        }

        // realm = new Realm({
        //     schema: [{name: 'trn_login', 
        //     primaryKey:'NIK',
        //     properties: 
        //     {
        //         NIK: 'string',
        //         ACCESS_TOKEN: 'string',
        //         JOB_CODE: 'string', 
        //         LOCATION_CODE: 'string',
        //         REFFERENCE_ROLE: 'string',
        //         USERNAME: 'string', 
        //         USER_AUTH_CODE: 'string',
        //         USER_ROLE: 'string', 
        //     }}]
        // });
    }

    static navigationOptions = {
        header: null,        
    }

    // insertUser=()=>{
    //     realm.write(() => {    
    //           realm.create('trn_login', {
    //             // user_id: this.state.user_id, 
    //             // user_name: this.state.user_name, 
    //             token: this.state.token
    //           });          
    //     });     
    //   }

    insertUser=(user)=>{
        var data = {
            NIK: user.NIK,
            ACCESS_TOKEN: user.ACCESS_TOKEN,
            JOB_CODE: user.JOB_CODE,
            LOCATION_CODE: user.LOCATION_CODE,
            REFFERENCE_ROLE: user.REFFERENCE_ROLE,
            USERNAME: user.REFFERENCE_ROLE,
            USER_AUTH_CODE: user.USER_AUTH_CODE,
            USER_ROLE: user.USER_ROLE
        };
        var saved = LoginTaskService.save(data);
        console.log(saved);
    }

    componentWillReceiveProps(newProps) {
		if (!isNil(newProps.auth)) {
			this.setState({ fetching: newProps.auth.fetching });
        }
		if (!isNil(newProps.auth.user)) {
            console.log(newProps.auth.user);
            // console.log(newProps.auth.user.ACCESS_TOKEN);
            // this.setState({token:newProps.auth.user.ACCESS_TOKEN});
            // this.insertUser;
            this.insertUser;
            this.navigateScreen('MainMenu');
            // var ID = realm.objects('trn_login').length + 1;
            // Alert.alert(ID+'');
            // console.log(ID);

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
		this.props.authRequest({
            username: username,
            password: password
        });
        
        // this.navigateScreen('MainMenu');
	}

    render(){
        return(
            <ImageBackground source={require('../Images/background.png')} style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding" >
                    <StatusBar
                        hidden={true}
                        barStyle="light-content"
                    />
                    

                    {/* <Logo/> */}

                    <Form
                        onBtnClick={data=>{this.onLogin(data.strEmail, data.strPassword)}}/>
                        {/* <Form onBtnClick={data=>{this.navigateScreen('HomeNavigation')}}/> */}
                        
                        {/* <Form onBtnClick={data=>{this.navigateScreen('MainTabNavigator')}}/> */}
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>{'\u00A9'} 2018 Copyrights PT Triputra Agro Persada</Text>
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
		auth: state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		authRequest: obj => dispatch(AuthAction.authRequest(obj))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container : {
      flex: 1,
      alignItems:'center',
      justifyContent :'center',
    },
    signupTextCont : {
      flexGrow: 1,
      alignItems:'flex-end',
      justifyContent :'center',
      paddingVertical:16,
      flexDirection:'row'
    },
    signupText: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    },
    signupButton: {
        color:'#ffffff',
        fontSize:16,
        fontWeight:'500',
    },footerView: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    footerText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
  });

