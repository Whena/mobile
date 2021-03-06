import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign'
import Size from '../../Constant/sizes'
import Colors from '../../Constant/Colors'
import Taskservices from '../../Database/TaskServices'
import R from 'ramda';
import { NavigationActions, StackActions  } from 'react-navigation';
import {getSticker} from '../../Lib/Utils'

class SelesaiInspeksi extends React.Component {

    constructor(props){
        super(props);

        let params = props.navigation.state.params;
        let inspeksiHeader = R.clone(params.inspeksiHeader);
        let statusBlok = R.clone(params.statusBlok);
        let dataInspeksi = R.clone(params.dataInspeksi);
        //alert(JSON.stringify(dataInspeksi))

        this.state = {
            dataInspeksi,
            inspeksiHeader,
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
            blockCode: '',
            blockName: '',
            estateName: '',
            statusBlok,
            showPiringan: false,
            showSarkul: false,
            showTph: false,
            showGwg: false,
            showPrun: false
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
        title: `Detail Inspeksi`,
        headerTintColor: '#fff',
    };   

    componentDidMount(){
        this.loadData()
    }

    getEstateName(werks){
        try {
            let data = Taskservices.findBy2('TM_EST', 'WERKS', werks);
            return data.EST_NAME;
        } catch (error) {
            return '';
        }    
    }

    loadData(){
        let dataBaris = Taskservices.findBy('TR_BLOCK_INSPECTION_H', 'ID_INSPECTION', this.state.dataInspeksi.ID_INSPECTION);
        // let dataBaris = Taskservices.findBy('TR_BLOCK_INSPECTION_H', 'ID_INSPECTION', this.state.data.ID_INSPECTION);
        let barisPembagi = dataBaris.length;
        let time = 0;
        let distance = 0
        for(var i=0; i<barisPembagi; i++){ 
            if(i == 0){
                this.state.arrBaris.push(this.renderBaris(dataBaris[i].AREAL, i));
                time = parseInt(dataBaris[i].TIME);
                distance = parseInt(dataBaris[i].DISTANCE);

            }else if(i > 0){
                this.state.arrBaris.push(this.renderBaris(dataBaris[i].AREAL, i));
                time = time + parseInt(dataBaris[i].TIME);
                distance = distance + parseInt(dataBaris[i].DISTANCE);
            }       
        }
        
        // let dataHeader = Taskservices.findBy('TR_BLOCK_INSPECTION_H', 'ID_INSPECTION', this.state.inspeksiHeader.ID_INSPECTION);
        // let dataBlock = Taskservices.findBy2('TM_BLOCK', 'BLOCK_CODE', dataBaris[0].BLOCK_CODE);
        let dataBlock = Taskservices.findBy2('TM_BLOCK', 'BLOCK_CODE', this.state.dataInspeksi.BLOCK_CODE);

        // let score = dataHeader[0].INSPECTION_SCORE;
        // score = score.includes('.') ? parseFloat(score).toFixed(1).toString() : score;

        // let estName = this.getEstateName(this.state.inspeksiHeader.WERKS)
        this.setState({
            jmlBaris: barisPembagi, 
            totalWaktu: time.toString(), 
            totalJarak: distance.toString(), 
            nilaiInspeksi: this.state.dataInspeksi.INSPECTION_RESULT,//dataHeader[0].INSPECTION_RESULT, 
            nilaiScore: parseFloat(this.state.dataInspeksi.INSPECTION_SCORE).toFixed(1).toString(),//score,
            distance: distance,
            blockCode: dataBlock.BLOCK_CODE,
            blockName: dataBlock.BLOCK_NAME,
            barisPembagi: dataBaris.length,
            estateName: this.state.dataInspeksi.EST_NAME//estName
        });

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

        
        if(this.state.statusBlok === 'TM'){
            this.setState({
                nilaiPiringan: `${nilaiPiringan}/${avg_piringan.toFixed(2)}`,
                nilaiSarkul: `${nilaiSarkul}/${avg_sarkul.toFixed(2)}`,
                nilaiTph: `${nilaiTph}/${avg_tph.toFixed(2)}`,
                nilaiGwg: `${nilaiGwg}/${avg_gwg.toFixed(2)}`,
                nilaiPrun: `${nilaiPrun}/${avg_prun.toFixed(2)}`,            
                barisPembagi: dataBaris.length,
            });
        }else if(this.state.statusBlok === 'TBM 3'){
            this.setState({
                nilaiPiringan: `${nilaiPiringan}/${avg_piringan.toFixed(2)}`,
                nilaiSarkul: `${nilaiSarkul}/${avg_sarkul.toFixed(2)}`,
                nilaiTph: `${nilaiTph}/${avg_tph.toFixed(2)}`,
                nilaiGwg: `${nilaiGwg}/${avg_gwg.toFixed(2)}`,
                nilaiPrun: `-`,            
                barisPembagi: dataBaris.length,
            });
        }else{
            this.setState({
                nilaiPiringan: `${nilaiPiringan}/${avg_piringan.toFixed(2)}`,
                nilaiSarkul: `${nilaiSarkul}/${avg_sarkul.toFixed(2)}`,
                nilaiTph: `-`,
                nilaiGwg: `${nilaiGwg}/${avg_gwg.toFixed(2)}`,
                nilaiPrun: `-`,            
                barisPembagi: dataBaris.length,
            });
        }
    }

    loadKriteriaLain(){

        var pokokPanen = this.getTotalComponentBy('CC0002');        
        var buahTinggal = this.getTotalComponentBy('CC0003');
        var brondolPiring = this.getTotalComponentBy('CC0004');
        var brondolTph = this.getTotalComponentBy('CC0005');
        var pokokTdkPupuk = this.getTotalComponentBy('CC0006'); 

        var tipa = this.getTotalComponentBy('CC0012');        
        var penabur = this.getTotalComponentBy('CC0013');
        var pupuk = this.getTotalComponentBy('CC0014');
        var kastrasi = this.getTotalComponentBy('CC0015');
        var sanitasi = this.getTotalComponentBy('CC0016');         

        var jmlNilaiPokokPanen = this.getTotalNilai(pokokPanen);
        var jmlNilaiBuahTgl = this.getTotalNilai(buahTinggal);
        var jmlNilaiBrondolPiring = this.getTotalNilai(brondolPiring);
        var jmlNilaiBrondolTph = this.getTotalNilai(brondolTph);
        var jmlNilaiTdkPupuk = this.getTotalNilai(pokokTdkPupuk);
         
        
        var listData = [];
        var data = {
            idx: 0,
            name : 'Pokok Panen',
            value: jmlNilaiPokokPanen
        }
        listData.push(this.renderComponent(data));

        data = {
            idx: 1,
            name : 'Buah Tinggal',
            value: jmlNilaiBuahTgl
        }
        listData.push(this.renderComponent(data));

        data = {
            idx: 2,
            name : 'Brondol Piringan',
            value: jmlNilaiBrondolPiring
        }
        listData.push(this.renderComponent(data));

        data = {
            idx: 3,
            name : 'Brondol TPH',
            value: jmlNilaiBrondolTph
        }
        listData.push(this.renderComponent(data));

        data = {
            idx: 4,
            name : 'Pokok Tidak dipupuk',
            value: jmlNilaiTdkPupuk
        }
        listData.push(this.renderComponent(data));

        if(tipa.length > 0)  {
            var jmlNilaiTipa = this.getTotalNilaiComponent(tipa);
            var avg_tipa = jmlNilaiTipa/tipa.length;
            var nilaiTipa =  this.getKonversiNilaiKeHuruf(avg_tipa);
            data = {
                idx: 5,
                name : 'Titi Panen',
                value: `${nilaiTipa}/${avg_tipa.toFixed(2)}`
            }
            listData.push(this.renderComponent(data));
        }
        if(penabur.length> 0)  {
            var jmlNilaiPenabur = this.getTotalNilaiComponent(penabur);
            var avg_penabur = jmlNilaiPenabur/penabur.length;
            var nilaiPenabur =  this.getKonversiNilaiKeHuruf(avg_penabur);
            data = {
                idx: 6,
                name : 'Sistem Penaburan',
                value: `${nilaiPenabur}/${avg_penabur.toFixed(2)}`
            }
            listData.push(this.renderComponent(data));
        }
        if(pupuk.length > 0)  {
            var jmlNilaiPupuk = this.getTotalNilaiComponent(pupuk);
            var avg_pupuk = jmlNilaiPupuk/pupuk.length;
            var nilaiPupuk =  this.getKonversiNilaiKeHuruf(avg_pupuk);
            data = {
                idx: 9,
                name : 'Kondisi Pemupukan',
                value: `${nilaiPupuk}/${avg_pupuk.toFixed(2)}`
            }
            listData.push(this.renderComponent(data));
        }
        if(kastrasi.length > 0)  {
            var jmlNilaiKastrasi = this.getTotalNilaiComponent(kastrasi);
            var avg_kastrasi = jmlNilaiKastrasi/kastrasi.length;
            var nilaiKastrasi =  this.getKonversiNilaiKeHuruf(avg_kastrasi);
            data = {
                idx: 7,
                name : 'Kastrasi',
                value: `${nilaiKastrasi}/${avg_kastrasi.toFixed(2)}`
            }
            listData.push(this.renderComponent(data));
        }
        if(sanitasi.length > 0)  {
            var jmlNilaiSanitasi = this.getTotalNilaiComponent(sanitasi);
            var avg_sanitasi = jmlNilaiSanitasi/sanitasi.length;
            var nilaiSanitasi =  this.getKonversiNilaiKeHuruf(avg_sanitasi);
            data = {
                idx: 8,
                name : 'Sanitasi',
                value: `${nilaiSanitasi}/${avg_sanitasi.toFixed(2)}`
            }
            listData.push(this.renderComponent(data));
        }

        return <View>{listData}</View>;
    }

    getTotalNilai(allComponent){
        var val = 0;
        for(var i=0; i < allComponent.length; i++){
            if(i==0){
                val = parseInt(allComponent[i].VALUE);
            }else{
                val = val + parseInt(allComponent[i].VALUE);
            }
        }
        return val;
    }

    getTotalComponentBy(compCode){
        var data = Taskservices.findByWithList('TR_BLOCK_INSPECTION_D', ['CONTENT_INSPECTION_CODE', 'ID_INSPECTION'], [compCode, this.state.dataInspeksi.ID_INSPECTION]); 
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
                onPress={()=> this.props.navigation.navigate('DetailBaris',{baris: data, idInspection: this.state.dataInspeksi.ID_INSPECTION})}
                key={index}>
                <View style={styles.sectionRow}>
                    <Text style={styles.textLabel}>Baris Ke - {data}</Text>
                    <Icon name='right' size={18} />
                </View>
            </TouchableOpacity>
        )
    }

