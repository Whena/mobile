import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	TouchableOpacity, View, Image, Text
} from 'react-native';
import FastImage from 'react-native-fast-image'
import R from 'ramda'

class Contact extends Component {
	static propTypes = {
		onSelect: PropTypes.func,
		data: PropTypes.array
	};

	static defaultProps = {
		onSelect: () => { },
		data: []
	};

	_renderList() {
		const Row = item => (
			<TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginBottom: 16 }}
				onPress={this.props.onSelect}>
				<FastImage style={{ marginRight: 16, width: 40, height: 40, borderRadius: 20 }}
					resizeMode={FastImage.resizeMode.contain} 
					source={{
						uri: item.photo,
						priority: FastImage.priority.normal,
					  }}/>
				<View style={{ flex: 1 }} >
					<Text style={{ fontSize: 14, color: 'black' }}>{item.name}</Text>
					<Text style={{ fontSize: 12, color: 'grey', marginTop: 3 }}>{item.departemen}</Text>
				</View>
			</TouchableOpacity>
		);

		return R.map(Row, this.props.data)
	}


	render() {
		return (
			<View style={{ flex: 1 }}>
				{this._renderList()}
			</View>
		);
	}
}

export default Contact