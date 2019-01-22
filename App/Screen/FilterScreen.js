
import React from 'react';
import { StatusBar, Text, TouchableOpacity, StyleSheet, TextInput, ListView } from 'react-native';
import Colors from '../Constant/Colors';
import { Container, Content, Icon, Picker, Form, View } from 'native-base';
import { getTodayDate } from '../Lib/Utils';
import { Calendar } from 'react-native-calendars'


var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class FilterScreen extends React.Component {

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
    });


    constructor(props) {
        super(props);
        this.state = {
            valBisnisArea: '',
            language: '',
            selected: "key0",
            selectedTanggal: "key0",
            searchedBisnisArea: [],
            bisnisArea: []
        }
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    onValueChangeTanggal(value) {
        this.setState({
            selectedTanggal: value
        });
    }

    onSelect(data) {
        this.setState({ valBisnisArea: data.AFDELING_CODE })
    };

    searchedBisnisArea = (searchedText) => {
        var searchedBisnisArea = this.state.bisnisArea.filter(function (afd) {
            return afd.fullName.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
        });
        this.setState({ searchedBisnisArea: searchedBisnisArea });
    };

    renderBisnisArea = (afd) => {
        return (
            <View style={{ flex: 1, padding: 5 }}>
                <TouchableOpacity onPress={() => { this.onSelect(afd) }}>
                    <Text style={{ fontSize: 15, color: 'black' }}>{afd.AFDELING}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return (
            <Container>
                <StatusBar
                    hidden={false}
                    barStyle="light-content" />
                <Content style={{ padding: 16 }}>
                    <Form>
                        <Text style={{ fontWeight: '500', marginLeft: 8, fontSize: 16, marginTop: 24 }}>BISNIS AREA</Text>
                        <View style={styles.containerBisnisArea}>
                            <TextInput
                                style={styles.textinput}
                                onChangeText={this.searchedBisnisArea}
                                value={this.state.valBisnisArea}
                                placeholder="Cari Bisnis Area" />

                            <View style={{ marginTop: 5 }}>
                                <ListView
                                    dataSource={dataSource.cloneWithRows(this.state.searchedBisnisArea)}
                                    renderRow={this.renderAdress}
                                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                                />
                            </View>
                        </View>

                        <Text style={{ fontWeight: '500', marginLeft: 8, fontSize: 16 }}>TANGGAL</Text>
                        <TouchableOpacity onPress={() => alert('Testing')}>
                            <Calendar
                                // Collection of dates that have to be colored in a special way. Default = {}
                                markedDates={
                                    {
                                        '2012-05-20': { textColor: 'green' },
                                        '2012-05-22': { startingDay: true, color: 'green' },
                                        '2012-05-23': { selected: true, endingDay: true, color: 'green', textColor: 'gray' },
                                        '2012-05-04 ': { disabled: true, startingDay: true, color: 'green', endingDay: true }
                                    }}
                                // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                                markingType={'period'}
                            />
                            {/* <Picker
                                enabled={false}
                                mode="dropdown"
                                iosHeader="Select your SIM"
                                iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
                                style={{ width: undefined }}
                                selectedValue={this.state.selectedTanggal}
                                onValueChange={this.onValueChangeTanggal.bind(this)}>
                                <Picker.Item label={getTodayDate('LL')} value="key0" />
                            </Picker> */}
                        </TouchableOpacity>
                        <View style={{ height: 0.5, flex: 1, flexDirection: 'row', backgroundColor: 'grey' }}></View>

                        <Text style={{ fontWeight: '500', marginLeft: 8, fontSize: 16, marginTop: 24 }}>STATUS TEMUAN</Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="Select your SIM"
                            iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
                            style={{ width: undefined }}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}>
                            <Picker.Item label="BARU" value="key0" />
                            <Picker.Item label="SEDANG DI PROSES" value="key1" />
                            <Picker.Item label="SELESAI" value="key2" />
                        </Picker>
                        <View style={{ height: 0.5, flex: 1, flexDirection: 'row', backgroundColor: 'grey' }}></View>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    containerBisnisArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    textinput: {
        flex: 1,
        paddingLeft: 5,
        marginLeft: 5,
        marginRight: 5,
        height: 45,
        backgroundColor: 'white'
    }
});


export default FilterScreen;
