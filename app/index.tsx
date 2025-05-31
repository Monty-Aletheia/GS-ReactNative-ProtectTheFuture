import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, FirebaseAuthTypes } from '@react-native-firebase/auth'

function handleLogin(email: string, password: string) {
    signInWithEmailAndPassword(getAuth(), email, password)
  .then(() => {
    router.navigate("/page")
    console.log('User account signed in!');
  })
  .catch(error => {
    console.error(error);
  });
}



const Login = () => {

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {


    const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        router.navigate("/page")
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);


  return (
    <View>
      <Text className="text-2xl font-bold">Login</Text>
      <TextInput placeholder='email' onChangeText={setEmail}></TextInput>
      <TextInput placeholder='senha'onChangeText={setPassword}></TextInput>
      <TouchableOpacity onPress={()=>{handleLogin(email, password)}} ><Text>Logar</Text></TouchableOpacity>
      <Link href="/register">
        <Text>NÃO TENHO CONTA</Text>
      </Link>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})