    renderSticker(param){
        return(
            <Image style={{width: 120, height: 120 }} source={getSticker(param)} />
        )
    }



    selesai=()=>{
        const navigation = this.props.navigation;
        const resetAction = StackActions.reset({
            index: 0,            
			actions: [NavigationActions.navigate({ 
                routeName: 'MainMenu'
            })]
        });
        navigation.dispatch(resetAction);
    }

    colorTextScore(param){
        switch(param){
            case 'A':
                return Colors.brand;
            case 'B':
                return '#feb236';
            case 'C':
                return '#ff7b25';
            case 'F':
                return 'red';
            default:
                break;
        }
    }
    
    render() {

        return (
            <ScrollView>
                < View style={styles.container} >
                    <View style={[styles.section,{alignItems:'center'}]}>
                        {this.renderSticker(this.state.nilaiInspeksi)}
                        <Text style={[styles.textNilai,{color: this.colorTextScore(this.state.nilaiInspeksi)}]}>{this.state.nilaiInspeksi}/{this.state.nilaiScore}</Text> 

                        <Text style={styles.textLokasi}>{this.state.estateName} - {this.state.inspeksiHeader.AFD_CODE} - {this.state.blockName}/{this.state.blockCode}</Text>
                        {/* <View style={styles.lineDivider} /> */}
                        <View style={styles.sectionRow}>
                            <View style={{marginRight:10}} >
                                <Text style={[styles.textContent, { fontSize: Size.font_size_label_12sp, textAlign: 'center' }]}>{this.state.jmlBaris}</Text>
                                <Text style={[styles.textLabel, { fontSize: Size.font_size_label_12sp, textAlign: 'center', marginTop: 4 }]}>Jumlah Baris</Text>
                            </View>
                            <View style={{marginRight:10}} >
                                <Text style={[styles.textContent, { fontSize: Size.font_size_label_12sp, textAlign: 'center' }]}>{this.state.totalWaktu} menit</Text>
                                <Text style={[styles.textLabel, { fontSize: Size.font_size_label_12sp, textAlign: 'center', marginTop: 4 }]}>Lama Inspeksi</Text>
                            </View>
                            <View >
                                <Text style={[styles.textContent, { fontSize: Size.font_size_label_12sp, textAlign: 'center' }]}>{this.state.distance} m</Text>
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
        fontSize: 35,
        fontWeight: '400',
        alignContent: 'center',
        textAlign: 'center',
    },

});