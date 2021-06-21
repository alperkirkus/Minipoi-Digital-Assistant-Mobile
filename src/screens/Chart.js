import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import { FlatList, View, Text, StyleSheet } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Text as TextSVG } from 'react-native-svg'



export default function BookEx({ navigation }) {
  const [chartInfo, setChartInfo] = useState([])
  const [data, setData] = useState([])
  const [dataLabel, setdataLabel] = useState([])

  useEffect(() => {
    getInfo()

  }, [])

  const getInfo = async () => {
    const token = await AsyncStorage.getItem("@token")
    if (token !== null) {

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      axios.get("https://mini-back-12.herokuapp.com/api/user/me", config).then((res) => {

        let id = res.data.user.id

        axios.get("https://mini-back-12.herokuapp.com/api/user-stat/" + id).then(({ data }) => {

          setChartInfo(data.ex)

          setChartData(data.ex)

        })

      })
    }

  }

  const setChartData = (raw) => {

    const dataTemp = []
    const dataLabelTemp = []

    raw.forEach(el => {

      dataTemp.push(el.attainmentAmount)
      dataLabelTemp.push(el.attainmentName)
    });

    setData(dataTemp)
    setdataLabel(dataLabelTemp)
  }



  const CUT_OFF = 50
  const Labels = ({ x, y, bandwidth, data }) => (
    data.map((value, index) => (
      <TextSVG
        key={index}
        x={ x(0) + 10 }
        y={y(index) + (bandwidth / 2)}
        fontSize={10}
        fill={'black'}
        alignmentBaseline={'middle'}
      >
        {dataLabel[index] + " : " + value + " Puan"}
      </TextSVG>
    ))
  )



  const renderItem = ({ item }) => {

    return (
      <View style={styles.blogContainer}>
        <Text style={styles.title}>{item.attainmentName}</Text>
        <View style={styles.sep}></View>
        <Text style={styles.des}>{item.attainmentDescription}</Text>
      </View>
    );
  };




  return (
    <Background navigation={navigation}>
      <BackButton goBack={navigation.goBack} />
      <Text style={styles.title}>Progress Chart</Text>
      <View style={styles.line}></View>


      <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
        {
          data.length > 0 &&
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

        }

      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={chartInfo}
        renderItem={renderItem}
        keyExtractor={item => item.id + "-stat"}
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
    display: "flex",
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: "blue",
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
    marginLeft: 10,
  },
  sep: {
    width: "100%",
    height: 1,
    marginVertical: 5,
    backgroundColor: "red",
    marginBottom: 7
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

  }



})