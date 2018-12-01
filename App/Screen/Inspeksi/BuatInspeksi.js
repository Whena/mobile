import React from 'react';
import { TouchableOpacity, FlatList, TextInput } from 'react-native';
import {
    Container,
    Content,
    Body,
    Text,
    View,
    Image,
    Header,
    Left,
    Right,
    Button,
    Title
} from 'native-base';
import Colors from '../../Constant/Colors'
import Fonts from '../../Constant/Fonts'
import Icon from 'react-native-vector-icons/MaterialIcons';

class BuatInspeksi extends React.Component {

    // static navigationOptions = ({ navigation }) => ({
    //     header: navigation.state.params ? navigation.state.params.header : undefined
    // });

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

        const initialPage = '1';
        return (
            <Container >
                <Content style={{ flex: 1 }}>

                    {/* STEPPER */}
                    <FlatList
                        style={style.stepperContainer}
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
                                            { paddingRight: rowData.step === '4' ? 16 : 0 }
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
                                                {
                                                    paddingLeft: 10,
                                                    color: rowData.step == initialPage ? Colors.brand : Colors.textSecondary
                                                }
                                            ]}
                                        >
                                            {rowData.title}
                                        </Text>
                                        {rowData.step !== '4' && (
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

                    <View style={style.lContent}>
                        <Text style={{ flex: 3, color: '#696969' }}>Blok</Text>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            style={[style.searchInput, { flex: 7 }]} />
                    </View>
                    <View style={style.lContent}>
                        <Text style={{ flex: 3, color: '#696969' }}>Baris</Text>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            style={[style.searchInput, { flex: 7 }]} />
                    </View>
                    <View style={{ height: 1, backgroundColor: '#D3D3D3', flex: 1, margin: 10 }} />
                    <Text style={style.txtLabel}>Pastikan kamu telah berada dilokasi yang benar</Text>

                    <TouchableOpacity style={[style.button, { marginTop: 250 }]}>
                        <Text style={style.buttonText}>Mulai Inspeksi</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        )
    }
}

export default BuatInspeksi;

const style = {
    stepperContainer: {
        flexDirection: 'row',
        height: 48,
        // backgroundColor: Colors.stepper
    },
    stepperListContainer: { flexDirection: 'row', flex: 1, alignItems: 'center', paddingLeft: 10 },
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    searchInput: {
        height: 40,
        padding: 10,
        marginRight: 5,
        flex: 1,
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#989898',
        color: '#808080',
    },
    txtLabel: {
        color: Colors.brand,
        fontSize: 18,
        padding: 10, textAlign: 'center'
    },
    button: {
        width: 100,
        backgroundColor: Colors.brand,
        borderRadius: 25,
        padding: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center'
    }
};