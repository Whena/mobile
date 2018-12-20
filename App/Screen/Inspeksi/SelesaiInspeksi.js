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
import Taskservices from '../../Database/TaskServices'
import R from 'ramda';

class SelesaiInspeksi extends React.Component {

    constructor(props){
        super(props);

        let params = props.navigation.state.params;
        let fotoBaris = R.clone(params.fotoBaris);
        let fotoSelfie = R.clone(params.fotoSelfie);
        let inspeksiHeader = R.clone(params.inspeksiHeader);
        let kondisiBaris1 = R.clone(params.kondisiBaris1);
        let kondisiBaris2 = R.clone(params.kondisiBaris2);
        let dataUsual = R.clone(params.dataUsual);

        this.state = {
            fotoBaris,
            fotoSelfie,
            inspeksiHeader,
            kondisiBaris1,
            kondisiBaris2,
            dataUsual,
            jmlBaris : '',
            nilaiPiringan: '',
            nilaiSarkul: '',
            nilaiTph: '',
            nilaiGwg: '',
            nilaiPrun: '',
        };
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
        let dataBaris = Taskservices.findBy('TR_BARIS_INSPECTION', 'BLOCK_INSPECTION_CODE', this.state.inspeksiHeader.BLOCK_INSPECTION_CODE)
        let barisPembagi = dataBaris.length;
        let str = '';
        for(var i=0; dataBaris.length; i++){ 
            if(i=0){
                str = dataBaris.length + ' ('+dataBaris[i].VALUE
            } else if (i > 0){
                str = str + ','+ dataBaris[i].VALUE;
            }         
        }
        if(str !== ''){
            str = str+')';
        }
        this.setState({jmlBaris: str});
        
        let bobotPiringan = 4;
        let bobotSarkul = 5;
        let bobotTph = 1;
        let bobotGwg = 3;
        let bobotPrun = 2;

        var piringan = TaskServices.findByWithList('TR_BLOCK_INSPECTION_D', ['CONTENT_INSPECTION_CODE', 'BLOCK_INSPECTION_CODE'], ['CC0007', this.state.inspeksiHeader.BLOCK_INSPECTION_CODE]);        
        var sarkul = TaskService.findByWithList('TR_BLOCK_INSPECTION_D', ['CONTENT_INSPECTION_CODE','BLOCK_INSPECTION_CODE'], ['CC0008', this.state.inspeksiHeader.BLOCK_INSPECTION_CODE]);
        var tph = TaskService.findByWithList('TR_BLOCK_INSPECTION_D', ['CONTENT_INSPECTION_CODE','BLOCK_INSPECTION_CODE'], ['CC0009', this.state.inspeksiHeader.BLOCK_INSPECTION_CODE]);
        var gawangan = TaskService.findByWithList('TR_BLOCK_INSPECTION_D', ['CONTENT_INSPECTION_CODE','BLOCK_INSPECTION_CODE'], ['CC0010', this.state.inspeksiHeader.BLOCK_INSPECTION_CODE]);
        var prunning = TaskService.findByWithList('TR_BLOCK_INSPECTION_D', ['CONTENT_INSPECTION_CODE','BLOCK_INSPECTION_CODE'], ['CC0011', this.state.inspeksiHeader.BLOCK_INSPECTION_CODE]);   

        var jmlNilaiPiringan = this.getTotalNilaiComponent(piringan);
        var jmlNilaiSarkul = this.getTotalNilaiComponent(sarkul);
        var jmlNilaiTph = this.getTotalNilaiComponent(tph);
        var jmlNilaiGwg = this.getTotalNilaiComponent(gawangan);
        var jmlNilaiPrun = this.getTotalNilaiComponent(prunning);

        var avg_piringan = jmlNilaiPiringan/barisPembagi;
        var avg_sarkul = jmlNilaiSarkul/barisPembagi;
        var avg_tph = jmlNilaiTph/barisPembagi;
        var avg_gwg = jmlNilaiGwg/barisPembagi;
        var avg_prun = jmlNilaiPrun/barisPembagi;

        var nilaiPiringan =  this.getKonversiNilaiKeHuruf(avg_piringan);
        var nilaiSarkul =  this.getKonversiNilaiKeHuruf(avg_sarkul);
        var nilaiTph =  this.getKonversiNilaiKeHuruf(avg_tph);
        var nilaiGwg =  this.getKonversiNilaiKeHuruf(avg_gwg);
        var nilaiPrun =  this.getKonversiNilaiKeHuruf(avg_prun);

        this.setState({
            nilaiPiringan: nilaiPiringan,
            nilaiSarkul: nilaiSarkul,
            nilaiTph: nilaiTph,
            nilaiGwg: nilaiGwg,
            nilaiPrun: nilaiPrun
        })
    }

    getTotalNilaiComponent(allComponent){
        var val = 0;
        for(var i=0; i < allComponent.length; i++){
            if(i==0){
                val = this.getKonversiNilai(allComponent[i].VALUE);
            }else{
                val = val + this.getKonversiNilai(allComponent[i].VALUE);
            }
        }
        return val;
    }

    getKonversiNilaiKeHuruf(param){
        if(param > 2.5 && param <= 3){
            return 'A';
        }else if(param > 2 && param <= 2.5){
            return 'B';
        }else if(param > 1 && param <= 2){
            return 'C';
        }else if(param >= 0 && param <= 1){
            return 'F';
        }
    }

    componentDidMount(){
        // this.loadData()
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
                                <Text style={[styles.textContent, { fontSize: Size.font_size_label_12sp, textAlign: 'center' }]}>{this.state.jmlBaris}</Text>
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
                            <Text style={styles.textContent}>{this.state.nilaiPiringan}</Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text style={styles.textLabel}>Pasar Pikul</Text>
                            <Text style={styles.textContent}>{this.state.nilaiSarkul}</Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text style={styles.textLabel}>TPH</Text>
                            <Text style={styles.textContent}>{this.state.nilaiTph}</Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text style={styles.textLabel}>Gawangan</Text>
                            <Text style={styles.textContent}>{this.state.nilaiGwg}</Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text style={styles.textLabel}>Prunning</Text>
                            <Text style={styles.textContent}>{this.state.nilaiPrun}</Text>
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

export default SelesaiInspeksi; 

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