import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

import { View, StyleSheet } from 'react-native'

export default function Dashboard({ navigation }) {
  return (
    <Background navigation ={navigation}>
      <Logo />
      <Header>Home Page</Header>
      <Paragraph>Welcome Minipoi</Paragraph>

      {/* <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button> */}

      <View style={styles.row}>
        <Button
          style={styles.button}
          labelStyle={{ color: 'white' }}
          color="#581845"
          mode="contained"
          onPress={() => navigation.navigate('Profile')}


        >
          Profile
        </Button>
        <Button
          style={styles.button}
          labelStyle={{ color: 'white' }}
          color="#900c3f"
          mode="contained"
          onPress={() => navigation.navigate('AddBook')}

        >
          Add New Book
        </Button>

        <Button
          style={styles.button}
          labelStyle={{ color: 'white' }}
          mode="contained"
          color="#C70039"
          onPress={() => navigation.navigate('MyBooks')}

        >
          My Books
        </Button>
        <Button
          style={styles.button}
          labelStyle={{ color: 'white' }}
          mode="contained"
          color="#FFC300"
          onPress={() => navigation.navigate('Blog')}

        >
          Blog
        </Button>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
})
