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
import { ScrollView } from 'react-native-gesture-handler'

export default function Profile({ navigation }) {
  const [user, setUser] = useState(null)
  const [oldPass, setOldPass] = useState({ value: '', error: '' })
  const [newPass, setNewPass] = useState({ value: '', error: '' })
  const [reNewPass, setReNewPass] = useState({ value: '', error: '' })

  //report
  const [totalBookCount, setTotalBookCount] = useState(0)

  const [totalUserBookCount, setTotalUserBookCount] = useState(0)

  const [userAttData, setUserAttData] = useState([])
  useEffect(() => {
    getInfo()
  }, [])

  const getTotalBookCount = async () => {
    axios
      .get('https://mini-back-12.herokuapp.com/api/report/total-book-count')
      .then(({ data }) => {
        setTotalBookCount(data.count)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (user) {
      getTotalUserBookCount(user.id)
      getTotalBookCount()
      getUserAttProgress(user.id)
    }
  }, [user])

  const getTotalUserBookCount = async (id) => {
    axios
      .get(
        'https://mini-back-12.herokuapp.com/api/report/total-user-book-count/' +
          id
      )
      .then(({ data }) => {
        setTotalUserBookCount(data.count)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getUserAttProgress = async (id) => {
    axios
      .get('https://mini-back-12.herokuapp.com/api/user-stat/' + id)
      .then(({ data }) => {
        setUserAttData(data.ex)
      })
  }
  const getInfo = async () => {
    const token = await AsyncStorage.getItem('@token')

    if (token !== null) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }

      axios
        .get('https://mini-back-12.herokuapp.com/api/user/me', config)
        .then(({ data }) => {
          setUser(data.user)
        })
    }
  }
  // change password process
  const changePassword = async () => {
    // #TODO  CONTROL Validations

    if (newPass.value !== reNewPass.value) {
      Alert.alert('Error', 'No matching  new password and re new password')
    } else if (
      newPass.value === '' ||
      reNewPass.value === '' ||
      oldPass.value === ''
    ) {
      Alert.alert('Error', 'Please fill the all fields')
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
          Alert.alert('Başarılı', 'Şifreniz başarılı şekilde değiştirildi!', [
            {
              text: 'OK',
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Dashboard' }],
                })
              },
            },
          ])
        })
        .catch((err) => {
          Alert.alert('Error', 'Bir şeyler ters gitti!!')
        })
    }
  }

  return (
    <Background navigation={navigation}>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Kullanıcı Bilgileri</Header>

      <View>
        <Text style={styles.text}>Kullanıcı adı : {user?.username}</Text>
        <Text style={styles.text}>E-mail : {user?.email}</Text>
      </View>

      <View style={styles.line}></View>
      <Header>Durumum</Header>

      <View>
        <Text style={styles.text}>
          Profildeki Kitap Sayısı : {totalUserBookCount} / {totalBookCount}
        </Text>
        {userAttData?.map((item, i) => {
          return (
            <Text key={i + 'index'} style={styles.att}>
              {item.attainmentName} : {item.attainmentAmount} puan
            </Text>
          )
        })}
      </View>

      <Button
        style={styles.button}
        labelStyle={{ color: 'white' }}
        color="#581845"
        mode="contained"
        onPress={() => navigation.navigate('ChangePass')}
      >
        Şifre Değiştir
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
