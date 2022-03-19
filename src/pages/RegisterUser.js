import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import Icon from 'react-native-vector-icons/FontAwesome';


const db = DatabaseConnection.getConnection();


const RegisterUser = ({ navigation }) => {
  let [nama, setnama] = useState('');
  let [golongan, setgolongan] = useState('');
  let [jabatan, setjabatan] = useState('');
  let [nilai_kinerja, setnilai_kinerja] = useState('');

  let register_user = () => {
    console.log(nama, golongan, jabatan, nilai_kinerja);

    if (!nama) {
      alert('Masukkan nama');
      return;
    }
    if (!golongan) {
      alert('Masukkan golongan');
      return;
    }
    if (!jabatan) {
      alert('Masukkan jabatan');
      return;
    }
    if (!nilai_kinerja) {
      alert('Masukkan nilai kinerja');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_pegawai (nama, golongan, jabatan, nilai_kinerja) VALUES (?,?,?,?)',
        [nama, golongan, jabatan, nilai_kinerja],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sukses',
              'Data Berhasil Ditambahkan',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Terdapat Kesalahan dalam Pengisian Data');
        }
      );
    });
  };

  let navigateToHomeScreen = () => {
    navigation.navigate('HomeScreen')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
              <TouchableOpacity style={{marginTop: 30, marginLeft: 20}} onPress={navigateToHomeScreen}>
                <Icon name="arrow-left" size={30} color='grey' />
              </TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10, marginBottom: 20}}>
              <Image source={require('./images/icon1.png')} style={{width: 60, height: 60, marginLeft: 15, marginTop: 10}} />
              <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                alignSelf: 'center',
                marginLeft: 20,
                letterSpacing: 2
              }}>TAMBAH DATA</Text>
            </View>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <View style={{marginBottom: 15}}>
                <Text style={styles.text}>Nama Pegawai</Text>
                <Mytextinput
                  onChangeText={
                    (nama) => setnama(nama)
                  }
                  maxLength={50}
                  style={{ padding: 10 }}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text style={styles.text}>Golongan</Text>
                <Mytextinput
                  onChangeText={
                    (golongan) => setgolongan(golongan)
                  }
                  maxLength={1}
                  keyboardType="numeric"
                  style={{ padding: 10 }}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text style={styles.text}>Jabatan</Text>
                <Mytextinput
                  onChangeText={
                    (jabatan) => setjabatan(jabatan)
                  }
                  maxLength={15}
                  style={{ textAlignVertical: 'top', padding: 10 }}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text style={styles.text}>Nilai Kinerja</Text>
                <Mytextinput
                  onChangeText={
                    (nilai_kinerja) => setnilai_kinerja(nilai_kinerja)
                  }
                  maxLength={5}
                  keyboardType="numeric"
                  style={{ padding: 10 }}
                />
              </View>
              <Mybutton title="Simpan" customClick={register_user} />
              <Mybutton title="Batal" customClick={navigateToHomeScreen} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 16,
    marginLeft: 35,
    marginRight: 35,
  },
});

export default RegisterUser;