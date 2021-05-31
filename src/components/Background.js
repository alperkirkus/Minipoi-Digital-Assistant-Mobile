import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView,View,ScrollView } from 'react-native'
import { theme } from '../core/theme'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Background({ children,navigation }) {

  const logOut =  async()=>{
    const value = await AsyncStorage.removeItem("@token")
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })
  }
  return (
  <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
    
    <TouchableOpacity onPress = {logOut}>

      {
        navigation &&
        <View style = {styles.logoutContainer}>
          <Icon
            style={styles.logout}
              name='sign-out'
              type='font-awesome'
              size={25}
              color='#000'
            />
          </View>

      }
    
 
    </TouchableOpacity>
     
      <KeyboardAvoidingView style={styles.container} behavior="padding">
  

        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout:{

    marginTop:100,
    marginLeft:100,
  },
  logoutContainer:{
    position:'relative'
  }
})
