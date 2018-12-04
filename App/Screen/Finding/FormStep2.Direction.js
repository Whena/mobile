import React, { Component } from 'react';
import {
    ScrollView, Text, FlatList, TextInput, TouchableOpacity, View, Image
} from 'react-native';
import {
    Container,
    Content
} from 'native-base';
import Colors from '../../Constant/Colors'
import Fonts from '../../Constant/Fonts'
import Icon from 'react-native-vector-icons/MaterialIcons'
import R, { isEmpty } from 'ramda'
import RadioGroup from 'react-native-custom-radio-group'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import Contact from '../../Component/Contact'
import SlidingUpPanel from 'rn-sliding-up-panel'
import FastImage from 'react-native-fast-image'
import Polyline from '@mapbox/polyline'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const radioGroupList = [{
    label: 'Hight',
    value: 'Hight'
}, {
    label: 'Med',
    value: 'Med'
}, {
    label: 'Low',
    value: 'Low'
}];

class FormStep2 extends Component {
    constructor(props) {
        super(props);
        var contacts = [
            { name: "Nurul Husnah", departemen: "Staf Marketing", photo: "http://res.rankedgaming.com/resources/images/profile/default-avatar-male.png" },
            { name: "Nur Hasanah", departemen: "Staf Accounting", photo: "https://s.kaskus.id/user/avatar/2014/02/16/avatar6457006_1.gif" },
            { name: "Nurul Arifin", departemen: "Staf IT", photo: "https://s.kaskus.id/user/avatar/2013/08/23/avatar5791311_2.gif" }]

        var categories = [
            { id: "001", name: "Terrories Potential" },
            { id: "002", name: "Sanitation" },
            { id: "003", name: "Illegal Ads" },
            { id: "004", name: "Fallen Tree" },
            { id: "005", name: "Illegal Parking" },
            { id: "006", name: "Public Facilities" },
            { id: "007", name: "Food Control" },
            { id: "008", name: "Road Demage" },
            { id: "009", name: "Broken Streetlight" },
            { id: "010", name: "Traffic Violations" },
            { id: "011", name: "Traffic Jam" },
            { id: "012", name: "Violation of Public Order" },

        ]

        this.state = {
            keterangan: "",
            priority: "",
            batasWaktu: "",
            tugasKepada: "",
            category: "",
            blok: "",
            baris: "",
            contacts,
            categories,
            isDateTimePickerVisible: false,
            isContactVisible: false,
            isCategoryVisible: false,
            isMapsVisible: false,
            allowDragging: true,
            latitude: null,
            longitude: null,
            error: null,
            coords: [],
            x: 'false',
            cordLatitude: -6.241586,
            cordLongitude: 106.992416,
            // foto1: props.navigation.state.params.foto1,
            // foto2: props.navigation.state.params.foto2,
            // foto3: props.navigation.state.params.foto3,
            stepper: [
                { step: '1', title: 'Ambil Photo' },
                { step: '2', title: 'Tulis Keterangan' }
            ],
        }

        this.mergeLot = this.mergeLot.bind(this);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                this.mergeLot();
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }

