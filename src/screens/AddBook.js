import React, { useState,useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import { Icon } from 'react-native-elements'
import TextInput from '../components/TextInput'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

import { BarCodeScanner } from 'expo-barcode-scanner';

import { StyleSheet, Modal, View, Pressable, Text } from 'react-native'
export default function AddBook({ navigation }) {
  const [showModal, setShowmodal] = useState(false)

  const [user, setUser] = useState(null);
  const [code, setCode] = useState({ value: '', error: '' })

  const [msg, setMsg] = useState("")





  const saveCode = () => {
    getInfo().then(() => {
      let postData = {
        code: code.value,
        userId: user.id
      }
      axios.post("https://mini-back-12.herokuapp.com/api/code/add-book", postData).then(({ data }) => {

        if (data.msg === "success") {
          setMsg("Kitabınız aktif edilmiştir")
        }
        else {
          setMsg("Bu kod daha önce kullanılmıştır.")
        }
        setCode({ value: '', error: '' })
      })

    })

  }

  const getInfo = async () => {
    const token = await AsyncStorage.getItem("@token")
    if (token !== null) {

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.get("https://mini-back-12.herokuapp.com/api/user/me", config).then(({ data }) => {

        setUser(data.user)
      })
    }

  }

  const cancelModal = ()=>{

    setShowmodal(false)
    setMsg('')
  }
  return (
    <Background navigation={navigation}>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Add Book page</Header>


      <Icon
        name='qrcode'
        type='font-awesome'
        size={100}
        color='#000'
      />

      <Button
        style={styles.button}
        labelStyle={{ color: 'white' }}
        color="#33C7FF"
        mode="contained"
        onPress={() =>
         navigation.navigate('QR')
        }
      >
        Scan QR Code
        </Button>

      <Icon
        name='edit'
        type='font-awesome'
        color='#000'
        size={100}
        style={styles.icon}
      />

      <Button
        style={styles.button}
        labelStyle={{ color: 'white' }}
        color="#861164"
        mode="contained"
        onPress={() => setShowmodal(!showModal)}
      >
        Enter the Code
        </Button>



      {/* Activate modal*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowmodal(!showModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>


            {
              /*
 
 
              <TextInput
               label="Code"
               returnKeyType="done"
               value={code.value}
               onChangeText={(text) => setCode({ value: text, error: '' })}
               error={!!code.error}
               errorText={code.error}
               autoCapitalize="none"
             />
             <View style={styles.buttonContainer}>
 
               <Pressable
                 onPress={saveCode}
               >
                 <Text style={styles.textStyle}>Save</Text>
               </Pressable>
 
               <Pressable
                 onPress={() => setShowmodal(!showModal)}
               >
                 <Text style={styles.textStyle}>Cancel</Text>
               </Pressable>
             </View>
 
               */
            }

              <Text style={styles.msgText}>{msg}</Text>

            <TextInput
              label="Code"
              returnKeyType="done"
              value={code.value}
              onChangeText={(text) => setCode({ value: text, error: '' })}
              error={!!code.error}
              errorText={code.error}
              autoCapitalize="none"
            />



              <Pressable
              style={[styles.btn, styles.buttonSave]}
              onPress={saveCode}
              
            >
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>



            <Pressable
              style={[styles.btn, styles.buttonClose]}
              onPress={cancelModal}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>

          </View>
        </View>
      </Modal>

    </Background>
  )
}


const styles = StyleSheet.create({
  centeredView: {

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  icon: {
    marginTop: 10,
  },

  btn: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    color:"#fff",
  },
  buttonSave: {
    backgroundColor: "#581845",
  },
  buttonClose: {
    backgroundColor: "#900c3f",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  msgText:{
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  }



})
