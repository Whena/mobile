import React, { Component } from 'react';
import { TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import {
    Container,
    Content,
    Text,
    View
} from 'native-base';
import Colors from '../../Constant/Colors'
import Fonts from '../../Constant/Fonts'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

class KondisiBaris extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stepper: [
                { step: '1', title: 'Pilih Lokasi' },
                { step: '2', title: 'Kondisi Baris' },
                { step: '3', title: 'Summary' },
            ],
        }
    }

    render() {
        const initialPage = '3';
        return (
            <Container style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
                <Content>
                    <View style={{ backgroundColor: 'white', padding: 16 }}>
                        {/* STEPPER */}
                        <FlatList
                            style={[style.stepperContainer]}
                            horizontal
                            data={this.state.stepper}
                            getItemLayout={this.getItemLayout}
                            initialScrollIndex={Number(initialPage) - 1}
                            initialNumToRender={2}
                            renderItem={({ item: rowData }) => {
                                return (
                                    <View
                                        style={[
                                            style.stepperListContainer
                                        ]}
                                    >
                                        <View
                                            style={[
                                                style.stepperNumber,
                                                {
                                                    backgroundColor:
                                                        rowData.step === initialPage
                                                            ? Colors.buttonDisabled
                                                            : Colors.brand
                                                }
                                            ]}>
                                            <Text style={style.stepperNumberText}>{rowData.step}</Text>
                                        </View>
                                        <Text
                                            style={[
                                                Fonts.style.caption,
                                                { paddingLeft: 3, color: rowData.step == initialPage ? Colors.buttonDisabled : Colors.brand }
                                            ]}
                                        >
                                            {rowData.title}
                                        </Text>
                                        {rowData.step !== '3' && (
                                            <View style={{ flex: 1 }}>
                                                <Icon
                                                    name="chevron-right"
                                                    size={24}
                                                    color={Colors.brand}
                                                    style={style.stepperNext}
                                                />
                                            </View>
                                        )}
                                    </View>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()} />

                        <View style={style.lContent}>
                            <View style={{ flex: 2 }}>
                                <Image source={require('../assets/icon/ic_walking.png')} style={style.icon} />
                            </View>
                            <View style={{ flex: 7 }}>
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>Sambil Jalan</Text>
                                <Text style={{ fontSize: 12, color: 'grey' }}>Kamu bisa input ini ketika berjalan disepanjang baris.</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 20, backgroundColor: 'white', padding: 16 }}>

                        <View style={style.lContent}>
                            <Text style={style.txtLabel}>Pokok Panen</Text>
                            <View style={[style.containerInput, { flex: 5 }]}>
                                <TouchableOpacity style={style.btnMinus}>
                                    <Icon2 name={"minus"} size={20} color="white" />
                                </TouchableOpacity>
                                <TextInput
                                    underlineColorAndroid={'transparent'}
                                    style={[style.searchInput]} />
                                <TouchableOpacity style={style.btnAdd}>
                                    <Icon name={"add"} size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[style.lContent, { marginTop: 10 }]}>
                            <Text style={style.txtLabel}>Buah Tinggal</Text>
                            <View style={[style.containerInput, { flex: 5 }]}>
                                <TouchableOpacity style={style.btnMinus}>
                                    <Icon2 name={"minus"} size={20} color="white" />
                                </TouchableOpacity>
                                <TextInput
                                    underlineColorAndroid={'transparent'}
                                    style={[style.searchInput]} />
                                <TouchableOpacity style={style.btnAdd}>
                                    <Icon name={"add"} size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[style.lContent, { marginTop: 10 }]}>
                            <Text style={style.txtLabel}>Brondolan di Piringan</Text>
                            <View style={[style.containerInput, { flex: 5 }]}>
                                <TouchableOpacity style={style.btnMinus}>
                                    <Icon2 name={"minus"} size={20} color="white" />
                                </TouchableOpacity>
                                <TextInput
                                    underlineColorAndroid={'transparent'}
                                    style={[style.searchInput]} />
                                <TouchableOpacity style={style.btnAdd}>
                                    <Icon name={"add"} size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[style.lContent, { marginTop: 10 }]}>
                            <Text style={[style.txtLabel, { fontWeight: '300' }]}>Brondolan di TPH</Text>
                            <View style={[style.containerInput, { flex: 5 }]}>
                                <TouchableOpacity style={style.btnMinus}>
                                    <Icon2 name={"minus"} size={20} color="white" />
                                </TouchableOpacity>
                                <TextInput
                                    underlineColorAndroid={'transparent'}
                                    style={[style.searchInput]} />
                                <TouchableOpacity style={style.btnAdd}>
                                    <Icon name={"add"} size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[style.lContent, { marginTop: 10 }]}>
                            <Text style={[style.txtLabel, { fontWeight: '300' }]}>Pokok di Pupuk</Text>
                            <View style={[style.containerInput, { flex: 5 }]}>
                                <TouchableOpacity style={style.btnMinus}>
                                    <Icon2 name={"minus"} size={20} color="white" />
                                </TouchableOpacity>
                                <TextInput
                                    underlineColorAndroid={'transparent'}
                                    style={[style.searchInput]} />
                                <TouchableOpacity style={style.btnAdd}>
                                    <Icon name={"add"} size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

export default KondisiBaris;

const style = {
    stepperContainer: {
        flexDirection: 'row',
        height: 48
    },
    stepperListContainer: { flexDirection: 'row', flex: 1, alignItems: 'center', alignContent: 'center' },
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
    lContent: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justilistContainerfyContent: 'center'
    },
    searchInput: {
        height: 40,
        padding: 10,
        marginRight: 5,
        marginLeft: 5,
        flex: 1,
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#989898',
        color: '#808080',
        textAlign: 'center'
    },
    txtLabel: {
        flex: 3,
        color: 'grey',
        fontSize: 15,

    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    btnMinus: {
        borderWidth: 1,
        borderColor: '#cca300',
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        backgroundColor: '#e6b800',
        borderRadius: 100,

    },
    btnAdd: {
        borderWidth: 1,
        borderColor: '#00e639',
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        backgroundColor: Colors.brand,
        borderRadius: 100,
    },
    icon: {
        alignContent: 'flex-end',
        height: 64,
        width: 64,
        resizeMode: 'stretch',
        alignItems: 'center'
    }
};