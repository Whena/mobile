import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Container, Content } from 'native-base'

import ProgressCircle from 'react-native-progress-circle'
import Colors from '../Constant/Colors';

import RegionAction from '../Redux/RegionRedux';
import { connect } from 'react-redux';
import { isNil } from 'ramda';

const IMEI = require('react-native-imei');


class SyncScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: Colors.tintColor
        },
        headerTitleStyle: {
            textAlign: "left",
            flex: 1,
            fontSize: 18,
            fontWeight: '400'
        },
        title: 'Sync',
        headerTintColor: '#fff'
    })

    constructor() {
        super();
        this.state = {
            progressValue: 0.00,
            tglMobileSync: "",
            tabelUpdate: '',
            imei: ''
        }
    }

    componentWillReceiveProps(newProps) {
        // if (!isNil(newProps.auth)) {
        //     this.setState({ fetching: newProps.auth.fetching });
        // }

        // this.props.regionPost();

        // if (!isNil(newProps.auth.user)) {
        //     this.props.regionPost();
        // }
    }

    _insertTM_Region(data) {
        var dataTable = {
            NIK: data.NIK,
            ACCESS_TOKEN: data.ACCESS_TOKEN,
            JOB_CODE: data.JOB_CODE
        };

        TaskServices.saveData('TM_REGION', dataTable);
    }

    _get_IMEI_Number() {
        var IMEI_2 = IMEI.getImei();
        this.setState({ imei: IMEI_2 });
        return IMEI_2;
    }

    _onSync(tglMobileSync, tabelUpdate) {
        var Imei = this._get_IMEI_Number();
        console.log("Imei Sync : " + Imei)

        this.props.regionPost({
            tglMobileSync: tglMobileSync,
            tabelUpdate: tabelUpdate,
            imei: Imei
        });

        this.props.regionPost();
    }

    render() {
        return (
            <Container style={{ flex: 1, padding: 16 }}>
                <Content>
                    <View style={styles.section}>
                        <View style={{ marginRight: 10 }}>
                            <ProgressCircle
                                percent={50}
                                radius={50}
                                borderWidth={12}
                                color={Colors.brandSecondary}
                                shadowColor="#999"
                                bgColor="#fff">

                                <Text style={{ fontSize: 18 }}>{'50%'}</Text>
                            </ProgressCircle>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text style={{ fontSize: 16, color: Colors.brandSecondary, textAlign: 'center' }}>100 Data Tersimpan</Text>
                            <Text style={{ fontSize: 12, color: 'grey', marginTop: 5, textAlign: 'center' }}>Klik sync untuk sinkronisasi data</Text>
                        </View>
                    </View>

                    <View style={[styles.section, { marginTop: 16 }]}>
                        <View style={{ marginRight: 10 }}>
                            <ProgressCircle
                                percent={0}
                                radius={50}
                                borderWidth={12}
                                color={Colors.tintColor}
                                shadowColor="#999"
                                bgColor="#fff">

                                <Text style={{ fontSize: 18 }}>{'0%'}</Text>
                            </ProgressCircle>
                        </View>

                        <View style={styles.sectionRow}>
                            <Text style={{ fontSize: 16, color: Colors.tintColor, textAlign: 'center' }}>150 Data Masuk</Text>
                            <Text style={{ fontSize: 12, color: 'grey', marginTop: 5, textAlign: 'center' }}>Klik sync untuk sinkronisasi data</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, marginTop: 48 }}>
                        <TouchableOpacity style={styles.button} onPress={() => this._onSync("2018-12-17 00:00:00", "hectare-statement/region")}>
                            <Text style={styles.buttonText}>Sync</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return { region: state.region };
};

const mapDispatchToProps = dispatch => {
    return {
        regionPost: () => dispatch(RegionAction.regionPost())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SyncScreen);

const styles = StyleSheet.create({
    section: {
        justifyContent: 'center',
        padding: 16,
        height: 140,
        flexDirection: 'row',
        borderWidth: 0.2,
        borderRadius: 5,
        borderColor: Colors.tintColor,

    },
    sectionRow: {
        flex: 1, justifyContent: 'center', alignContent: 'center', flexDirection: 'column', alignSelf: 'center'
    },
    button: {
        width: 220,
        backgroundColor: Colors.brand,
        borderRadius: 25,
        padding: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center'
    }
});

