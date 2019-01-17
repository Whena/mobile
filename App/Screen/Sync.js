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
import FindingImageAction from '../Redux/FindingImageRedux';
import InspeksiAction from '../Redux/InspeksiRedux'

import { ProgressDialog } from 'react-native-simple-dialogs';
import { dirPhotoKategori, dirPhotoTemuan } from '../Lib/dirStorage';
import {getTodayDate} from '../Lib/Utils'

import { connect } from 'react-redux';
import { isNil } from 'ramda';
import RNFetchBlob from 'rn-fetch-blob'

import TaskServices from '../Database/TaskServices'
const IMEI = require('react-native-imei');
var RNFS = require('react-native-fs');
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
            progressFindingImage: 0,
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
            downloadFinding: false,
            downloadFindingImage: false,
            fetchLocation: false,
            isBtnEnable: false,
            isFinishBlock: false,
            isFinishAfd: false,
            isFinisRegion: false,
            isFinishEst: false,
            isFinishContent: false,
            isFinishContentLabel: false,
            isFinishFinding: false,
            isFinishFindingImage: false,
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
            totalContactDownload: '0',
            valueFindingImageDownload: '0',
            totalFindingImageDownload: '0',
            showButton: true
        }
    }

    componentDidMount() {
    }

    loadData() {
        let dataHeader = TaskServices.getAllData('TR_BLOCK_INSPECTION_H');
        if (dataHeader !== null) {
            for (var i = 0; i < dataHeader.length; i++) {
                this.kirimInspeksiHeader(dataHeader[i]);
            }
        }
    }

    kirimInspeksi(param) {
        this.props.postInspeksi({
            BLOCK_INSPECTION_CODE: param.BLOCK_INSPECTION_CODE,
            WERKS: param.WERKS,
            AFD_CODE: param.AFD_CODE,
            BLOCK_CODE: param.AFD_CODE,
            INSPECTION_DATE: param.INSPECTION_DATE,
            INSPECTION_RESULT: param.INSPECTION_RESULT,
            STATUS_SYNC: 'YES',
            SYNC_TIME: getTodayDate('YYYY-MM-DD HH:mm:ss'),
            START_INSPECTION: param.START_INSPECTION,
            END_INSPECTION: param.END_INSPECTION,
            LAT_START_INSPECTION: param.LAT_START_INSPECTION,
            LONG_START_INSPECTION: param.LONG_START_INSPECTION,
            LAT_END_INSPECTION: param.LAT_END_INSPECTION,
            LONG_END_INSPECTION: param.LONG_END_INSPECTION
        });
    }

    loadDataDetail(param) {
        let data = TaskServices.findBy('TR_BLOCK_INSPECTION_D', 'BLOCK_INSPECTION_CODE', param);
        if (data !== null) {
            for (var i = 0; i < data.length; i++) {
                this.kirimInspeksiDetail(data[i]);
            }
        }
    }

    kirimInspeksiDetail(param) {
        this.props.postInspeksiDetail({
            BLOCK_INSPECTION_CODE: param.BLOCK_INSPECTION_CODE,
            BLOCK_INSPECTION_CODE_D: param.BLOCK_INSPECTION_CODE_D,
            CONTENT_CODE: param.CONTENT_CODE,
            AREAL: param.AREAL,
            VALUE: param.VALUE,
            STATUS_SYNC: 'YES',
            SYNC_TIME: getTodayDate('YYYY-MM-DD HH:mm:ss')
        });
    }

    kirimIage(){
        const user = TaskServices.getAllData('TR_LOGIN')
        const data = new FormData();
        var dataImage = TaskServices.query('TR_IMAGE', `STATUS_SYNC = 'N'`)[0];
        data.append('IMAGE_CODE', dataImage.IMAGE_CODE)
        data.append('IMAGE_PATH_LOCAL', dataImage.IMAGE_PATH_LOCAL)
        data.append('TR_CODE', dataImage.TR_CODE)
        data.append('STATUS_IMAGE', dataImage.STATUS_IMAGE)
        data.append('STATUS_SYNC', dataImage.STATUS_SYNC)
        data.append('SYNC_TIME', getTodayDate('YYYY-MM-DD HH:mm:ss'))
        data.append('INSERT_TIME', dataImage.INSERT_TIME)
        data.append('INSERT_USER', dataImage.INSERT_USER)
        data.append('FILENAME', {
            uri: `file://${dataImage.IMAGE_PATH_LOCAL}`, 
            type: 'image/jpeg',
            name: dataImage.IMAGE_NAME,
        });

        const url= "http://149.129.245.230:3012/image/upload-file/"
        fetch(url, {
            method: 'POST',
            headers: {
                'Cache-Control': 'no-cache',
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization : `Bearer ${user[0].ACCESS_TOKEN}`,
            },
            body: data
            
            })
            .then((response) => response.json())
            .then((responseJson) => {
            console.log(responseJson) 
            //   return responseJson    
            }).catch((error) => {
                console.error(error);
            });
        
    }

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
                this.setState({ totalDownload: data.simpan.length })
            }

            data.simpan.map(item => {
                TaskServices.saveData('TM_BLOCK', item);

                let countDataInsert = TaskServices.getTotalData('TM_BLOCK');
                console.log("countDataInsert : " + countDataInsert);
                this.setState({ valueDownload: countDataInsert })
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
                this.setState({ totalAfdDownload: data.simpan.length })
            }

            data.simpan.map(item => {
                TaskServices.saveData('TM_AFD', item);

                let countDataInsert = TaskServices.getTotalData('TM_AFD');
                console.log("countDataInsert : " + countDataInsert);
                this.setState({ valueAfdDownload: countDataInsert });

                this.setState({ isFinishAfd: true });
            });

            // this._postMobileSync("afdeling");
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_AFD');
            this.setState({ progressAfd: 1 })
            this.setState({ valueAfdDownload: countDataInsert })
            this.setState({ totalAfdDownload: 0 });

            // this._postMobileSync("afdeling");
        }
    }

    _crudTM_Region(data) {
        console.log("Simpan Region : " + data.simpan.length);
        var i = 1;
        if (data.simpan.length > 0) {

            for (i = 1; i <= data.simpan.length; i++) {
                this.setState({ progressRegion: i / data.simpan.length });
                this.setState({ totalRegionDownload: data.simpan.length });
            }

            data.simpan.map(item => {
                TaskServices.saveData('TM_REGION', item);

                let countDataInsert = TaskServices.getTotalData('TM_REGION');
                console.log("countDataInsert : " + countDataInsert);
                this.setState({ valueRegionDownload: countDataInsert });
            });

            // this._postMobileSync("region");
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_REGION');
            this.setState({ progressRegion: 1 })
            this.setState({ valueRegionDownload: countDataInsert });
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

        // this.setState({ isBtnEnable: true });
    }

    _crudTM_Est(data) {
        console.log('Data : ' + data);
        var i = 1;
        if (data.simpan.length > 0 && data) {

            for (i = 1; i <= data.simpan.length; i++) {
                this.setState({ progressEst: i / data.simpan.length })
                this.setState({ totalEstDownload: data.simpan.length });
            }

            data.simpan.map(item => {
                TaskServices.saveData('TM_EST', item);

                let countDataInsert = TaskServices.getTotalData('TM_EST');
                console.log("countDataInsert : " + countDataInsert);
                this.setState({ valueEstDownload: countDataInsert });
            });
            // this._postMobileSync("est");
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_EST');
            this.setState({ progressEst: 1 })
            this.setState({ valueEstDownload: countDataInsert });
            this.setState({ totalEstDownload: 0 });

            // this._postMobileSync("est");
        }
    }

    _crudTM_LandUse(data) {
        // if (data != null) {
        console.log("Simpan Land Use : " + data.simpan.length);
        var i = 0;
        if (data.simpan.length > 0) {

            for (i = 1; i <= data.simpan.length; i++) {
                this.setState({ progressLandUse: i / data.simpan.length });
                this.setState({ totalLandUseDownload: data.simpan.length });
            }

            data.simpan.map(item => {
                TaskServices.saveData('TM_LAND_USE', item);

                let countDataInsert = TaskServices.getTotalData('TM_LAND_USE');
                console.log("countDataInsert : " + countDataInsert);
                this.setState({ valueLandUseDownload: countDataInsert });
            })
            this.setState({ showButton: true });
            // this._postMobileSync("landUse");
            alert('Download data selesai')
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_LAND_USE');

            this.setState({ progressLandUse: 1 })
            this.setState({ valueLandUseDownload: countDataInsert });
            this.setState({ totalLandUseDownload: 0 });

            // this.setState({ fetchLocation: false });
        }

        // this.setState({ isBtnEnable: false });
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

                let countDataInsert = TaskServices.getTotalData('TM_COMP');
                console.log("countDataInsert : " + countDataInsert);
                this.setState({ valueCompDownload: countDataInsert });
            })

            // this._postMobileSync("comp");
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_COMP');
            this.setState({ progressComp: 1 })
            this.setState({ valueCompDownload: countDataInsert });
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
                this.setState({ totalContentDownload: data.length });
            }

            data.map(item => {
                TaskServices.saveData('TM_CONTENT', item);

                let countDataInsert = TaskServices.getTotalData('TM_CONTENT');
                console.log("countDataInsert : " + countDataInsert);
                this.setState({ valueContentDownload: countDataInsert });
            });

            // this._postMobileSync("content");
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_CONTENT');
            this.setState({ progressContent: 1 })
            this.setState({ valueContentDownload: countDataInsert });
            this.setState({ totalContentDownload: 0 });

            // this._postMobileSync("content");
        }
    }

    _crudTM_ContentLabel(data) {
        console.log("Simpan Content Label : " + data.length);

        if (data.length > 0) {

            for (i = 1; i <= data.length; i++) {
                this.setState({ progressContentLabel: i / data.length });
                this.setState({ totalContentLabelDownload: data.length });
            }

            data.map(item => {
                TaskServices.saveData('TM_CONTENT_LABEL', item);

                let countDataInsert = TaskServices.getTotalData('TM_CONTENT_LABEL');
                console.log("countDataInsert : " + countDataInsert);
                this.setState({ valueContentLabelDownload: countDataInsert });
            });

            // this._postMobileSync("content-label");
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_CONTENT_LABEL');
            this.setState({ progressContentLabel: 1 })
            this.setState({ valueContentLabelDownload: countDataInsert });
            this.setState({ totalContentLabelDownload: 0 });

            // this._postMobileSync("content-label");
        }
    }

    _crudTM_Kriteria(data) {
        console.log("Simpan Kriteria : " + data.length);

        if (data.length > 0) {

            for (i = 1; i <= data.length; i++) {
                this.setState({ progressKriteria: i / data.length });
                this.setState({ totalKriteriaDownload: data.length });
            }

            data.map(item => {
                TaskServices.saveData('TM_KRITERIA', item);

                let countDataInsert = TaskServices.getTotalData('TM_KRITERIA');
                console.log("countDataInsert : " + countDataInsert);
                this.setState({ valueKriteriaDownload: countDataInsert });
            });

            // this._postMobileSync("kriteria");
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_KRITERIA');
            this.setState({ progressKriteria: 1 })
            this.setState({ valueKriteriaDownload: countDataInsert });
            this.setState({ totalKriteriaDownload: 0 });

            // this._postMobileSync("kriteria");
        }
    }

    _crudTM_Finding(data) {
        var dataSimpan = data.simpan;
        console.log("Simpan Finding : " + dataSimpan.length);

        if (dataSimpan.length > 0) {

            for (i = 1; i <= dataSimpan.length; i++) {
                this.setState({ progressFinding: i / dataSimpan.length });
                this.setState({ totalFindingDownload: dataSimpan.length });
            }

            dataSimpan.map(item => {
                TaskServices.saveData('TR_FINDING', item);

                let countDataInsert = TaskServices.getTotalData('TR_FINDING');
                console.log("countDataInsert : " + countDataInsert);
                this.setState({ valueFindingDownload: countDataInsert });

                this.setState({ isFinishFinding: true });
            });

            // this._postMobileSync("finding");
        } else {
            let countDataInsert = TaskServices.getTotalData('TR_FINDING');
            this.setState({ progressFinding: 1 })
            this.setState({ valueFindingDownload: countDataInsert });
            this.setState({ totalFindingDownload: 0 });

            // this._postMobileSync("finding");
        }
    }

    _crudTM_Category(data) {
        console.log("Simpan Category : " + data.length);

        if (data.length > 0) {

            for (i = 1; i <= data.length; i++) {
                this.setState({ progressCategory: i / data.length });
                this.setState({ totalCategoryDownload: data.length });
            }

            data.map(item => {
                TaskServices.saveData('TR_CATEGORY', item);
                let countDataInsert = TaskServices.getTotalData('TR_CATEGORY');
                console.log("countDataInsert : " + countDataInsert);
                this.setState({ valueCategoryDownload: countDataInsert });
                this.download(item);
            });
        } else {
            let countDataInsert = TaskServices.getTotalData('TR_CATEGORY');
            this.setState({ progressCategory: 1 })
            this.setState({ valueCategoryDownload: countDataInsert });
            this.setState({ totalCategoryDownload: 0 });
        }
        // this._postMobileSync("category");
    }


    _crudTM_Contact(data) {
        console.log("Simpan Contact : " + data.data.length);
        var dataContact = data.data;
        console.log(JSON.stringify(dataContact))

        if (dataContact.length > 0) {

            for (i = 1; i <= dataContact.length; i++) {
                this.setState({ progressContact: i / dataContact.length });
                this.setState({ totalContactDownload: dataContact.length });
            }

            dataContact.map(item => {
                TaskServices.saveData('TR_CONTACT', item);

                let countDataInsert = TaskServices.getTotalData('TR_CONTACT');
                console.log("countDataInsert : " + countDataInsert);
                this.setState({ valueContactDownload: countDataInsert });

                this.setState({ isFinishFinding: true });
            });

            // this._postMobileSync("contact");
        } else {
            let countDataInsert = TaskServices.getTotalData('TR_CONTACT');
            this.setState({ progressContact: 1 })
            this.setState({ valueContactDownload: countDataInsert });
            this.setState({ totalContactDownload: 0 });
        }
    }

    _crudTM_Finding_Image(data) {

        var dataSimpan = data.simpan;
        console.log("Simpan Finding Image : " + dataSimpan.length);

        if (dataSimpan.length > 0) {

            for (i = 1; i <= dataSimpan.length; i++) {
                this.setState({ progressFindingImage: i / dataSimpan.length });
                this.setState({ totalFindingImageDownload: dataSimpan.length });
            }

            dataSimpan.map(item => {
                // TaskServices.saveData('TR_IMAGE_FINDING', item);

                // this._downloadImageFinding(item);

                // let countDataInsert = TaskServices.getTotalData('TR_IMAGE_FINDING');
                // console.log("countDataInsert : " + countDataInsert);
                // this.setState({ valueFindingImageDownload: countDataInsert });

                // this.setState({ isFinishFindingImage: true });

                TaskServices.saveData('TR_IMAGE', item);

                this._downloadImageFinding(item);
                let countDataInsert = TaskServices.getTotalData('TR_IMAGE');
                this.setState({ valueFindingImageDownload: countDataInsert });
                this.setState({ isFinishFindingImage: true });
            });

            // this._postMobileSync("contact");
        } else {
            let countDataInsert = TaskServices.getTotalData('TR_IMAGE_FINDING');
            this.setState({ progressFindingImage: 1 })
            this.setState({ valueFindingImageDownload: countDataInsert });
            this.setState({ totalFindingImageDownload: 0 });
        }
    }

    _get_IMEI_Number() {
        var IMEI_2 = IMEI.getImei();
        this.setState({ imei: IMEI_2 });
        return IMEI_2;
    }


    _downloadImageFinding(data) {
        var url = data.IMAGE_URL;
        const { config, fs } = RNFetchBlob
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: `${dirPhotoTemuan}/${data.IMAGE_NAME}`,
                description: 'Image'
            }
        }
        config(options).fetch('GET', url).then((res) => {
            //   alert("Success Downloaded " + res);
        });
    }

    kirimImageInspeksi(){
        
    }

    _onSync() {

        // this.setState({
        //     downloadRegion: false,
        //     downloadAfd: false,
        //     downloadBlok: false,
        //     downloadEst: false,
        //     downloadLandUse: false,
        //     downloadComp: false,
        //     downloadContent: false,
        //     downloadContact: false,
        //     downloadContentLabel: false,
        //     downloadKriteria: false,
        //     downloadFinding: false,
        //     downloadFindingImage: false,
        //     downloadCategory: false,
        //     fetchLocation: false,
        //     isBtnEnable: false,
        //     progress: 0,
        //     progressAfd: 0,
        //     progressRegion: 0,
        //     progressEst: 0,
        //     progressLandUse: 0,
        //     progressComp: 0,
        //     progressContent: 0,
        //     progressContentLabel: 0,
        //     progressKriteria: 0,
        //     progressCategory: 0,
        //     progressContact: 0,
        //     progressFinding: 0,
        //     progressFindingImage: 0

        //     // kirimInspeksi: this.kirimInspeksi,
        //     // kirimInspeksiDetail: this.kirimInspeksiDetail

        // });

        // // GET DATA MASTER
        // this.props.contentRequest();
        // this.props.blockRequest();
        // this.props.afdRequest();
        // this.props.regionRequest();
        // this.props.estRequest();
        // this.props.landUseRequest();
        // this.props.compRequest();
        // this.props.contentLabelRequest();
        // this.props.kriteriaRequest();
        // this.props.categoryRequest();
        // this.props.contactRequest();
        // this.props.findingRequest();
        // this.props.findingImageRequest();

        this.kirimIage()

        // this.kirimInspeksi()

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

        // console.log(newProps)

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
            if (dataJSON !== null) {
                this._crudTM_Contact(dataJSON);
            }
            this.setState({ downloadContact: true });
        }

        if (newProps.finding.fetchingFinding !== null && !newProps.finding.fetchingFinding && !this.state.downloadFinding) {
            let dataJSON = newProps.finding.finding;
            this.setState({ downloadFinding: true });
            if (dataJSON !== null) {
                this._crudTM_Finding(dataJSON);
            }
        }

        if (newProps.findingImage.fetchingFindingImage !== null && !newProps.findingImage.fetchingFindingImage && !this.state.downloadFindingImage) {
            let dataJSON = newProps.findingImage.findingImage;
            this.setState({ downloadFindingImage: true });
            if (dataJSON !== null) {
                this._crudTM_Finding_Image(dataJSON);
            }
        }

        RNFS.copyFile(TaskServices.getPath(), 'file:///storage/emulated/0/MobileInspection/data.realm');


        // if (this.state.downloadBlok && this.state.downloadAfd && this.state.downloadRegion && this.state.downloadEst
        //     && this.state.downloadLandUse && this.state.downloadComp && this.state.downloadContent && this.state.downloadContentLabel
        //     && this.state.downloadKriteria && this.state.downloadCategory && this.state.downloadContact) {


        // }
    }

    download(data) {
        var url = data.ICON_URL;
        const { config, fs } = RNFetchBlob
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: `${dirPhotoKategori}/${data.ICON}`,
                description: 'Image'
            }
        }
        config(options).fetch('GET', url).then((res) => {
            //   alert("Success Downloaded " + res);
        });

        if (this.setState.isFinishFinding == true && this.setState.isFinishFindingImage == true) {
            this.setState({ showButton: true });
        }

        // if (this.setState.downloadBlok && this.setState.downloadAfd && this.setState.downloadRegion && this.setState.downloadEst
        //     && this.setState.downloadLandUse && this.setState.downloadComp && this.setState.downloadContent && this.setState.downloadContentLabel
        //     && this.setState.downloadKriteria && this.setState.downloadCategory && this.setState.downloadContact) {
        //     RNFS.copyFile(TaskServices.getPath(), 'file:///storage/emulated/0/MobileInspection/data.realm');
        // }
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

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>FINDING</Text>
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

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>FINDING IMAGE</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueFindingImageDownload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalFindingImageDownload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressFindingImage}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    {this.state.showButton && <View style={{ flex: 1, marginTop: 48 }}>
                        <TouchableOpacity disabled={this.state.isBtnEnable} style={styles.button} onPress={() => { this.setState({ showButton: false }); this._onSync() }}>
                            <Text style={styles.buttonText}>Sync</Text>
                        </TouchableOpacity>
                    </View>}

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
        category: state.category,
        findingImage: state.findingImage,
        inspeksi: state.inspeksi
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
        findingPost: obj => dispatch(FindingAction.findingPost(obj)),
        findingImageRequest: () => dispatch(FindingImageAction.findingImageRequest()),
        postInspeksi: obj => dispatch(InspeksiAction.postInspeksi(obj)),
        postInspeksiDtl: obj => dispatch(InspeksiAction.postInspeksiDtl(obj))
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

