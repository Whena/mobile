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
import { NavigationActions, StackActions  } from 'react-navigation';

class HistoryInspeksiDetail extends React.Component {

    constructor(props){
        super(props);

        let params = props.navigation.state.params;
        let data = R.clone(params.data);

        this.state = {
            data,
            jmlBaris : '',
            nilaiPiringan: '',
            nilaiSarkul: '',
            nilaiTph: '',
            nilaiGwg: '',
            nilaiPrun: '',
            hideKriteria: false,
            barisPembagi:0,
            arrBaris: [],
            totalWaktu: '',
            totalJarak: '',
            nilaiInspeksi: '',
            nilaiScore: '',
            estateName: Taskservices.getEstateName()
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
        title: 'Detail Inspeksi',
        headerTintColor: '#fff',
    };   

    componentDidMount(){
        this.loadData()
    }

    loadData(){
        let dataBaris = Taskservices.findBy('TR_BARIS_INSPECTION', 'BLOCK_INSPECTION_CODE', this.state.data.BLOCK_INSPECTION_CODE);
        let barisPembagi = dataBaris.length;
        let str = '';
        let time = 0;
        let distance = 0
        for(var i=0; i<barisPembagi; i++){ 
            if(i == 0){
                str = `${barisPembagi}(${dataBaris[i].VALUE}`;
                this.state.arrBaris.push(this.renderBaris(dataBaris[i].VALUE, i));
                time = parseInt(dataBaris[i].TIME);
                distance = parseInt(dataBaris[i].DISTANCE);

            }else if(i > 0){
                str = `${str},${dataBaris[i].VALUE}`;
                this.state.arrBaris.push(this.renderBaris(dataBaris[i].VALUE, i));
                time = time + parseInt(dataBaris[i].TIME);
                distance = distance + parseInt(dataBaris[i].DISTANCE);
            }       
        }
        if(str !== ''){
            str = `${str})`;
        }
        let dataHeader = Taskservices.findBy('TR_BLOCK_INSPECTION_H', 'BLOCK_INSPECTION_CODE', this.state.data.BLOCK_INSPECTION_CODE);
        // let dataEst = Taskservices.getEstateName()

        this.setState({jmlBaris: str, totalWaktu: time.toString(), totalJarak: distance.toString(), nilaiInspeksi: dataHeader[0].INSPECTION_RESULT, nilaiScore: dataHeader[0].INSPECTION_SCORE});

        var piringan = this.getTotalComponentBy('CC0007');        
        var sarkul = this.getTotalComponentBy('CC0008');
        var tph = this.getTotalComponentBy('CC0009');
        var gawangan = this.getTotalComponentBy('CC0010');
        var prunning = this.getTotalComponentBy('CC0011'); 

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
            nilaiPrun: nilaiPrun,
            barisPembagi:barisPembagi
        })
    }

    loadKriteriaLain(){

        var pokokPanen = this.getTotalComponentBy('CC0001');        
        var buahTinggal = this.getTotalComponentBy('CC0002');
        var brondolPiring = this.getTotalComponentBy('CC0003');
        var brondolTph = this.getTotalComponentBy('CC0004');
        var pokokTdkPupuk = this.getTotalComponentBy('CC0005'); 

        var tipa = this.getTotalComponentBy('CC0012');        
        var penabur = this.getTotalComponentBy('CC0013');
        var pupuk = this.getTotalComponentBy('CC0014');
        var kastrasi = this.getTotalComponentBy('CC0015');
        var sanitasi = this.getTotalComponentBy('CC0016');         

        var jmlNilaiPokokPanen = this.getTotalNilaiComponent(pokokPanen);
        var jmlNilaiBuahTgl = this.getTotalNilaiComponent(buahTinggal);
        var jmlNilaiBrondolPiring = this.getTotalNilaiComponent(brondolPiring);
        var jmlNilaiBrondolTph = this.getTotalNilaiComponent(brondolTph);
        var jmlNilaiTdkPupuk = this.getTotalNilaiComponent(pokokTdkPupuk);

        var jmlNilaiTipa = this.getTotalNilaiComponent(tipa);
        var jmlNilaiPenabur = this.getTotalNilaiComponent(penabur);
        var jmlNilaiPupuk = this.getTotalNilaiComponent(pupuk);
        var jmlNilaiKastrasi = this.getTotalNilaiComponent(kastrasi);
        var jmlNilaiSanitasi = this.getTotalNilaiComponent(sanitasi);

        var avg_pokokPanen = jmlNilaiPokokPanen/this.state.barisPembagi;
        var avg_buahTinggal = jmlNilaiBuahTgl/this.state.barisPembagi;
        var avg_brondolPiring = jmlNilaiBrondolPiring/this.state.barisPembagi;
        var avg_brondolTph = jmlNilaiBrondolTph/this.state.barisPembagi;
        var avg_pokokTdkPupuk = jmlNilaiTdkPupuk/this.state.barisPembagi;

        var avg_tipa = jmlNilaiTipa/this.state.barisPembagi;
        var avg_penabur = jmlNilaiPenabur/this.state.barisPembagi;
        var avg_pupuk = jmlNilaiPupuk/this.state.barisPembagi;
        var avg_kastrasi = jmlNilaiKastrasi/this.state.barisPembagi;
        var avg_sanitasi = jmlNilaiSanitasi/this.state.barisPembagi;

        var nilaiPokokPanen =  this.getKonversiNilaiKeHuruf(avg_pokokPanen);
        var nilaiBuahTinggal =  this.getKonversiNilaiKeHuruf(avg_buahTinggal);
        var nilaiBrondolPiring =  this.getKonversiNilaiKeHuruf(avg_brondolPiring);
        var nilaiBrondolTph =  this.getKonversiNilaiKeHuruf(avg_brondolTph);
        var nilaiPokokTdkPupuk =  this.getKonversiNilaiKeHuruf(avg_pokokTdkPupuk);

        var nilaiTipa =  this.getKonversiNilaiKeHuruf(avg_tipa);
        var nilaiPenabur =  this.getKonversiNilaiKeHuruf(avg_penabur);
        var nilaiPupuk =  this.getKonversiNilaiKeHuruf(avg_pupuk);
        var nilaiKastrasi =  this.getKonversiNilaiKeHuruf(avg_kastrasi);
        var nilaiSanitasi =  this.getKonversiNilaiKeHuruf(avg_sanitasi);

        var listData = [];
        var data = {
            idx: 0,
            name : 'Pokok Panen',
            value: nilaiPokokPanen
        }
        listData.push(this.renderComponent(data));

        data = {
            idx: 1,
            name : 'Buah Tinggal',
            value: nilaiBuahTinggal
        }
        listData.push(this.renderComponent(data));

        data = {
            idx: 2,
            name : 'Brondol Piringan',
            value: nilaiBrondolPiring
        }
        listData.push(this.renderComponent(data));

        data = {
            idx: 3,
            name : 'Brondol TPH',
            value: nilaiBrondolTph
        }
        listData.push(this.renderComponent(data));

        data = {
            idx: 4,
            name : 'Pokok Tidak dipupuk',
            value: nilaiPokokTdkPupuk
        }
        listData.push(this.renderComponent(data));

        data = {
            idx: 5,
            name : 'Titi Panen',
            value: nilaiTipa
        }
        listData.push(this.renderComponent(data));

        data = {
            idx: 6,
            name : 'Sistem Penaburan',
            value: nilaiPenabur
        }
        listData.push(this.renderComponent(data));

        data = {
            idx: 7,
            name : 'Kastrasi',
            value: nilaiKastrasi
        }
        listData.push(this.renderComponent(data));

        data = {
            idx: 8,
            name : 'Sanitasi',
            value: nilaiSanitasi
        }
        listData.push(this.renderComponent(data));

        data = {
            idx: 9,
            name : 'Kondisi Pemupukan',
            value: nilaiPupuk
        }
        listData.push(this.renderComponent(data));

        return <View>{listData}</View>;
    }

    getTotalComponentBy(compCode){
        var data = Taskservices.findByWithList('TR_BLOCK_INSPECTION_D', ['CONTENT_INSPECTION_CODE', 'BLOCK_INSPECTION_CODE'], [compCode, this.state.data.BLOCK_INSPECTION_CODE]); 
        return data;
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

    getKonversiNilai(param){
        if(param === 'REHAB'){
            return 0;
        }else if(param === 'KURANG'){
            return 1;
        }else if(param === 'SEDANG'){
            return 2;
        }else if(param === 'BAIK'){
            return 3;
        }else{
            return 0;
        }
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

    showHideComponent(){
        let param = this.state.hideKriteria == true ? false:true
        this.setState({hideKriteria:param})
    }

    renderUp(){
        return(
            <TouchableOpacity onPress={()=>{ this.showHideComponent()}}>
                <Icon name='caretup' size={20} />
            </TouchableOpacity>
        )
    }
    renderDown(){
        return(
            <TouchableOpacity onPress={()=>{ this.showHideComponent()}}>
                <Icon name='caretdown' size={20} />
            </TouchableOpacity>
        )
    }

    renderComponent(data){
        return (
            <View style={styles.sectionRow}>
                <Text style={styles.textLabel}>{data.name}</Text>
                <Text style={styles.textContent}>{data.value}</Text>
            </View>
        )
    }

    renderBaris = (data, index) => {
        return (
            <TouchableOpacity 
                onPress={()=> this.props.navigation.navigate('DetailBaris',{baris: data, blokInsCode: this.state.data.BLOCK_INSPECTION_CODE})}
                key={index}>
                <View style={styles.sectionRow}>
                    <Text style={styles.textLabel}>Baris Ke - {data}</Text>
                    <Icon name='right' size={18} />
                </View>
            </TouchableOpacity>
        )
    }


    selesai(){
        const navigation = this.props.navigation;
        const resetAction = StackActions.reset({
            index: 0,            
			actions: [NavigationActions.navigate({ 
                routeName: 'BuatInspeksi'
            })]
        });
        navigation.dispatch(resetAction);
    }


    
    render() {
        return (
            <ScrollView>
                < View style={styles.container} >
                    <View style={styles.section}>

                        <Text style={styles.textNilai}>{this.state.nilaiInspeksi}</Text> 
                        <Text style={styles.textScore}>{this.state.nilaiScore}</Text>

                        <Text style={styles.textLokasi}>{this.state.estateName} - {this.state.data.AFD} - A01/001</Text>
                        <View style={styles.lineDivider} />
                        <View style={styles.sectionRow}>
                            <View >
                                <Text style={[styles.textContent, { fontSize: Size.font_size_label_12sp, textAlign: 'center' }]}>{this.state.jmlBaris}</Text>
                                <Text style={[styles.textLabel, { fontSize: Size.font_size_label_12sp, textAlign: 'center', marginTop: 4 }]}>Jumlah Baris</Text>
                            </View>
                            <View >
                                <Text style={[styles.textContent, { fontSize: Size.font_size_label_12sp, textAlign: 'center' }]}>{this.state.totalWaktu} menit</Text>
                                <Text style={[styles.textLabel, { fontSize: Size.font_size_label_12sp, textAlign: 'center', marginTop: 4 }]}>Lama Inspeksi</Text>
                            </View>
                            <View >
                                <Text style={[styles.textContent, { fontSize: Size.font_size_label_12sp, textAlign: 'center' }]}>2 km</Text>
                                <Text style={[styles.textLabel, { fontSize: Size.font_size_label_12sp, textAlign: 'center', marginTop: 4 }]}>Total Jarak Inspeksi</Text>
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
                            {this.state.hideKriteria ? this.renderUp() : this.renderDown() }                            
                        </View>

                        <View style={styles.lineDivider} />
                        {this.state.hideKriteria && 
                        <View>
                            {this.loadKriteriaLain()}
                        </View>
                        }                        
                    </View>

                    <View style={[styles.section]}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.textTitle}>Detail Baris</Text>
                        </View>
                        <View style={styles.lineDivider} />
                        <View>{this.state.arrBaris}</View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.bubble, styles.button] } onPress={()=>{this.selesai()}}>
                            <Text style={styles.buttonText}>Selesai</Text>
                        </TouchableOpacity>                        
                    </View>
                </View >
            </ScrollView>
        )
    }

}

export default HistoryInspeksiDetail; 

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
        marginTop: 5,
        marginBottom: 10
    },
    bubble: {
        backgroundColor: Colors.brand,
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 17,
        color: '#ffffff',
        textAlign: 'center'
    },
    button: {
        width: 200,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
        padding: 10,
    },    
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
        justifyContent:'center'
    },
    textNilai: {
        fontSize: 50,
        fontWeight: '500',
        alignContent: 'center',
        textAlign: 'center',
    },

    textScore: {
        fontSize: 25,
        fontWeight: '300',
        alignContent: 'center',
        textAlign: 'center',
    },

});