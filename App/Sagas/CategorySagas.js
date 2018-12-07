import { call, put } from 'redux-saga/effects';
import CategoryActions from '../Redux/CategoryRedux';
import TaskServices from '../Database/TaskServices'

export function* getCategory(api, action) {
    const { data } = action;
    const response = yield call(api.getCategory, data);

    if (typeof atob !== 'undefined') {
        console.log(response);
        console.log('^^^ GET ALL CATEGORY ^^^');
    }
    if (response.data.status && response.data.data.length > 0) {
        yield put(CategoryActions.categorySuccess(response.data));

        response.data.data.map(item => {
            TaskServices.saveData('TR_CATEGORY', item);
        })

    } else {
        yield put(CategoryActions.categoryFailure(response.problem));
    }
}
