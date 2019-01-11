import { call, put } from 'redux-saga/effects';
import FindingImageActions from '../Redux/FindingImageRedux';

export function* getFindingImage(api, action) {
    const { data } = action;
    const response = yield call(api.getFindingImage, data);

    if (typeof atob !== 'undefined') {
        console.log(response);
        console.log('^^^ GET ALL FINDING ^^^');
    }
    if (response.ok) {
        switch (response.data.status) {
            case false:
                yield put(FindingImageActions.findingImageFailure('Paramater Salah'));
                break;
            case true:

                console.log('^^^ SUCCESS FINDING ^^^');
                yield put(FindingImageActions.findingImageSuccess(response.data.data));
                break;
            default:
                yield put(FindingImageActions.findingImageFailure('Unknown responseType'));
                break;
        }
    } else {
        yield put(FindingImageActions.findingImageFailure(response.problem));
    }

}

// export function* postFindingImage(api, action) {
//     const { data } = action;
//     const response = yield call(api.postFindingImage, data);

//     if (typeof atob !== 'undefined') {
//         console.log(response);
//         console.log('^^^ POST FINDING ^^^');
//     }

//     if (response.ok) {
//         yield put(FindingImageActions.findingImageSuccess({ payload: response.data, change: true }));
//     } else {
//         yield put(FindingImageActions.findingImageFailure({
//             path: 'Complete Post FindingImage',
//             message: response.data.message ? response.data.message : '',
//             response
//         }));
//     }
// }

