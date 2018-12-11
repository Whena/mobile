import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
	postInspeksi : ['data'],
    postSuccess: ['payload'],
	postFailed: ['error'],	
	postDetailInspeksi: ['data']
});

export const InspeksiTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
	fetching: null,
	error: null,
	data: null
});

export const InspeksiSelectors = {
	getData: state => state.data
};

export const postInspeksiHeader = (state, { data }) => state.merge({ fetching: true, data, payload: null });
export const postInspeksiDetail = (state, { data }) => state.merge({ fetching: true, data, payload: null });

  // successful api lookup
export const success = (state, action) => {
	const { payload } = action;
	return state.merge({ fetching: false, error: null, data: payload });
};

// Something went wrong somewhere.
export const failed = (state, { error }) => state.merge({ fetching: false, error });

export const reducer = createReducer(INITIAL_STATE, {
	[Types.POST_INSPEKSI]: postInspeksiHeader,	
	[Types.POST_SUCCESS]: success,
	[Types.POST_FAILED]: failed,
	[Types.POST_DETAIL_INSPEKSI]:postInspeksiDetail
});
