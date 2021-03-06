import React, { Component } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import {
    BackHandler, Text, FlatList, ScrollView, TouchableOpacity, View, Image, Alert, Platform
} from 'react-native';
import {
    Container,
    Content,
    Card,
} from 'native-base';
import { connect } from 'react-redux'
import Colors from '../../Constant/Colors'
import Fonts from '../../Constant/Fonts'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons';
import R from 'ramda'
import { dirPhotoTemuan } from '../../Lib/dirStorage'
import ImagePickerCrop from 'react-native-image-crop-picker'
import random from 'random-string'
import TaskServices from '../../Database/TaskServices'
import RNFS from 'react-native-fs';
const FILE_PREFIX = Platform.OS === "ios" ? "" : "file://";

class FormStep1 extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          headerStyle: {
            backgroundColor: Colors.tintColor
          },
          title: 'Buat Laporan Temuan',
          headerTintColor: '#fff',
          headerTitleStyle: {
            flex: 1,
            fontSize: 18,
            fontWeight: '400'
          },
          headerLeft: (
              <TouchableOpacity onPress={() => {navigation.goBack(null)}}>
                  <Icon2 style={{marginLeft: 12}} name={'ios-arrow-round-back'} size={45} color={'white'} />
              </TouchableOpacity>
          )
        };
    }

    constructor(props) {
        super(props);
        
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.clearFoto = this.clearFoto.bind(this);

        this.state = {
            user: TaskServices.getAllData('TR_LOGIN')[0],
            photos: [],
            selectedPhotos: [],
            stepper: [
                { step: '1', title: 'Ambil Photo' },
                { step: '2', title: 'Tulis Keterangan' }
            ],
            latitude: 0.0,
            longitude: 0.0,
            fetchLocation: false,
            isMounted: false,
        }
    }

    clearFoto(){
        if(this.state.photos.length > 0){
            this.state.photos.map(item =>{                
                RNFS.unlink(item.uri)
            })
        }
        this.props.navigation.goBack(null); 
    }

    componentDidMount() {
       this.getLocation();
       this.props.navigation.setParams({ clearFoto: this.clearFoto })
       BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackButtonClick() { 
        this.clearFoto()
        return false;
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var lat = parseFloat(position.coords.latitude);
                var lon = parseFloat(position.coords.longitude);
                // const timestamp = convertTimestampToDate(position.timestamp, 'DD/MM/YYYY HH:mm:ss')//moment(position.timestamp).format('DD/MM/YYYY HH:mm:ss');
                // console.log(timestamp);
                this.setState({latitude:lat, longitude:lon, fetchLocation: false});

            },
            (error) => {
                let message = error && error.message ? error.message : 'Terjadi kesalahan ketika mencari lokasi anda !';
                if (error && error.message == "No location provider available.") {
                    message = "Mohon nyalakan GPS anda terlebih dahulu.";
                }
                this.setState({fetchLocation:false})
                alert('Informasi', message);
                // console.log(message);
            }, // go here if error while fetch location
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }, //enableHighAccuracy : aktif highaccuration , timeout : max time to getCurrentLocation, maximumAge : using last cache if not get real position
        );
    }
    
    // exitAlert = () => {
    //     if (this.state.photos.length == 0) {
    //         this.props.navigation.goBack(null)
    //     } else {
    //         Alert.alert(
    //             'Peringatan',
    //             'Transaksi kamu tidak akan tersimpan, kamu yakin akan melanjutkan?',
    //             [
    //                 { text: 'NO', style: 'cancel' },
    //                 { text: 'YES', onPress: () => this.props.navigation.goBack(null) }
    //             ]
    //         );
    //     }

    // };

    // handleAndroidBackButton = callback => {
    //     BackHandler.addEventListener('hardwareBackPress', () => {
    //         callback();
    //         return true;
    //     });
    // };

    componentDidMount() {
        // this.handleAndroidBackButton(this.exitAlert);
    }

    onBtnClick() {
        if (this.state.photos.length == 0) {
            Alert.alert(
                'Peringatan',
                'Anda belum mengambil foto'
            );
        } else if (this.state.selectedPhotos.length == 0) {
            Alert.alert(
                'Peringatan',
                "Minimal harus ada 1 Foto dipilih"
            );
        } else {
            let images = [];
            this.state.selectedPhotos.map((item) => {
                let da = item.split('/')
                let imgName = da[da.length-1];
                images.push(imgName);
                const navigation = this.props.navigation;
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Step2', params:{image: images, lat: this.state.latitude, lon:this.state.longitude} })],
                });
                navigation.dispatch(resetAction);

            });
        }
    }

    onRefresh = image =>{
        const photos = R.clone(this.state.photos)
        photos.push({ uri: FILE_PREFIX+image, index: photos.length })
        this.setState({
            photos,
        });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    takePicture() {
        this.props.navigation.navigate('TakeFoto', {onRefresh: this.onRefresh, authCode: this.state.user.USER_AUTH_CODE})
    }

    _onSelectedPhoto = foto => {
        const selectedPhotos = R.clone(this.state.selectedPhotos)
        if (selectedPhotos.includes(foto)) {
            var index = selectedPhotos.indexOf(foto);
            selectedPhotos.splice(index, 1);
        } else {
            if (selectedPhotos.length > 2) {
                alert("Hanya 3 foto yang bisa dipilih")
            } else {
                selectedPhotos.push(foto);
            }
        }

        this.setState({
            selectedPhotos,
        });
    }

    _renderFoto = (foto) => {
        let border = { borderWidth: 0 }
        {
            if (this.state.selectedPhotos.includes(foto.uri)) {
                border = { borderWidth: 5, borderColor: 'red' }
            }
        }

        return (
            <TouchableOpacity
                onPress={() => { this._onSelectedPhoto(foto.uri) }}
                style={{ height: 100, width: 100, marginLeft: 10 }}
                key={foto.index}>
                <Image style={[{
                    alignItems: 'stretch', width: 100, height: 100,
                    borderRadius: 10
                }, border]} source={foto} />
            </TouchableOpacity>
        )
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
                        <ScrollView contentContainerStyle={{ paddingRight: 16, paddingLeft: 6 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {this.state.photos.map(this._renderFoto)}
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

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormStep1);

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