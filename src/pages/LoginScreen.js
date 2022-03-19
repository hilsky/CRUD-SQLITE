import React, {useState} from 'react';
import {Text, View, TouchableOpacity,SafeAreaView, StyleSheet, Image, ScrollView, KeyboardAvoidingView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-shadow-cards'

const LoginScreen = ({navigation}) => {
    let navigateToScreenAwal = () => {
        navigation.navigate('ScreenAwal');
    };

    let navigateToHomeScreen = () => {
        navigation.navigate('HomeScreen');
    };


    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', marginLeft: 20, marginTop:30}}>
                    <TouchableOpacity onPress={navigateToScreenAwal}>
                        <Icon name="arrow-left" size={30} color='grey' />
                    </TouchableOpacity>
                    <View style={{marginTop: 50, marginHorizontal: 80, marginBottom: 50}}>
                        <Image source={require('./images/kemenkes.png')} style={{width: 160, height: 75}} />
                        <Text style={styles.textHeader}>SILK</Text>
                    </View>
                </View>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1, justifyContent: 'space-between', marginTop: 10 }}>
                        <View style={{marginBottom: 10, marginLeft: 80, marginRight: 10}}>
                            <Text style={styles.text}>Masukkan ID atau Email</Text>
                            <TextInput
                            style={styles.field}
                            />
                        </View>
                        <View style={{marginBottom: 10, marginLeft: 80, marginRight: 10}}>
                            <Text style={styles.text}>Password</Text>
                            <TextInput
                            style={styles.field}
                            autoComplete='password'
                            secureTextEntry={true}
                            />
                        <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 73, marginTop: 5}}>
                            <Text style={styles.textForgot}>Lupa Password?</Text>
                        </TouchableOpacity>
                        </View>
                        <Card style={styles.btn}>
                            <TouchableOpacity onPress={navigateToHomeScreen}>
                                <Text style={styles.btnText}>Login</Text>
                            </TouchableOpacity>
                        </Card>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
            <View style={{flex: 0.2, alignItems: 'center'}}>
                   <Text style={styles.footer}>Version 0.0.1</Text>
            </View>
        </SafeAreaView>
    )
};

const styles=StyleSheet.create({

    text: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5
    },
    field: {
        padding: 10 , 
        borderWidth: 1, 
        borderColor: 'grey',
        width: 250,
        height: 50,
        borderRadius: 8
    },
    btn: {
        width: 150,
        height: 50,
        backgroundColor: 'darkblue',
        alignSelf: 'center',
        marginTop: 10,
        justifyContent: 'center'

    },

    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textHeader: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'black',
        letterSpacing: 5,
        marginTop: 10,
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    textForgot: {
        color: 'grey',
        fontSize: 15
    },
    footer: {
        color: 'grey',
        marginTop: 20,
        fontSize: 15,
        textDecorationLine: 'underline',
    }
})

export default LoginScreen;