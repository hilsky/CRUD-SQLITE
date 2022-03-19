import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import MyImageButton from './components/MyImageButton';
import { DatabaseConnection } from '../database/database-connection';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-shadow-cards';

const db = DatabaseConnection.getConnection();

const EditScreen = ({ route, navigation }) => {
    let [P_Id, setID] = useState('');
    let [P_nama, setNama] = useState('');
    let [P_Golongan, setGolongan] = useState('');
    let [P_Jabatan, setJabatan] = useState('');
    let [P_nilai, setNilai] = useState('');
    let [inputid_pegawai, setInputid_pegawai] = useState('');

    let deleteUser = () => {
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM  table_pegawai where id_pegawai=?',
            [id_pegawai],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Sukses',
                  'Pengguna berhasil dihapus !',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('ViewAll'),
                    },
                  ],
                  { cancelable: false }
                );
              } else {
                alert('Masukkan ID yang Valid !');
              }
            }
          );
        });
      };


    useEffect(() => {
        setID(route.params.id_pegawai);
        setNama(route.params.nama);
        setGolongan(route.params.golongan.toString());
        setJabatan(route.params.jabatan);
        setNilai(route.params.nilai_kinerja.toString());
    }, []);

    let navigateToViewAll = () => {
        navigation.navigate('ViewAll')
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 20}}>
                <TouchableOpacity
                onPress={navigateToViewAll} style={{alignSelf: 'flex-start'}}>
                <Icon name='arrow-left' size={30} color='grey'/>
                </TouchableOpacity>
                <Text style={{marginLeft: 65, fontSize: 25, fontWeight: 'bold'}}>Detail Pegawai</Text>
            </View>
            <Card style={styles.card}>
                <View style={styles.cardMargin}>
                    <View pointerEvents='none' style={{marginBottom: 10}}>
                        <Text style={styles.cardHeader}>ID Pegawai</Text>
                        <TextInput
                        style={styles.TextInputStyle}
                        onChangeText={
                            (P_Golongan) => setGolongan(P_Golongan)
                        }
                        editable={false}
                        value={P_Golongan}/>
                    </View>
                    <View pointerEvents='none' style={{marginBottom: 10}}>
                        <Text style={styles.cardHeader}>Nama Pegawai</Text>
                        <TextInput
                        style={styles.TextInputStyle}
                        onChangeText={
                            (P_nama) => setNama(P_nama)
                        }
                        editable={false}
                        value={P_nama}/>
                    </View>
                    <View pointerEvents='none' style={{marginBottom: 10}}>
                        <Text style={styles.cardHeader}>Golongan</Text>
                        <TextInput
                        style={styles.TextInputStyle}
                        onChangeText={
                            (P_Golongan) => setGolongan(P_Golongan)
                        }
                        editable={false}
                        value={P_Golongan}/>
                    </View>
                    <View pointerEvents='none' style={{marginBottom: 10}}>
                        <Text style={styles.cardHeader}>Jabatan</Text>
                        <TextInput
                        style={styles.TextInputStyle}
                        onChangeText={
                            (P_Jabatan) => setJabatan(P_Jabatan)
                        }
                        editable={false}
                        value={P_Jabatan}/>
                    </View>
                    <View pointerEvents='none' style={{marginBottom: 10}}>
                        <Text style={styles.cardHeader}>Nilai Kinerja</Text>
                        <TextInput
                        style={styles.TextInputStyle}
                        onChangeText={
                            (P_nilai) => setNilai(P_nilai)
                        }
                        editable={false}
                        value={P_nilai}/>
                    </View>
                </View>
            </Card>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    TextInputStyle: {
        height: 45,
        width: '50%',
        borderWidth: 0,
        borderColor: '#00B8D4',
        borderRadius: 7,
        marginTop: 5,
        color: 'black',
        fontSize: 20
    },
    card: {
        marginVertical: 20,
        alignSelf: 'center',
        borderRadius: 8,
        backgroundColor: '#EEE'
    },
    cardMargin: {
        marginHorizontal: 15,
        marginTop:10,
    },
    cardHeader: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default EditScreen;