import { createStackNavigator } from 'react-navigation';
import SplashScreen from '../Screen/SplashScreen';
import Login from '../Screen/LoginScreen'
import MainMenu from '../Screen/Home/MainTabNavigator'
import FormFinding from '../Screen/Finding/FormFinding'

const main = createStackNavigator({
    MainMenu: { screen: MainMenu, navigationOptions: { header: null }},
    SplashScreen: { screen: SplashScreen },
    Login: { screen: Login },
    FormFinding: { screen: FormFinding }
}, {
        headerMode: 'screen',
        initialRouteName: 'MainMenu',
        navigationOptions: {

        },
        // Disable animation
        transitionConfig: () => ({ screenInterpolator: () => null }),
    });

export default main;