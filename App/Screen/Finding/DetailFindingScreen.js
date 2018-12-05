import React, { Component } from 'react'
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native'
import Colors from '../../Constant/Colors'
import FastImage from 'react-native-fast-image'
import {
    Container,
    Content,
    Spinner,
    Card
} from 'native-base'
import * as Progress from 'react-native-progress'
import Carousel from 'react-native-carousel-view'

export default class DetailFindingScreen extends Component {

    constructor(props) {
        super(props);
        var cars = [
            {
                title: 'Gawi Inti A-001/A01',
                path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPrCjm27FwGkHdJd0Fa_VxBsgJEQJRLUp8m_GcN-eIeQCiSpDM'
            },
            {
                title: 'Gawi Inti A-002/A02',
                path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrEFrld0EZZ5XoLsJGL5FqIitpuOIlTyfCwgF0NeZvdhkuXTTi'
            }
        ]

        this.state = {
            cars
        }
    }
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

    _renderCarousel = item => {
        return (
            <View style={{ height: 200, flex: 1 }}>
                <FastImage style={{ alignItems: 'center', width: '100%', height: 200 }}
                    source={{
                        uri: item.path,
                        priority: FastImage.priority.normal,
                    }} />

                <View style={{
                    backgroundColor: 'rgba(244, 131, 65, 0.7)', width: '100%',
                    padding: 5, position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>{item.title}</Text>
                </View>
            </View>
        )
    }

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

                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 16
                    }}>
                        <Carousel
                            height={200}
                            indicatorOffset={30}
                            animate={false}
                            indicatorSize={15}
                            indicatorColor="red"
                        >
                            {this.state.cars.map(this._renderCarousel)}

                        </Carousel>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 16 }}>
                        <Image style={{ alignItems: 'stretch', width: 28, height: 40 }}
                            source={require('../../Images/icon/ic_map_point_green.png')}></Image>
                        <View style={{ flex: 2, marginLeft: 16 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Gawi Inti 1-A-A01/001</Text>

                            <View style={styles.column}>
                                <Text style={styles.label}>Kategori </Text>
                                <Text style={styles.item}>: Jalan Rusak </Text>
                            </View>

                            <View style={styles.column}>
                                <Text style={styles.label}>Priority </Text>
                                <Text style={styles.item}>: Tinggi </Text>
                            </View>

                            <View style={styles.column}>
                                <Text style={styles.label}>Batas Waktu </Text>
                                <Text style={styles.item}>: 20 Desember 2018, 11.30 </Text>
                            </View>

                            <View style={styles.column}>
                                <Text style={styles.label}>Ditugaskan Kepada </Text>
                                <Text style={styles.item}>: Ahmad Barokah</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.title}>Deskripsi:</Text>
                    <Text style={{ fontSize: 14 }}>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</Text>

                    <View style={{ flex: 1 }}>
                        <Text style={[styles.title, { marginBottom: 5 }]}>Progress:</Text>
                        <View>
                            <Progress.Bar showsText={true} height={20}
                                color={Colors.brand} width={null} progress={0.6} />
                            <Text style={{
                                height: 20,
                                textAlignVertical: 'center',
                                fontSize: 10, position: 'absolute',
                                marginLeft: 10, color: 'white'
                            }}>60%</Text>
                        </View>
                    </View>


                    <Text style={styles.title}>Bukti Kerja:</Text>
                    <Card style={[styles.cardContainer]}>
                        <TouchableOpacity style={{ padding: 70 }}
                            onPress={() => { }}
                        >
                            <Image style={{
                                alignSelf: 'center', alignItems: 'stretch',
                                width: 55, height: 55
                            }}
                                source={require('../../Images/icon/ic_camera_big.png')}></Image>
                        </TouchableOpacity>
                    </Card>

                    <TouchableOpacity style={[styles.button, { marginTop: 16, marginBottom: 30 }]}
                        onPress={() => { }}>
                        <Text style={styles.buttonText}>Simpan</Text>
                    </TouchableOpacity>

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
    },
    label: {
        width: '40%',
        fontSize: 14
    },
    column: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 3
    },
    item: {
        width: '60%',
        color: "#999",
        fontSize: 14
    }, title: {
        fontWeight: 'bold',
        fontSize: 15,
        flex: 1,
        marginTop: 16
    },
    cardContainer: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#eee',
        borderColor: '#ddd'
    }, button: {
        width: 200,
        backgroundColor: Colors.brand,
        borderRadius: 25,
        padding: 15,
        alignSelf: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center'
    },
});