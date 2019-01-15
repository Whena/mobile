import React, { Component } from 'react';
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
import Icon2 from 'react-native-vector-icons/Ionicons';
import R from 'ramda'
import { dirPhotoTemuan } from '../../Lib/dirStorage'
import {getTodayDate} from '../../Lib/Utils'
import random from 'random-string'
import TaskServices from '../../Database/TaskServices'
const FILE_PREFIX = Platform.OS === "ios" ? "" : "file://";

class FormStep1 extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          headerStyle: {
            backgroundColor: Colors.tintColor
          },
          title: 'Bukti Kerja',
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
        
        var ID = this.props.navigation.state.params.findingCode

        var user = TaskServices.getAllData('TR_LOGIN')[0];
        this.state = {
            user,
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
            TRANS_CODE: ID//'F' + user.USER_AUTH_CODE + random({ length: 3 }).toUpperCase(),
        }
    }

    clearFoto(){
        // if(this.state.hasPhoto){
        //   RNFS.unlink(this.state.path);
        //   RNFS.unlink(this.state.pathCacheInternal);
        //   RNFS.unlink(this.state.pathCacheResize);
        //   this.setState({ pathView: '', hasPhoto: false });
        // }
        this.props.navigation.goBack(nul); 
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
        this.props.navigation.goBack(null); 
        return true;
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
            }, // go here if error while fetch location
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }, //enableHighAccuracy : aktif highaccuration , timeout : max time to getCurrentLocation, maximumAge : using last cache if not get real position
        );
    }

    componentDidMount() {
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
                item = item.substring(7);
                var pname = 'F' + this.state.user.USER_AUTH_CODE + random({ length: 3 }).toUpperCase() + ".jpg";
                var img = {
                    TR_CODE: this.state.TRANS_CODE,
                    IMAGE_CODE: pname.replace(".jpg", ""),
                    IMAGE_NAME: imgName,
                    IMAGE_PATH_LOCAL: item,
                    IMAGE_URL: '',
                    STATUS_IMAGE: 'SESUDAH',
                    INSERT_USER: this.state.user.USER_AUTH_CODE,
                    INSERT_TIME: getTodayDate('YYYY-MM-DD HH:mm:ss')
                }               
                images.push(img);
            });
            this.props.navigation.state.params.onLoadImage(images);
            this.props.navigation.goBack(); 
        }
    }

    addImage = image =>{
        const photos = R.clone(this.state.photos)
        photos.push({ uri: FILE_PREFIX+image, index: photos.length })
        this.setState({
            photos,
        });
    }

    takePicture() {
        this.props.navigation.navigate('TakeFotoBukti', {addImage: this.addImage, authCode: this.state.user.USER_AUTH_CODE, from: 'BuktiKerja'})
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
                <Content style={{ flex: 1, marginTop: 30 }}>
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