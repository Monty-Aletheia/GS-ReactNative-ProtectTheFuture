import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { getAuth, signOut } from '@react-native-firebase/auth';


function handleSignOut() {
    signOut(getAuth()).then(() => {
        router.replace("/")
        console.log('User signed out!')
    });
}

const Page = () => {


  return (
    <View>
      <Text>Hello</Text>
      <TouchableOpacity onPress={handleSignOut}><Text>SignOut</Text></TouchableOpacity>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})