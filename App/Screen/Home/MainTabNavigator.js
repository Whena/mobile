import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';
import FindingScreen from '../Finding/FindingScreen';
import InspectionScreen from '../Inspeksi/InspectionScreen';
import EbccValidationScreen from '../Ebcc/EbccValidationScreen';
import MoreScreen from '../More/MoreScreen';
import FindingTabNavigator from '../Finding/FindingTabNavigator'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Beranda',
};

const FindingStack = createStackNavigator({
  Finding: FindingScreen,
});

FindingStack.navigationOptions = {
  tabBarLabel: 'Temuan',
};

const InspectionStack = createStackNavigator({
  Inspection : {screen: InspectionScreen},

});

InspectionStack.navigationOptions = {
  tabBarLabel: 'Inspeksi',
};

const MoreStack = createStackNavigator({
  More: MoreScreen,
});

MoreStack.navigationOptions = {
  tabBarLabel: 'Lainnya',
};

const EbccValidationStack = createStackNavigator({
  EbccValidation: EbccValidationScreen,
});

EbccValidationStack.navigationOptions = {
  tabBarLabel: 'Ebcc Val',
};

export default (
  MainTabNavigator = createBottomTabNavigator({
    HomeStack,
    FindingStack,
    InspectionStack,
    EbccValidationStack,
    MoreStack
  }, {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'HomeStack') {
            iconName = `home${focused ? '' : '-outline'}`;
            return <MaterialCommunityIcons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
          } else if (routeName === 'FindingStack') {
            iconName = `md-flashlight`;
          } else if (routeName === 'InspectionStack') {
            iconName = `ios-search${focused ? '' : ''}`;
          } else if (routeName === 'EbccValidationStack') {
            iconName = `ios-checkmark-circle${focused ? '' : '-outline'}`;
          } else if (routeName === 'MoreStack') {
            iconName = `ios-more${focused ? '' : ''}`;
          }

          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: '#36A100'
      }
    }
  ));



