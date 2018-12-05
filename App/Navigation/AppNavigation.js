import { createStackNavigator } from 'react-navigation';
import SplashScreen from '../Screen/SplashScreen';
import Login from '../Screen/LoginScreen'
import MainMenu from '../Screen/Home/MainTabNavigator'
import FormFinding from '../Screen/Finding/FormFinding'
import SyncScreen from '../Screen/Sync'
import InboxScreen from '../Screen/Inbox'

const main = createStackNavigator({
    MainMenu: { screen: MainMenu, navigationOptions: { header: null } },
    SplashScreen: { screen: SplashScreen },
    Login: { screen: Login },
    FormFinding: { screen: FormFinding },
    Sync: { screen: SyncScreen },
    Inbox: { screen: InboxScreen }
}, {
        headerMode: 'screen',
        initialRouteName: 'MainMenu',
        navigationOptions: {

        },
        transitionConfig: () => ({ screenInterpolator: () => null }),
    });

export default main;