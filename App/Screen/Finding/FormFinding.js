import React, { Component } from 'react';
import {
    Text, FlatList, TextInput, StyleSheet, TouchableOpacity, View, Image, StatusBar,
    Button,
} from 'react-native';
import {
    Container,
    Content,
    Card,
    CardItem,
} from 'native-base';
import Colors from '../../Constant/Colors'
import Fonts from '../../Constant/Fonts'
import Icon from 'react-native-vector-icons/MaterialIcons';

class FormFinding extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stepper: [
                { step: '1', title: 'Pilih Lokasi' },
                { step: '2', title: 'Kondisi Baris' }
            ],
        }
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.tintColor
        },
        title: 'Form Temuan',
        headerTintColor: '#fff',
        headerTitleStyle: {
            flex: 1,
            fontSize: 18,
            fontWeight: '400'
        },
    };

    onBtnClick() {
        this.props.navigation.navigate('KondisiBarisMain');
    }

    render() {

        const initialPage = '1';
        return (
            <Container style={{ flex: 1, backgroundColor: 'white' }}>
                <Content style={{ flex: 1 }}>
                    {/* STEPPER */}
                    <FlatList
                        style={[style.stepperContainer, { margin: 15 }]}
                        horizontal
                        data={this.state.stepper}
                        getItemLayout={this.getItemLayout}
                        initialScrollIndex={Number(initialPage) - 1}
                        initialNumToRender={3}
                        renderItem={({ item: rowData }) => {
                            return (
                                <TouchableOpacity>
                                    <View
                                        style={[
                                            style.stepperListContainer,
                                            { paddingRight: rowData.step === '3' ? 16 : 0 }
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
                                        {rowData.step !== '3' && (
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

                    <Card style={[style.cardContainer, { marginTop: 20 }]}>
                        <CardItem>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: '#696969' }}>Blok</Text>
                                <TextInput
                                    underlineColorAndroid={'transparent'}
                                    style={[style.searchInput]} />
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: '#696969' }}>Baris</Text>
                                <TextInput
                                    underlineColorAndroid={'transparent'}
                                    style={[style.searchInput, { flex: 1 }]} />
                            </View>
                        </CardItem>
                    </Card>

                    <Text style={style.txtLabel}>Pastikan kamu telah berada dilokasi yang benar</Text>

                    <TouchableOpacity style={[style.button, { marginTop: 180 }]}
                        onPress={() => this.onBtnClick()}>
                        <Text style={style.buttonText}>Mulai Inspeksi</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        )
    }
}

export default FormFinding;

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
        backgroundColor: '#ff8080',
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
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    }
};