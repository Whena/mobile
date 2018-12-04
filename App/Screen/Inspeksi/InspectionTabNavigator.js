
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';

import HistoryInspection from './HistoryInscpection';
import ListInspection from './ListInspection';

const InspectionTabs = createMaterialTopTabNavigator({

  Riwayat: {
    screen: HistoryInspection,
    headerMode: 'none',
    navigationOptions: {
      headerMode: 'none',
      tabBarLabel: 'Riwayat'
    }
  },
  DaftarInspeksi: {
    headerMode: 'none',
    screen: ListInspection,
    navigationOptions: {
      headerMode: 'none',
      tabBarLabel: 'Daftar Inspeksi'
    }
  }
}, {
    headerMode: "none",
    initialRouteName: 'DaftarInspeksi',
    order: ['DaftarInspeksi', 'Riwayat'],
    // tabBarPosition:'bottom',
    swipeEnabled: true,
    // Optional: Override the `navigationOptions` for the screen
    tabBarOptions: {
      activeTintColor: '#51A977',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopColor: "transparent",
        elevation: 0
      },
      indicatorStyle: {
        backgroundColor: '#2db92d',
        width: 15,
        maxWidth: 15,
        marginStart: '23%'
      }
    }
  });

//Issue: the tab navigator needs to be wrapped inside a stack navigator
export default createStackNavigator({ InspectionTabs }, { headerMode: "none" });

// const RiwayatStack = createStackNavigator({
//   Riwayat: HistoryInspection,
// });

// RiwayatStack.navigationOptions = {
//   tabBarLabel: 'Riwayat'
// };

// const DaftarInspeksiStack = createStackNavigator({
//   DaftarInspeksi: ListInspection,
// });

// DaftarInspeksiStack.navigationOptions = {
//   tabBarLabel: 'Daftar Inspeksi'
// };

// export default (
//   InspectionTabNavigator = createMaterialTopTabNavigator({
//     DaftarInspeksiStack,
//     RiwayatStack,
//   }, {
//       headerMode: 'none',
//       tabBarOptions: {
//         activeTintColor: '#51A977',
//         inactiveTintColor: 'grey',
//         style: { backgroundColor: 'white' },
//         indicatorStyle: {
//           backgroundColor: '#2db92d',
//         }
//       }
//     }
//   ));

