import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	contentLabelRequest: null,
	contentLabelPost: ['data'],
	contentLabelSuccess: ['payload'],
	contentLabelFailure: null
});

export const ContentLabelTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	fetching: null,
	error: null,
	contentLabel: null
});

/* ------------- Selectors ------------- */

export const ContentSelectors = {
	getData: state => state.data
};

/* ------------- Reducers ------------- */

// request the data from an api

export const request = (state, { data }) => state.merge({ fetching: true, error: null, contentLabel: null });
export const postContentLabel = (state, { data }) => state.merge({ fetching: true, data, contentLabel: null });

// successful api lookup
export const success = (state, action) => {
	const { payload } = action;
	return state.merge({ fetching: false, error: null, contentLabel: payload });
};

// Something went wrong somewhere.
export const failure = state => state.merge({ fetching: false, error: true, payload: null });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[Types.CONTENT_LABEL_REQUEST]: request,
	[Types.CONTENT_LABEL_POST]: postContentLabel,
	[Types.CONTENT_LABEL_SUCCESS]: success,
	[Types.CONTENT_LABEL_FAILURE]: failure
});
