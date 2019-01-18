import { call, put } from 'redux-saga/effects';
import InspeksiActions from '../Redux/InspeksiRedux';

export function* postInspeksiHeader(api, action) {
    const { data } = action;
    console.log("Data Post Inspeksi Header : " + JSON.stringify(data));
    const response = yield call(api.postInspeksiHeader, data);
    // console.log("Response : " + response);
    // console.log("Response OK : " + response.ok);

    if (typeof atob !== 'undefined') {
    	console.log(response);
    	console.log('^^^ POST INSPEKSI ^^^');
    }

    if (response.ok) {
        yield put(InspeksiActions.inspeksiSuccess({ payload: response.data, change: true }));
    } else {
        yield put(InspeksiActions.inspeksiFailed({
            path: 'Complete Post Inspeksi Header',
        message: response.data.message ? response.data.message : '',
        response
        }));
    }
}

export function* postInspeksiDetail(api, action) {
    const { data } = action;
    // console.log("Data Post Inspeksi Detail : " + JSON.stringify(data));
    const response = yield call(api.postInspeksiDetail, data);

    if (typeof atob !== 'undefined') {
        console.log(response);
        console.log('^^^ POST INSPEKSI DETAIL^^^');
    }

    if (response.ok) {
        switch (response.data.status) {
            case false:
                yield put(FindingActions.inspeksiFailed('Paramater Salah'));
                break;
            case true:
                console.log('^^^ SUCCESS INSPEKSI DETAIL ^^^');
                yield put(InspeksiActions.inspeksiSuccess({ payload: response.data, change: true }));
                break;
            default:
                yield put(FindingActions.inspeksiFailed('Unknown responseType'));
                break;
        }
    } else {
        yield put(InspeksiActions.inspeksiFailed({
            path: 'Complete Post Inspeksi Detail',
            message: response.data.message ? response.data.message : '',
            response
        }));
    }
}

export function* postFindingData(api, action) {
    const { data } = action;
    console.log(JSON.stringify(data));
    const response = yield call(api.postFindingData, data);

    if (typeof atob !== 'undefined') {
        console.log(response);
        console.log('^^^ POST FINDING DATA');
    }

    if (response.ok) {
        yield put(InspeksiActions.inspeksiSuccess({ payload: response.data, change: true }));
    } else {
        yield put(InspeksiActions.inspecsiFailed({
            path: 'Complete Post Finding Data',
            message: response.data.message ? response.data.message : '',
            response
        }));
    }
}