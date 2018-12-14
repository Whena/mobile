import {
    createStackNavigator,
} from 'react-navigation';


import InspectionNavigator from './InspectionTabNavigator';
import HistoryInspection from './HistoryInscpection';
import ListInspection from './ListInspection';
import BuatInspeksi from './BuatInspeksi'
import KondisiBarisMain from './KondisiBarisMain'
import KondisiBaris1 from './KondisiBaris1'
import KondisiBaris2 from './KondisiBaris2Redesign'
import TakePhotoBaris from './TakePhotoBaris'
import TakePhotoSelfie from './TakePhotoSelfie'
import KondisiBarisAkhir from './KondisiBarisAkhir'

const routes = createStackNavigator({
    InspectionNavigator : {screen: InspectionNavigator},
    HistoryInspection : {screen: HistoryInspection},
    ListInspection: {screen: ListInspection},
    BuatInspeksi : {screen: BuatInspeksi},
    KondisiBarisMain: {screen: KondisiBarisMain},
    KondisiBaris1: {screen: KondisiBaris1},
    KondisiBaris2: {screen: KondisiBaris2},
    TakePhotoBaris: {screen: TakePhotoBaris},
    TakePhotoSelfie: {screen: TakePhotoSelfie},
    KondisiBarisAkhir: {screen: KondisiBarisAkhir}

}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'InspectionNavigator',
    navigationOptions: {
        //headerStyle: styles.header
    },
    // Disable animation
    transitionConfig: () => ({ screenInterpolator: () => null }),
});

export default routes;