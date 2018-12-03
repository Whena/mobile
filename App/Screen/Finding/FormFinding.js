import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Colors from '../../Constant/Colors'
import FindingFormNavigator from './FindingFormNavigator'

class FormFinding extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.tintColor
        },
        title: 'Buat Laporan Penemuan',
        headerTintColor: '#fff',
        headerTitleStyle: {
            flex: 1,
            fontSize: 18,
            fontWeight: '400'
        },
    };


    render() {
        return (
            <View style={styles.container}>
                <FindingFormNavigator />
            </View >
        )
    }
}

export default FormFinding;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    }
});