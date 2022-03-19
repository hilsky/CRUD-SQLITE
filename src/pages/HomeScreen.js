import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import MyImageButton from './components/MyImageButton';
import { DatabaseConnection } from '../database/database-connection';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_pegawai'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_pegawai', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_pegawai(id_pegawai INTEGER PRIMARY KEY AUTOINCREMENT, nama VARCHAR(20), golongan INT(5), jabatan VARCHAR(50), nilai_kinerja INT(5))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{flex: 1}}>
          <View style={{flex: 0.4, flexDirection: 'column', marginTop: 20}}>
            <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 30}}>
              <TouchableOpacity style={{flexDirection: 'row', marginRight: 10, marginTop: 5}}>
                <Icon name='user' size={30} color='black' style={{marginTop: 5}}/>
                <Text style={styles.headerText}>Hai,</Text>
                <Text style={styles.headerText2}>Admin</Text>
              </TouchableOpacity>
              <Image source={require('./images/kemenkes.png')} style={styles.logo} />
            </View>
            <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
              <Image source={require('./images/icon1.png')} style={{width: 60, height: 60, marginLeft: 15, marginTop: 10}} />
              <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                alignSelf: 'center',
                marginLeft: 20
              }}>Home</Text>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 20}}>
            <MyImageButton
              title="Tambah Data"
              btnColor='#2992C4'
              btnIcon="user-plus"
              customClick={() => navigation.navigate('Register')}
            />
            <MyImageButton
              title="Lihat Semua Data"
              btnColor='#384F62'
              btnIcon="users"
              customClick={() => navigation.navigate('ViewAll')}
            />

            <MyImageButton
              title="Keluar"
              btnColor='#313131'
              btnIcon="sign-out"
              customClick={() => navigation.navigate('LoginScreen')}
            />
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    header: {
      flex: 1,
      flexDirection: 'row'
    },
    logo: {
      width: 140,
      height: 65,
      marginLeft: 85,
    },
    headerText : {
      fontWeight: '100',
      fontSize: 12,
      marginLeft: 10,
      marginTop: 15,
      letterSpacing: 1,
    },
    headerText2 : {
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      marginLeft: 2,
      letterSpacing: 1,
      fontSize: 12,
      marginTop: 15
    },
});

export default HomeScreen;