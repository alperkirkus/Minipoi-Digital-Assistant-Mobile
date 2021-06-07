import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'

import { Icon } from 'react-native-elements'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const imgRootUrl = 'https://minipoi-back.herokuapp.com/'

export default function Exercise({ route, navigation }) {
  const { exercise } = route.params

  const [info, setInfo] = useState(null)
  useEffect(() => {
    setInfo(exercise)
  }, [exercise])

  const checkProcess = async () => {
    if (info) {
      const token = await AsyncStorage.getItem('@token')
      if (token !== null) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        }

        axios
          .get('https://minipoi-back.herokuapp.com/api/user/me', config)
          .then((res) => {
            let id = res.data.user.id

            axios
              .put(
                'https://minipoi-back.herokuapp.com/api/user-stat/stat-update',
                {
                  amount: parseInt(info.contScore),
                  userId: id,
                  name: info.exerciseAttainmentName,
                }
              )
              .then(() => {
                Alert.alert(
                  'Success',
                  'Your answer is correct.You can check progress chart.'
                )
              })
              .catch((e) => {
                Alert.alert('Warning', e.response.data)
              })
          })
      }
    }
  }

  //check excercise failure process
  const decideBackProcess = () => {
    if (info) {
      if (info.exerciseOrderNo <= 5) {
        // 5
        Alert.alert('Info', 'Please try to solve the exercise again.')
      } else if (info.exerciseOrderNo === 6) {
        Alert.alert(
          'Info',
          'You should reinforce the attainment via solving exercise 1'
        )
      } else if (info.exerciseOrderNo === 7) {
        Alert.alert(
          'Info',
          'You should reinforce the attainment via solving exercise 2'
        )
      } else if (info.exerciseOrderNo === 8) {
        Alert.alert(
          'Info',
          'You should reinforce the attainment via solving exercise 3'
        )
      } else if (info.exerciseOrderNo === 9) {
        Alert.alert(
          'Info',
          'You should reinforce the attainment via solving exercise 4'
        )
      } else if (info.exerciseOrderNo === 10) {
        Alert.alert(
          'Info',
          'You should reinforce the attainment via solving exercise 5'
        )
      } else if (info.exerciseOrderNo === 11) {
        Alert.alert(
          'Info',
          'You should reinforce the attainment via solving exercise 10'
        )
      }
    }
  }

  return (
    <Background navigation={navigation}>
      <BackButton goBack={navigation.goBack} />
      {info && (
        <>
          <Header>{info.name}</Header>

          <Image
            style={styles.img}
            source={{ uri: imgRootUrl + info.exerciseImg }}
          />
          <Text style={styles.title}>Kazanım</Text>
          <View style={styles.line}></View>

          <View style={styles.blogContainer}>
            <Text style={styles.subTitle}>{info.exerciseAttainmentName}</Text>
            <View style={styles.sep}></View>
            <Text style={styles.des}>{info.exerciseAttainmentDes}</Text>
          </View>

          <Text style={styles.corTitle}>Is the answer correct ? </Text>

          <View style={styles.corContainer}>
            <TouchableOpacity onPress={() => decideBackProcess()}>
              <Icon
                name="times"
                type="font-awesome"
                size={100}
                color="#E81010"
                style={styles.wrong}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => checkProcess()}>
              <Icon
                name="check"
                type="font-awesome"
                size={100}
                color="#10E837"
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  img: {
    width: '100%',
    height: 300,
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
  },
  line: {
    marginTop: 5,
    marginBottom: 5,
    height: 2,
    width: '100%',
    backgroundColor: 'black',
  },
  subTitle: {
    textAlign: 'left',
    fontSize: 20,
    color: 'red',
  },
  corTitle: {
    fontSize: 17,
    color: 'blue',
  },
  corContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrong: {
    marginRight: 20,
    color: 'red',
  },
})
