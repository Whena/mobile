
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';

import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';

export default createStackNavigator({
  Step1: {
    screen: FormStep1
  },
  Step2: {
    screen: FormStep2
  },
}, {
    headerMode: 'none',
    initialRouteName: 'Step2',
    transitionConfig: () => ({ screenInterpolator: () => null }),
  }
);
