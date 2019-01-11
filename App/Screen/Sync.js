import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Container, Content, Row } from 'native-base'

import * as Progress from 'react-native-progress';
import ProgressCircle from 'react-native-progress-circle'
import Colors from '../Constant/Colors';

import { moment } from 'moment';

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
import { dirPhotoKategori } from '../Lib/dirStorage';

import { connect } from 'react-redux';
import { isNil } from 'ramda';

const IMEI = require('react-native-imei');
var RNFS = require('react-native-fs');
import RNFetchBlob from 'rn-fetch-blob'

import TaskServices from '../Database/TaskServices'
// import { isNull } from 'util';
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
            progressCategory: 0,
            progressContact: 0,
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
            downloadCategory: false,
            donwloadFinding: false,
            fetchLocation: false,
            isBtnEnable: false,
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
            totalFindingDownload: '0',
            valueCategoryDownload: '0',
            totalCategoryDownload: '0',
            valueContactDownload: '0',
            totalContactDownload: '0'
        }
    }

    // componentDidMount() {
    //     this.state.downloadApa
    // }

    // POST MOBILE SYNC
    _postMobileSync(tableName) {
        var moment = require('moment');
        this.props.regionPost({
            TGL_MOBILE_SYNC: moment().format('YYYY-MM-DD hh:mm:ss'),
            TABEL_UPDATE: "hectare-statement/" + tableName
        });
    }

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

            // this._postMobileSync("block");
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

            // this._postMobileSync("afd");
        } else {
            this.setState({ progressAfd: 1 })
            this.setState({ valueAfdDownload: 0 });
            this.setState({ totalAfdDownload: 0 });
        }
    }

    _crudTM_Region(data) {
        console.log("Simpan Region : " + data.simpan.length);
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

            // this._postMobileSync("region");
        } else {
            this.setState({ progressRegion: 1 })
            this.setState({ valueRegionDownload: 0 });
            this.setState({ totalRegionDownload: 0 });

            // this._postMobileSync("region");
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

        this.setState({ isBtnEnable: true });
    }

    _crudTM_Est(data) {
        console.log('Data : ' + data);
        // if(data != null){
        var i = 1;
        if (data.simpan.length > 0 && data) {

            for (i = 1; i <= data.simpan.length; i++) {
                this.setState({ progressEst: i / data.simpan.length })
                this.setState({ valueEstDownload: i });
                this.setState({ totalEstDownload: data.simpan.length });
            }

            data.simpan.map(item => {
                TaskServices.saveData('TM_EST', item);
            })

            // this._postMobileSync("est");
        } else {
            this.setState({ progressEst: 1 })
            this.setState({ valueEstDownload: 0 });
            this.setState({ totalRegionDownload: 0 });

            // this._postMobileSync("est");
        }
        // }
    }

    _crudTM_LandUse(data) {
        // if (data != null) {
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

            // this._postMobileSync("landUse");
        } else {
            this.setState({ progressLandUse: 1 })
            this.setState({ valueLandUseDownload: 0 });
            this.setState({ totalLandUseDownload: 0 });

            this.setState({ fetchLocation: false });
        }

        this.setState({ isBtnEnable: false });
        // }
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

            // this._postMobileSync("comp");
        } else {
            this.setState({ progressComp: 1 })
            this.setState({ valueCompDownload: 0 });
            this.setState({ totalCompDownload: 0 });

            // this._postMobileSync("comp");
        }
        // }
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
            });

            // this._postMobileSync("content");
        } else {
            this.setState({ progressContent: 1 })
            this.setState({ valueContentDownload: 0 });
            this.setState({ totalContentDownload: 0 });

            // this._postMobileSync("content");
        }
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
            });

            // this._postMobileSync("content-label");
        } else {
            this.setState({ progressContentLabel: 1 })
            this.setState({ valueContentLabelDownload: 0 });
            this.setState({ totalContentLabelDownload: 0 });

            // this._postMobileSync("content-label");
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
            });

            // this._postMobileSync("kriteria");
        } else {
            this.setState({ progressKriteria: 1 })
            this.setState({ valueKriteriaDownload: 0 });
            this.setState({ totalKriteriaDownload: 0 });

            // this._postMobileSync("kriteria");
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
            });

            // this._postMobileSync("finding");
        } else {
            this.setState({ progressFinding: 1 })
            this.setState({ valueFindingDownload: 0 });
            this.setState({ totalFindingDownload: 0 });

            // this._postMobileSync("finding");
        }
    }

    _crudTM_Category(data) {
        console.log("Simpan Category : " + data.length);

        if (data.length > 0) {

            for (i = 1; i <= data.length; i++) {
                this.setState({ progressCategory: i / data.length });
                this.setState({ valueCategoryDownload: i });
                this.setState({ totalCategoryDownload: data.length });
            }

            data.map(item => {
                TaskServices.saveData('TR_CATEGORY', item);
                this.download(item);
            })
        } else {
            this.setState({ progressCategory: 1 })
            this.setState({ valueCategoryDownload: 0 });
            this.setState({ totalCategoryDownload: 0 });

            // this._postMobileSync("category");
        }
    }

    _crudTM_Contact(data) {
        console.log("Simpan Contact : " + data.data.length);
        var dataContact = data.data;
        console.log(JSON.stringify(dataContact))

        if (dataContact.length > 0) {

            for (i = 1; i <= dataContact.length; i++) {
                this.setState({ progressContact: i / dataContact.length });
                this.setState({ valueContactDownload: i });
                this.setState({ totalContactDownload: dataContact.length });
            }

            dataContact.map(item => {
                TaskServices.saveData('TR_CONTACT', item);
            })
        } else {
            this.setState({ progressContact: 1 })
            this.setState({ valueContactDownload: 0 });
            this.setState({ totalContactDownload: 0 });
        }
    }

    _get_IMEI_Number() {
        var IMEI_2 = IMEI.getImei();
        this.setState({ imei: IMEI_2 });
        return IMEI_2;
    }

    _onSync() {

        // this.props.afdPost({
        //     TGL_MOBILE_SYNC: "2018-12-17 00:00:00",
        //     TABEL_UPDATE: "hectare-statement/block"
        // });

        // this.props.blockPost({
        //     TGL_MOBILE_SYNC: "2018-12-17 00:00:00",
        //     TABEL_UPDATE: "hectare-statement/block"
        // });

        // this.props.estPost({
        //     TGL_MOBILE_SYNC: "2018-12-17 00:00:00",
        //     TABEL_UPDATE: "hectare-statement/block"
        // });

        // this.props.landUsePost({
        //     TGL_MOBILE_SYNC: "2018-12-17 00:00:00",
        //     TABEL_UPDATE: "hectare-statement/block"
        // });

        // this.props.comp({
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
            downloadCategory: false,
            fetchLocation: false,
            isBtnEnable: true

        });

        // GET DATA MASTER
        this.props.contentRequest();
        this.props.blockRequest();
        this.props.afdRequest();
        this.props.regionRequest();
        this.props.estRequest();
        this.props.landUseRequest();
        this.props.compRequest();
        this.props.contentLabelRequest();
        this.props.kriteriaRequest();
        this.props.categoryRequest();
        this.props.contactRequest();
        this.props.findingRequest();

    }

    animate() {
        let progress = 0;
        let countData = 200;
        this.setState({ progress });
        progress = 100 / countData;
        this.setState({ progress });
        console.log("Progress : " + progress + "%")
    }

    componentWillReceiveProps(newProps) {

        if (newProps.block.fetchingBlock !== null && !newProps.block.fetchingBlock && !this.state.downloadBlok) {
            let dataJSON = newProps.block.block;
            this.setState({ downloadBlok: true });
            if (dataJSON !== null) {
                this._crudTM_Block(dataJSON);
            }
        }

        if (newProps.afd.fetchingAfd !== null && !newProps.afd.fetchingAfd && !this.state.downloadAfd) {
            let dataJSON = newProps.afd.afd;
            this.setState({ downloadAfd: true });
            if (dataJSON !== null) {
                this._crudTM_Afd(dataJSON);
            }
        }

        if (newProps.region.fetching !== null && !newProps.region.fetching && !this.state.downloadRegion) {
            let dataJSON = newProps.region.region;
            this.setState({ downloadRegion: true })
            if (dataJSON !== null) {
                this._crudTM_Region(dataJSON);
            }
        }

        if (newProps.est.fetchingEst !== null && !newProps.est.fetchingEst && !this.state.downloadEst) {
            let dataJSON = newProps.est.est;
            this.setState({ downloadEst: true });
            if (dataJSON !== null) {
                this._crudTM_Est(dataJSON);
            }
        }

        if (newProps.landUse.fetchingLandUse !== null && !newProps.landUse.fetchingLandUse && !this.state.downloadLandUse) {
            let dataJSON = newProps.landUse.landUse;
            this.setState({ downloadLandUse: true });
            if (dataJSON !== null) {
                this._crudTM_LandUse(dataJSON);
            }
        }

        if (newProps.comp.fetchingComp !== null && !newProps.comp.fetchingComp && !this.state.downloadComp) {
            let dataJSON = newProps.comp.comp;
            this.setState({ downloadComp: true });
            if (dataJSON !== null) {
                this._crudTM_Comp(dataJSON);
            }
        }

        if (newProps.content.fetchingContent !== null && !newProps.content.fetchingContent && !this.state.downloadContent) {
            let dataJSON = newProps.content.content;
            this.setState({ downloadContent: true });
            if (dataJSON !== null) {
                this._crudTM_Content(dataJSON);
            }
        }

        if (newProps.contentLabel.fetchingContentLabel !== null && !newProps.contentLabel.fetchingContentLabel && !this.state.downloadContentLabel) {
            let dataJSON = newProps.contentLabel.contentLabel;
            this.setState({ downloadContentLabel: true });
            if (dataJSON !== null) {
                this._crudTM_ContentLabel(dataJSON);
            }
        }

        if (newProps.kriteria.fetchingKriteria !== null && !newProps.kriteria.fetchingKriteria && !this.state.downloadKriteria) {
            let dataJSON = newProps.kriteria.kriteria;
            this.setState({ downloadKriteria: true });
            if (dataJSON !== null) {
                this._crudTM_Kriteria(dataJSON);
            }
        }

        if (newProps.category.fetchingCategory !== null && !newProps.category.fetchingCategory && !this.state.downloadCategory) {
            let dataJSON = newProps.category.category;
            this.setState({ downloadCategory: true });
            if (dataJSON !== null) {
                this._crudTM_Category(dataJSON);
            }
        }

        if (newProps.contact.fetchingContact !== null && !newProps.contact.fetchingContact && !this.state.downloadContact) {
            let dataJSON = newProps.contact.contact;
            this.setState({ downloadContact: true });
            if (dataJSON !== null) {
                this._crudTM_Contact(dataJSON);
            }
        }

        if(this.state.downloadBlok && this.state.downloadAfd && this.state.downloadRegion && this.state.downloadEst 
            && this.state.downloadLandUse && this.state.downloadComp && this.state.downloadContent && this.state.downloadContentLabel
            && this.state.downloadKriteria && this.state.downloadCategory && this.state.downloadContact){

                RNFS.copyFile(TaskServices.getPath(), 'file:///storage/emulated/0/MobileInspection/data.realm');
        }

        // if (newProps.finding.fetchingFinding !== null && !newProps.kriteria.fetchingFinding && !this.state.downloadFinding) {
        //     let dataJSON = newProps.finding.finding;
        //     this.setState({ downloadFinding: true });
        //     if (dataJSON !== null) {
        //         this._crudTM_Finding(dataJSON);
        //     }
        // }
    }

    download(data){
        console.log(data)
        var date      = new Date();
        var url       = data.ICON_URL;
        const { config, fs } = RNFetchBlob
        // let PictureDir = '/storage/emulated/0/MobileInspection'//fs.dirs.PictureDir
        // alert(PictureDir)
        let options = {
          fileCache: true,
          addAndroidDownloads : {
            useDownloadManager : true,
            notification : true,
            path:  `${dirPhotoKategori}/${data.ICON}`,//PictureDir + "/image_"+Math.floor(date.getTime() + date.getSeconds() / 2)+ext,
            description : 'Image'
          }
        }
        config(options).fetch('GET', url).then((res) => {
        //   alert("Success Downloaded " + res);
        });
    }

    render() {
        return (
            <Container style={{ flex: 1, padding: 16 }}>
                <Content>
                    <View style={{ flex: 1, marginTop: 0 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>BLOCK</Text>
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
                            <Text>AFD</Text>
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
                            <Text>REGION</Text>
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
                            <Text>ESTATE</Text>
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
                            <Text>LAND USE</Text>
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
                            <Text>COMP</Text>
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
                            <Text>CONTENT</Text>
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
                            <Text>CONTENT LABEL</Text>
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
                            <Text>KRITERIA</Text>
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

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>CATEGORY</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueCategoryDownload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalCategoryDownload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressCategory}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>CONTACT</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueContactDownload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalContactDownload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressContact}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 48 }}>
                        <TouchableOpacity disabled={this.state.isBtnEnable} style={styles.button} onPress={() => this._onSync()}>
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
        finding: state.finding,
        category: state.category
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

