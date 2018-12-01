import React, { Component } from 'react';
import { TouchableOpacity, FlatList, TextInput, Image, Alert } from 'react-native';
import {
    Container,
    Content,
    Body,
    Text,
    View,
    ListItem
} from 'native-base';
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RNSlidingButton, SlideDirection } from 'rn-sliding-button';

class ToggleButton extends React.Component {

    render() {
      return (
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' style={styles.bubblechoice} onPress={this.props.onPress}>
            <Image style={styles.bubblechoice} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}>
              <View style={[styles.overlay, this.props.selected ? {backgroundColor: 'rgba(80,94,104,0)'} : {}]}>
                <Text style={styles.choicetext}>{this.props.label}</Text>
              </View>
            </Image>
        </TouchableHighlight>
      );
    }
  }
  

class KondisiBarisDiUjung extends Component {

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


    // use in your class
    onSlideRight = () => {
        //perform Action on slide success.
        Alert.alert('Slide Success');
    };


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
                                            ]}
                                        >
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
                            keyExtractor={(item, index) => index.toString()}
                        />

                        <View style={style.lContent}>
                            <View style={{ flex: 2 }}>
                                <Image source={require('../assets/icon/ic_finish_walking.png')} style={style.icon} />
                            </View>
                            <View style={{ flex: 7 }}>
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>Sambil Jalan</Text>
                                <Text style={{ fontSize: 12, color: 'grey' }}>Kamu bisa input ini ketika berjalan disepanjang baris.</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', padding: 16, marginTop: 12 }}>
                        <Text>Perawatan</Text>
                        <View style={{ height: 1, backgroundColor: '#989898', marginBottom: 5, marginTop: 5 }} />

                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'grey' }}>- Piringan</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[style.button]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Baik</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button,]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Sedang</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Buruk</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'grey' }}>- Pasar Pikul</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[style.button]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Baik</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button,]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Sedang</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Buruk</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'grey' }}>- TPH</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[style.button]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Baik</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button,]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Sedang</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Buruk</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'grey' }}>- Gawangan</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[style.button]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Baik</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button,]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Sedang</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Buruk</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'grey' }}>- Prunning</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[style.button]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Baik</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button,]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Sedang</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Buruk</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'grey' }}>- Titi Panen</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[style.button]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Baik</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button,]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Sedang</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Buruk</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', padding: 16, marginTop: 12 }}>
                        <Text>Pemupukan</Text>
                        <View style={{ height: 1, backgroundColor: '#989898', marginBottom: 5, marginTop: 5 }} />

                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'grey' }}>- Sistem Penaburan</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[style.button]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Baik</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button,]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Sedang</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Buruk</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'grey' }}>- Kondisi Pupuk</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[style.button]}
                                    ref="pupuk"
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Baik</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button,]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Sedang</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.button]}
                                    onPress={() => { }}>
                                    <Text style={style.buttonText}>Buruk</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 32, marginBottom: 16 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <RNSlidingButton
                                    style={{ width: 240, color: Colors.tintColor, borderRadius: 50, backgroundColor: Colors.tintColor }}
                                    height={48}
                                    onSlidingSuccess={this.onSlideRight}
                                    slideDirection={SlideDirection.RIGHT}
                                    color={Colors.tintColor}>
                                    <View>
                                        <Text numberOfLines={1} style={style.titleText}>Geser untuk Selesai Baris Ini ></Text>
                                    </View>
                                </RNSlidingButton>
                            </View>
                        </View>
                    </View>

                </Content>
            </Container>
        )
    }
}

export default KondisiBarisDiUjung;

const style = {
    stepperContainer: {
        flexDirection: 'row',
        height: 48
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
    lContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justilistContainerfyContent: 'center',
        padding: 10
    },
    searchInput: {
        height: 40,
        padding: 10,
        marginRight: 5,
        marginLeft: 5,
        flex: 1,
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 15,
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
    button: {
        height: 32,
        width: 100,
        backgroundColor: '#DCDCDC',
        borderRadius: 25,
        margin: 5,
        padding: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonSelect: {
        width: 100,
        backgroundColor: '#ff3333',
        borderRadius: 25,
        padding: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: '#ffffff',
        textAlign: 'center'
    },
    icon: {
        alignContent: 'flex-end',
        height: 64,
        width: 64,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 17,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#ffffff'
    }
};