import { call, put } from 'redux-saga/effects';
import InspeksiActions from '../Redux/InspeksiRedux';
// import InspeksiActions2 from '../Redux/InspeksiRedux2';
import { isEmpty, isNil } from 'ramda';


export function* postInspeksiHeader(api, action){
    const { data } = action;
	const response = yield call(api.postInspeksiHeader, data);

    if (typeof atob !== 'undefined') {
		console.log(response);
		console.log('^^^ POST IINSPEKSI ^^^');
    }
    
    if (response.ok) {
        yield put(InspeksiActions.success({ payload: response.data, change: true }));
    } else {
        yield put(InspeksiActions.failed({
            path: 'Complete Post Inspeksi',
        message: response.data.message ? response.data.message : '',
        response
        }));
    }
}

export function* postInspeksiDetail(api, action){
    const { data } = action;
	const response = yield call(api.postInspeksiDetail, data);

    if (typeof atob !== 'undefined') {
		console.log(response);
		console.log('^^^ POST IINSPEKSI ^^^');
    }
    
    if (response.ok) {
        yield put(InspeksiActions.success({ payload: response.data, change: true }));
    } else {
        yield put(InspeksiActions.failed({
            path: 'Complete Post Inspeksi',
        message: response.data.message ? response.data.message : '',
        response
        }));
    }
}