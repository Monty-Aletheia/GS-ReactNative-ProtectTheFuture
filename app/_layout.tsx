import { StyleSheet } from 'react-native'
import React from 'react'
import '../global';
import { Slot } from 'expo-router';
// @ts-ignore
import { app } from '../firebaseConfig'
//Não sei dizer direito o pq, mas precisa disso.
// @ts-ignore
console.log(app.name);

const AppLayout = () => {
  return (
    <>
        <Slot/>
    </>
  )
}

export default AppLayout

const styles = StyleSheet.create({})