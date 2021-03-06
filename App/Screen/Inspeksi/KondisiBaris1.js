import React, { Component } from 'react';
import { TouchableOpacity, View, Alert, Text, TextInput, ScrollView, Image } from 'react-native';
import Colors from '../../Constant/Colors'
import Fonts from '../../Constant/Fonts'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import R from 'ramda';
import TaskServices from '../../Database/TaskServices'
import { getTodayDate } from '../../Lib/Utils'


class KondisiBaris1 extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: Colors.tintColor
        },
        title: 'Kondisi Baris',
        headerTintColor: '#fff',
        headerTitleStyle: {
            flex: 1,
            fontSize: 18,
            fontWeight: '400'
        },
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('FindingFormNavigator', { inspeksiHeader: this.state.inspeksiHeader })}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingRight: 16 }}>
                    <Entypo name='flashlight' size={24} color='white' />
                </View>
            </TouchableOpacity>
        ),
    });

    constructor(props) {
        super(props);

        let params = props.navigation.state.params;
        let fotoBaris = R.clone(params.fotoBaris);
        let inspeksiHeader = R.clone(params.inspeksiHeader);
        let dataUsual = R.clone(params.dataUsual);
        let statusBlok = R.clone(params.statusBlok);
        let intervalId = R.clone(params.intervalId);
        let dataInspeksi = R.clone(params.dataInspeksi);

        this.state = {
            intervalId,
            jumlahPokok: '0',
            pokokPanen: '0',
            buahTinggal: '0',
            brondolPinggir: '0',
            brondolTPH: '0',
            pokokTdkPupuk: '0',
            fotoBaris,
            inspeksiHeader,
            dataUsual,
            statusBlok,
            dataInspeksi

        }
    }

    insertDB() {
        var kondisiBaris1 = []
        var data = {
            BLOCK_INSPECTION_CODE_D: `ID${this.state.dataUsual.USER_AUTH}${getTodayDate('YYYYMMDDHHmmss')}2`,
            BLOCK_INSPECTION_CODE: this.state.dataUsual.BLOCK_INSPECTION_CODE,
            ID_INSPECTION: this.state.dataInspeksi.ID_INSPECTION,
            CONTENT_INSPECTION_CODE: 'CC0002',
            VALUE: this.state.pokokPanen,
            AREAL: this.state.dataUsual.BARIS,
            STATUS_SYNC: 'N',
        }
        kondisiBaris1.push(data);

        data = {
            BLOCK_INSPECTION_CODE_D: `ID${this.state.dataUsual.USER_AUTH}${getTodayDate('YYYYMMDDHHmmss')}3`,
            BLOCK_INSPECTION_CODE: this.state.dataUsual.BLOCK_INSPECTION_CODE,
            ID_INSPECTION: this.state.dataInspeksi.ID_INSPECTION,
            CONTENT_INSPECTION_CODE: 'CC0003',
            VALUE: this.state.buahTinggal,
            AREAL: this.state.dataUsual.BARIS,
            STATUS_SYNC: 'N'
        }
        kondisiBaris1.push(data);

        data = {
            BLOCK_INSPECTION_CODE_D: `ID${this.state.dataUsual.USER_AUTH}${getTodayDate('YYYYMMDDHHmmss')}4`,
            BLOCK_INSPECTION_CODE: this.state.dataUsual.BLOCK_INSPECTION_CODE,
            ID_INSPECTION: this.state.dataInspeksi.ID_INSPECTION,
            CONTENT_INSPECTION_CODE: 'CC0004',
            VALUE: this.state.brondolPinggir,
            AREAL: this.state.dataUsual.BARIS,
            STATUS_SYNC: 'N'
        }
        kondisiBaris1.push(data);

        data = {
            BLOCK_INSPECTION_CODE_D: `ID${this.state.dataUsual.USER_AUTH}${getTodayDate('YYYYMMDDHHmmss')}5`,
            BLOCK_INSPECTION_CODE: this.state.dataUsual.BLOCK_INSPECTION_CODE,
            ID_INSPECTION: this.state.dataInspeksi.ID_INSPECTION,
            CONTENT_INSPECTION_CODE: 'CC0005',
            VALUE: this.state.brondolTPH,
            AREAL: this.state.dataUsual.BARIS,
            STATUS_SYNC: 'N'
        }
        kondisiBaris1.push(data);

        data = {
            BLOCK_INSPECTION_CODE_D: `ID${this.state.dataUsual.USER_AUTH}${getTodayDate('YYYYMMDDHHmmss')}6`,
            BLOCK_INSPECTION_CODE: this.state.dataUsual.BLOCK_INSPECTION_CODE,
            ID_INSPECTION: this.state.dataInspeksi.ID_INSPECTION,
            CONTENT_INSPECTION_CODE: 'CC0006',
            VALUE: this.state.pokokTdkPupuk,
            AREAL: this.state.dataUsual.BARIS,
            STATUS_SYNC: 'N'
        }
        kondisiBaris1.push(data);

        this.props.navigation.navigate('KondisiBaris2', {
            fotoBaris: this.state.fotoBaris,
            inspeksiHeader: this.state.inspeksiHeader,
            kondisiBaris1: kondisiBaris1,
            dataUsual: this.state.dataUsual,
            statusBlok: this.state.statusBlok,
            intervalId: this.state.intervalId,
            dataInspeksi: this.state.dataInspeksi
        });
    }

    increaseNumber(param) {
        var sum = 0;
        switch (param) {
            case 'JP':
                sum = parseInt(this.state.jumlahPokok) + 1;
                this.setState({ jumlahPokok: sum.toString() })
                break;
            case 'PP':
                sum = parseInt(this.state.pokokPanen) + 1;
                this.setState({ pokokPanen: sum.toString() })
                break;
            case 'BT':
                sum = parseInt(this.state.buahTinggal) + 1;
                this.setState({ buahTinggal: sum.toString() })
                break;
            case 'BP':
                sum = parseInt(this.state.brondolPinggir) + 1;
                this.setState({ brondolPinggir: sum.toString() })
                break;
            case 'BTP':
                sum = parseInt(this.state.brondolTPH) + 1;
                this.setState({ brondolTPH: sum.toString() })
                break;
            case 'PTP':
                sum = parseInt(this.state.pokokTdkPupuk) + 1;
                this.setState({ pokokTdkPupuk: sum.toString() })
                break;
            default:
                break;

        }
    }

    decreaseNumber(param) {
        var sum = 0;
        switch (param) {
            case 'JP':
                if (parseInt(this.state.jumlahPokok) > 0) {
                    sum = parseInt(this.state.jumlahPokok) - 1;
                    this.setState({ jumlahPokok: sum.toString() })
                }
                break;
            case 'PP':
                if (parseInt(this.state.pokokPanen) > 0) {
                    sum = parseInt(this.state.pokokPanen) - 1;
                    this.setState({ pokokPanen: sum.toString() })
                }
                break;
            case 'BT':
                if (parseInt(this.state.buahTinggal) > 0) {
                    sum = parseInt(this.state.buahTinggal) - 1;
                    this.setState({ buahTinggal: sum.toString() })
                }
                break;
            case 'BP':
                if (parseInt(this.state.brondolPinggir) > 0) {
                    sum = parseInt(this.state.brondolPinggir) - 1;
                    this.setState({ brondolPinggir: sum.toString() })
                }
                break;
            case 'BTP':
                if (parseInt(this.state.brondolTPH) > 0) {
                    sum = parseInt(this.state.brondolTPH) - 1;
                    this.setState({ brondolTPH: sum.toString() })
                }
                break;
            case 'PTP':
                if (parseInt(this.state.pokokTdkPupuk) > 0) {
                    sum = parseInt(this.state.pokokTdkPupuk) - 1;
                    this.setState({ pokokTdkPupuk: sum.toString() })
                }
                break;
            default:
                break;

        }
    }

    remove0(param) {
        console.log(param)
        var str = param.toString();
        if (str.lenght > 1) {
            if (str.indexOf(0) == '0') {
                var val = str.substring(0);
                console.log(val);
                return val;
            }
        }
    }

    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                {/*STEPPER*/}
                <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                    <View style={styles.containerStepper}>
                        <View style={[styles.stepperNumber, { backgroundColor: Colors.brand }]}>
                            <Text style={styles.stepperNumberText}>1</Text>
                        </View>
                        <Text style={[Fonts.style.caption, { paddingLeft: 3, color: Colors.brand }]}>Pilih Lokasi</Text>
                        <View>
                            <Icon
                                name="chevron-right"
                                size={24}
                                color={Colors.brand}
                                style={styles.stepperNext} />
                        </View>
                    </View>

                    <View style={styles.containerStepper}>
                        <View style={[styles.stepperNumber, { backgroundColor: Colors.brand }]}>
                            <Text style={styles.stepperNumberText}>2</Text>
                        </View>
                        <Text style={[Fonts.style.caption, { paddingLeft: 3, color: Colors.brand }]}>Kondisi Baris</Text>
                        <View>
                            <Icon
                                name="chevron-right"
                                size={24}
                                color={Colors.buttonDisabled}
                                style={styles.stepperNext} />
                        </View>
                    </View>

                    <View style={styles.containerStepper}>
                        <View style={[styles.stepperNumber, { backgroundColor: Colors.buttonDisabled }]}>
                            <Text style={styles.stepperNumberText}>3</Text>
                        </View>
                        <Text style={[Fonts.style.caption, { paddingLeft: 3, color: Colors.textSecondary }]}>Summary</Text>
                    </View>
                </View>

                {/*LABEL*/}
                <View style={styles.containerLabel}>
                    <View style={{ flex: 2 }}>
                        <Image source={require('../../Images/icon/ic_walking.png')} style={styles.icon} />
                    </View>
                    <View style={{ flex: 7 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Sambil Jalan</Text>
                        <Text style={{ fontSize: 12, color: 'grey' }}>Kamu bisa input ini ketika berjalan disepanjang baris.</Text>
                    </View>
                </View>

                <View style={{ height: 10, backgroundColor: '#F5F5F5', marginTop: 10 }} />

                {/*INPUT*/}
                <View style={{ backgroundColor: 'white' }}>
                    {/* <View style={styles.containerLabel}>
                        <Text style={styles.txtLabel}>Jumlah Pokok</Text>
                        <View style={[styles.containerInput, {flex:5}]}>
                            <TouchableOpacity style={styles.btnMinus} onPress={()=>{this.decreaseNumber('JP')}}>
                                <Icon2 name={"minus"}  size={20} color="white" />
                            </TouchableOpacity>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                style={[styles.searchInput]}
                                value={this.state.jumlahPokok}                                    
                                onChangeText={(jumlahPokok) => { this.setState({ jumlahPokok: jumlahPokok }) }}/>
                            <TouchableOpacity style={styles.btnAdd} onPress={()=>{this.increaseNumber('JP')}}>
                                <Icon name={"add"}  size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>                       */}
                    <View style={styles.containerLabel}>
                        <Text style={styles.txtLabel}>Pokok Panen</Text>
                        <View style={[styles.containerInput, { flex: 5 }]}>
                            <TouchableOpacity style={styles.btnMinus} onPress={() => { this.decreaseNumber('PP') }}>
                                <Icon2 name={"minus"} size={20} color="white" />
                            </TouchableOpacity>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                style={[styles.searchInput]}
                                maxLength={2}
                                keyboardType={'numeric'}
                                value={this.state.pokokPanen}
                                onChangeText={(text) => { text = text.replace(/[^0-9 ]/g, ''); this.setState({ pokokPanen: text }) }} />
                            <TouchableOpacity style={styles.btnAdd} onPress={() => { this.increaseNumber('PP') }}>
                                <Icon name={"add"} size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerLabel}>
                        <Text style={styles.txtLabel}>Buah Tinggal</Text>
                        <View style={[styles.containerInput, { flex: 5 }]}>
                            <TouchableOpacity
                                style={styles.btnMinus}
                                onPress={() => this.decreaseNumber('BT')} >
                                <Icon2 name={"minus"} size={20} color="white" />
                            </TouchableOpacity>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                style={[styles.searchInput]}
                                maxLength={2}
                                keyboardType={'numeric'}
                                value={this.state.buahTinggal}
                                onChangeText={(text) => { text = text.replace(/[^0-9]/g, ''); this.setState({ buahTinggal: text }) }} />
                            <TouchableOpacity
                                style={styles.btnAdd}
                                onPress={() => this.increaseNumber('BT')}>
                                <Icon name={"add"} size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerLabel}>
                        <Text style={styles.txtLabel}>Brondolan di Piringan</Text>
                        <View style={[styles.containerInput, { flex: 5 }]}>
                            <TouchableOpacity style={styles.btnMinus}
                                onPress={() => { this.decreaseNumber('BP') }}>
                                <Icon2 name={"minus"} size={20} color="white" />
                            </TouchableOpacity>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                style={[styles.searchInput]}
                                maxLength={2}
                                keyboardType={'numeric'}
                                value={this.state.brondolPinggir}
                                onChangeText={(text) => { text = text.replace(/[^0-9]/g, ''); this.setState({ brondolPinggir: text }) }} />
                            <TouchableOpacity style={styles.btnAdd} onPress={() => { this.increaseNumber('BP') }}>
                                <Icon name={"add"} size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerLabel}>
                        <Text style={[styles.txtLabel, { fontWeight: '300' }]}>Brondolan di TPH</Text>
                        <View style={[styles.containerInput, { flex: 5 }]}>
                            <TouchableOpacity style={styles.btnMinus}
                                onPress={() => { this.decreaseNumber('BTP') }}>
                                <Icon2 name={"minus"} size={20} color="white" />
                            </TouchableOpacity>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                style={[styles.searchInput]}
                                maxLength={2}
                                keyboardType={'numeric'}
                                value={this.state.brondolTPH}
                                onChangeText={(text) => { text = text.replace(/[^0-9]/g, ''); this.setState({ brondolTPH: text }) }}
                            />
                            <TouchableOpacity style={styles.btnAdd} onPress={() => { this.increaseNumber('BTP') }}>
                                <Icon name={"add"} size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerLabel}>
                        <Text style={[styles.txtLabel, { fontWeight: '300' }]}>Pokok Tidak di Pupuk</Text>
                        <View style={[styles.containerInput, { flex: 5 }]}>
                            <TouchableOpacity style={styles.btnMinus}
                                onPress={() => { this.decreaseNumber('PTP') }}>
                                <Icon2 name={"minus"} size={20} color="white" />
                            </TouchableOpacity>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                style={[styles.searchInput]}
                                maxLength={2}
                                keyboardType={'numeric'}
                                value={this.state.pokokTdkPupuk}
                                onChangeText={(text) => { text = text.replace(/[^0-9]/g, ''); this.setState({ pokokTdkPupuk: text }) }
                                } />
                            <TouchableOpacity style={styles.btnAdd} onPress={() => { this.increaseNumber('PTP') }}>
                                <Icon name={"add"} size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/*CIRCLE*/}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                    <TouchableOpacity style={styles.cicle} onPress={() => { }}>
                        {/* <Icon name={"chevron-left"}  size={10} color="white" /> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.cicle2, { marginLeft: 10 }]} onPress={() => { this.insertDB() }}>
                        {/* <Icon name={"chevron-right"}  size={10} color="white" /> */}
                    </TouchableOpacity>
                </View>

            </ScrollView>
        )
    }
}

export default KondisiBaris1;

const styles = {

    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
        // padding:20
    },
    containerStepper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
    },
    stepperNumber: {
        height: 24,
        width: 24,
        backgroundColor: Colors.buttonDisabled,
        borderRadius: 12,
        justifyContent: 'center'
    },
    stepperNumberText: [Fonts.style.caption, { textAlign: 'center', color: Colors.textDark }],
    stepperNext: { alignSelf: 'flex-end', paddingRight: 4 },

    containerLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20
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
        borderWidth: 3,
        borderColor: '#cca300',
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        backgroundColor: '#e6b800',
        borderRadius: 100,

    },
    btnAdd: {
        borderWidth: 3,
        borderColor: '#00e639',
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        backgroundColor: Colors.brand,
        borderRadius: 100,
    },
    cicle: {
        borderWidth: 3,
        borderColor: '#A0A0A0',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        backgroundColor: '#A9A9A9',
        borderRadius: 100,
    },
    cicle2: {
        borderWidth: 3,
        borderColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        backgroundColor: '#E8E8E8',
        borderRadius: 100,
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
    icon: {
        alignContent: 'flex-end',
        height: 64,
        width: 64,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
}