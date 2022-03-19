import React, { useState, useEffect } from 'react';
import { Animated,FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DatabaseConnection } from '../database/database-connection';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-shadow-cards';

const db = DatabaseConnection.getConnection();

const ViewAllUser = ({navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);


  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_pegawai',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let navigateToEditScreen = (id, nama_pegawai, golongan_pegawai, jabatan_pegawai, nilaiKinerja_pegawai) => {
    navigation.navigate('EditScreen',{
      id_pegawai: id,
      nama: nama_pegawai,
      golongan: golongan_pegawai,
      jabatan: jabatan_pegawai,
      nilai_kinerja: nilaiKinerja_pegawai
    });
  };

  let listItemView = (item) => {
    return (
      <Card style={{marginBottom: 5}}>
        <TouchableOpacity
          onPress={() => navigateToEditScreen(item.id_pegawai,item.nama,item.golongan,item.jabatan,item.nilai_kinerja)}
          key={item.id_pegawai}
          style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
          <Text style={styles.textheader}>Nama</Text>
          <Text style={styles.textbottom}>{item.nama}</Text>

          <Text style={styles.textheader}>Golongan</Text>
          <Text style={styles.textbottom}>{item.golongan}</Text>

          <Text style={styles.textheader}>Jabatan</Text>
          <Text style={styles.textbottom}>{item.jabatan}</Text>

          <Text style={styles.textheader}>Nilai Kinerja</Text>
          <Text style={styles.textbottom}>{item.nilai_kinerja}</Text>


        </TouchableOpacity>
      </Card>
    );
  };

  let navigateToSearch = () => {
    navigation.navigate('Update')
  }
  let navigateToHome = () => {
    navigation.navigate('HomeScreen')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 , marginTop: 10}}>
          <View style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 15}}>
            <TouchableOpacity
            onPress={navigateToHome} style={{alignSelf: 'flex-start'}}>
              <Icon name='arrow-left' size={30} color='grey'/>
            </TouchableOpacity>
            <Text style={{marginLeft: 70, marginRight: 70, fontSize: 25, fontWeight: 'bold'}}>Daftar Pegawai</Text>
            <TouchableOpacity
            onPress={navigateToSearch} style={{alignSelf: 'flex-end'}}>
              <Icon name='search' size={30} color='grey'/>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: '#111',
    fontSize: 12,
    fontWeight: '700',

  },
  textbottom: {
    color: '#111',
    fontSize: 18,
  },
});

export default ViewAllUser;