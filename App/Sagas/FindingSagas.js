import { call, put } from 'redux-saga/effects';
import FindingActions from '../Redux/FindingRedux';

export function* getFinding(api, action) {
    const { data } = action;
    const response = yield call(api.getFinding, data);

    if (typeof atob !== 'undefined') {
        console.log(response);
        console.log('^^^ GET ALL FINDING ^^^');
    }
    if (response.ok) {
        switch (response.data.status) {
            case false:
                yield put(FindingActions.findingFailure('Paramater Salah'));
                break;
            case true:

                console.log('^^^ SUCCESS FINDING ^^^');
                yield put(FindingActions.findingSuccess(response.data.data));
                break;
            default:
                yield put(FindingActions.findingFailure('Unknown responseType'));
                break;
        }
    } else {
        yield put(FindingActions.findingFailure(response.problem));
    }

}

export function* postFinding(api, action) {
    const { data } = action;
    const response = yield call(api.postFinding, data);

    if (typeof atob !== 'undefined') {
        console.log(response);
        console.log('^^^ POST FINDING ^^^');
    }

    if (response.ok) {
        yield put(FindingActions.findingSuccess({ payload: response.data, change: true }));
    } else {
        yield put(FindingActions.findingFailure({
            path: 'Complete Post Finding',
            message: response.data.message ? response.data.message : '',
            response
        }));
    }
}

