
import React, { Component } from 'react';
import { ImageBackground, StatusBar, Text, Alert, Picker, TouchableOpacity } from 'react-native';
import { Container } from 'native-base'
import Colors from '../Constant/Colors';

class FilterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: ''
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: Colors.tintColor
        },
        headerTitleStyle: {
            textAlign: "left",
            flex: 1,
            fontSize: 18,
            fontWeight: '400'
        },
        title: 'Filter',
        headerTintColor: '#fff'
    })

    render() {
        return (
            <Container>
                <StatusBar
                    hidden={false}
                    barStyle="light-content" />

                    
                {/* <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker> */}
            </Container>
        )
    }


}

export default FilterScreen;
