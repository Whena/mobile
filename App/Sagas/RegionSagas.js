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
    if (response.ok) {
        switch (response.data.status) {
            case false:
                yield put(RegionActions.regionFailure('Paramater Salah'));
                break;
            case true:
                console.log("Data Response Region : " + response.data);
                yield put(RegionActions.regionSuccess(response.data));
                break;
            default:
                yield put(RegionActions.regionFailure('Unknown responseType'));
                break;
        }
    } else {
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