    async getDirections(startLoc, destinationLoc) {
        console.tron.log(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyASByvaP6kVDgnx7lsADk4Wf226gI81ntM`)

        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyASByvaP6kVDgnx7lsADk4Wf226gI81ntM`)

            let respJson = await resp.json();

            console.tron.log(respJson)

            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            this.setState({ coords: coords })
            this.setState({ x: "true" })
            return coords
        } catch (error) {
            this.setState({ x: "error" })
            return error
        }
    }

    mergeLot() {
        console.tron.log("mergeLot")
        if (this.state.latitude != null && this.state.longitude != null) {
            let concatLot = this.state.latitude + "," + this.state.longitude
            this.setState({
                concat: concatLot
            }, () => {
                this.getDirections(concatLot, `${this.state.cordLatitude},${this.state.cordLongitude}`);
            });
        }

    }

    _onBtnClick = () => {
        //console.tron.log(this.props.navigation.state.params.foto1)
    }

    _onContactSelected = user => {
        this.setState({
            isContactVisible: false,
            tugasKepada: user.name
        })
    }

    _renderContact = user => {
        return <Contact onSelect={this._onContactSelected} user={user} />;
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({ batasWaktu: moment(date).format("YYYY-MM-DD") })
        this._hideDateTimePicker();
    };


    render() {
        return (
            <Container style={{ flex: 1, backgroundColor: 'white' }}>
                <Content style={{ flex: 1, paddingHorizontal: 16, }}>
                    {/* STEPPER */}
                    <FlatList
                        style={[style.stepperContainer, { margin: 15, alignSelf: 'center' }]}
                        horizontal
                        data={this.state.stepper}
                        getItemLayout={this.getItemLayout}
                        initialScrollIndex={1}
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
                                                    backgroundColor: Colors.brand
                                                }
                                            ]}
                                        >
                                            <Text style={style.stepperNumberText}>{rowData.step}</Text>
                                        </View>
                                        <Text
                                            style={[
                                                Fonts.style.caption,
                                                { paddingLeft: 3, color: rowData.step == Colors.brand }
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
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ height: 80, flex: 1 }}>
                            <Text style={{ fontSize: 14 }}> Keterangan </Text>

                            <TextInput style={{ flex: 1, textAlignVertical: "top" }}
                                multiline
                                placeholder="Tulis di sini..."
                                onChangeText={(keterangan) => this.setState({ keterangan })}
                            />
                        </View>
                        <View style={{ alignSelf: 'flex-end', height: 80, width: 80, marginLeft: 10 }}>
                            {/* <Image style={{ alignItems: 'stretch', width: 80, height: 80, borderRadius: 10 }}
                                source={this.state.foto1}></Image> */}
                        </View>
                    </View>

                    <View style={style.line} />

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={style.label}> Lokasi </Text>
                        {isEmpty(this.state.blok) && (
                            <Text onPress={() => this.setState({ isMapsVisible: true })} style={{ fontSize: 14, color: '#999' }}> Set Location </Text>)}
                        {!isEmpty(this.state.blok) && (
                            <Text onPress={() => this.setState({ isMapsVisible: true })} style={{ fontSize: 14 }}> {this.state.blok} </Text>)}

                    </View>

                    <View style={style.line} />

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={style.label}> Kategori </Text>
                        {isEmpty(this.state.category) && (
                            <Text onPress={() => this.setState({ isCategoryVisible: true })} style={{ fontSize: 14, color: '#999' }}> Pilih Kategori </Text>)}
                        {!isEmpty(this.state.category) && (
                            <Text onPress={() => this.setState({ isCategoryVisible: true })} style={{ fontSize: 14 }}> {this.state.category} </Text>)}

                    </View>

                    <View style={[style.line]} />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={[style.label, { marginTop: 3 }]}> Priority </Text>
                        <RadioGroup
                            onChangeText={(priority) => this.setState({ priority })}
                            style={style.item}
                            containerStyle={{}}
                            buttonContainerStyle={{ borderRadius: 10, padding: 5, marginRight: 3, width: 55 }}
                            buttonTextStyle={{ fontSize: 12 }}
                            buttonContainerActiveStyle={{ backgroundColor: Colors.brand, borderColor: Colors.brandSecondary, borderWidth: 0.5, }}
                            buttonContainerInactiveStyle={{ backgroundColor: "#ddd", borderColor: "#CCC", borderWidth: 0.5, }}
                            radioGroupList={radioGroupList} />
                    </View>

                    <View style={style.line} />

                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={style.label}> Batas Waktu </Text>
                            <View style={[style.item, { flex: 1, flexDirection: 'row' }]}>
                                <Image style={{ alignItems: 'stretch', width: 20, height: 20, marginRight: 5 }}
                                    source={require('../../Images/icon/ic_calendar.png')} />
                                {isEmpty(this.state.batasWaktu) && (
                                    <Text onPress={this._showDateTimePicker} style={{ fontSize: 14, color: '#999' }}> Select Calendar </Text>)}
                                {!isEmpty(this.state.batasWaktu) && (
                                    <Text onPress={this._showDateTimePicker} style={{ fontSize: 14 }}> {this.state.batasWaktu} </Text>)}

                            </View>
                        </View>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        />
                    </View>

                    <View style={style.line} />

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={style.label}> Ditugaskan Kepada </Text>
                        {isEmpty(this.state.tugasKepada) && (
                            <Text onPress={() => this.setState({ isContactVisible: true })} style={{ fontSize: 14, color: '#999' }}> Pilih Karyawan </Text>)}
                        {!isEmpty(this.state.tugasKepada) && (
                            <Text onPress={() => this.setState({ isContactVisible: true })} style={{ fontSize: 14 }}> {this.state.tugasKepada} </Text>)}
                    </View>

                    <View style={[style.line]} />

                    <TouchableOpacity style={[style.button, { margin: 16 }]}
                        onPress={() => this._onBtnClick}>
                        <Text style={style.buttonText}>Simpan</Text>
                    </TouchableOpacity>
                </Content>

                <SlidingUpPanel
                    // height={340}
                    // draggableRange={{ top: 420, bottom: 0 }}
                    visible={this.state.isMapsVisible}
                    onRequestClose={() => this.setState({ isMapsVisible: false })}>
                    <View style={[style.containerSlidingUpPanel]}>
                        <View style={{ width: '100%', height: 20 }} onPress={() => this.setState({ isMapsVisible: false })}>
                            <View
                                style={{
                                    backgroundColor: '#CCC', alignSelf: 'center',
                                    height: 4, width: 80
                                }}
                            ></View>
                        </View>

                        <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>Tentukan Lokasi</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[style.label, { height: 35, textAlignVertical: 'center' }]}> Blok </Text>
                            <TextInput style={style.inputloc}></TextInput>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={[style.label, { height: 35, textAlignVertical: 'center' }]}> Baris </Text>
                            <TextInput style={style.inputloc}></TextInput>
                        </View>

                        <View style={{ marginTop: 10, width: '100%' }}>
                            <TouchableOpacity style={[style.buttonSetLoc, { alignSelf: 'flex-end' }]}
                                onPress={() => this.setState({ isMapsVisible: false })}>
                                <Text style={style.buttonText}>Set Lokasi</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={style.line} />

                        <Text style={{ color: Colors.brand, textAlign: 'center', paddingHorizontal: 25, marginBottom: 10, fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>Pastikan kamu telah berada di lokasi yang benar</Text>

                        <MapView
                            style={{ height: 200, borderRadius: 10 }}
                            provider={PROVIDER_GOOGLE}
                            region={{
                                latitude: this.state.cordLatitude,
                                longitude: this.state.cordLongitude,
                                latitudeDelta: 0.3,
                                longitudeDelta: 0.3
                            }}
                        >

                            {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                                coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
                                title={"Your Location"}
                            />}

                            {!!this.state.cordLatitude && !!this.state.cordLongitude && <MapView.Marker pinColor={Colors.brand}
                                coordinate={{ "latitude": this.state.cordLatitude, "longitude": this.state.cordLongitude }}
                                title={"Your Destination"}
                            />}

                            {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
                                coordinates={this.state.coords}
                                strokeWidth={2}
                                strokeColor="red" />
                            }

                            {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapView.Polyline
                                coordinates={[
                                    { latitude: this.state.latitude, longitude: this.state.longitude },
                                    { latitude: this.state.cordLatitude, longitude: this.state.cordLongitude },
                                ]}
                                strokeWidth={2}
                                strokeColor="red" />
                            }

                        </MapView>
                    </View>
                </SlidingUpPanel>

                <SlidingUpPanel
                    visible={this.state.isContactVisible}
                    onRequestClose={() => this.setState({ isContactVisible: false })}>
                    <View style={style.containerSlidingUpPanel}>
                        <View style={{ width: '100%', height: 20 }} onPress={() => this.setState({ isContactVisible: false })}>
                            <View
                                style={{
                                    backgroundColor: '#CCC', alignSelf: 'center',
                                    height: 4, width: 80
                                }}
                            ></View>
                        </View>

                        <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>Contact</Text>
                        <ScrollView
                            onTouchEnd={() => this.setState({ allowDragging: true })}
                            onTouchCancel={() => this.setState({ allowDragging: true })}
                            onTouchStart={() => this.setState({ allowDragging: false })}>
                            {this.state.contacts.map(this._renderContact)}
                        </ScrollView>
                    </View>
                </SlidingUpPanel>

                <SlidingUpPanel
                    height={340}
                    draggableRange={{ top: 420, bottom: 0 }}
                    visible={this.state.isCategoryVisible}
                    onRequestClose={() => this.setState({ isCategoryVisible: false })}>
                    <View style={[style.containerSlidingUpPanel]}>
                        <View style={{ width: '100%', height: 20 }} onPress={() => this.setState({ isCategoryVisible: false })}>
                            <View
                                style={{
                                    backgroundColor: '#CCC', alignSelf: 'center',
                                    height: 4, width: 80
                                }}
                            ></View>
                        </View>

                        <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>Pilih Kategori</Text>
                        <FlatList
                            data={this.state.categories}
                            keyExtractor={item => item.id}
                            numColumns={4}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                isCategoryVisible: false,
                                                category: item.name
                                            })
                                        }}
                                        style={style.itemCategory}>
                                        <FastImage style={{ width: 40, height: 40 }}
                                            resizeMode={FastImage.resizeMode.contain}
                                            source={{
                                                uri: "https://s.kaskus.id/user/avatar/2014/02/16/avatar6457006_1.gif",
                                                priority: FastImage.priority.normal,
                                            }} />
                                        <Text style={style.textCategory}>{item.name}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </SlidingUpPanel>
            </Container >
        )
    }
}

export default FormStep2;

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
    buttonSetLoc: {
        width: 100,
        backgroundColor: Colors.brand,
        borderRadius: 5,
        padding: 5,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center'
    },
    label: {
        width: '40%',
        fontSize: 14
    }, item: {
        width: '60%',
        color: "#999",
        fontSize: 14
    }, line: {
        marginTop: 16,
        marginBottom: 16,
        borderBottomColor: "#CCC",
        borderBottomWidth: 1
    }, containerSlidingUpPanel: {
        marginTop: 5,
        flex: 1,
        zIndex: 1,
        padding: 16,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white'
    }, itemCategory: {
        alignItems: "center",
        flexGrow: 1,
        flex: 1,
        margin: 4,
        padding: 5,
        flexBasis: 0,
    },
    textCategory: {
        textAlign: 'center',
        fontSize: 9,
        color: "#333333"
    },
    inputloc: {
        width: '60%',
        height: 40,
        fontSize: 14,
        paddingHorizontal: 10,
        textAlign: 'left',
        textAlignVertical: 'center',
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 0.5
    }
};