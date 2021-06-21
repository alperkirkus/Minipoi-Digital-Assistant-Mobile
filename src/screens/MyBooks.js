import React,{useState,useEffect} from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import { Icon } from 'react-native-elements'
import { FlatList,View,Text,StyleSheet,SafeAreaView,TouchableOpacity,StatusBar} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default function MyBooks({route, navigation }) {


  
  const renderItem = ({ item }) => {


    
    return (
    
      <View style={styles.container}>
          <TouchableOpacity onPress={ () =>navigation.navigate('BookExercises',{ bookId: item.books.id })}>
        <View style={styles.bookContainer}>
        <Text style ={styles.percentage}>{item.percentage} % </Text>
      <Text style ={styles.title}>{item.books.bookName}</Text>
        </View>
        
      <View style = {styles.sep}></View>
      </TouchableOpacity>
      </View>

    );
  };


  const [data,setData]  =useState([])

  useEffect(() => {

   
    getInfo()

     


  }, [route])



  const getInfo =  async() =>{
    const token = await AsyncStorage.getItem("@token")
    if(token !== null)
    {

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

       axios.get("https://mini-back-12.herokuapp.com/api/user/me",config).then((res)=>{

       let id = res.data.user.id

        axios.get("https://mini-back-12.herokuapp.com/api/book/" + id).then(async({data})=>{


        for(let i = 0 ; i< data.ubook.length ; i++)
        {
          
          await axios.post("https://mini-back-12.herokuapp.com/api/book-ex/all-ex-with-check/",{userId:id,bookId:  data.ubook[i].bookId}).then((response) => {


          const exs = response.data.bookex

          let correctCount = 0 ;
          exs.forEach(element => {
            
            if(element.status===1)
            {
              correctCount++
            }
          });

        
          data.ubook[i].percentage = (((correctCount / exs.length))*100).toFixed(2)

           

          })

        }


     
          setData(data.ubook)
         
        })
      
      })
    }
   
  }

  return (
    <Background  navigation ={navigation}>
      <BackButton goBack={navigation.goBack} />
      <Header>My Books</Header>
      <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id +"-book"}
      />

      </SafeAreaView>
    
    </Background>
  )
}

const styles = StyleSheet.create({
  bookContainer:{
    flex:1,
    display:"flex",
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    alignItems:'center',
  },
  title:{
    color:"blue",
    fontWeight:'bold',
    fontSize:18,
    marginVertical:10,
    marginLeft:10,
  },
  sep:{
    width :"100%",
    height:1,
    marginVertical:5,
    backgroundColor:"grey"
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  percentage:{
    fontSize:15,
    fontWeight:'bold',
    color : '#10E837'
  }


})