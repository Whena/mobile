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
    if (response.data.data && response.data.data.length > 0) {
        yield put(RegionActions.regionSuccess(response.data));

        response.data.data.map(item => {
            TaskServices.saveData('TM_REGION', item);
        })

    } else {
        yield put(RegionActions.regionFailure(response.problem));
    }
}
