import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Container, Content, Row } from 'native-base'

import * as Progress from 'react-native-progress';
import ProgressCircle from 'react-native-progress-circle'
import Colors from '../Constant/Colors';

import RegionAction from '../Redux/RegionRedux';
import BlockAction from '../Redux/BlockRedux';
import AfdAction from '../Redux/AfdRedux';
import EstAction from '../Redux/EstRedux';
import KriteriaAction from '../Redux/KriteriaRedux';
import UserAuthAction from '../Redux/UserAuthRedux';
import LandUseAction from '../Redux/LandUseRedux';
import CompAction from '../Redux/CompRedux';
import ContentAction from '../Redux/ContentRedux';
import ContentLabelAction from '../Redux/ContentLabelRedux';
import ContactAction from '../Redux/ContactRedux';
import CategoryAction from '../Redux/CategoryRedux';
import FindingAction from '../Redux/FindingRedux';

import { ProgressDialog } from 'react-native-simple-dialogs';

import { connect } from 'react-redux';
import { isNil } from 'ramda';

const IMEI = require('react-native-imei');

import TaskServices from '../Database/TaskServices'
// import { stat } from 'fs';


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
            imei: '',
            progress: 0,
            progressAfd: 0,
            progressRegion: 0,
            progressEst: 0,
            progressLandUse: 0,
            progressComp: 0,
            progressContent: 0,
            progressContentLabel: 0,
            progressKriteria: 0,
            progressFinding: 0,
            indeterminate: false,
            downloadRegion: false,
            downloadAfd: false,
            downloadBlok: false,
            downloadEst: false,
            downloadLandUse: false,
            downloadComp: false,
            downloadContent: false,
            downloadContact: false,
            downloadContentLabel: false,
            downloadKriteria: false,
            donwloadFinding: false,
            fetchLocation: false,
            downloadApa: 'Download sedang dalam proses',
            valueDownload: '0',
            totalDownload: '0',
            valueAfdDownload: '0',
            totalAfdDownload: '0',
            valueRegionDownload: '0',
            totalRegionDownload: '0',
            valueEstDownload: '0',
            totalEstDownload: '0',
            valueCompDownload: '0',
            totalCompDownload: '0',
            valueLandUseDownload: '0',
            totalLandUseDownload: '0',
            valueContentDownload: '0',
            totalContentDownload: '0',
            valueContentLabelDownload: '0',
            totalContentLabelDownload: '0',
            valueKriteriaDownload: '0',
            totalKriteriaDownload: '0',
            valueFindingDownload: '0',
            totalFindingDownload: '0'
        }
    }

    // componentDidMount() {
    //     this.state.downloadApa
    // }

    _crudTM_Block(data) {
        console.log("Simpan Block : " + data.simpan.length);

        var i = 1;
        if (data.simpan.length > 0) {

            for (i = 1; i <= data.simpan.length; i++) {
                this.setState({ progress: i / data.simpan.length })
                this.setState({ valueDownload: i })
                this.setState({ totalDownload: data.simpan.length })
            }

            data.simpan.map(item => {
                TaskServices.saveData('TM_BLOCK', item);
            })
        } else {
            this.setState({ valueRegionDownload: i });
        }
        // this.animate();

    }

    _crudTM_Afd(data) {
        console.log("Simpan AFD : " + data.simpan.length);

        // this.setState({ downloadApa: "Sedang Download TM Afdeling" });

        var i = 1;
        if (data.simpan.length > 0) {

            for (i = 1; i <= data.simpan.length; i++) {
                this.setState({ progressAfd: i / data.simpan.length })
                this.setState({ valueAfdDownload: i })
                this.setState({ totalAfdDownload: data.simpan.length })
            }

            data.simpan.map(item => {
                TaskServices.saveData('TM_AFD', item);
            });

        } else {
            this.setState({ progressAfd: 1 })
            this.setState({ valueAfdDownload: 0 });
            this.setState({ totalAfdDownload: 0 });
        }
    }

    _crudTM_Region(data) {

        console.log("Simpan Region : " + data.simpan.length);
        // this.setState({ downloadApa: "Sedang Download TM Region" });
        var i = 1;
        if (data.simpan.length > 0) {

            for (i = 1; i <= data.simpan.length; i++) {
                this.setState({ progressRegion: i / data.simpan.length })
                this.setState({ valueRegionDownload: i });
                this.setState({ totalRegionDownload: data.simpan.length });
            }

            data.simpan.map(item => {
                TaskServices.saveData('TM_REGION', item);
            });
            // console.log("All Data :" + JSON.stringify(TaskServices.getAllData('TM_REGION')));
        } else {
            this.setState({ progressRegion: 1 })
            this.setState({ valueRegionDownload: 0 });
            this.setState({ totalRegionDownload: 0 });
        }

        if (data.ubah.length > 0) {
            data.ubah.map(item => {
                TaskServices.updatedDataNew('TM_REGION', item.REGION_CODE, item);
            })
        }

        // if (data.hapus.length > 0) {
        //     data.ubah.map(item => {
        //         TaskServices.deleteDataNew('TM_REGION', item.REGION_CODE, item);
        //     })
        //     console.log("All Data" + TaskServices.getAllData('TM_REGION'));
        // }
    }

    _crudTM_Est(data) {
        console.log("Simpan Est : " + data.simpan.length);

        var i = 1;
        if (data.simpan.length > 0) {

            for (i = 1; i <= data.simpan.length; i++) {
                this.setState({ progressEst: i / data.simpan.length })
                this.setState({ valueEstDownload: i });
                this.setState({ totalEstDownload: data.simpan.length });
            }

            data.simpan.map(item => {
                TaskServices.saveData('TM_EST', item);
            })

        } else {
            this.setState({ progressEst: 1 })
            this.setState({ valueEstDownload: 0 });
            this.setState({ totalRegionDownload: 0 });
        }
    }

    _crudTM_LandUse(data) {
        console.log("Simpan Land Use : " + data.simpan.length);

        var i = 0;
        if (data.simpan.length > 0) {

            for (i = 1; i <= data.simpan.length; i++) {
                this.setState({ progressLandUse: i / data.simpan.length });
                this.setState({ valueLandUseDownload: i });
                this.setState({ totalLandUseDownload: data.simpan.length });
            }

            data.simpan.map(item => {
                TaskServices.saveData('TM_LAND_USE', item);
            })

            this.setState({ fetchLocation: false });
        } else {
            this.setState({ progressLandUse: 1 })
            this.setState({ valueLandUseDownload: 0 });
            this.setState({ totalLandUseDownload: 0 });

            this.setState({ fetchLocation: false });
        }
    }

    _crudTM_Comp(data) {
        console.log("Simpan Comp : " + data.simpan.length);

        var i = 0;
        if (data.simpan.length > 0) {

            for (i = 1; i <= data.simpan.length; i++) {
                this.setState({ progressComp: i / data.simpan.length });
                this.setState({ valueCompDownload: i });
                this.setState({ totalCompDownload: data.simpan.length });
            }

            data.simpan.map(item => {
                TaskServices.saveData('TM_COMP', item);
            })
        } else {
            this.setState({ progressComp: 1 })
            this.setState({ valueCompDownload: 0 });
            this.setState({ totalCompDownload: 0 });
        }
    }

    _crudTM_Content(data) {
        console.log("Simpan Content : " + data.length);

        if (data.length > 0) {

            for (i = 1; i <= data.length; i++) {
                this.setState({ progressContent: i / data.length });
                this.setState({ valueContentDownload: i });
                this.setState({ totalContentDownload: data.length });
            }

            data.map(item => {
                TaskServices.saveData('TM_CONTENT', item);
                // this.setState({ downloadApa: `TM_CONTENT ${item.CONTENT_CODE}` });
            })
        } else {
            this.setState({ progressContent: 1 })
            this.setState({ valueContentDownload: 0 });
            this.setState({ totalContentDownload: 0 });
        }
        // this.setState({fetchLocation: false})
        // alert('selesai')
    }

    _crudTM_ContentLabel(data) {
        console.log("Simpan Content Label : " + data.length);

        if (data.length > 0) {

            for (i = 1; i <= data.length; i++) {
                this.setState({ progressContentLabel: i / data.length });
                this.setState({ valueContentLabelDownload: i });
                this.setState({ totalContentLabelDownload: data.length });
            }

            data.map(item => {
                TaskServices.saveData('TM_CONTENT_LABEL', item);
            })
        } else {
            this.setState({ progressContentLabel: 1 })
            this.setState({ valueContentLabelDownload: 0 });
            this.setState({ totalContentLabelDownload: 0 });
        }
    }

    _crudTM_Kriteria(data) {
        console.log("Simpan Kriteria : " + data.length);

        if (data.length > 0) {

            for (i = 1; i <= data.length; i++) {
                this.setState({ progressKriteria: i / data.length });
                this.setState({ valueKriteriaDownload: i });
                this.setState({ totalKriteriaDownload: data.length });
            }

            data.map(item => {
                TaskServices.saveData('TM_KRITERIA', item);
            })
        } else {
            this.setState({ progressKriteria: 1 })
            this.setState({ valueKriteriaDownload: 0 });
            this.setState({ totalKriteriaDownload: 0 });
        }
    }

    _crudTM_Finding(data) {
        console.log("Simpan Finding : " + data.length);

        if (data.length > 0) {

            for (i = 1; i <= data.length; i++) {
                this.setState({ progressFinding: i / data.length });
                this.setState({ valueFindingDownload: i });
                this.setState({ totalFindingDownload: data.length });
            }

            data.map(item => {
                TaskServices.saveData('TM_KRITERIA', item);
            })
        } else {
            this.setState({ progressFinding: 1 })
            this.setState({ valueFindingDownload: 0 });
            this.setState({ totalFindingDownload: 0 });
        }
    }

    _crudTM_Contact(data) {        
        console.log("Simpan Contact : " + data.data.length);
        var dataContact = data.data;
        console.log(JSON.stringify(dataContact))
        if (dataContact.length > 0) {
            data.data.map(item => {
                TaskServices.saveData('TR_CONTACT', item);
                this.setState({downloadApa: `TR_CONTACT ${item.USER_AUTH_CODE}`});
            });
        }
        
        this.setState({fetchLocation: false})
    }

    _get_IMEI_Number() {
        var IMEI_2 = IMEI.getImei();
        this.setState({ imei: IMEI_2 });
        return IMEI_2;
    }

    _onSync() {

        // POST MOBILE SYNC
        // this.props.regionPost({
        //     TGL_MOBILE_SYNC: "2018-12-17 00:00:00",
        //     TABEL_UPDATE: "hectare-statement/region"
        // });

        // this.props.blockPost({
        //     TGL_MOBILE_SYNC: "2018-12-17 00:00:00",
        //     TABEL_UPDATE: "hectare-statement/block"
        // });

        this.setState({
            downloadRegion: false, 
            downloadAfd: false,
            downloadBlok: false,
            downloadEst: false,
            downloadLandUse: false,
            downloadComp: false,
            downloadContent: false,
            downloadContact: false,
            downloadContentLabel: false,
            downloadKriteria: false,
            downloadFinding: false,
            fetchLocation: false

        });

        // GET DATA MASTER
        // this.props.contentRequest();
        // this.props.blockRequest();
        // this.props.afdRequest();
        // this.props.regionRequest();
        // this.props.estRequest();
        // this.props.landUseRequest();
        // this.props.compRequest();
        // this.props.contentLabelRequest();
        // this.props.kriteriaRequest();
        this.props.findingRequest();
    }

    animate() {
        let progress = 0;
        let countData = 200;
        this.setState({ progress });
        // setTimeout(() => {
        // this.setState({ indeterminate: false });
        // countData += progress;

        progress = 100 / countData;
        this.setState({ progress });
        console.log("Progress : " + progress + "%")
        // setInterval(() => {
        //     countData += x;

        //     currentProgress = 50 / countData * 100;

        //     this.setState({ currentProgress });
        //     console.log("Progress : " + currentProgress)
        // }, 200);
    }

    componentWillReceiveProps(newProps) {


        // if (newProps.block.fetchingBlock !== null && !newProps.block.fetchingBlock && !this.state.downloadBlok) {
        //     let dataJSON = newProps.block.block;
        //     this.setState({ downloadBlok: true });
        //     if (dataJSON !== null) {
        //         this._crudTM_Block(dataJSON);
        //     }
        // }

        // if (newProps.afd.fetchingAfd !== null && !newProps.afd.fetchingAfd && !this.state.downloadAfd) {
        //     let dataJSON = newProps.afd.afd;
        //     this.setState({ downloadAfd: true });
        //     if (dataJSON !== null) {
        //         this._crudTM_Afd(dataJSON);
        //     }
        // }

        // if (newProps.region.fetching !== null && !newProps.region.fetching && !this.state.downloadRegion) {
        //     let dataJSON = newProps.region.region;
        //     this.setState({ downloadRegion: true })
        //     if (dataJSON !== null) {
        //         this._crudTM_Region(dataJSON);
        //     }

        // }

        // if (newProps.est.fetchingEst !== null && !newProps.est.fetchingEst && !this.state.downloadEst) {
        //     let dataJSON = newProps.est.est;
        //     this.setState({ downloadEst: true });
        //     if (dataJSON !== null) {
        //         this._crudTM_Est(dataJSON);
        //     }
        // }

        // if (newProps.landUse.fetchingLandUse !== null && !newProps.landUse.fetchingLandUse && !this.state.downloadLandUse) {
        //     let dataJSON = newProps.landUse.landUse;
        //     this.setState({ downloadLandUse: true });
        //     if (dataJSON !== null) {
        //         this._crudTM_LandUse(dataJSON);
        //     }
        // }

        // if (newProps.comp.fetchingComp !== null && !newProps.comp.fetchingComp && !this.state.downloadComp) {
        //     let dataJSON = newProps.comp.comp;
        //     this.setState({ downloadComp: true });
        //     if (dataJSON !== null) {
        //         this._crudTM_Comp(dataJSON);
        //     }
        // }

        // if (newProps.content.fetchingContent !== null && !newProps.content.fetchingContent && !this.state.downloadContent) {
        //     let dataJSON = newProps.content.content;
        //     this.setState({ downloadContent: true });
        //     if (dataJSON !== null) {
        //         this._crudTM_Content(dataJSON);
        //     }
        // }

        // // console.log("Fetching Content Label : " + newProps.contentLabel.fetchingContentLabel);

        // if (newProps.contentLabel.fetchingContentLabel !== null && !newProps.contentLabel.fetchingContentLabel && !this.state.downloadContentLabel) {
        //     let dataJSON = newProps.contentLabel.contentLabel;
        //     this.setState({ downloadContentLabel: true });
        //     if (dataJSON !== null) {
        //         this._crudTM_ContentLabel(dataJSON);
        //     }
        // }

        // if (newProps.kriteria.fetchingKriteria !== null && !newProps.kriteria.fetchingKriteria && !this.state.downloadKriteria) {
        //     let dataJSON = newProps.kriteria.kriteria;
        //     this.setState({ downloadKriteria: true });
        //     if (dataJSON !== null) {
        //         this._crudTM_Kriteria(dataJSON);
        //     }
        // }

        if (newProps.finding.fetchingFinding !== null && !newProps.kriteria.fetchingFinding && !this.state.downloadFinding) {
            let dataJSON = newProps.finding.finding;
            this.setState({ downloadFinding: true });
            if (dataJSON !== null) {
                this._crudTM_Finding(dataJSON);
            }
        }
    }

    render() {
        return (
            <Container style={{ flex: 1, padding: 16 }}>
                <Content>
                    {/* <View style={styles.section}>
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
                    </View> */}

                    <View style={{ flex: 1, marginTop: 0 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>TM BLOCK</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueDownload}</Text>
                                <Text>/</Text>
                                <Text style={{ marginRight: 3 }}>{this.state.totalDownload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progress}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>TM AFD</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueAfdDownload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalAfdDownload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressAfd}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>TM REGION</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                                <Text>{this.state.valueRegionDownload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalRegionDownload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressRegion}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>TM ESTATE</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueEstDownload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalEstDownload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressEst}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>TM LAND USE</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                                <Text>{this.state.valueLandUseDownload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalLandUseDownload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressLandUse}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>TM COMP</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueCompDownload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalCompDownload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressComp}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>TM CONTENT</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueContentDownload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalContentDownload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressContent}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>TM CONTENT LABEL</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueContentLabelDownload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalContentLabelDownload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressContentLabel}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>TM KRITERIA</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueKriteriaDownload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalKriteriaDownload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressKriteria}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 48 }}>
                        <TouchableOpacity style={styles.button} onPress={() => this._onSync()}>
                            <Text style={styles.buttonText}>Sync</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>TM KRITERIA</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueFindingDownload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalFindingDownload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressFinding}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 48 }}>
                        <TouchableOpacity style={styles.button} onPress={() => this._onSync()}>
                            <Text style={styles.buttonText}>Sync</Text>
                        </TouchableOpacity>
                    </View>

                    <ProgressDialog
                        visible={this.state.fetchLocation}
                        activityIndicatorSize="small"
                        message={this.state.downloadApa} />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        region: state.region,
        block: state.block,
        afd: state.afd,
        est: state.est,
        landUse: state.landUse,
        comp: state.comp,
        content: state.content,
        contentLabel: state.contentLabel,
        kriteria: state.kriteria,
        contact: state.contact,
        finding: state.finding
    };
};

