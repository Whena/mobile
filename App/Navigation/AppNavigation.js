import { createStackNavigator } from 'react-navigation';
import SplashScreen from '../Screen/SplashScreen';
import Login from '../Screen/LoginScreen'
import MainMenu from '../Screen/Home/MainTabNavigator'
import FindingFormNavigator from '../Screen/Finding/FindingFormNavigator'
import SyncScreen from '../Screen/Sync'
import InboxScreen from '../Screen/Inbox'
import DetailFindingScreen from '../Screen/Finding/DetailFindingScreen'
import Colors from '../Constant/Colors'
import FormInspectionNavigator from '../Screen/Inspeksi/Navigation/FormInspection'

const main = createStackNavigator({
    MainMenu: { screen: MainMenu, navigationOptions: { header: null } },
    SplashScreen: { screen: SplashScreen },
    Login: { screen: Login },
    FindingFormNavigator: {
        screen: FindingFormNavigator,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Colors.tintColor
            },
            title: 'Buat Laporan Penemuan',
            headerTintColor: '#fff',
            headerTitleStyle: {
                flex: 1,
                fontSize: 18,
                fontWeight: '400'
            },
        }
    },
    Sync: { screen: SyncScreen },
    Inbox: { screen: InboxScreen },
    DetailFinding: { screen: DetailFindingScreen },
    FormInspection: { screen: FormInspectionNavigator }
}, {
        headerMode: 'screen',
        initialRouteName: 'SyncScreen',
        navigationOptions: {

        },
        transitionConfig: () => ({ screenInterpolator: () => null }),
    });

export default main;