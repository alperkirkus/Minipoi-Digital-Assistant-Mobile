import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import { Icon } from 'react-native-elements'
import TextInput from '../components/TextInput'

import { StyleSheet, Modal, View,Pressable ,Text} from 'react-native'
export default function AddBook({ navigation }) {
  const [showModal, setShowmodal] = useState(false)


  const [code, setCode] = useState({ value: '', error: '' })

  const saveCode = () =>{
    //console.log("code saving process")
  }
  return (
    <Background navigation ={navigation}>
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
        console.log("qr-code processing....")
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
    width:"90%",
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'center'
  }


})
