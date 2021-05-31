import React from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'

import { Icon } from 'react-native-elements'

export default function Exercise({ navigation }) {
  return (
    <Background navigation={navigation}>
      <BackButton goBack={navigation.goBack} />
      <Header>1. Etkinlik</Header>

      <Image style={styles.img} source={require('../assets/exercise.png')} />
      <Text style={styles.title}>Kazanım</Text>
      <View style={styles.line}></View>

      <View style={styles.blogContainer}>
        <Text style={styles.subTitle}>Dil Becerisi</Text>
        <View style={styles.sep}></View>
        <Text style={styles.des}>
          İçinde bulunulan gelişim basamağına uygun olarak çıkarılan sesleri ve
          üretilen sözel ifadelerin gelişimini ifade etmektedir. Sözel akıcılık
          ve kelimeleri kullanma becerisini de kapsamaktadır.
        </Text>
      </View>

      <Text style={styles.corTitle}>Is the answer correct ? </Text>

      <View style={styles.corContainer}>
        <TouchableOpacity onPress={() => console.log('asdsadsa')}>
          <Icon
            name="times"
            type="font-awesome"
            size={100}
            color="#E81010"
            style={styles.wrong}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('asdsadsa')}>
          <Icon name="check" type="font-awesome" size={100} color="#10E837" />
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  img: {
    width: '100%',
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
