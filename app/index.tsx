import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { app } from '../firebaseConfig';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';

const auth = getAuth(app);

function handleLogin(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    router.navigate("/page")
    console.log('User account signed in!');
  })
  .catch(error => {
    console.error(error);
  });
}


const Login = () => {

  const [user, setUser] = useState<User | null>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("Usuário está logado:", currentUser.email);
        setUser(currentUser);
        router.navigate("/page")
      } else {
        console.log("Usuário deslogado");
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
      <TouchableOpacity onPress={()=>{handleLogin(email, password)}}>Logar</TouchableOpacity>
      <Link href="/register">
        <Text>NÃO TENHO CONTA</Text>
      </Link>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})