const mapDispatchToProps = dispatch => {
    return {
        regionRequest: () => dispatch(RegionAction.regionRequest()),
        regionPost: obj => dispatch(RegionAction.regionPost(obj)),
        blockRequest: () => dispatch(BlockAction.blockRequest()),
        blockPost: obj => dispatch(BlockAction.blockPost(obj)),
        afdRequest: () => dispatch(AfdAction.afdRequest()),
        afdPost: obj => dispatch(AfdAction.afdPost(obj)),
        estRequest: () => dispatch(EstAction.estRequest()),
        estPost: obj => dispatch(EstAction.estPost(obj)),
        kriteriaRequest: () => dispatch(KriteriaAction.kriteriaRequest()),
        kriteriaPost: obj => dispatch(KriteriaAction.kriteriaPost(obj)),
        userAuthRequest: () => dispatch(UserAuthAction.userAuthRequest()),
        userAuthPost: obj => dispatch(UserAuthAction.userAuthPost(obj)),
        landUseRequest: () => dispatch(LandUseAction.landUseRequest()),
        landUsePost: obj => dispatch(LandUseAction.landUsePost(obj)),
        compRequest: () => dispatch(CompAction.compRequest()),
        compPost: obj => dispatch(CompAction.compPost(obj)),
        contentRequest: () => dispatch(ContentAction.contentRequest()),
        contentPost: obj => dispatch(ContentAction.contentPost(obj)),
        contentLabelRequest: () => dispatch(ContentLabelAction.contentLabelRequest()),
        contentLabelPost: obj => dispatch(ContentLabelAction.contentLabelPost(obj)),
        contactRequest: () => dispatch(ContactAction.contactRequest()),
        categoryRequest: () => dispatch(CategoryAction.categoryRequest()),
        findingRequest: () => dispatch(FindingAction.findingRequest()),
        findingPost: obj => dispatch(FindingAction.findingPost(obj))
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

