import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getAuth, signOut } from '@react-native-firebase/auth';
import { router } from 'expo-router';

const Profile = () => {

  function handleSignOut() {
      signOut(getAuth()).then(() => {
          router.replace("/")
          console.log('User signed out!')
      });
  }

  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={handleSignOut}><Text>SignOut</Text></TouchableOpacity>
    </View>
  )
}

export default Profile

