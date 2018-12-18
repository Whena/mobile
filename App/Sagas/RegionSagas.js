import { call, put } from 'redux-saga/effects';
import RegionActions from '../Redux/RegionRedux';
import TaskServices from '../Database/TaskServices'

export function* getRegion(api, action) {
    const { data } = action;
    const response = yield call(api.getRegion, data);

    if (typeof atob !== 'undefined') {
        console.log(response);
        console.log('^^^ GET ALL REGION ^^^');
    }

    console.log(response.data.data.delete.length);
    console.log(response.data.data.insert.length);
    console.log(response.data.data.update.length);

    if (response.data.data.delete.length > 0) {
        yield put(RegionActions.regionSuccess(response.data));
        response.data.data.delete.map(item => {
            TaskServices.deleteTmRegionByRegionCode(item.REGION_CODE)
        })

        console.log("Delete Region : " + TaskServices.getAllData('TM_REGION'));
    }
    else if (response.data.data.insert.length > 0) {
        yield put(RegionActions.regionSuccess(response.data));
        response.data.data.insert.map(item => {
            TaskServices.saveData('TM_REGION', item);
        })

        console.log("Insert Region : " + TaskServices.getAllData('TM_REGION'));
    }
    else if (response.data.data.update.length > 0) {
        yield put(RegionActions.regionSuccess(response.data));
        response.data.data.update.map(item => {
            var data = [item.NATIONAL, item.REGION_CODE, item.REGION_NAME];
            console.log(data);
            TaskServices.saveData(item.REGION_CODE, data);
        })

        console.log("Update Region : " + TaskServices.getAllData('TM_REGION'));
    }
    else {
        yield put(RegionActions.regionFailure(response.problem));
    }
}

export function* postRegion(api, action) {
    const { data } = action;
    const response = yield call(api.postRegion, data);

    if (typeof atob !== 'undefined') {
        console.log(response);
        console.log('^^^ POST REGION ^^^');
    }

    if (response.ok) {
        yield put(RegionActions.regionSuccess({ payload: response.data, change: true }));
    } else {
        yield put(RegionActions.regionFailure({
            path: 'Complete Post Region',
            message: response.data.message ? response.data.message : '',
            response
        }));
    }
}

