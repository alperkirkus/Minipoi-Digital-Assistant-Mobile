import React, { useState,useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { Text, View, StyleSheet ,Alert} from 'react-native'


import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Profile({ navigation }) {

  const [user,setUser]  =useState(null);
  const [oldPass, setOldPass] = useState({ value: '', error: '' })
  const [newPass, setNewPass] = useState({ value: '', error: '' })
  const [reNewPass, setReNewPass] = useState({ value: '', error: '' })




  useEffect(() => {

    getInfo()
  }, [])

  const getInfo =  async() =>{
    const token = await AsyncStorage.getItem("@token")
    console.log(token,"wwwwww")
    if(token !== null)
    {

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      axios.get("https://mini-back-12.herokuapp.com/api/user/me",config).then(({data})=>{
  
      setUser(data.user)
      })
    }
   
  }
  // change password process
  const changePassword = async () => {

    // #TODO  CONTROL Validations

  

    if(newPass.value !== reNewPass.value)
    {

      Alert.alert(
        "Error",
        "No matching  new password and re new password"
      );
    }
    else if(newPass.value  === "" || reNewPass.value  === "" || oldPass.value === "")
    {
      Alert.alert(
        "Error",
        "Please fill the all fields"
      );
    }
    else{
      const token = await AsyncStorage.getItem("@token")
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      axios.put("https://mini-back-12.herokuapp.com/api/user/change-password",{
        oldPass : oldPass.value,
        newPass : newPass.value,
      },config).then(async (res)=>{
        
       // await AsyncStorage.setItem("@token",res.data.token)

       setNewPass({ value: '', error: '' })
       setReNewPass({ value: '', error: '' })
       setOldPass({ value: '', error: '' })
        Alert.alert(
          "Success",
          "Your password has been changed successfuly",
          [
            { text: "OK", onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
              })
          
            } }
          ]
        );
      

      }).catch((err)=>{


      Alert.alert(
        "Error",
        "Something went wrong",
      );

      })

    }

    
  }

  return (
    <Background  navigation ={navigation}>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Profile</Header>

      <View>
        <Text style={styles.text}>Username : {user?.username}</Text>
        <Text style={styles.text}>E-mail : {user?.email}</Text>
      </View>

      <Text style = {styles.title}>Change Password</Text>

      <View style = {styles.line}></View>

      <TextInput
        label="Old Password"
        returnKeyType="next"
        value={oldPass.value}
        onChangeText={(text) => setOldPass({ value: text, error: '' })}
        error={!!oldPass.error}
        errorText={oldPass.error}
        autoCapitalize="none"
      />

      <TextInput
        label="New Password"
        returnKeyType="next"
        value={newPass.value}
        onChangeText={(text) => setNewPass({ value: text, error: '' })}
        error={!!newPass.error}
        errorText={newPass.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Re New Password"
        returnKeyType="next"
        value={reNewPass.value}
        onChangeText={(text) => setReNewPass({ value: text, error: '' })}
        error={!!reNewPass.error}
        errorText={reNewPass.error}
        autoCapitalize="none"
      />


      <Button
        style={styles.button}
        labelStyle={{ color: 'white' }}
        color="#581845"
        mode="contained"
        onPress={() =>
          changePassword()
        }
      >
        Save
        </Button>


    </Background>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  title:{
    color : "blue",
    fontSize:20,
    marginTop:10,

  },
  line:{
    marginTop:5,
    marginBottom:5,
    height:1,
    width:'100%',
    backgroundColor:'blue',
    
  }

})

