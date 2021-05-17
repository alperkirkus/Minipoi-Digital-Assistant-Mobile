import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Welcome</Header>
      <Paragraph>
       If you have an account please log in.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Paragraph>
        If you don't have an account click here for start the journey.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('RegisterScreen')}
        color = "#dc143c"
      >
        Sign Up
      </Button>
    </Background>
  )
}
