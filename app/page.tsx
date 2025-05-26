import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { app } from '../firebaseConfig'
import { getAuth, signOut } from 'firebase/auth'
import { router } from 'expo-router';


function handleSignOut() {
    const auth = getAuth(app);
    signOut(getAuth()).then(() => {
        router.replace("/")
        console.log('User signed out!')
    });
}


const Page = () => {
  return (
    <View>
      <Text>Test Page</Text>
      <TouchableOpacity onPress={handleSignOut}>
        SignOut
      </TouchableOpacity>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})