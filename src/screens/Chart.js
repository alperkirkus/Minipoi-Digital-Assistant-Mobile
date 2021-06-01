import React from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import { FlatList, View, Text, StyleSheet } from 'react-native'

import { BarChart, Grid } from 'react-native-svg-charts'
import { Text as TextSVG } from 'react-native-svg'

export default function BookEx({ navigation }) {
  const data = [50, 10, 40, 95, 85]
  const dataLabel = ['test 1', 'test 2', 'test 3', 'test 4', 'test 5']

  const CUT_OFF = 50
  const Labels = ({ x, y, bandwidth, data }) =>
    data.map((value, index) => (
      <TextSVG
        key={index}
        x={value > CUT_OFF ? x(0) + 10 : x(value) + 10}
        y={y(index) + bandwidth / 2}
        fontSize={14}
        fill={value > CUT_OFF ? 'white' : 'black'}
        alignmentBaseline={'middle'}
      >
        {dataLabel[index] + ' : ' + value + ' Puan'}
      </TextSVG>
    ))

  const renderItem = ({ item }) => {
    return (
      <View style={styles.blogContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.sep}></View>
        <Text style={styles.des}>{item.des}</Text>
      </View>
    )
  }

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Dil Becerisi',
      des:
        'İçinde bulunulan gelişim basamağına uygun olarak çıkarılan sesleri ve üretilen sözel ifadelerin gelişimini ifade etmektedir. Sözel akıcılık ve kelimeleri kullanma becerisini de kapsamaktadır.',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Eşleştirme',
      des:
        'Nesne ve kavramların benzeyen ortak özelliklerine göre aynı kategoriye alma becerisini ifade etmektedir.',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Bütünsel & Görsel Algı',
      des:
        'Görsel işlemleme, akıl yürütme, uyaranın bütün olarak değerlendirilmesini ifade etmektedir.',
    },
    {
      id: '8694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Ayırt Etme & Organizasyon',
      des:
        'Görsel uyaranların birbirinden farklılaştıkları özellikleri algılamayı ve bunlara göre bir yapı oluşturmayı ifade etmektedir.',
    },
    {
      id: '694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Parça Bütün İlişkisi',
      des:
        'Soyut akıl yürütme, görsel uyaranın daha küçük bir parçası ve bütünü arasındaki ilişkiyi kavrama becerisini ifade etmektedir.',
    },
  ]

  return (
    <Background navigation={navigation}>
      <BackButton goBack={navigation.goBack} />
      <Header>MİNİPOİ 2-3 YAŞ KİTABI</Header>
      <Text style={styles.title}>Progress Chart</Text>
      <View style={styles.line}></View>

      <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
        <BarChart
          style={{ flex: 1, marginLeft: 8 }}
          data={data}
          horizontal={true}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
        >
          <Grid direction={Grid.Direction.VERTICAL} />
          <Labels />
        </BarChart>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
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
    backgroundColor: 'red',
    marginBottom: 7,
  },
  title: {
    fontSize: 17,
    color: 'red',
  },
  line: {
    marginTop: 5,
    marginBottom: 5,
    height: 1,
    width: '100%',
    backgroundColor: 'blue',
  },
})
