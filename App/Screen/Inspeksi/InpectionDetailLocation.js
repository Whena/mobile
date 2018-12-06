import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Colors from '../constants/Colors'

class DetailInspeksiLokasi extends React.Component {

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
        title: 'Detail Inspeksi',
        headerTintColor: '#fff',
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.textLokasi}>Detail Penilaian {"\n"} Baris Kelima</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.textTitle}>Perawatan</Text>
                    <View style={styles.lineDivider} />
                    <View style={styles.sectionRow}>
                        <Text style={styles.textLabel}>Piringan</Text>
                        <Text style={styles.textContent}>Baik</Text>
                    </View>
                    <View style={styles.sectionRow}>
                        <Text style={styles.textLabel}>Pasar Pikul</Text>
                        <Text style={styles.textContent}>Sedang</Text>
                    </View>
                    <View style={styles.sectionRow}>
                        <Text style={styles.textLabel}>TPH</Text>
                        <Text style={styles.textContent}>Baik</Text>
                    </View>
                    <View style={styles.sectionRow}>
                        <Text style={styles.textLabel}>Gawangan</Text>
                        <Text style={styles.textContent}>Baik</Text>
                    </View>
                    <View style={styles.sectionRow}>
                        <Text style={styles.textLabel}>Prunning</Text>
                        <Text style={styles.textContent}>Sedang</Text>
                    </View>
                </View>

                <View style={[styles.section]}>
                    <View style={styles.sectionRow}>
                        <Text style={styles.textTitle}>Pemupukan</Text>
                    </View>
                    <View style={styles.lineDivider} />
                    <View style={styles.sectionRow}>
                        <Text style={styles.textLabel}>Pokok di Pupuk</Text>
                        <Text style={styles.textContent}>10</Text>
                    </View>
                    <View style={styles.sectionRow}>
                        <Text style={styles.textLabel}>Sistem Penaburan</Text>
                        <Text style={styles.textContent}>Sedang</Text>
                    </View>
                    <View style={styles.sectionRow}>
                        <Text style={styles.textLabel}>Kondisi Pupuk</Text>
                        <Text style={styles.textContent}>Baik</Text>
                    </View>
                </View>
            </View>
        )
    }

}

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
        fontWeight: '500',
        fontSize: 14,
        color: 'black'
    },
    textLokasi: {
        alignContent: 'center',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 18,
        color: 'black'
    },
    textLabel: {
        color: 'grey'
    },
    textContent: {
        fontWeight: '500',
        color: 'black'
    },
    lineDivider: {
        alignItems: 'stretch',
        height: 1,
        backgroundColor: '#D5D5D5',
        marginTop: 4
    }

});

export default DetailInspeksiLokasi;