import * as React from 'react';
import {Text, View, TouchableOpacity,SafeAreaView, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons';
import {Card} from 'react-native-shadow-cards'

const ScreenAwal = ({ navigation }) => {
    let navigateToLoginScreen = () => {
        navigation.navigate('LoginScreen');
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={styles.header}>
                    <Image source={require('./images/kemenkes.png')} style={{width: 210, height: 100}}/>
                </View>
                <Text style={styles.textHeader}>SILK</Text>
                <Image source={require('./images/icon2.png')} style={styles.images}/>
            </View>
            <View style={{flex: 0.2, alignItems: 'center', marginLeft: 20}}>
                <Card style={styles.btn}>
                   <TouchableOpacity onPress={navigateToLoginScreen}>
                       <Text style={styles.btntext}>Mulai</Text>
                   </TouchableOpacity>
                </Card>
            </View>
            <View style={{flex: 0.2, alignItems: 'center'}}>
                   <Text style={styles.footer}>Version 0.0.1</Text>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    header: { 
        flexDirection: 'row',
        backgroundColor: 'white', 
        marginLeft: 100,
        marginRight: 100,
        marginTop: 40,      
    },
    images: {
        width: 200, 
        height: 200,
        marginHorizontal: 110
    },
    textHeader: {
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'black',
        letterSpacing: 5,
        marginTop: 35,
        textAlign: 'center'
    },
    btn: {
        width: 200,
        height: 75,
        backgroundColor: 'darkblue',
        shadowColor: 'blue',
        justifyContent: 'center',
        borderRadius: 8,
        marginLeft: 20,
        marginRight: 20
    },
    btntext: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    footer: {
        marginLeft: 20,
        color: 'grey',
        marginTop: 20,
        fontSize: 15,
        textDecorationLine: 'underline',
    }
})

export default ScreenAwal;