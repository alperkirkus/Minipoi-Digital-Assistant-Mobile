import React,{useEffect,useState} from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  MyBooks,
  Blog,
  Profile,
  AddBook,
  BookEx,
  Chart,
  Exercise,
  QrCode,
  ChangePassword

} from './src/screens'
import { ActivityIndicator,StyleSheet,View} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator()

export default function App() {


  const [rootUrl,setRouteUrl] = useState(null)


  const getToken = async (key) => {
    try {
      const value = await AsyncStorage.getItem("@token")
      if(value !== null) {  // eğer token varsa dashboarda


setRouteUrl("Dashboard")
        
      }
      else{  // eğer token yoksa  login ekranına
        setRouteUrl("StartScreen")
        
    
      }
    } catch(e) {
      console.log(e)
    }
  }
  
  useEffect(()=>{
    getToken()

  },[])

  
  return (
    <Provider theme={theme}>
      {
          rootUrl  === null 
          ? (
            <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
          </View>
          )
          :(
            <NavigationContainer>

            <Stack.Navigator
              initialRouteName={rootUrl}
              screenOptions={{
                headerShown: false,
              }}
            >
              
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
    
              <Stack.Screen name="StartScreen" component={StartScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="MyBooks" component={MyBooks} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Blog" component={Blog} />
              <Stack.Screen name="AddBook" component={AddBook} />
              <Stack.Screen name="BookExercises" component={BookEx} />
              <Stack.Screen name="Chart" component={Chart} />
              <Stack.Screen name="Exercise" component={Exercise} />
              <Stack.Screen name="QR" component={QrCode} />
              <Stack.Screen name="ChangePass" component={ChangePassword} />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
          )
      }
     
    </Provider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
