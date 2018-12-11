import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas';
import { reducer as network } from 'react-native-offline';
import ReduxPersist from '../Config/ReduxPersist'
import { persistReducer } from 'redux-persist';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
	nav: require('./NavigationRedux').reducer,
	auth: require('./AuthRedux').reducer,
	category: require('./CategoryRedux').reducer,	
	contact: require('./ContactRedux').reducer,
	// inspeksi : require('./InspeksiRedux').reducer,
	network
});

export default () => {
	let finalReducers = reducers;

	// If rehydration is on use persistReducer otherwise default combineReducers
	if (ReduxPersist.active) {
		const persistConfig = ReduxPersist.storeConfig;
		finalReducers = persistReducer(persistConfig, reducers);
	}


	let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga);

	if (module.hot) {
		module.hot.accept(() => {
			const nextRootReducer = require('./').reducers;
			store.replaceReducer(nextRootReducer);

			const newYieldedSagas = require('../Sagas').default;
			sagasManager.cancel();
			sagasManager.done.then(() => {
				sagasManager = sagaMiddleware.run(newYieldedSagas);
			});
		});
	}

	return store;
};
