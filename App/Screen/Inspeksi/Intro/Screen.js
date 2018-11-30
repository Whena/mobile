import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View // Container component
} from "react-native";


import Swiper from "./Swiper";
import KondisiBaris1 from '../KondisiBaris1'
import KondisiBaris2 from '../KondisiBaris2Redesign'

export default class Screen extends Component {
  render() {
    return (
      <Swiper navigation={this.props.navigation}>
        {/* Kondisi Baris 1 */}
        <KondisiBaris1/>
        {/* Kondisi Baris 2 */}
        <KondisiBaris2/>
      </Swiper>
    );
  }
}
const iconStyles = {
  size: 100,
  color: "#FFFFFF"
};
const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#16a085"
  },
  // Header styles
  header: {
    color: "#FFFFFF",
    fontFamily: "Avenir",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 15
  },
  // Text below header
  text: {
    color: "#FFFFFF",
    fontFamily: "Avenir",
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: "center"
  }
});
AppRegistry.registerComponent("Screen", () => Screen);
