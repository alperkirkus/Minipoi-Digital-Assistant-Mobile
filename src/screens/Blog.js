import React,{useEffect,useState} from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import { FlatList,View,Text,StyleSheet,ActivityIndicator} from 'react-native'

import axios from 'axios'

export default function Blog({ navigation }) {
  const renderItem = ({ item }) => {

    return (
      <View style={styles.blogContainer}>
      <Text style ={styles.title}>{item.title}</Text>
      <Text style = {styles.des}>{item.des}</Text>
      <View style = {styles.sep}></View>
      </View>
    );
  };


  
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(() => {

    axios.get("https://mini-back-12.herokuapp.com/api/blog").then(({data})=>{

    setData(data.blogs)
    setLoading(false)
    })

  }, [])

  return (
    <Background navigation ={navigation}>

      <BackButton goBack={navigation.goBack} />
      <Header>Blog</Header>
      {loading &&
        <ActivityIndicator />
      }
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id + "-blog"}
      />
    </Background>
  )
}


const styles = StyleSheet.create({
  blogContainer:{
    flex:1,
    display:"flex",
    flexDirection:"column"
  },
  title:{
    color:"blue",
    fontWeight:'bold',
    fontSize:18,
    marginVertical:10,
  },
  des:{
    color:"black",
    fontSize:14,
  },
  sep:{
    width :"100%",
    height:1,
    marginVertical:5,
    backgroundColor:"grey"
  }

})
