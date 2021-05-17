import React from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import { Icon } from 'react-native-elements'
import { FlatList,View,Text,StyleSheet,SafeAreaView,TouchableOpacity,StatusBar} from 'react-native'

export default function MyBooks({ navigation }) {

  const renderItem = ({ item }) => {

    return (
    
      <View style={styles.container}>
          <TouchableOpacity onPress={ () =>navigation.navigate('BookExercises')}>
        <View style={styles.bookContainer}>

        <Icon
        name='book'
        type='font-awesome'
        color='#000'
      />


      <Text style ={styles.title}>{item.title}</Text>
        </View>
        
      <View style = {styles.sep}></View>
      </TouchableOpacity>
      </View>

    );
  };


  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'MİNİPOİ 2-3 YAŞ KİTABI',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'MİNİPOİ 2-3 YAŞ KİTABI',

    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'MİNİPOİ 2-3 YAŞ KİTABI',

    },
  ];
  return (
    <Background  navigation ={navigation}>
      <BackButton goBack={navigation.goBack} />
      <Header>My Books</Header>
      <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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


})