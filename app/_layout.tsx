import { StyleSheet } from 'react-native'
import React from 'react'
import '../global';
import { Slot, Stack } from 'expo-router';
// @ts-ignore
import { app } from '../firebaseConfig'
import AuthProvider from '../components/AuthProvider';
//Não sei dizer direito o pq, mas precisa disso.
// @ts-ignore
console.log(app.name);

const AppLayout = () => {
  return (
    <>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </>
  )
}

export default AppLayout

const styles = StyleSheet.create({})