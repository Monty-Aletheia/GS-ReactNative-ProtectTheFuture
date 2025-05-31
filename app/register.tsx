import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router';
import { createUserWithEmailAndPassword, getAuth } from '@react-native-firebase/auth';


function handleRegister(email: string, password: string) {
    createUserWithEmailAndPassword(getAuth(), email, password)
  .then(() => {
    router.navigate("/")
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
}



const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
        
  return (
    <View>
        <Text>Register</Text>
        <TextInput placeholder='email' onChangeText={setEmail}></TextInput>
        <TextInput placeholder='senha' onChangeText={setPassword}></TextInput>
        <TouchableOpacity onPress={() => {handleRegister(email, password)}}><Text>Registrar</Text></TouchableOpacity>
        <Link href="/">
            <Text>TENHO CONTA</Text>
        </Link>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({})