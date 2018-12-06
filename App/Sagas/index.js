import { takeLatest, takeEvery, all, take, fork } from 'redux-saga/effects';
import API from '../Api/api';
import FixtureAPI from '../Api/FixtureAPI';
import DebugConfig from '../Config/DebugConfig';
import { networkEventsListenerSaga } from 'react-native-offline';

/* ------------- Types ------------- */
import { StartupTypes } from '../Redux/StartupRedux';
// import { LoginRedux } from '../redux/LoginRedux';
import { AuthTypes } from '../Redux/AuthRedux';
import { InspeksiTypes } from '../Redux/InspeksiRedux';

/* ------------- Sagas ------------- */
import { startup } from './StartupSagas';
import { getAuth, userUpdate } from './AuthSagas';
// import { postInspeksi } from './InspeksiSagas';
//, getAuthLogOut

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const idpApi = DebugConfig.useFixtures == 'true' ? FixtureAPI : API.create('IDP');

const idpApi = DebugConfig.useFixtures == 'true' ? FixtureAPI : API.create('LOGIN');

const fixtureAPI = FixtureAPI;
/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
	yield all([
		takeLatest(StartupTypes.STARTUP, startup),

		
		takeLatest(AuthTypes.AUTH_REQUEST, getAuth, idpApi),
		takeLatest(AuthTypes.AUTH_USER_UPDATE, userUpdate, idpApi),

		// takeLatest(InspeksiTypes.POST_INSPEKSI, getAuthLogOut, idpApi),

		// takeLatest(LoginRedux.AUTH_REQUEST, getAuth, idpApi),
		// takeLatest(LoginRedux.AUTH_USER_UPDATE, userUpdate, idpApi),
		
		fork(networkEventsListenerSaga, { timeout: 2000, checkConnectionInterval: 20000 })
	]);
}
