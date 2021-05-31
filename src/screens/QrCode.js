import React, { useState,useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import Background from '../components/Background'
import { BarCodeScanner } from 'expo-barcode-scanner';
import BackButton from '../components/BackButton'
import { StyleSheet, View, Text,Alert } from 'react-native'
export default function QrCode({ navigation }) {



  //qr code states
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  //get permisson
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  //scanner function
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    saveCode(data)
   // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  

  const saveCode = async (code) => {
    const token = await AsyncStorage.getItem("@token")
    if (token !== null) {

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

     axios.get("https://mini-back-12.herokuapp.com/api/user/me", config).then(({ data }) => {

        let postData = {
          code: code,
          userId: data.user.id
        }
        axios.post("https://mini-back-12.herokuapp.com/api/code/add-book", postData).then(({ data }) => {
  
          if (data.msg === "success") {
  
            Alert.alert(
              "Success",
              "Book has been added",
              [
                { text: "OK", onPress: () => {
  
                  navigation.goBack()
                } }
              ]
            );
          }
          else {
                         
            Alert.alert(
              "Warning",
              "Code has already taken",
              [
                { text: "OK", onPress: () => {
  
                  navigation.goBack()
                } }
              ]
            );
          }
        })






      })
    }

  }


  return (
    <View style={styles.background}>
        <BackButton goBack={navigation.goBack} />
     <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      </View>
   


  )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
     
    },
  })



