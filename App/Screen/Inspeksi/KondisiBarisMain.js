
import React, { Component } from "react";
import { Platform, StyleSheet, StatusBar, Text, View } from "react-native";
import { StackNavigator } from "react-navigation";
import Screen from './Intro/Screen';
import Swiper from './Intro/Swiper';

class KondisiBarisMain extends Component{

    render(){
        return(
            <View style={styles.container}>
                {/* <StatusBar barStyle="light-content" backgroundColor="#16a085" />
                <Screen navigation={this.props.navigation} /> */}
                <Screen navigation={this.props.navigation} /> 
            </View>
        )
    }

}

export default App = StackNavigator({
    KondisiBarisMain: {
      screen: KondisiBarisMain,
      navigationOptions: {
        // title: "Buat Inspeksi"
        header: null
      }
    },
    Screen: {
      screen: Screen,
      navigationOptions: {
        title: "Screen"
      }
    },
    Swiper: {
      screen: Swiper,
      navigationOptions: {
        title: "Swiper"
      }
    }
  });

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },
    welcome: {
      fontSize: 20,
      textAlign: "center",
      margin: 10
    },
    instructions: {
      textAlign: "center",
      color: "#333333",
      marginBottom: 5
    }
  });