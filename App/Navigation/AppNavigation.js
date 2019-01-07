import { createStackNavigator } from 'react-navigation';
import SplashScreen from '../Screen/SplashScreen';
import Login from '../Screen/LoginScreen';
import MainMenu from '../Screen/Home/MainTabNavigator';

//finding
import FindingFormNavigator from '../Screen/Finding/FindingFormNavigator';

import FormStep1 from '../Screen/Finding/FormStep1';
import FormStep2 from '../Screen/Finding/FormStep2';
import DetailFindingScreen from '../Screen/Finding/DetailFindingScreen';
import TakeFoto from '../Screen/Finding/TakeFoto'
// import FormInspectionNavigator from '../Screen/Inspeksi/Navigation/FormInspectionNavigator';

//inspeksi
import DetailHistoryInspeksi from '../Screen/Inspeksi/HistoryInspeksiDetail';
import BuatInspeksi from '../Screen/Inspeksi/BuatInspeksi';
import TakeFotoBaris from '../Screen/Inspeksi/TakePhotoBaris';
import KondisiBaris1 from '../Screen/Inspeksi/KondisiBaris1';
import KondisiBaris2 from '../Screen/Inspeksi/KondisiBaris2';
import TakeFotoSelfie from '../Screen/Inspeksi/TakePhotoSelfie';
import KondisiBarisAkhir from '../Screen/Inspeksi/KondisiBarisAkhir';
import SelesaiInspeksi from '../Screen/Inspeksi/SelesaiInspeksi';
import DetailBaris from '../Screen/Inspeksi/DetailBaris';


import SyncScreen from '../Screen/Sync';
import InboxScreen from '../Screen/Inbox';
import Colors from '../Constant/Colors';
import test from '../Screen/Inspeksi/test';


const main = createStackNavigator({
    MainMenu: { screen: MainMenu, navigationOptions: { header: null } },
    SplashScreen: { screen: SplashScreen },
    Login: { screen: Login },

    FindingFormNavigator: {
        screen: FindingFormNavigator,
        navigationOptions: {
            header: null
            // headerStyle: {
            //     backgroundColor: Colors.tintColor
            // },
            // title: 'Buat Laporan Penemuan',
            // headerTintColor: '#fff',
            // headerTitleStyle: {
            //     flex: 1,
            //     fontSize: 18,
            //     fontWeight: '400'
            // },
        }
    },

    //finding
    // FormStep1: {screen: FormStep1},
    // FormStep2: {screen: FormStep2},
    DetailFinding: { screen: DetailFindingScreen },
    TakeFoto : {screen: TakeFoto},
    // FormInspection: {
    //     screen: FormInspectionNavigator,
    //     navigationOptions: {
    //         header: null
    //     },
    // },
    
    Sync: { screen: SyncScreen },
    Inbox: { screen: InboxScreen },

    //inspeksi
    BuatInspeksi : {screen: BuatInspeksi},
    DetailHistoryInspeksi: { screen: DetailHistoryInspeksi },
    TakeFotoBaris: {screen: TakeFotoBaris},
    KondisiBaris1: {screen: KondisiBaris1},
    KondisiBaris2: {screen: KondisiBaris2},
    TakeFotoSelfie: {screen: TakeFotoSelfie},
    KondisiBarisAkhir: {screen: KondisiBarisAkhir},
    SelesaiInspeksi: {screen: SelesaiInspeksi},
    DetailBaris: { screen: DetailBaris },
    test: {screen:test}

    }, {
        headerMode: 'screen',
        initialRouteName: 'SplashScreen',
        navigationOptions: {

        },
        transitionConfig: () => ({ screenInterpolator: () => null }),
    });

export default main;