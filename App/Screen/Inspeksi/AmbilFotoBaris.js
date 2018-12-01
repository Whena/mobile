import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';


class AmbilFotoBaris extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.section}>
                    <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
                        <Image source={require('../assets/image/background.png')} style={{ flexGrow: 1 }} />
                    </View>
                    <View style={{ alignItems: 'center', backgroundColor: 'white', padding: 20 }}>
                        <TouchableOpacity>
                            <Image source={require('../assets/icon/ic_take_photo.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    section: {
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'flex-end'
    },
    icon: {
        alignContent: 'flex-end',
        height: 64,
        width: 64,
        resizeMode: 'stretch',
        alignItems: 'center'
    }
});

export default AmbilFotoBaris;