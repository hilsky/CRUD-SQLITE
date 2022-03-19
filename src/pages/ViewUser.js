import React, { useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewUser = () => {
  let [inputid_pegawai, setInputid_pegawai] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(inputid_pegawai);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_pegawai where id_pegawai = ?',
        [inputid_pegawai],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert('Pengguna tidak ditemukan !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
                <Mytext text="Filter pengguna" />
                <Mytextinput
                  placeholder="Masukkan kode pengguna"
                  onChangeText={
                    (inputid_pegawai) => setInputid_pegawai(inputid_pegawai)
                  }
                  style={{ padding: 10 }}
                />
                <Mybutton title="Cari pengguna" customClick={searchUser} />
                <View
                  style={{
                    marginLeft: 35,
                    marginRight: 35,
                    marginTop: 10
                  }}>
                  <Text>Kode : {userData.id_pegawai}</Text>
                  <Text>Nama : {userData.nama}</Text>
                  <Text>Golongan : {userData.golongan}</Text>
                  <Text>Jabatan : {userData.jabatan}</Text>
                  <Text>Nilai Kinerja : {userData.nilai_kinerja}</Text>
                </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;