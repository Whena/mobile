import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Container, Content } from 'native-base'
import * as Progress from 'react-native-progress';
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
import FindingUploadAction from '../Redux/FindingUploadRedux'
import TMobileAction from '../Redux/TMobileRedux'
import ParamTrackAction from '../Redux/ParamTrackRedux'
import { ProgressDialog } from 'react-native-simple-dialogs';
import { dirPhotoKategori, dirPhotoTemuan } from '../Lib/dirStorage';
import { connect } from 'react-redux';
import R, { isEmpty, isNil } from 'ramda'
import RNFetchBlob from 'rn-fetch-blob'
import TaskServices from '../Database/TaskServices'
import { getTodayDate, convertTimestampToDate, fetchPostDataWithToken } from '../Lib/Utils';
var RNFS = require('react-native-fs');


const user = TaskServices.getAllData('TR_LOGIN')[0];

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
            progressInspeksiHeader: 0,
            progressInspeksiDetail: 0,
            progressUploadImage: 0,
            progressFindingData: 0,
            progressInspectionTrack: 0,
            progressParamInspection: 0,
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
            downloadParamTrack: false,
            uploadFinding: false,
            uploadInspeksi: false,
            downloadInspeksiParam: false,
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
            valueInspeksiHeaderUpload: '0',
            totalInspeksiHeaderUpload: '0',
            valueInspeksiDetailUpload: '0',
            totalInspeksiDetailUpload: '0',
            valueFindingDataUpload: '0',
            totalFindingDataUpload: '0',
            valueImageUpload: '0',
            totalImagelUpload: '0',
            valueImageUpload: '0',
            totalImagelUpload: '0',
            valueInspectionTrack: '0',
            totalInspectionTrack: '0',
            valueParamInspection: '0',
            totalParamInspection: '0',

            dataFinding: [],
            dataInspeksi: [],
            dataInspeksiDetail: [],
            dataBarisInspeksi: [],
            dataTrack: [],

            showButton: true,
            blockInspectionCodes: []
        }
    }

    //upload
    loadDataFinding() {
        let countData = TaskServices.getAllData('TR_FINDING');
        this.setState({ progressFindingData: 1, valueFindingDataUpload: countData.length, totalFindingDataUpload: countData.length});
        if (countData.length > 0) {
            countData.map(item => {
                // this.state.dataFinding.push(item)
                this.kirimFinding(item);
            });
        } else {
            this.setState({ progressFindingData: 1, valueFindingDataUpload: 0, totalFindingDataUpload: 0  });
        }
    }

    loadData() {
        try {
            let dataHeader = TaskServices.getAllData('TR_BLOCK_INSPECTION_H');
            var query = dataHeader.filtered('STATUS_SYNC = "N"');
            let countData = query;

            this.setState({ 
                progressInspeksiHeader: 1, 
                valueInspeksiHeaderUpload: countData.length, 
                totalInspeksiHeaderUpload: countData.length,
            });
            
            
            if (countData.length > 0) {
                countData.map(item => {
                    if(!this.state.dataBarisInspeksi.includes(item.ID_INSPECTION)){
                        this.state.dataBarisInspeksi.push(item.ID_INSPECTION)
                    }
                    this.state.blockInspectionCodes.push(item.BLOCK_INSPECTION_CODE)
                    // this.state.dataInspeksi.push(item)
                    this.kirimInspeksiHeader(item);

                });
            } else {
                this.setState({ 
                    progressInspeksiHeader: 1,
                    valueInspeksiHeaderUpload: 0,
                    totalInspeksiHeaderUpload: 0,
                    progressInspeksiDetail: 1,
                    valueInspeksiDetailUpload: 0,
                    totalInspeksiDetailUpload: 0
                });
            }

            if (this.state.blockInspectionCodes.length > 0) {
                this.state.blockInspectionCodes.map(item => {
                    let data = TaskServices.findBy('TR_BLOCK_INSPECTION_D', 'BLOCK_INSPECTION_CODE', item);
                    this.setState({ progressInspeksiDetail: 1, valueInspeksiDetailUpload: data.length, totalInspeksiDetailUpload: data.length});

                    if (data !== null) {
                        for (var i = 0; i < data.length; i++) {
                            // this.state.dataInspeksiDetail.push(data[i])
                            this.kirimInspeksiDetail(data[i], data[i].BLOCK_INSPECTION_CODE_D);
                        }
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    loadDataInspectionTrack() {
        let dataHeader = TaskServices.getAllData('TM_INSPECTION_TRACK');
        var query = dataHeader.filtered('STATUS_SYNC = "N"');
        let countData = query;
        this.setState({ progressInspectionTrack: 1, valueInspectionTrack: countData.length, totalInspectionTrack: countData.length });
        if (countData.length > 0) {
            countData.map(item => {
                // this.state.dataTrack.push(item);
                this.kirimInspectionTrack(item);
            })
        } else {
            // alert('Tidak ada data yg diupload');
            this.setState({ progressInspectionTrack: 1, valueInspectionTrack: 0, totalInspectionTrack: 0  });
        }
    }

    fetchingData(URL, dataPost, table, idInspection){
        fetch(URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' ,
                'Authorization': `Bearer ${user.ACCESS_TOKEN}`
            },
        body: JSON.stringify(dataPost)
        })
        .then((response) => { 
            return response.json();   
        })
        .then((data) => { 
            console.log(data)
            if(data.status){
                if(table == 'header'){
                    this.state.dataInspeksi.push(dataPost)
                    this.updateInspeksi(dataPost);
                    this.updateInspeksiBaris(idInspection);
                }else if(table == 'detailHeader'){
                    this.updateInspeksiDetail(dataPost)
                }else if(table == 'tracking'){
                    this.updateInspeksiTrack(dataPost)
                }else if(table == 'finding'){
                    this.updateFinding(dataPost)
                }
            }
        })
    }

    updateInspeksi = param => {   
        if(this.state.dataInspeksi !== null){
            let allData = TaskServices.getAllData('TR_BLOCK_INSPECTION_H')
            let indexData = R.findIndex(R.propEq('BLOCK_INSPECTION_CODE', param.BLOCK_INSPECTION_CODE))(allData);
            TaskServices.updateInspeksiSync('TR_BLOCK_INSPECTION_H', 'Y', indexData);
        }
    }

    updateInspeksiDetail = param => {        
        if(this.state.dataInspeksiDetail !== null){
            let allData = TaskServices.getAllData('TR_BLOCK_INSPECTION_D')
            let indexData = R.findIndex(R.propEq('BLOCK_INSPECTION_CODE_D', param.BLOCK_INSPECTION_CODE_D))(allData);
            TaskServices.updateInspeksiSync('TR_BLOCK_INSPECTION_D', 'Y', indexData);
        }
    }

    updateInspeksiTrack = param => {
        if(this.state.dataTrack !== null){
            let allData = TaskServices.getAllData('TM_INSPECTION_TRACK')
            let indexData = R.findIndex(R.propEq('TRACK_INSPECTION_CODE', param.TRACK_INSPECTION_CODE))(allData);
            TaskServices.updateInspeksiSync('TM_INSPECTION_TRACK', 'Y', indexData);
        }
    }

    updateInspeksiBaris = param =>{
        if(this.state.dataBarisInspeksi !== null){
            let allData = TaskServices.getAllData('TR_BARIS_INSPECTION');
            let indexData = R.findIndex(R.propEq('ID_INSPECTION', param))(allData);
            TaskServices.updateInspeksiSync('TR_BARIS_INSPECTION', 'Y', indexData);
        }
    }

    updateFinding = param => {        
        if(this.state.dataFinding !== null){
            let allData = TaskServices.getAllData('TR_FINDING')
            let indexData = R.findIndex(R.propEq('FINDING_CODE', param.FINDING_CODE))(allData);
            TaskServices.updateFindingSync('TR_FINDING', ['Y', param.PROGRESS, param.DUE_DATE], indexData);
        }
    }

    //upload to service
    kirimInspeksiHeader(param) {
        let data = {
            BLOCK_INSPECTION_CODE: param.BLOCK_INSPECTION_CODE,
            WERKS: param.WERKS,
            AFD_CODE: param.AFD_CODE,
            BLOCK_CODE: param.BLOCK_CODE,
            AREAL: param.AREAL,
            INSPECTION_TYPE: "PANEN",
            INSPECTION_DATE: convertTimestampToDate(param.INSPECTION_DATE, 'YYYYMMDDHHmmss'),
            INSPECTION_RESULT: param.INSPECTION_RESULT,
            INSPECTION_SCORE: param.INSPECTION_SCORE,
            STATUS_SYNC: 'Y',
            SYNC_TIME: getTodayDate('YYYYMMDDHHmmss'),
            START_INSPECTION: convertTimestampToDate(param.START_INSPECTION, 'YYYYMMDDHHmmss'),
            END_INSPECTION: param.END_INSPECTION,
            LAT_START_INSPECTION: param.LAT_START_INSPECTION,
            LONG_START_INSPECTION: param.LONG_START_INSPECTION,
            LAT_END_INSPECTION: param.LAT_END_INSPECTION,
            LONG_END_INSPECTION: param.LONG_END_INSPECTION,
            INSERT_TIME: convertTimestampToDate(param.INSERT_TIME, 'YYYYMMDDHHmmss'),
            INSERT_USER: user.USER_AUTH_CODE
        }
        this.fetchingData('http://149.129.245.230:3008/api/inspection-header', data, 'header', param.ID_INSPECTION);
    }

    kirimInspeksiDetail(result) {
        let data = {
            BLOCK_INSPECTION_CODE_D: result.BLOCK_INSPECTION_CODE_D,
            BLOCK_INSPECTION_CODE: result.BLOCK_INSPECTION_CODE,
            CONTENT_INSPECTION_CODE: result.CONTENT_INSPECTION_CODE,
            VALUE: result.VALUE,
            STATUS_SYNC: 'Y',
            SYNC_TIME: getTodayDate('YYYYMMDDHHmmss'),
            INSERT_USER: user.USER_AUTH_CODE,
            INSERT_TIME: convertTimestampToDate(result, 'YYYYMMDDHHmmss')
        }
        this.fetchingData('http://149.129.245.230:3008/api/inspection-detail', data, 'detailHeader', '');
    }

    kirimInspectionTrack(param) {
        let data = {
            TRACK_INSPECTION_CODE: param.TRACK_INSPECTION_CODE,
            BLOCK_INSPECTION_CODE: param.BLOCK_INSPECTION_CODE,
            DATE_TRACK: param.DATE_TRACK,
            LAT_TRACK: param.LAT_TRACK,
            LONG_TRACK: param.LONG_TRACK,
            INSERT_USER: param.INSERT_USER,
            INSERT_TIME: param.INSERT_TIME
        }
        this.fetchingData('http://149.129.245.230:3008/api/inspection-tracking', data, 'tracking', '');
    }

    kirimFinding(param) {
        let data = {
            FINDING_CODE: param.FINDING_CODE,
            WERKS: param.WERKS,
            AFD_CODE: param.AFD_CODE,
            BLOCK_CODE: param.BLOCK_CODE,
            FINDING_CATEGORY: param.FINDING_CATEGORY,
            FINDING_DESC: param.FINDING_DESC,
            FINDING_PRIORITY: param.FINDING_PRIORITY,
            DUE_DATE: param.DUE_DATE,
            ASSIGN_TO: param.ASSIGN_TO,
            PROGRESS: param.PROGRESS,
            LAT_FINDING: param.LAT_FINDING,
            LONG_FINDING: param.LONG_FINDING,
            REFFERENCE_INS_CODE: param.REFFERENCE_INS_CODE,
            INSERT_USER: param.INSERT_USER,
            INSERT_TIME: param.INSERT_TIME
        }
        this.fetchingData('http://149.129.245.230:3008/api/finding', data, 'finding', '');
    }    

    async kirimImage() {
        try {
            const user = TaskServices.getAllData('TR_LOGIN')[0];
            let all = TaskServices.getAllData('TR_IMAGE')
            var dataImage = TaskServices.query('TR_IMAGE', `STATUS_SYNC = 'N'`);
            if (all !== undefined && dataImage !== undefined) {
                dataImage.map((item, index) =>{
                    RNFS.exists(`file://${item.IMAGE_PATH_LOCAL}`).
                    then((exists) =>{
                        if(exists){
                            var data = new FormData();
                            let idxOrder = null;
                            data.append('IMAGE_CODE', item.IMAGE_CODE)
                            data.append('IMAGE_PATH_LOCAL', item.IMAGE_PATH_LOCAL)
                            data.append('TR_CODE', item.TR_CODE)
                            data.append('STATUS_IMAGE', item.STATUS_IMAGE)
                            data.append('STATUS_SYNC', 'Y')
                            data.append('SYNC_TIME', getTodayDate('YYYYMMDDHHmmss'))
                            data.append('INSERT_TIME', convertTimestampToDate(item.INSERT_TIME, 'YYYYMMDDHHmmss'))
                            data.append('INSERT_USER', item.INSERT_USER)
                            data.append('FILENAME', {
                                uri: `file://${item.IMAGE_PATH_LOCAL}`,
                                type: 'image/jpeg',
                                name: item.IMAGE_NAME,
                            });
                            let indexData = R.findIndex(R.propEq('IMAGE_CODE', item.IMAGE_CODE))(all);
                            idxOrder = indexData
                            console.log(JSON.stringify(data))
                            const url = "http://149.129.245.230:3012/image/upload-file/"
                            fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Cache-Control': 'no-cache',
                                    Accept: 'application/json',
                                    'Content-Type': 'multipart/form-data',
                                    Authorization: `Bearer ${user.ACCESS_TOKEN}`,
                                },
                                body: data
                            })
                            .then((response) => response.json())
                            .then((responseJson) => {
                                console.log(responseJson)
                                var dataImage = TaskServices.query('TR_IMAGE', `STATUS_SYNC = 'N'`);
                                if (responseJson.status) {
                                    this.setState({ progressUploadImage: 1, valueImageUpload: dataImage.length, totalImagelUpload: dataImage.length });
                                    TaskServices.updateStatusImage('TR_IMAGE', 'Y', idxOrder);
                                }
                            }).catch((error) => {
                                console.error(error);
                            });
                        }else{                          
                            let data = TaskServices.getAllData('TR_IMAGE');
                            let indexData = R.findIndex(R.propEq('IMAGE_CODE', item.IMAGE_CODE))(data);
                            TaskServices.deleteRecord('TR_IMAGE', indexData)
                        } 
                                       
                    })
                })           
            }
        } catch (error) {
            
        }
        this.setState({ progressUploadImage: 1, valueImageUpload: 0, totalImagelUpload: 0  });

    }

    // POST MOBILE SYNC
    _postMobileSync(tableName) {
        var moment = require('moment');
        this.props.tmPost({
            TGL_MOBILE_SYNC: moment().format('YYYY-MM-DD hh:mm:ss'), //'2019-01-20 10:00:00',
            TABEL_UPDATE: "hectare-statement/" + tableName
        });
    }

    deleteData(table, whereClause, value){        
        let allData = TaskServices.getAllData(table);
        let indexData = R.findIndex(R.propEq(whereClause, value))(allData);
        TaskServices.deleteRecord(table, indexData)
    }

    _crudTM_Block(data) {
        let allData = TaskServices.getAllData('TM_BLOCK');        
        if (data.simpan.length > 0) {
            for (var i = 1; i <= data.simpan.length; i++) {
                this.setState({ progress: i / data.simpan.length, totalDownload: data.simpan.length })
            }
            data.simpan.map(item => {
                TaskServices.saveData('TM_BLOCK', item);
                let countDataInsert = TaskServices.getTotalData('TM_BLOCK');
                this.setState({ valueDownload: countDataInsert })
            });
        } else {
            this.setState({ valueRegionDownload: i });
        }
        if(data.ubah.length > 0 && all.length > 0){
            data.ubah.map(item => {
                let indexData = R.findIndex(R.propEq('WERKS_AFD_BLOCK_CODE', item.WERKS_AFD_BLOCK_CODE))(allData);
                TaskServices.updateBlock(item, indexData)
            })
        }
        if(data.hapus.length > 0 && all.length > 0){
            data.hapus.map(item =>{
                this.deleteData('TM_BLOCK', 'WERKS_AFD_BLOCK_CODE', item.WERKS_AFD_BLOCK_CODE);
            }); 
        }
        // this._postMobileSync("block");
    }

    _crudTM_Afd(data) {   
        let allData = TaskServices.getAllData('TM_AFD');        
        if (data.simpan.length > 0) {
            for (var i = 1; i <= data.simpan.length; i++) {
                this.setState({ progressAfd: i / data.simpan.length, totalAfdDownload: data.simpan.length })
            }
            data.simpan.map(item => {
                TaskServices.saveData('TM_AFD', item);
                let countDataInsert = TaskServices.getTotalData('TM_AFD');
                this.setState({ valueAfdDownload: countDataInsert, isFinishAfd: true });
            });
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_AFD');
            this.setState({ progressAfd: 1,valueAfdDownload: countDataInsert, totalAfdDownload: 0 })
        }

        //update
        if(data.ubah.length > 0 && allData.length > 0){
            data.ubah.map(item => {
                let indexData = R.findIndex(R.propEq('WERKS_AFD_CODE', item.WERKS_AFD_CODE))(allData);
                TaskServices.updateAfdeling(item, indexData)
            })
        }
        //hapus data
        if(data.hapus.length > 0 && allData.length > 0){
            data.hapus.map(item =>{
                this.deleteData('TM_AFD', 'WERKS_AFD_CODE', item.WERKS_AFD_CODE);
            });  
        }        
        // this._postMobileSync("afdeling");
    }

    _crudTM_Region(data) {
        let allData = TaskServices.getAllData('TM_REGION');  
        if (data.simpan.length > 0) {
            for (var i = 1; i <= data.simpan.length; i++) {
                this.setState({ progressRegion: i / data.simpan.length, totalRegionDownload: data.simpan.length  });
            }
            data.simpan.map(item => {
                TaskServices.saveData('TM_REGION', item);
                let countDataInsert = TaskServices.getTotalData('TM_REGION');
                this.setState({ valueRegionDownload: countDataInsert });
            });
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_REGION');
            this.setState({ progressRegion: 1, valueRegionDownload: countDataInsert, totalRegionDownload: 0 })
        }
        if (data.ubah.length > 0 && allData.length > 0) {
            data.ubah.map(item => {
                let indexData = R.findIndex(R.propEq('REGION_CODE', item.REGION_CODE))(allData);
                TaskServices.updateRegion(item, indexData)
                // TaskServices.updatedDataNew('TM_REGION', item.REGION_CODE, item);
            })
        }
        if(data.hapus.length > 0 && allData.length > 0){
            data.hapus.map(item =>{
                this.deleteData('TM_REGION', 'REGION_CODE', item.REGION_CODE);
            });  
        }   
        // this._postMobileSync("region");
    }

    _crudTM_Est(data) {
        let allData = TaskServices.getAllData('TM_EST');
        if (data.simpan.length > 0 && data) {
            for (var i = 1; i <= data.simpan.length; i++) {
                this.setState({ progressEst: i / data.simpan.length, totalEstDownload: data.simpan.length })
            }
            data.simpan.map(item => {
                TaskServices.saveData('TM_EST', item);
                let countDataInsert = TaskServices.getTotalData('TM_EST');
                this.setState({ valueEstDownload: countDataInsert });
            });
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_EST');
            this.setState({ progressEst: 1, valueEstDownload: countDataInsert, totalEstDownload: 0 })
        }
        if (data.ubah.length > 0 && allData.length > 0) {
            data.ubah.map(item => {
                let indexData = R.findIndex(R.propEq('WERKS', item.WERKS))(allData);
                TaskServices.updateEstate(item, indexData)
            })
        }
        if(data.hapus.length > 0 && allData.length > 0){
            data.hapus.map(item =>{
                this.deleteData('TM_EST', 'WERKS', item.WERKS);
            });  
        }   
        // this._postMobileSync("est");
    }

    _crudTM_LandUse(data) {
        let allData = TaskServices.getAllData('TM_LAND_USE');
        if (data.simpan.length > 0) {
            for (var i = 1; i <= data.simpan.length; i++) {
                this.setState({ progressLandUse: i / data.simpan.length, totalLandUseDownload: data.simpan.length });
            }
            data.simpan.map(item => {
                TaskServices.saveData('TM_LAND_USE', item);
                let countDataInsert = TaskServices.getTotalData('TM_LAND_USE');
                this.setState({ valueLandUseDownload: countDataInsert });
            })
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_LAND_USE');
            this.setState({ progressLandUse: 1, valueLandUseDownload: countDataInsert, totalLandUseDownload: 0 })

        }
        if (data.ubah.length > 0 && allData.length > 0) {
            data.ubah.map(item => {
                let indexData = R.findIndex(R.propEq('WERKS_AFD_BLOCK_CODE', item.WERKS_AFD_BLOCK_CODE))(allData);
                TaskServices.updateLandUse(item, indexData)
            })
        }
        if(data.hapus.length > 0 && allData.length > 0){
            data.hapus.map(item =>{
                this.deleteData('TM_LAND_USE', 'WERKS_AFD_BLOCK_CODE', item.WERKS_AFD_BLOCK_CODE);
            });  
        }
    }

    _crudTM_Comp(data) {
        let allData = TaskServices.getAllData('TM_COMP');
        if (data.simpan.length > 0) {
            for (var i = 1; i <= data.simpan.length; i++) {
                this.setState({ progressComp: i / data.simpan.length, valueCompDownload: i, totalCompDownload: data.simpan.length });
            }

            data.simpan.map(item => {
                TaskServices.saveData('TM_COMP', item);
                let countDataInsert = TaskServices.getTotalData('TM_COMP');
                this.setState({ valueCompDownload: countDataInsert });
            })
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_COMP');
            this.setState({ progressComp: 1, valueCompDownload: countDataInsert, totalCompDownload: 0 })
        }
        if (data.ubah.length > 0 && allData.length > 0) {
            data.ubah.map(item => {
                let indexData = R.findIndex(R.propEq('COMP_CODE', item.COMP_CODE))(allData);
                TaskServices.updateComp(item, indexData)
            })
        }
        if(data.hapus.length > 0 && allData.length > 0){
            data.hapus.map(item =>{
                this.deleteData('TM_COMP', 'COMP_CODE', item.COMP_CODE);
            });  
        }        
        // this._postMobileSync("comp");
    }

    _crudTM_Content(data) {
        if (data.length > 0) {
            for (var i = 1; i <= data.length; i++) {
                this.setState({ progressContent: i / data.length, totalContentDownload: data.length });
            }
            data.map(item => {
                TaskServices.saveData('TM_CONTENT', item);
                let countDataInsert = TaskServices.getTotalData('TM_CONTENT');
                this.setState({ valueContentDownload: countDataInsert });
            });
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_CONTENT');
            this.setState({ progressContent: 1, valueContentDownload: countDataInsert, totalContentDownload: 0 })
        }
        // this._postMobileSync("content");
    }

    _crudTM_ContentLabel(data) {
        if (data.length > 0) {
            for (var i = 1; i <= data.length; i++) {
                this.setState({ progressContentLabel: i / data.length, totalContentLabelDownload: data.length });
            }
            data.map(item => {
                TaskServices.saveData('TM_CONTENT_LABEL', item);
                let countDataInsert = TaskServices.getTotalData('TM_CONTENT_LABEL');
                this.setState({ valueContentLabelDownload: countDataInsert });
            });
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_CONTENT_LABEL');
            this.setState({ progressContentLabel: 1, valueContentLabelDownload: countDataInsert, totalContentLabelDownload: 0 })
        }
        // this._postMobileSync("content-label");
    }

    _crudTM_Kriteria(data) {
        if (data.length > 0) {
            for (var i = 1; i <= data.length; i++) {
                this.setState({ progressKriteria: i / data.length, totalKriteriaDownload: data.length });
            }
            data.map(item => {
                TaskServices.saveData('TM_KRITERIA', item);
                let countDataInsert = TaskServices.getTotalData('TM_KRITERIA');
                this.setState({ valueKriteriaDownload: countDataInsert });
            });
        } else {
            let countDataInsert = TaskServices.getTotalData('TM_KRITERIA');
            this.setState({ progressKriteria: 1, valueKriteriaDownload: countDataInsert, totalKriteriaDownload: 0  })
        }
        // this._postMobileSync("kriteria");
    }

    _crudTM_Finding(data) {
        let allData = TaskServices.getAllData('TR_FINDING');
        if (data.simpan.length > 0) {
            for (var i = 1; i <= data.simpan.length; i++) {
                this.setState({ progressFinding: i / data.simpan.length, totalFindingDownload: data.simpan.length });
            }
            data.simpan.map(item => {
                TaskServices.saveData('TR_FINDING', item);
                let countDataInsert = TaskServices.getTotalData('TR_FINDING');
                this.setState({ valueFindingDownload: countDataInsert, isFinishFinding: true });
            });
        } else {
            let countDataInsert = TaskServices.getTotalData('TR_FINDING');
            this.setState({ progressFinding: 1, valueFindingDownload: countDataInsert, totalFindingDownload: 0 })
        }
        if (data.ubah.length > 0 && allData.length > 0) {
            data.ubah.map(item => {
                let indexData = R.findIndex(R.propEq('FINDING_CODE', item.FINDING_CODE))(allData);
                TaskServices.updateFindingDownload(item, indexData)
            })
        }
        if(data.hapus.length > 0 && allData.length > 0){
            data.hapus.map(item =>{
                this.deleteData('TR_FINDING', 'FINDING_CODE', item.FINDING_CODE);
            });  
        }   
        // this._postMobileSync("finding");
    }

    _crudTM_Category(data) {
        if (data.length > 0) {
            for (var i = 1; i <= data.length; i++) {
                this.setState({ progressCategory: i / data.length, totalCategoryDownload: data.length });
            }
            data.map(item => {
                TaskServices.saveData('TR_CATEGORY', item);
                let countDataInsert = TaskServices.getTotalData('TR_CATEGORY');
                this.setState({ valueCategoryDownload: countDataInsert });
                this.downloadImageCategory(item);
            });
        } else {
            let countDataInsert = TaskServices.getTotalData('TR_CATEGORY');
            this.setState({ progressCategory: 1, valueCategoryDownload: countDataInsert, totalCategoryDownload: 0 })
        }
        // this._postMobileSync("category");
    }


    _crudTM_Contact(data) {
        var dataContact = data.data;
        if (dataContact.length > 0) {
            for (var i = 1; i <= dataContact.length; i++) {
                this.setState({ progressContact: i / dataContact.length, totalContactDownload: dataContact.length });
            }
            dataContact.map(item => {
                TaskServices.saveData('TR_CONTACT', item);
                let countDataInsert = TaskServices.getTotalData('TR_CONTACT');
                this.setState({ valueContactDownload: countDataInsert, isFinishFinding: true });
            });
        } else {
            let countDataInsert = TaskServices.getTotalData('TR_CONTACT');
            this.setState({ progressContact: 1,valueContactDownload: countDataInsert, totalContactDownload: 0 })
        }
        // this._postMobileSync("contact");
    }

    _crudTM_Finding_Image(data) {
        var dataSimpan = data.simpan;
        if (dataSimpan.length > 0) {
            for (var i = 1; i <= dataSimpan.length; i++) {
                this.setState({ progressFindingImage: i / dataSimpan.length, totalFindingImageDownload: dataSimpan.length });
            }
            dataSimpan.map(item => {
                TaskServices.saveData('TR_IMAGE', item);
                this._downloadImageFinding(item);
                let countDataInsert = TaskServices.getTotalData('TR_IMAGE');
                this.setState({ valueFindingImageDownload: countDataInsert, isFinishFindingImage: true  });
            });
        } else {
            let countDataInsert = TaskServices.getTotalData('TR_IMAGE');
            this.setState({ progressFindingImage: 1, valueFindingImageDownload: countDataInsert, totalFindingImageDownload: 0 })
        }
        // if (data.ubah.length > 0 && allData.length > 0) {
        //     data.ubah.map(item => {
        //         let indexData = R.findIndex(R.propEq('FINDING_CODE', item.FINDING_CODE))(allData);
        //         TaskServices.updateFindingDownload(item, indexData)
        //     })
        // }
        // if(data.hapus.length > 0 && allData.length > 0){
        //     data.hapus.map(item =>{
        //         this.deleteData('TR_FINDING', 'FINDING_CODE', item.FINDING_CODE);
        //     });  
        // }
    }

    _crudTM_Inspeksi_Param(data) {
        // alert(JSON.stringify(data))
        // let datas = {
        //     PARAMATER_GROUP: data.PARAMATER_GROUP,
        //     PARAMETER_NAME: data.PARAMETER_NAME,
        //     DESC: data.DESC,
        //     NO_URUT: parseInt(data.NO_URUT)
        // }
        // TaskServices.saveData('TM_TIME_TRACK', datas)
        // // TaskServices.saveData('TM_PARAM', data);
        // let countDataInsert = TaskServices.getTotalData('TM_PARAM');
        // this.setState({ progressParamInspection: 1, valueParamInspection: countDataInsert, totalParamInspection: 1 })
        // if (data.length > 0) {
        //     for (var i = 1; i <= data.length; i++) {
        //         this.setState({ progressParamInspection: i / data.length, totalParamInspection: data.length });
        //     }
        //     data.map(item => {
        //         TaskServices.saveData('TM_TIME_TRACK', item);
        //         let countDataInsert = TaskServices.getTotalData('TM_TIME_TRACK');
        //         this.setState({ valueFindingImageDownload: countDataInsert });
        //     });
        // } else {
        //     let countDataInsert = TaskServices.getTotalData('TM_TIME_TRACK');
        //     this.setState({ progressParamInspection: 1, valueParamInspection: countDataInsert, totalParamInspection: 0 })
        // }
        
        this.setState({ progressParamInspection: 1, valueParamInspection: 1, totalParamInspection: 1 })

        this.setState({ showButton: true });
        alert('Sync Data Selesai')
    }


    //download image
    async _downloadImageFinding(data) {
        let isExist = await RNFS.exists(`${dirPhotoTemuan}/${data.IMAGE_NAME}`)
        if(!isExist){
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
    }

    async downloadImageCategory(data) {
        let isExist = await RNFS.exists(`${dirPhotoKategori}/${data.ICON}`)
        if(!isExist){
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
        }
    }

    _onSync() {

        // this.kirimImage();
        // this.loadData();
        // this.loadDataFinding();
        // this.loadDataInspectionTrack();

        this.setState({
            downloadBlok: false,
            downloadAfd: false,
            downloadRegion: false,
            downloadEst: false,
            downloadLandUse: false,
            downloadComp: false,
            downloadContent: false,
            downloadContentLabel: false,
            downloadKriteria: false,
            downloadCategory: false,
            downloadContact: false,
            downloadFinding: false,
            downloadFindingImage: false,
            downloadInspeksiParam: false,
            downloadTrack: false,
            downloadParamTrack: false,

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
            
            uploadInspeksi: false,
            uploadInspeksiDetail: false,
            uploadFinding: false,
            fetchLocation: false,
            isBtnEnable: false,

        });

        // GET DATA MASTER
        this.props.blockRequest();
        // this.props.afdRequest();
        // this.props.regionRequest();
        // this.props.estRequest();
        // this.props.landUseRequest();
        // this.props.compRequest();
        // this.props.contentRequest();
        // this.props.contentLabelRequest();
        // this.props.kriteriaRequest();
        // this.props.categoryRequest();
        // this.props.contactRequest();
        // this.props.findingRequest();
        // this.props.findingImageRequest();
            // this.props.paramTrackRequest();

    }

    componentWillReceiveProps(newProps) {

        if (newProps.block.fetchingBlock !== null && !newProps.block.fetchingBlock && !this.state.downloadBlok) {
            let dataJSON = newProps.block.block;
            this.setState({ downloadBlok: true });
            if (dataJSON !== null) {
                this._crudTM_Block(dataJSON);
            }
            this.props.afdRequest();
        }

        if (newProps.afd.fetchingAfd !== null && !newProps.afd.fetchingAfd && !this.state.downloadAfd) {
            let dataJSON = newProps.afd.afd;
            this.setState({ downloadAfd: true });
            if (dataJSON !== null) {
                this._crudTM_Afd(dataJSON);
            }
            this.props.regionRequest();            
        }

        if (newProps.region.fetchingRegion !== null && !newProps.region.fetchingRegion && !this.state.downloadRegion) {
            let dataJSON = newProps.region.region;
            this.setState({ downloadRegion: true })
            if (dataJSON !== null) {
                this._crudTM_Region(dataJSON);
            }
            this.props.estRequest();
        }

        if (newProps.est.fetchingEst !== null && !newProps.est.fetchingEst && !this.state.downloadEst) {
            let dataJSON = newProps.est.est;
            this.setState({ downloadEst: true });
            if (dataJSON !== null) {
                this._crudTM_Est(dataJSON);
            }
            this.props.landUseRequest();
        }

        if (newProps.landUse.fetchingLandUse !== null && !newProps.landUse.fetchingLandUse && !this.state.downloadLandUse) {
            let dataJSON = newProps.landUse.landUse;
            this.setState({ downloadLandUse: true });
            if (dataJSON !== null) {
                this._crudTM_LandUse(dataJSON);
            }
            this.props.compRequest();
        }

        if (newProps.comp.fetchingComp !== null && !newProps.comp.fetchingComp && !this.state.downloadComp) {
            let dataJSON = newProps.comp.comp;
            this.setState({ downloadComp: true });
            if (dataJSON !== null) {
                this._crudTM_Comp(dataJSON);
            }
            this.props.contentRequest();
        }

        if (newProps.content.fetchingContent !== null && !newProps.content.fetchingContent && !this.state.downloadContent) {
            let dataJSON = newProps.content.content;
            this.setState({ downloadContent: true });
            if (dataJSON !== null) {
                this._crudTM_Content(dataJSON);
            }
            this.props.contentLabelRequest();
        }

        if (newProps.contentLabel.fetchingContentLabel !== null && !newProps.contentLabel.fetchingContentLabel && !this.state.downloadContentLabel) {
            let dataJSON = newProps.contentLabel.contentLabel;
            this.setState({ downloadContentLabel: true });
            if (dataJSON !== null) {
                this._crudTM_ContentLabel(dataJSON);
            }
            this.props.kriteriaRequest();
        }

        if (newProps.kriteria.fetchingKriteria !== null && !newProps.kriteria.fetchingKriteria && !this.state.downloadKriteria) {
            let dataJSON = newProps.kriteria.kriteria;
            this.setState({ downloadKriteria: true });
            if (dataJSON !== null) {
                this._crudTM_Kriteria(dataJSON);
            }
            this.props.categoryRequest();
        }

        if (newProps.category.fetchingCategory !== null && !newProps.category.fetchingCategory && !this.state.downloadCategory) {
            let dataJSON = newProps.category.category;
            this.setState({ downloadCategory: true });
            if (dataJSON !== null) {
                this._crudTM_Category(dataJSON);
            }
            this.props.contactRequest();
        }

        if (newProps.contact.fetchingContact !== null && !newProps.contact.fetchingContact && !this.state.downloadContact) {
            let dataJSON = newProps.contact.contact;
            this.setState({ downloadContact: true });
            if (dataJSON !== null) {
                this._crudTM_Contact(dataJSON);
            }
            this.props.findingRequest();
        }

        if (newProps.finding.fetchingFinding !== null && !newProps.finding.fetchingFinding && !this.state.downloadFinding) {
            let dataJSON = newProps.finding.finding;
            this.setState({ downloadFinding: true });
            if (dataJSON !== null) {
                this._crudTM_Finding(dataJSON);
            }
            this.props.findingImageRequest();
        }

        if (newProps.findingImage.fetchingFindingImage !== null && !newProps.findingImage.fetchingFindingImage && !this.state.downloadFindingImage) {
            let dataJSON = newProps.findingImage.findingImage;
            this.setState({ downloadFindingImage: true });
            if (dataJSON !== null) {
                this._crudTM_Finding_Image(dataJSON);
            }
            this.props.paramTrackRequest();
        }

        if (newProps.paramTrack.fetchingParamTrack !== null && !newProps.paramTrack.fetchingParamTrack && !this.state.downloadParamTrack) {
            let dataJSON = newProps.paramTrack.paramTrack;
            this.setState({ downloadParamTrack: true });
            if (dataJSON !== null) {
                this._crudTM_Inspeksi_Param(dataJSON);
            }
        }

        // if (newProps.findingUpload.fetchingFindingPost !== null && !newProps.findingUpload.fetchingFindingPost && !this.state.uploadFinding) {
        //     let dataJSON = newProps.findingUpload.data;
        //     this.setState({ uploadFinding: true });
        //     if (dataJSON !== null) {
        //         this.updateFinding()
        //     }
        // }

        // if (newProps.inspeksi.fetchingInspeksi !== null && !newProps.inspeksi.fetchingInspeksi && !this.state.uploadInspeksi) {
        //     let dataJSON = newProps.inspeksi.data;
        //     this.setState({ uploadInspeksi: true });
        //     if (dataJSON !== null) {
        //         // this.updateInspeksi()
        //         // this.updateInspeksiDetail()
        //         // this.updateInspeksiBaris()
        //         // this.updateInspeksiTrack()
        //     }
        // }  

        RNFS.copyFile(TaskServices.getPath(), 'file:///storage/emulated/0/MobileInspection/data.realm');

    }

    render() {
        return (
            <Container style={{ flex: 1, padding: 16 }}>
                <Content>
                <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>UPLOAD INSPEKSI TRACK</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueInspectionTrack}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalInspectionTrack}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressInspectionTrack}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>UPLOAD INSPEKSI HEADER</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueInspeksiHeaderUpload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalInspeksiHeaderUpload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressInspeksiHeader}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>UPLOAD INSPEKSI DETAIL</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueInspeksiDetailUpload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalInspeksiDetailUpload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressInspeksiDetail}
                            indeterminate={this.state.indeterminate} />

                    </View>

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>UPLOAD FINDING DATA</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueFindingDataUpload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalFindingDataUpload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressFindingData}
                            indeterminate={this.state.indeterminate} />

                    </View>

                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>UPLOAD IMAGE</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueImageUpload}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalImagelUpload}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressUploadImage}
                            indeterminate={this.state.indeterminate} />
                    </View>

                    <View style={{ flex: 1, marginTop: 12 }}>
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
                            color={Colors.brand}
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
                            color={Colors.brand}
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
                            color={Colors.brand}
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
                            color={Colors.brand}
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
                            color={Colors.brand}
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
                            color={Colors.brand}
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
                            color={Colors.brand}
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
                            color={Colors.brand}
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
                            color={Colors.brand}
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
                            color={Colors.brand}
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
                            color={Colors.brand}
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
                            color={Colors.brand}
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
                            color={Colors.brand}
                            style={{ marginTop: 2 }}
                            progress={this.state.progressFindingImage}
                            indeterminate={this.state.indeterminate} />
                    </View>



                    <View style={{ flex: 1, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>PARAMATER TRACK INSPECTION</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text>{this.state.valueParamInspection}</Text>
                                <Text>/</Text>
                                <Text>{this.state.totalParamInspection}</Text>
                            </View>
                        </View>
                        <Progress.Bar
                            height={20}
                            width={null}
                            style={{ marginTop: 2 }}
                            color={Colors.brand}
                            progress={this.state.progressParamInspection}
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
        inspeksi: state.inspeksi,
        findingUpload: state.findingUpload,
        paramTrack: state.paramTrack
    };
};

const mapDispatchToProps = dispatch => {
    return {
        regionRequest: () => dispatch(RegionAction.regionRequest()),
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
        inspeksiPostHeader: obj => dispatch(InspeksiAction.inspeksiPostHeader(obj)),
        inspeksiPostDetail: obj => dispatch(InspeksiAction.inspeksiPostDetail(obj)),
        inspeksiPostTrackingPath: obj => dispatch(InspeksiAction.inspeksiPostTrackingPath(obj)),
        paramTrackRequest: obj => dispatch(ParamTrackAction.paramTrackRequest(obj)),
        findingPostData: obj => dispatch(FindingUploadAction.findingPostData(obj)),        
        tmPost: obj => dispatch(TMobileAction.tmPost(obj)),
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

