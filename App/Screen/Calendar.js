import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, AsyncStorage } from 'react-native'
import Calendar from 'react-native-calendario';
import Colors from '../Constant/Colors';


//customButton usage...
export default class NewPicker extends React.Component {

    static navigationOptions = {
        header: null
    }

    customButtonOnPress = () => {
        console.log('customButton');
        this.picker.onConfirm();
    }

    constructor(props) {
        super(props);

        this.state = {
            range: ''
        }
    }

    _onChooseDate() {
        AsyncStorage.getItem('range', (error, result) => {
            if (result) {
                console.log(result);
                let resultParsed = JSON.parse(result)
                console.log(resultParsed.startDate);
                console.log(resultParsed.endDate)

                this.props.navigation.state.params.changeBatasWaktu(result);
                this.props.navigation.goBack();
            }
        });
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: ' white' }}>
                <View style={{ flex: 1 }}>
                    <Calendar
                        onChange={range => AsyncStorage.setItem('range', JSON.stringify(range))}
                        minDate="2018-04-20"
                        startDate="2018-04-30"
                        endDate="2018-05-05"
                    // theme={{
                    //     weekColumnTextStyle: {
                    //         color: 'red',
                    //     },
                    //     weekColumnStyle: {
                    //         paddingVertical: 20,
                    //     },
                    //     weekColumnsContainerStyle: {
                    //         backgroundColor: 'lightgrey',
                    //     },
                    //     monthTitleStyle: {
                    //         color: 'blue',
                    //     },
                    //     nonTouchableDayContainerStyle: {
                    //         backgroundColor: 'red',
                    //     },
                    //     nonTouchableDayTextStyle: {
                    //         color: 'green',
                    //     },
                    //     dayTextStyle: {
                    //         color: 'blue',
                    //     },
                    //     activeDayContainerStyle: {
                    //         backgroundColor: 'lightgrey',
                    //     },
                    //     activeDayTextStyle: {
                    //         color: 'red',
                    //     },
                    // }}
                    />
                </View>
                <View style={{ justifyContent: 'flex-end', alignContent: 'center', margin: 10 }} >
                    <TouchableOpacity onPress={() => {
                        this._onChooseDate(this.state.tanggal);
                    }} style={[styles.button]}>
                        <Text style={styles.buttonText}>Simpan</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        height: 42,
        width: 390,
        backgroundColor: Colors.tintColor,
        borderRadius: 10
    },
    buttonText: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: '400',
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center'
    }
});