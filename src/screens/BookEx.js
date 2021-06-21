import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import { Icon } from 'react-native-elements'
import { FlatList, TouchableOpacity, View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import Button from '../components/Button'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function BookEx({ route, navigation }) {

  const { bookId } = route.params;



  const [data, setData] = useState([])
  const [bookExTitle, setBookExTitle] = useState("")

  const [userId,setUserId]  =useState(null)

  useEffect(() => {
   
    getUserId()


  }, [])
  useEffect(() => {
    if (bookId && userId)
      getEx()

  }, [bookId,userId])


  const getUserId = async() =>{

    const token = await AsyncStorage.getItem("@token")
    if(token !== null)
    {

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

       axios.get("https://mini-back-12.herokuapp.com/api/user/me",config).then((res)=>{

        setUserId(res.data.user.id)
      
      })
    }
  }


  const getEx = async () => {

    let reqBody = {
      userId,
      bookId,
    }
    axios.post("https://mini-back-12.herokuapp.com/api/book-ex/all-ex-with-check/",reqBody).then(({ data }) => {

      setData(data.bookex)  // get book ex

      if(data.bookex.length > 0 ){ // get book name

        setBookExTitle(data.bookex[0].books.bookName)
      }

    })


  }

  const renderItem = ({ item }) => {

    return (

      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Exercise',{ exercise: item })}>
          <View style={styles.bookContainer}>
         
        <Icon
          name={item.status === 0 ? 'square' : item.status === 1 ? 'check' :item.status === 2 ? 'times' : ''}
          type='font-awesome'
        
          color={item.status === 0 ? '#ccc' : item.status === 1 ? '#10E837' :item.status === 2 ? '#E81010' : ''}
          
        />

           
            <Text style={styles.att}>{item.exerciseAttainmentName}</Text>
            <Text style={styles.title}>{item.name}</Text>
          </View>

          <View style={styles.sep}></View>
        </TouchableOpacity>
      </View>

    );
  };


  return (
    <Background navigation={navigation}>
      <BackButton goBack={navigation.goBack} />
      <Header>{bookExTitle}</Header>
      <Text style={styles.title}>Book Exercises</Text>
      <View style={styles.line}></View>
      <SafeAreaView style={styles.container}>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id +"-book-ex"}
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
    display: "flex",
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: "blue",
    fontWeight: 'bold',
    fontSize: 12,
    marginVertical: 10,
    marginLeft: 10,
  },
  att: {
    color: "grey",
    fontWeight: 'bold',
    fontSize: 12,
    marginVertical: 10,
    marginLeft: 10,
  },
  sep: {
    width: "100%",
    height: 1,
    marginVertical: 5,
    backgroundColor: "grey"
  },
  line: {
    marginTop: 5,
    marginBottom: 5,
    height: 1,
    width: '100%',
    backgroundColor: 'blue',

  },
  button: {
    marginBottom: 30
  }



})