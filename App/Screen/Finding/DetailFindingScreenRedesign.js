import React, { Component } from 'react'
import {
    View, Image, TouchableOpacity, TouchableHighlight,StyleSheet, Text,
    Alert
} from 'react-native'
import Colors from '../../Constant/Colors'
import FastImage from 'react-native-fast-image'
import {
    Container,
    Content,
    Spinner,
    Card
} from 'native-base'
import random from 'random-string'
import * as Progress from 'react-native-progress'
import Carousel from 'react-native-carousel-view'
import TaskServices from '../../Database/TaskServices'
import Slider from 'react-native-slider'
import { dirPicutures } from '../../Lib/dirStorage'
import RNFS from 'react-native-fs'
import R, { isEmpty, isNil } from 'ramda'
import ImagePickerCrop from 'react-native-image-crop-picker'
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'
import ImageSlider from 'react-native-image-slider';
import { getTodayDate } from '../../Lib/Utils';

class DetailFindingScreenRedesign extends Component{

    
    constructor(props){
        super(props)
        
        var ID = this.props.navigation.state.params.ID
        var data = TaskServices.findBy2('TR_FINDING', 'FINDING_CODE', ID);
        this.state = {
            user: TaskServices.getAllData('TR_LOGIN')[0],
            id: ID,
            images: [],
            totalImages: TaskServices.query('TR_IMAGE', `TR_CODE='${ID}' AND STATUS_IMAGE='SEBELUM'`),
            totalImagesSesudah: TaskServices.query('TR_IMAGE', `TR_CODE='${ID}' AND STATUS_IMAGE='SESUDAH'`),
            // totalImages: TaskServices.query('TR_IMAGE_FINDING', `TR_CODE='${ID}' AND STATUS_IMAGE='SEBELUM'`),
            // totalImagesSesudah: TaskServices.query('TR_IMAGE_FINDING', `TR_CODE='${ID}' AND STATUS_IMAGE='SESUDAH'`),
            data,
            progress: parseInt(data.PROGRESS),
            isDateTimePickerVisible: false,
            updatedDueDate: R.isEmpty(data.DUE_DATE) ? "Select Calendar" : data.DUE_DATE,
            imgBukti: [],
            disabledProgress: true
        }
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.tintColor
        },
        headerTitleStyle: {
            textAlign: "left",
            flex: 1,
            fontSize: 18,
            fontWeight: '400'
        },
        title: 'Detail Temuan',
        headerTintColor: '#fff'
    };

    componentWillMount(){

        this.state.totalImages.map(item=>{
            this.state.images.push(item);
        });

        this.state.totalImagesSesudah.map(item=>{
            this.state.images.push(item);
        })

    }

    componentDidMount(){
        let isSameUser = this.state.data.ASSIGN_TO == this.state.user.USER_AUTH_CODE ? true: false
        // alert(this.state.user.USER_AUTH_CODE)
        if(!isSameUser){
            this.setState({disabledProgress:true});
        }else if(this.state.progress == 100){
            this.setState({disabledProgress:true});
        }else if(this.state.disabledProgress < 100 && isSameUser){
            this.setState({disabledProgress:false});
        }
    }

    getStatusImage(status) {
        if (status == 'SEBELUM'){ 
            return "Before"
        } else if ('SESUDAH') {
            return "After"
        }
    }

    getColor(param){
        switch(param){
          case 'SELESAI':
            return 'rgba(35, 144, 35, 0.7)';
          case 'SEDANG DIPROSES':
            return 'rgba(254, 178, 54, 0.7)';
          case 'BARU':
            return 'rgba(255, 77, 77, 0.7)';
          default:
            return '#ff7b25';
        }
    }

    onLoadImage = data => {
        data.map(item=>{
            this.state.images.push(item);
            this.state.imgBukti.push(item);
        })
        // alert(JSON.stringify(this.state.imgBukti))
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({ updatedDueDate: moment(date).format("YYYY-MM-DD") })
        this._hideDateTimePicker();
    };

    _takePicture() { 
        if(this.state.progress == 100){
            this.props.navigation.navigate('BuktiKerja', {onLoadImage: this.onLoadImage, findingCode : this.state.id});
        }else{
            alert('Selesaikan Progress temuan kamu dulu')
        }
    }

    getStatusTemuan(param){
        if(param == 0){
            return 'BARU'
        }else if(param == 100){
            return 'SELESAI'
        }else{
            return 'SEDANG DIPROSES'
        }
    }

    validation(){
        if(this.state.imgBukti.length < 1 && this.state.progress == 100){
            alert('Kamu harus foto bukti kerja dulu')
        }else{
            this._updateFinding()
        }
    }

    _updateFinding() { 
        let data = TaskServices.getAllData('TR_FINDING')     
        let indexData = R.findIndex(R.propEq('FINDING_CODE', this.state.data.FINDING_CODE))(data);
        let status = this.getStatusTemuan(this.state.progress);
        
        var save = {
            FINDING_CODE: this.state.data.FINDING_CODE,
            WERKS: this.state.data.WERKS,
            AFD_CODE: this.state.data.AFD_CODE,
            BLOCK_CODE: this.state.data.BLOCK_CODE,
            INSERT_TIME: this.state.data.INSERT_TIME, //getTodayDate('YYYY-MM-DD HH:mm:ss'),
            FINDING_CATEGORY: this.state.data.FINDING_CATEGORY,
            FINDING_DESC: this.state.data.FINDING_DESC,
            FINDING_PRIORITY: this.state.data.FINDING_PRIORITY,
            DUE_DATE: this.state.updatedDueDate == "Select Calendar" ? this.state.data.DUE_DATE : this.state.updatedDueDate,        
            STATUS: status,
            ASSIGN_TO: this.state.data.ASSIGN_TO,
            PROGRESS: this.state.progress.toString(),
            LAT_FINDING: this.state.data.LAT_FINDING,
            LONG_FINDING: this.state.data.LONG_FINDING,
            REFFERENCE_INS_CODE: this.state.data.REFFERENCE_INS_CODE,    
        }

        TaskServices.updateFinding('TR_FINDING', [status, save.PROGRESS], indexData);
        if(this.state.progress == 100){
            this._saveImageUpdate();
        }

        Alert.alert(
            'Peringatan',
            'Data Temuan kamu sudah diupdate',
            [
                { text: 'OK', onPress: () => this.props.navigation.goBack(null) }
            ]
        );
    }

    _saveImageUpdate() {
        this.state.imgBukti.map(item=>{
            TaskServices.saveData('TR_IMAGE', item);
        })
    }

    getContactName = (userAuth) =>{
        try {
            let data = TaskServices.findBy2('TR_CONTACT', 'USER_AUTH_CODE', userAuth);
            return data.FULLNAME;            
        } catch (error) {
            return ''
        }
    }

    render(){        
        const category = TaskServices.findBy2('TR_CATEGORY', 'CATEGORY_CODE', this.state.data.FINDING_CATEGORY);

        return(
            <Container style={{ flex: 1, backgroundColor: 'white' }}>
                <Content style={{ flex: 1 }}>

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 15, paddingLeft: 15, paddingRight: 15}}>
                        <Image style={{ marginRight: 16, width: 40, height: 40, borderRadius: 10 }}
                            source={require('../../Images/icon/ic_games_menu.png')}></Image>
                        <View style={{ flex: 1 }} >
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Detail Temuan</Text>
                            <Text style={{ fontSize: 12, color: 'grey', marginTop: 3 }}>
                                {this.state.data.INSERT_TIME}
                            </Text>
                        </View>
                    </View>

                    <View style = {{flex:1}}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 16
                        }}>
                            <View style={{height:200}}>
                                <ImageSlider 
                                    images={this.state.images}
                                    customSlide={({ index, item, style, width }) => (
                                        // It's important to put style here because it's got offset inside
                                        <View key={index} style={[style, {backgroundColor:'yellow'}]}>                                      
                                            <View style={{
                                                backgroundColor: '#5b5a5a', width: 80,
                                                padding: 5, position: 'absolute', top:0 , right:10, zIndex: 1, justifyContent: 'center', alignItems: 'center', 
                                                margin:10, borderRadius: 25,
                                            }}>
                                                <Text style={{ fontSize: 10, color: 'white' }}>{this.getStatusImage(item.STATUS_IMAGE)}</Text>
                                            </View>
                                            <FastImage style={{ alignItems: 'center', width: '100%', height: '100%' }}
                                                source={{
                                                    uri: 'file://'+item.IMAGE_PATH_LOCAL,
                                                    priority: FastImage.priority.normal,
                                                }} />
                                            <View style={{
                                                backgroundColor: this.getColor(this.state.data.STATUS), width: '100%',
                                                padding: 5, position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <Text style={{ fontSize: 14, color: 'white' }}>{this.state.data.STATUS}</Text>
                                            </View>
                                        </View>
                                    )}
                                    customButtons={(position, move) => (
                                        <View style={{flex:1, flexDirection:'row',}}>
                                        {this.state.images.map((image, index) => {
                                            // return (
                                            //   <TouchableHighlight
                                            //     key={index}
                                            //     underlayColor="#ccc"
                                            //     onPress={() => move(index)}
                                            //     style={{
                                            //         alignItems: 'center',
                                            //         justifyContent: 'center',
                                            //         width: 6,
                                            //         height: 6,
                                            //         backgroundColor: 'white',
                                            //         borderRadius: 100,}}
                                            //   >
                                            //   </TouchableHighlight>
                                            // );
                                        })}
                                        </View>
                                    )}
                                />
                            </View>                            
                        </View>                         
                    </View>


                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 16, paddingLeft: 15, paddingRight: 15 }}>
                        <Image style={{ alignItems: 'stretch', width: 28, height: 40 }}
                            source={require('../../Images/icon/ic_map_point_green.png')}></Image>
                        <View style={{ flex: 2, marginLeft: 16 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.state.data.BLOCK_FULL_NAME}</Text>

                            <View style={styles.column}>
                                <Text style={styles.label}>Kategori </Text>
                                <Text style={styles.item}>: {category.CATEGORY_NAME} </Text>
                            </View>

                            <View style={styles.column}>
                                <Text style={styles.label}>Priority </Text>
                                <Text style={styles.item}>: {this.state.data.FINDING_PRIORITY} </Text>
                            </View>

                            <View style={styles.column}>
                                <Text style={styles.label}>Batas Waktu </Text>
                                {isEmpty(this.state.data.DUE_DATE) && (
                                    <Text style={styles.item} onPress={this._showDateTimePicker} style={{ fontSize: 14, color: '#999' }}>: {this.state.updatedDueDate} </Text>)}
                                {!isEmpty(this.state.data.DUE_DATE) && (
                                    <Text style={styles.item}>: {this.state.data.DUE_DATE} </Text>)}
                            </View>

                            <DateTimePicker
                                minimumDate={new Date()}
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this._handleDatePicked}
                                onCancel={this._hideDateTimePicker}
                            />

                            <View style={styles.column}>
                                <Text style={styles.label}>Ditugaskan Kepada </Text>
                                <Text style={styles.item}>: {this.getContactName(this.state.data.ASSIGN_TO)}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={[styles.title,{paddingLeft: 15, paddingRight: 15}]}>Deskripsi:</Text>
                    <Text style={{ fontSize: 14, paddingLeft: 15, paddingRight: 15 }}> {this.state.data.FINDING_DESC}</Text>

                    <View style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={[styles.title, { marginBottom: 5 }]}>Progress:</Text>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Slider
                                ref='sliderProgress'
                                step={25}
                                thumbTouchSize={{ width: 40, height: 40 }}
                                disabled={parseInt(this.state.PROGRESS) == 100 ? true : false}
                                maximumValue={100}
                                thumbStyle={{ backgroundColor: Colors.brand }}
                                style={{ height: 20, flex: 1 }}
                                trackStyle={{ height: 5 }}
                                value={this.state.progress}
                                disabled={this.state.disabledProgress}
                                onSlidingComplete={(value) => {
                                    if (parseInt(value) < parseInt(this.state.PROGRESS)) {
                                        var progress = R.clone(parseInt(this.state.PROGRESS))
                                        this.refs['sliderProgress']._setCurrentValue(progress)

                                        this.setState({
                                            progress
                                        })

                                        this._makeAlert('Peringatan', 'Progress tidak boleh dimundurkan!')

                                    } else {
                                        this.setState({
                                            progress: parseInt(value)
                                        })
                                    }
                                }}
                            />
                            {/* <Progress.Bar showsText={true} height={20}
                                color={Colors.brand} width={null} progress={0.6} /> */}
                            <Text style={{
                                height: 20,
                                textAlignVertical: 'center',
                                marginLeft: 10, color: 'black'
                            }}>{this.state.progress}%</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', marginTop: 20, paddingLeft: 15, paddingRight: 15}}>
                        <Text style={styles.title}>Bukti Kerja:</Text>
                        <Card style={[styles.cardContainer, {marginLeft: 15}]}>
                            <TouchableOpacity style={{ padding: 40 }}
                                onPress={() => { this._takePicture() }}
                                disabled={this.state.disabledView}
                            >
                                <Image style={{
                                    alignSelf: 'center', alignItems: 'stretch',
                                    width: 30, height: 30
                                }}
                                    source={require('../../Images/icon/ic_camera_big.png')}></Image>
                            </TouchableOpacity>
                        </Card>
                    </View>

                    {(this.state.data.PROGRESS < 100) &&
                        <TouchableOpacity style={[styles.button, { marginTop: 25, marginBottom: 30 }]}
                            onPress={() => { this.validation() }}>
                            <Text style={styles.buttonText}>Simpan</Text>
                        </TouchableOpacity>}

                    {(this.state.data.PROGRESS == 100) &&
                        <View style={{ flex: 1, height: 30 }}></View>
                    }

                </Content>
            </Container>
        )
    }
}

export default DetailFindingScreenRedesign

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 16
    },
    label: {
        width: '40%',
        fontSize: 14
    },
    column: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 3
    },
    item: {
        width: '60%',
        color: "#999",
        fontSize: 14
    }, 
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 16
    },
    cardContainer: {
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#eee',
        borderColor: '#ddd'
    }, 
    statusImg: {        
        position: 'absolute',
        top: 10,
        right: 15, 
        backgroundColor: Colors.brand,
        borderRadius: 25,
        padding: 15,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 200,
        backgroundColor: Colors.brand,
        borderRadius: 25,
        padding: 15,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    btnStatus: {
        width: 200,
        backgroundColor: '#686868',
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
    },
})