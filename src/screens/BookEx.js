import React from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import { Icon } from 'react-native-elements'
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import Button from '../components/Button'

export default function BookEx({ navigation }) {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Exercise')}>
          <View style={styles.bookContainer}>
            <Icon name="bookmark" type="font-awesome" color="#000" />
            <Text style={styles.title}>{item.title}</Text>
          </View>

          <View style={styles.sep}></View>
        </TouchableOpacity>
      </View>
    )
  }

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'DİL BECERİSİ',
    },
    {
      id: 'asd-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'BÜTÜNSEL & GÖRSEL ALGI',
    },
    {
      id: 'bd7acbasdasdea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'UZUN SÜRELİ DİKKAT ',
    },
  ]
  return (
    <Background navigation={navigation}>
      <BackButton goBack={navigation.goBack} />
      <Header>MİNİPOİ 2-3 YAŞ KİTABI</Header>
      <Text style={styles.title}>Book Exercises</Text>
      <View style={styles.line}></View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          directionalLockEnabled
        />
      </SafeAreaView>

      <Button
        style={styles.button}
        labelStyle={{ color: 'white' }}
        mode="contained"
        color="#C70039"
        onPress={() => navigation.navigate('Chart')}
      >
        Show Progress Chart
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  bookContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
    marginLeft: 10,
  },
  sep: {
    width: '100%',
    height: 1,
    marginVertical: 5,
    backgroundColor: 'grey',
  },
  line: {
    marginTop: 5,
    marginBottom: 5,
    height: 1,
    width: '100%',
    backgroundColor: 'blue',
  },
  button: {
    marginBottom: 30,
  },
})
