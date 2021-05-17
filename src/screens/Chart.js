import React from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import { FlatList, View, Text, StyleSheet } from 'react-native'


import { BarChart, Grid } from 'react-native-svg-charts'
import { Text as TextSVG } from 'react-native-svg'



export default function BookEx({ navigation }) {


  
  const data = [ 50, 10, 40, 95, 85 ]  
  const dataLabel = [ "test 1","test 2","test 3","test 4","test 5",]

  const CUT_OFF = 50
  const Labels = ({  x, y, bandwidth, data }) => (
      data.map((value, index) => (
          <TextSVG
              key={ index }
              x={ value > CUT_OFF ? x(0) + 10 : x(value) + 10 }
              y={ y(index) + (bandwidth / 2) }
              fontSize={ 14 }
              fill={ value > CUT_OFF ? 'white' : 'black' }
              alignmentBaseline={ 'middle' }
          >
              {dataLabel[index] + " : " +value +" Puan"}
          </TextSVG>
      ))
  )



  const renderItem = ({ item }) => {

    return (
      <View style={styles.blogContainer}>
      <Text style ={styles.title}>{item.title}</Text>
      <View style={styles.sep}></View>
      <Text style = {styles.des}>{item.des}</Text>
      </View>
    );
  };


  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Dil Becerisi',
      des:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Eşleştirme',
      des:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Görsel Zeka',
      des:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

    },
  ];


  return (
    <Background navigation ={navigation}>
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
                    <Grid direction={Grid.Direction.VERTICAL}/>
                    <Labels/>
                </BarChart>
            </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
    marginBottom:7
  },
  title: {
    fontSize: 17,
    color:'red',

  },
  line: {
    marginTop: 5,
    marginBottom: 5,
    height: 1,
    width: '100%',
    backgroundColor: 'blue',

  }



})