import { call, put } from 'redux-saga/effects';
import BlockActions from '../Redux/BlockRedux';
import TaskServices from '../Database/TaskServices'

export function* getBlock(api, action) {
    const { data } = action;
    const response = yield call(api.getBlock, data);

    if (typeof atob !== 'undefined') {
        console.log(response);
        console.log('^^^ GET ALL BLOCK ^^^');
    }

    console.log(response.data.data.delete.length);
    console.log(response.data.data.insert.length);
    console.log(response.data.data.update.length);

    if (response.data.data.delete.length > 0) {
        yield put(BlockActions.blockSuccess(response.data));
        response.data.data.delete.map(item => {
            TaskServices.deleteTmRegionByRegionCode(item.REGION_CODE)
        })

        console.log("Delete Block : " + TaskServices.getAllData('TM_REGION'));
    }
    else if (response.data.data.insert.length > 0) {
        yield put(BlockActions.blockSuccess(response.data));
        response.data.data.insert.map(item => {
            TaskServices.saveData('TM_BLOCK', item);
        })

        console.log("Insert Block : " + TaskServices.getAllData('TM_BLOCK'));
    }
    else if (response.data.data.update.length > 0) {
        yield put(BlockActions.blockSuccess(response.data));
        response.data.data.update.map(item => {
            var data = [item.NATIONAL, item.REGION_CODE, item.REGION_NAME];
            console.log(data);
            TaskServices.saveData(item.REGION_CODE, data);
        })

        console.log("Update Block : " + TaskServices.getAllData('TM_REGION'));
    }
    else {
        yield put(BlockActions.blockFailed(response.problem));
    }
}

export function* postBlock(api, action) {
    const { data } = action;
    const response = yield call(api.postRegion, data);

    if (typeof atob !== 'undefined') {
        console.log(response);
        console.log('^^^ POST REGION ^^^');
    }

    if (response.ok) {
        yield put(BlockActions.blockSuccess({ payload: response.data, change: true }));
    } else {
        yield put(BlockActions.blockFailed({
            path: 'Complete Post Region',
            message: response.data.message ? response.data.message : '',
            response
        }));
    }
}

