import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    Alert
} from 'react-native';

import PropTypes from 'prop-types';

class FormLogin extends React.Component {

    // Prop type warnings
    static propTypes = {
        onBtnClick: PropTypes.func,
    };

    // Defaults for props
    static defaultProps = {
        onBtnClick: () => { },
    };

    constructor() {
        super();
        this.state = {
            strEmail: '',
            strPassword: '',
        }
    }

    makeAlert(msg) {
        Alert.alert('Peringatan', msg, [
            {
                text: 'OK'
            }], { cancelable: false })
    }

    onBtnClick(props) {
        Keyboard.dismiss();
        switch (true) {
            case this.state.strEmail === '':
                this.makeAlert('Email tidak boleh kosong');
                break;
            case this.state.strPassword === '':
                this.makeAlert('Password tidak boleh kosong');
            default:
                props.onBtnClick({
                    ...this.state
                });
                break;
        }
    }


    render() {

        const props = this.props;

        return (
            <View style={styles.container}>

                <Image source={require('../Images/logo_mobile_inspection.png')} style={{ width: 300, height: 100, resizeMode: 'stretch', }} />

                {/* // <Text style={styles.tapText}>PT TRIPUTRA ARGO PERSADA</Text> */}
                {/* // <Text style={styles.appText}>Mobile Inspection</Text> */}

                <View style={[styles.sectionInput, { marginTop: 40 }]}>
                    <Image source={require('../Images/icon/ic_login.png')} style={styles.iconInput} />
                    <TextInput
                        style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Email"
                        placeholderTextColor="#51a977"
                        selectionColor="#51a977"
                        keyboardType="email-address"
                        onChangeText={(strEmail) => {this.setState({ strEmail: strEmail.toLocaleLowerCase() }) }}
                        value={this.state.strEmail}
                        onSubmitEditing={() => this.password.focus()} />
                </View>

                <View style={styles.sectionInput}>
                    <Image source={require('../Images/icon/ic_password.png')} style={styles.iconInput} />
                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="#51a977"
                        onChangeText={(strPassword) => { this.setState({ strPassword: strPassword }) }}
                        value={this.state.strPassword}
                        ref={(input) => this.password = input} />
                </View>

                <TouchableOpacity style={[styles.button, { marginTop: 12 }]}
                    onPress={() => this.onBtnClick(props)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default FormLogin;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tapText: {
        height: 41,
        fontSize: 24,
        color: '#FFFFFF'
    },
    appText: {
        fontSize: 15,
        fontStyle: 'italic',
        marginVertical: 10,
        color: '#FFFFFF',
    },
    sectionInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        opacity: 0.67,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        marginVertical: 10,
        borderColor: '#51a977',
        borderWidth: 1
    },
    iconInput: {
        padding: 10,
        marginLeft: 10,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    inputBox: {
        width: 270,
        height: 42,
        fontSize: 16,
        color: '#51a977',
        textAlign: "left",
        paddingVertical: 10

    },
    button: {
        height: 45,
        width: 300,
        backgroundColor: '#51a977',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 10
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }

    // container: {
    //     flexGrow: 10,
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginTop:100
    // },
    // tapText: {
    //     height: 41,
    //     fontSize: 20,
    //     color: '#FFFFFF'
    // },
    // appText: {
    //     fontSize: 15,
    //     fontStyle: 'italic',
    //     color: '#FFFFFF',
    // },
    // sectionInput: {
    //     width: 280,
    //     height: 48,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     opacity: 0.67,
    //     backgroundColor: '#FFFFFF',
    //     borderRadius: 25,
    //     marginVertical: 10
    // },
    // iconInput: {
    //     padding: 10,
    //     marginLeft: 80,
    //     height: 25,
    //     width: 25,
    //     resizeMode: 'stretch',
    //     alignItems: 'center'
    // },
    // inputBox: {
    //     width: 320,
    //     height: 42,
    //     fontSize: 16,
    //     color: '#068D0D',
    //     textAlign: "left",
    //     paddingVertical: 10,

    // },
    // button: {
    //     width: 280,
    //     height: 48,
    //     backgroundColor: '#068D0D',
    //     borderRadius: 25,
    //     marginVertical: 10,
    //     paddingVertical: 10
    // },
    // buttonText: {
    //     fontSize: 16,
    //     fontWeight: '500',
    //     color: '#ffffff',
    //     textAlign: 'center'
    // }
});