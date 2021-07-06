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
      <Header>Hoşgeldiniz</Header>
      <Paragraph>Hesabınız varsa lütfen giriş yapın.</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Giriş Yap
      </Button>
      <Paragraph>Hesabınız yoksa hesap açmak için tıklayınız.</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('RegisterScreen')}
        color="#dc143c"
      >
        Kayıt Ol
      </Button>
    </Background>
  )
}
