import { StyleSheet } from 'react-native'
import React from 'react'
import '../global';
import { Slot, Stack } from 'expo-router';
// @ts-ignore
import { app } from '../firebaseConfig'
//Não sei dizer direito o pq, mas precisa disso.
// @ts-ignore
console.log(app.name);

const AppLayout = () => {
  return (
    <>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
    </>
  )
}

export default AppLayout

const styles = StyleSheet.create({})