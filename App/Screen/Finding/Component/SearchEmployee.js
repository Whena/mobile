
'use strict';

import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, ListView } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image'
import R from 'ramda'

var adresses = [
  {
    street: "1 Martin Place",
      city: "Sydney",
    country: "Australia"
    },{
    street: "1 Martin Street",
      city: "Sydney",
    country: "Australia"
  }
];

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class SampleApp extends Component {

    static propTypes = {
        onSelect: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    };

    _onSelectedItem = () => {
		this.props.onSelect(this.props.user);
	};
    

  constructor(props) {
    super(props);

    this.state = {
      searchedAdresses: []
    };
  };

  searchedAdresses = (searchedText) => {
    var searchedAdresses = adresses.filter(function(adress) {
      return adress.street.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
    });
    this.setState({searchedAdresses: searchedAdresses});
  };

    renderAdress = (adress) => {
    return (
      <View>
        <Text>{adress.street}, {adress.city}, {adress.country}</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
            style={styles.textinput}
            onChangeText={this.searchedAdresses}
            placeholder="Type your adress here" />
        <ListView
            dataSource={ds.cloneWithRows(this.state.searchedAdresses)}
            renderRow={this.renderAdress} />
      </View>
    );
  };
}

export default SampleApp;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  textinput: {
    marginTop: 30,
    backgroundColor: '#DDDDDD',
    height: 40,
    width: 200
  }
});