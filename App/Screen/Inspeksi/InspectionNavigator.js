import { createSwitchNavigator } from 'react-navigation';

import InspectionTabNavigator from './InspectionTabNavigator';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: InspectionTabNavigator,
});