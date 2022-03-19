import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import Icon from 'react-native-vector-icons/FontAwesome'

const db = DatabaseConnection.getConnection();

const UpdateUser = ({ navigation }) => {
  let [inputid_pegawai, setInputid_pegawai] = useState('');
  let [nama, setnama] = useState('');
  let [golongan, setgolongan] = useState('');
  let [jabatan, setjabatan] = useState('');
  let [nilai_kinerja, setnilai_kinerja] = useState('');

  let updateAllStates = (nama, golongan, jabatan, nilai_kinerja) => {
    setnama(nama);
    setgolongan(golongan);
    setjabatan(jabatan);
    setnilai_kinerja(nilai_kinerja);
  };

  let searchUser = () => {
    console.log(inputid_pegawai);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_pegawai where id_pegawai = ?',
        [inputid_pegawai],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.nama,
              res.golongan,
              res.jabatan,
              res.nilai_kinerja
            );
          } else {
            alert('Pengguna tidak ditemukan!!!');
            updateAllStates('', '', '');
          }
        }
      );
    });
  };

  let navigateToViewScreen = () => {
    navigation.navigate('ViewAll');
  };

  let updateUser = () => {
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

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_pegawai set nama=?, golongan=? , jabatan=?, nilai_kinerja=? where id_pegawai=?',
        [nama, golongan, jabatan, nilai_kinerja, inputid_pegawai],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sukses',
              'Data berhasil diperbarui',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Terjadi kesalahan dalam memperbarui data');
        }
      );
    });
  };

  let deleteUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_pegawai where id_pegawai=?',
        [inputid_pegawai],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sukses',
              'Pengguna berhasil dihapus !',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Masukkan ID pengguna yang valid !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={{marginTop: 30, marginLeft: 20}} onPress={navigateToViewScreen}>
                <Icon name="arrow-left" size={30} color='grey' />
          </TouchableOpacity>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytext text="Masukkan ID Pegawai" />
              <Mytextinput
                style={{ padding: 10 }}
                onChangeText={
                  (inputid_pegawai) => setInputid_pegawai(inputid_pegawai)
                }
              />
              <Mybutton
                title="Cari Pegawai"
                customClick={searchUser}
              />
              <View style={{marginBottom: 10, marginTop: 16}}>
                <Text style={styles.text}>Nama Pegawai</Text>
                <Mytextinput
                  value={nama}
                  style={{ padding: 10 }}
                  onChangeText={
                    (nama) => setnama(nama)
                  }
                />
              </View>
              <View style={{marginBottom: 10}}>
                <Text style={styles.text}>Golongan</Text>
                <Mytextinput
                  value={'' + golongan}
                  onChangeText={
                    (golongan) => setgolongan(golongan)
                  }
                  maxLength={5}
                  style={{ padding: 10 }}
                  keyboardType="numeric"
                />
              </View>
              <View style={{marginBottom: 10}}>
                <Text style={styles.text}>Jabatan</Text>
                <Mytextinput
                value={jabatan}
                onChangeText={
                  (jabatan) => setjabatan(jabatan)
                }
                maxLength={50}
                style={{ textAlignVertical: 'top', padding: 10 }}
                />
              </View>
              <View>
                <Text style={styles.text}>Nilai Kinerja</Text>
                <Mytextinput
                  value={'' + nilai_kinerja}
                  onChangeText={
                    (nilai_kinerja) => setnilai_kinerja(nilai_kinerja)
                  }
                  maxLength={5}
                  style={{ padding: 10 }}
                  keyboardType="numeric"
                />
              </View>
              <Mybutton
                title="Perbarui"
                customClick={updateUser}
              />
              <Mybutton
                title="Hapus"
                customClick={deleteUser}
              />
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

export default UpdateUser;