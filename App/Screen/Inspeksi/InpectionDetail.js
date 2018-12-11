import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign'
import Size from '../../Constant/sizes'
import Colors from '../../Constant/Colors'
import R from 'ramda';

class DetailInspeksi extends React.Component {

    constructor(props){
        super(props);

        // let params = props.navigation.state.params;       
        let params = props.navigation.state.params;
        console.log(params) 
        // let sfa = R.clone(params.test);
        // console.log(sfa)
        // let data = R.clone(params.data);
        // this.state = {
        //     data
        // }
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.tintColor
        },
        headerTitleStyle: {
            textAlign: "left",
            flex: 1,
            fontSize: 18,
            fontWeight: '400',
            marginHorizontal: 12
        },
        title: 'Detail Inspeksi GAWI INTI - 1',
        headerTintColor: '#fff',
    };

    loadData(){

    }

    componentDidMount(){

    }
    
    render() {
        return (
            <ScrollView>
                < View style={styles.container} >
                    <View style={styles.section}>
                        <Text style={styles.textLokasi}>Gawi Inti 1 - A - A01/001</Text>
                        <View style={styles.lineDivider} />
                        <View style={styles.sectionRow}>
                            <View >
                                <Text style={[styles.textContent, { fontSize: Size.font_size_label_12sp, textAlign: 'center' }]}>2 (Baris 15, 25)</Text>
                                <Text style={[styles.textLabel, { fontSize: Size.font_size_label_12sp, textAlign: 'center', marginTop: 4 }]}>Jumlah Baris</Text>
                            </View>
                            <View >
                                <Text style={[styles.textContent, { fontSize: Size.font_size_label_12sp, textAlign: 'center' }]}>1 jam 20 menit</Text>
                                <Text style={[styles.textLabel, { fontSize: Size.font_size_label_12sp, textAlign: 'center', marginTop: 4 }]}>Lama Inspeksi</Text>
                            </View>
                            <View >
                                <Text style={[styles.textContent, { fontSize: Size.font_size_label_12sp, textAlign: 'center' }]}>2 km</Text>
                                <Text style={[styles.textLabel, { fontSize: Size.font_size_label_12sp, textAlign: 'center', marginTop: 4 }]}>Jarak Inspeksi</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.textTitle}>Kriteria Penilaian</Text>
                        <View style={styles.lineDivider} />
                        <View style={styles.sectionRow}>
                            <Text style={styles.textLabel}>Piringan</Text>
                            <Text style={styles.textContent}>A/4</Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text style={styles.textLabel}>Pasar Pikul</Text>
                            <Text style={styles.textContent}>B/3</Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text style={styles.textLabel}>TPH</Text>
                            <Text style={styles.textContent}>A</Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text style={styles.textLabel}>Gawangan</Text>
                            <Text style={styles.textContent}>B/3</Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text style={styles.textLabel}>Prunning</Text>
                            <Text style={styles.textContent}>C</Text>
                        </View>
                    </View>

                    <View style={[styles.section]}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.textTitle}>Kriteria Lainnya</Text>
                            <Icon name='pluscircleo' size={25} />
                        </View>
                        <View style={styles.lineDivider} />
                        <View style={styles.sectionRow}>
                            <Text style={styles.textLabel}>Pokok Panen</Text>
                            <Text style={styles.textContent}>A/4</Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text style={styles.textLabel}>Buah Tinggal</Text>
                            <Text style={styles.textContent}>B/3</Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text style={styles.textLabel}>Brondolan di Piringan</Text>
                            <Text style={styles.textContent}>A</Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text style={styles.textLabel}>Brondolan di TPH</Text>
                            <Text style={styles.textContent}>B/3</Text>
                        </View>
                    </View>

                    <View style={[styles.section]}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.textTitle}>Detail Baris</Text>
                        </View>
                        <View style={styles.lineDivider} />
                        <TouchableOpacity>
                            <View style={styles.sectionRow}>
                                <Text style={styles.textLabel}>Baris Ke - 1</Text>
                                <Icon name='right' size={18} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.sectionRow}>
                                <Text style={styles.textLabel}>Baris Ke - 2</Text>
                                <Icon name='right' size={18} />
                            </View>
                        </TouchableOpacity>

                    </View>
                </View >
            </ScrollView>
        )
    }

}

export default DetailInspeksi; 

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        flex: 1
    },
    section: {
        backgroundColor: 'white',
        marginTop: 12,
        flexDirection: 'column',
        padding: 16
    },
    sectionRow: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textTitle: {
        fontWeight: '400',
        fontSize: 14,
        color: 'black'
    },
    textLokasi: {
        alignContent: 'center',
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 14,
        color: 'black'
    },
    textLabel: {
        color: 'grey'
    },
    textContent: {
        color: 'black'
    },
    lineDivider: {
        alignItems: 'stretch',
        height: 1,
        backgroundColor: '#D5D5D5',
        marginTop: 4
    }

});