import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Colors from '../../Constant/Colors'
import FastImage from 'react-native-fast-image'
import {
    Container,
    Content,
    Spinner
} from 'native-base';

export default class DetailFindingScreen extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.tintColor
        },
        headerTitleStyle: {
            textAlign: "left",
            flex: 1,
            fontSize: 18,
            fontWeight: '400'
        },
        title: 'Detail Temuan',
        headerTintColor: '#fff'
    };

    render() {
        return (
            <Container style={{ flex: 1, backgroundColor: 'white' }}>
                <Content style={{ flex: 1, padding: 16, }}>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <FastImage style={{ marginRight: 16, width: 40, height: 40, borderRadius: 10 }}
                            resizeMode={FastImage.resizeMode.cover}
                            source={{
                                uri: "https://cdns.klimg.com/merdeka.com/i/w/news/2018/04/08/961377/670x335/klhk-dan-bupati-inhu-digugat-terkait-izin-pembebasan-hutan.jpg",
                                priority: FastImage.priority.normal,
                            }} />
                        <View style={{ flex: 1 }} >
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Detail Temuan</Text>
                            <Text style={{ fontSize: 12, color: 'grey', marginTop: 3 }}>
                                Kamis, 01 November 2018 | 11.00 - 11.30
                        </Text>
                        </View>
                    </View>

                    <View style={{ height: 200, flex: 1, marginTop: 24 }}>
                        <Image style={{ alignItems: 'center', width: '100%', height: 200, borderRadius: 10 }} source={require('../../Images/forest.jpg')}></Image>

                        <View style={{
                            borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                            backgroundColor: 'rgba(244, 131, 65, 0.7)', width: '100%',
                            padding: 5, position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 14, color: 'white' }}>Gawi Inti A-001/A01</Text>
                        </View>
                    </View>
                </Content >
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 16
    }
});