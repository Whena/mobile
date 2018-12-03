import React, { Component } from 'react';
import {
    Text, FlatList, ScrollView, TouchableOpacity, View, Image, Dimensions
} from 'react-native';
import {
    Container,
    Content,
    Card,
} from 'native-base';
import Colors from '../../Constant/Colors'
import Fonts from '../../Constant/Fonts'
import Icon from 'react-native-vector-icons/MaterialIcons';
import R, { isEmpty } from 'ramda';
import { dirPicutures } from '../../Lib/dirStorage';
import ImagePicker from 'react-native-image-picker';
const moment = require('moment');

class FormStep1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foto1: "",
            foto2: "",
            foto3: "",
            stepper: [
                { step: '1', title: 'Ambil Photo' },
                { step: '2', title: 'Tulis Keterangan' }
            ],
        }
    }

    onBtnClick() {
        const params = {
            foto1: this.state.foto1,
            foto2: this.state.foto2,
            foto3: this.state.foto3
        }
        
        this.props.navigation.navigate('Step2', params)
    }

    takePicture() {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: dirPicutures,
            },
        };

        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                if (isEmpty(this.state.foto1)) {
                    this.setState({
                        foto1: source,
                    });
                } else if (isEmpty(this.state.foto2)) {
                    this.setState({
                        foto2: source,
                    });
                } else {
                    this.setState({
                        foto3: source,
                    });
                }
            }


        });
    }

    render() {
        const initialPage = '1';
        return (
            <Container style={{ flex: 1, backgroundColor: 'white' }}>
                <Content style={{ flex: 1 }}>
                    {/* STEPPER */}
                    <FlatList
                        style={[style.stepperContainer, { margin: 15, alignSelf: 'center' }]}
                        horizontal
                        data={this.state.stepper}
                        getItemLayout={this.getItemLayout}
                        initialScrollIndex={Number(initialPage) - 1}
                        initialNumToRender={2}
                        renderItem={({ item: rowData }) => {
                            return (
                                <TouchableOpacity>
                                    <View
                                        style={[
                                            style.stepperListContainer,
                                            { paddingRight: rowData.step === '2' ? 16 : 0 }
                                        ]}
                                    >
                                        <View
                                            style={[
                                                style.stepperNumber,
                                                {
                                                    backgroundColor:
                                                        rowData.step === initialPage
                                                            ? Colors.brand
                                                            : Colors.buttonDisabled
                                                }
                                            ]}
                                        >
                                            <Text style={style.stepperNumberText}>{rowData.step}</Text>
                                        </View>
                                        <Text
                                            style={[
                                                Fonts.style.caption,
                                                { paddingLeft: 3, color: rowData.step == initialPage ? Colors.brand : Colors.textSecondary }
                                            ]}
                                        >
                                            {rowData.title}
                                        </Text>
                                        {rowData.step !== '2' && (
                                            <View style={{ flex: 1 }}>
                                                <Icon
                                                    name="chevron-right"
                                                    size={24}
                                                    color={Colors.buttonDisabled}
                                                    style={style.stepperNext}
                                                />
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    <Card style={[style.cardContainer]}>
                        <TouchableOpacity style={{ padding: 70 }}
                            onPress={() => { this.takePicture() }}
                        >
                            <Image style={{
                                alignSelf: 'center', alignItems: 'stretch',
                                width: 55, height: 55
                            }}
                                source={require('../../Images/icon/ic_camera_big.png')}></Image>
                        </TouchableOpacity>
                    </Card>

                    <View style={{ marginTop: 16, height: 120 }}>
                        <ScrollView style={{ alignSelf: 'center' }} contentContainerStyle={{ paddingRight: 16, paddingLeft: 6 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {!isEmpty(this.state.foto1) && (
                                <View style={{ height: 100, width: 100, marginLeft: 10 }}>
                                    <Image style={{ alignItems: 'stretch', width: 100, height: 100, borderRadius: 10 }}
                                        source={this.state.foto1}></Image>
                                </View>
                            )}

                            {!isEmpty(this.state.foto2) && (
                                <View style={{ height: 100, width: 100, marginLeft: 10 }}>
                                    <Image style={{ alignItems: 'stretch', width: 100, height: 100, borderRadius: 10 }}
                                        source={this.state.foto2}></Image>
                                </View>
                            )}

                            {!isEmpty(this.state.foto3) && (
                                <View style={{ height: 100, width: 100, marginLeft: 10 }}>
                                    <Image style={{ alignItems: 'stretch', width: 100, height: 100, borderRadius: 10 }}
                                        source={this.state.foto3}></Image>
                                </View>
                            )}

                        </ScrollView >
                    </View>

                    <TouchableOpacity style={[style.button, { marginTop: 16 }]}
                        onPress={() => this.onBtnClick()}>
                        <Text style={style.buttonText}>Pilih</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        )
    }
}

export default FormStep1;

const style = {
    stepperContainer: {
        flexDirection: 'row',
        height: 48,
    },
    stepperListContainer: { flexDirection: 'row', flex: 1, alignItems: 'center' },
    stepperNumber: {
        height: 24,
        width: 24,
        backgroundColor: Colors.buttonDisabled,
        borderRadius: 12,
        justifyContent: 'center'
    },
    stepperNumberText: [Fonts.style.caption, { textAlign: 'center', color: Colors.textDark }],
    stepperNext: { alignSelf: 'flex-end', paddingRight: 4 },
    sectionHeader: [
        Fonts.style.caption,
        { color: Colors.textSecondary, paddingLeft: 16, paddingTop: 16, paddingBottom: 8 }
    ],
    listContainer: {
        height: 80,
        backgroundColor: Colors.background,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.border
    },
    lContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
        marginRight: 5,
        flex: 1,
        fontSize: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#808080',
        color: '#808080',
    },
    txtLabel: {
        color: Colors.brand,
        fontSize: 17,
        padding: 10, textAlign: 'center', fontWeight: '400'
    },
    button: {
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
    cardContainer: {
        flex: 1,
        marginRight: 16,
        marginLeft: 16,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#eee',
        borderColor: '#ddd'
    }
};