import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import "../global";
import { Stack } from "expo-router";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// @ts-ignore
import { app } from "../firebaseConfig";
import AuthProvider from "../components/AuthProvider";
//Não sei dizer direito o pq, mas precisa disso.
// @ts-ignore
console.log(app.name);

const queryClient = new QueryClient();

const AppLayout = () => {
  return (
    <>
      <QueryClientProvider client={queryClient} >
        <AuthProvider>
          <GestureHandlerRootView>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
            </Stack>
          </GestureHandlerRootView>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default AppLayout;

const styles = StyleSheet.create({});
