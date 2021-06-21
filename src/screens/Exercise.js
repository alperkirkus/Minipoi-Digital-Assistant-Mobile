import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import { View, Text, StyleSheet, Image, TouchableOpacity ,Alert} from 'react-native'

import { Icon } from 'react-native-elements'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const imgRootUrl = "https://mini-back-12.herokuapp.com/"



export default function Exercise({ route, navigation }) {


  const { exercise } = route.params;

  const [info, setInfo] = useState(null)
  const [userId,setUserId]  =useState(null)
  useEffect(() => {
    setInfo(exercise)

  }, [exercise])

  useEffect(() => {
   
    getUserId()


  }, [])

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

  const checkProcess = async ()=>{

    if(info && userId)
    {
      axios.put("https://mini-back-12.herokuapp.com/api/user-stat/stat-update",{amount : parseInt(info.contScore),userId ,name :info.exerciseAttainmentName }).then(async ()=>{
  
        
         upsertUserAnswer(info.id,userId,true)
        Alert.alert(
          "Success",
          "Your answer is correct.You can check progress chart.",
        );

        navigation.navigate('MyBooks')
        

      }).catch((e)=>{
        Alert.alert(
          "Warning",
          e.response.data,
        );
      })
      
    }
  }


  //check excercise failure process 
  const decideBackProcess = async () =>{

    
    if(info && userId){

       upsertUserAnswer(info.id,userId,false)
      Alert.alert(
        "Info",
        "Please try to solve the exercise again.",
      );
      navigation.navigate('MyBooks')
    }

  }

  const upsertUserAnswer = async (exerciseId,userId,status)=>
  {
    return axios.post("https://mini-back-12.herokuapp.com/api/answers/upsert",{exerciseId, userId,status})
  }

  return (
    <Background navigation={navigation}>
      <BackButton goBack={navigation.goBack} />
      {
        info &&
        <>
          <Header>{info.name}</Header>

          <Image
            style={styles.img}
            source={{uri: imgRootUrl + info.exerciseImg}}
          />
          <Text style={styles.title}>Kazanım</Text>
          <View style={styles.line}></View>

          <View style={styles.blogContainer}>
            <Text style={styles.subTitle}>{info.exerciseAttainmentName}</Text>
            <View style={styles.sep}></View>
            <Text style={styles.des}>{info.exerciseAttainmentDes}</Text>
          </View>

       

            {
              info && info.status !== 1 &&
              <>
                 <Text style={styles.corTitle}>Is the answer correct ? </Text>
                 <View style={styles.corContainer}>
                <TouchableOpacity onPress={() => decideBackProcess()}>
                  <Icon
                    name='times'
                    type='font-awesome'
                    size={100}
                    color='#E81010'
                    style={styles.wrong}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => checkProcess()}>
                  <Icon
                    name='check'
                    type='font-awesome'
                    size={100}
                    color='#10E837'
                  />
                </TouchableOpacity>
                </View>
              </>
             

            }
        
        </>
      }

    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  img: {
  
    width: '100%', 
    height: 300
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

  }
  ,
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
    alignItems: 'center'
  },
  wrong: {
    marginRight: 20,
    color: 'red',
  }

});