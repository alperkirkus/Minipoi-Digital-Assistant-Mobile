import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { Text, View, StyleSheet, Alert } from 'react-native'

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ChangePassword({ navigation }) {
  const [oldPass, setOldPass] = useState({ value: '', error: '' })
  const [newPass, setNewPass] = useState({ value: '', error: '' })
  const [reNewPass, setReNewPass] = useState({ value: '', error: '' })

  // change password process
  const changePassword = async () => {
    // #TODO  CONTROL Validations

    if (newPass.value !== reNewPass.value) {
      Alert.alert('Hata', 'Yeni şifre ve yeni şifre tekrar eşleşmiyor')
    } else if (
      newPass.value === '' ||
      reNewPass.value === '' ||
      oldPass.value === ''
    ) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz!')
    } else {
      const token = await AsyncStorage.getItem('@token')
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      axios
        .put(
          'https://mini-back-12.herokuapp.com/api/user/change-password',
          {
            oldPass: oldPass.value,
            newPass: newPass.value,
          },
          config
        )
        .then(async (res) => {
          // await AsyncStorage.setItem("@token",res.data.token)

          setNewPass({ value: '', error: '' })
          setReNewPass({ value: '', error: '' })
          setOldPass({ value: '', error: '' })
          Alert.alert(
            'Success',
            'Şifreniz başarılı bir şekilde değiştirilmiştir',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Dashboard' }],
                  })
                },
              },
            ]
          )
        })
        .catch((err) => {
          Alert.alert('Hata', 'Bir şeyler ters gitti!!')
        })
    }
  }

  return (
    <Background navigation={navigation}>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Şifre Değiştir</Header>

      <View style={styles.line}></View>

      <TextInput
        label="Eski Şifre"
        returnKeyType="next"
        value={oldPass.value}
        onChangeText={(text) => setOldPass({ value: text, error: '' })}
        error={!!oldPass.error}
        errorText={oldPass.error}
        autoCapitalize="none"
      />

      <TextInput
        label="Yeni Şifre"
        returnKeyType="next"
        value={newPass.value}
        onChangeText={(text) => setNewPass({ value: text, error: '' })}
        error={!!newPass.error}
        errorText={newPass.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Yeni Şifre Tekrar"
        returnKeyType="next"
        value={reNewPass.value}
        onChangeText={(text) => setReNewPass({ value: text, error: '' })}
        error={!!reNewPass.error}
        errorText={reNewPass.error}
        autoCapitalize="none"
      />

      <Button
        style={styles.button}
        labelStyle={{ color: 'white' }}
        color="#581845"
        mode="contained"
        onPress={() => changePassword()}
      >
        Kaydet
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  att: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
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
  title: {
    color: 'blue',
    fontSize: 20,
    marginTop: 10,
  },
  line: {
    marginTop: 5,
    marginBottom: 5,
    height: 1,
    width: '100%',
    backgroundColor: 'blue',
  },
})
