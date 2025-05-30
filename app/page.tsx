import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { router } from 'expo-router';


function handleSignOut() {
    signOut(getAuth()).then(() => {
        router.replace("/")
        console.log('User signed out!')
    });
}


const Page = () => {
  return (
    <View>
      <Text>Test Page</Text>
      <TouchableOpacity onPress={handleSignOut}><Text>SignOut</Text></TouchableOpacity>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})