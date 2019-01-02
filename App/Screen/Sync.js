import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Container, Content } from 'native-base'

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

import { connect } from 'react-redux';
import { isNil } from 'ramda';

const IMEI = require('react-native-imei');

import TaskServices from '../Database/TaskServices'


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
            indeterminate: false,
            downloadRegion : false,
            downloadAfd: false,
            downloadBlok: false,
            downloadEst: false,
            downloadLandUse: false,
            downloadComp: false,
            downloadContent: false,
        }
    }

    _crudTM_Region(data) {

        if (data.simpan.length > 0) {
            data.simpan.map(item => {
                TaskServices.saveData('TM_REGION', item);
            })

            console.log("All Data :" + JSON.stringify(TaskServices.getAllData('TM_REGION')));
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

    _crudTM_Afd(data) {
        console.log("Masuk Lokal DB AFD");
        console.log("Simpan AFD : " + data.simpan.length);

        if (data.simpan.length > 0) {
            data.simpan.map(item => {
                TaskServices.saveData('TM_AFD', item);
            })
        }
    }

    _crudTM_Block(data) {
        console.log("Masuk Lokal DB Block");
        console.log("Simpan Block : " + data.simpan.length);

        if (data.simpan.length > 0) {
            data.simpan.map(item => {
                TaskServices.saveData('TM_BLOCK', item);
            })
        }
        this.animate();
    }

    _crudTM_Est(data) {
        console.log("Masuk Lokal DB Est");
        console.log("Simpan Est : " + data.simpan.length);

        if (data.simpan.length > 0) {
            data.simpan.map(item => {
                TaskServices.saveData('TM_EST', item);
            })
        }
    }

    _crudTM_LandUse(data) {
        console.log("Masuk Lokal DB Land Use");
        console.log("Simpan Land Use : " + data.simpan.length);

        if (data.simpan.length > 0) {
            data.simpan.map(item => {
                TaskServices.saveData('TM_LAND_USE', item);
            })
        }
    }

    _crudTM_Comp(data) {
        console.log("Masuk Lokal DB Comp");
        console.log("Simpan Comp : " + data.simpan.length);

        if (data.simpan.length > 0) {
            data.simpan.map(item => {
                TaskServices.saveData('TM_COMP', item);
            })
        }
    }

    _crudTM_Content(data) {
        console.log("Masuk Lokal DB Content");
        console.log("Simpan Content : " + data.length);

        if (data.length > 0) {
            data.map(item => {
                TaskServices.saveData('TM_CONTENT', item);
            })
        }
    }

    _crudTM_ContentLabel(data) {
        console.log("Masuk Lokal DB Content Label");
        console.log("Simpan Content Label : " + data.length);

        if (data.length > 0) {
            data.map(item => {
                TaskServices.saveData('TM_CONTENT_LABEL', item);
            })
        }
    }

    _crudTM_Kriteria(data) {
        console.log("Masuk Lokal DB Kriteria");
        console.log("Simpan Kriteria : " + data.length);

        if (data.length > 0) {
            data.map(item => {
                TaskServices.saveData('TM_KRITERIA', item);
            })
        }
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
            downloadContent: false

        });
        // GET DATA MASTER
        this.props.regionRequest();
        this.props.afdRequest();
        this.props.blockRequest();
        this.props.estRequest();
        this.props.landUseRequest();
        this.props.compRequest();
        this.props.contentRequest();
        // this.props.contentLabelRequest();
        // this.props.kriteriaRequest();
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

        if (newProps.region.fetching !== null && !newProps.region.fetching && !this.state.downloadRegion) {
            let dataJSON = newProps.region.region;
            this.setState({downloadRegion:true})
            if(dataJSON !== null){
                this._crudTM_Region(dataJSON);
            }
            
        }
        if (newProps.afd.fetchingAfd !== null && !newProps.afd.fetchingAfd && !this.state.downloadAfd) {
            let dataJSON = newProps.afd.afd;            
            this.setState({downloadAfd:true});
            if(dataJSON !== null){
                this._crudTM_Afd(dataJSON);
            }            
        }
        if (newProps.block.fetchingBlock !== null && !newProps.block.fetchingBlock && !this.state.downloadBlok) {
            let dataJSON = newProps.block.block;
            this.setState({downloadBlok:true});
            if(dataJSON !== null){
                this._crudTM_Block(dataJSON);
            }            
        }
        if (newProps.est.fetchingEst !== null && !newProps.est.fetchingEst && !this.state.downloadEst) {
            let dataJSON = newProps.est.est;
            this.setState({downloadEst:true});
            if(dataJSON !== null){
                this._crudTM_Est(dataJSON);
            }            
        }
        if (newProps.landUse.fetchingLandUse !== null && !newProps.landUse.fetchingLandUse && !this.state.downloadLandUse) {
            let dataJSON = newProps.landUse.landUse;
            this.setState({downloadLandUse:true});
            if(dataJSON !== null){
                this._crudTM_LandUse(dataJSON);
            }            
        }
        if (newProps.comp.fetchingComp !== null && !newProps.comp.fetchingComp && !this.state.downloadComp) {
            let dataJSON = newProps.comp.comp;
            this.setState({downloadComp:true});
            if(dataJSON !== null){
                this._crudTM_Comp(dataJSON);
            }            
        }
        if (newProps.content.fetchingContent !== null && !newProps.content.fetchingContent && !this.state.downloadContent) {
            let dataJSON = newProps.content.content;
            this.setState({downloadContent:true});
            if(dataJSON !== null){
                this._crudTM_Content(dataJSON);
            }            
        }
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
                        <Progress.Bar
                            height={24}
                            width={200}
                            style={styles.progress}
                            progress={this.state.progress}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 48 }}>
                        <TouchableOpacity style={styles.button} onPress={() => this._onSync()}>
                            <Text style={styles.buttonText}>Sync</Text>
                        </TouchableOpacity>
                    </View>
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
        kriteria: state.kriteria
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
        contentLabelPost: obj => dispatch(ContentLabelAction.contentLabelPost(obj))
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

