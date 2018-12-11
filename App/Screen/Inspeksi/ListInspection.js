import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import ActionButton from 'react-native-action-button';
import Colors from '../../Constant/Colors'
import TaskServices from '../../Database/TaskServices'

import { connect } from 'react-redux';
import InspeksiAction from '../../Redux/InspeksiRedux';
import {getTodayDate} from '../../Lib/Utils';

import { ProgressDialog } from 'react-native-simple-dialogs';

class ListInspection extends Component {
  
  constructor(props) {
    super(props);
      this.state = {
        fetching: false
    }
  }

  loadData(){
    let dataHeader = TaskServices.getAllData('TR_BLOCK_INSPECTION_H');
    if(dataHeader !== null){
      for(var i=0; i<dataHeader.length; i++){
        this.kirimInspeksiHeader(dataHeader[i]);
      }
    }
  }

  loadDataDetail(param){
    let data = TaskServices.findBy('TR_BLOCK_INSPECTION_D', 'BLOCK_INSPECTION_CODE', param);
    if(data !== null){
      for(var i=0; i<data.length; i++){
        this.kirimInspeksiDetail(data[i]);
      }
    }
  }

  kirimInspeksiHeader(param) {   
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
      LONG_END_INSPECTION:param.LONG_END_INSPECTION
    }); 
  }

  kirimInspeksiDetail(param){
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

  actionButtonClick() {
    this.props.navigation.navigate('FormInspection')
    // this.loadData()
  }

  render() {
    return (
      // <View>
        <ActionButton buttonColor={Colors.tintColor} onPress={() => this.actionButtonClick()}></ActionButton>
      //   <ProgressDialog
      //       visible={this.state.fetching}
      //       activityIndicatorSize="large"
      //       message="Loading..."
      //   />    
      // </View>
        
    )
  }
}

// const mapStateToProps = state => {
// 	return {
// 		inspeksi: state.inspeksi
// 	};
// };

// const mapDispatchToProps = dispatch => {
// 	return {
// 		postInspeksi: obj => dispatch(InspeksiAction.postInspeksi(obj))
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ListInspection);

export default ListInspection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  ActionButtonStyle: {
    color: Colors.tintColor,
    backgroundColor: Colors.tintColor
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
});
