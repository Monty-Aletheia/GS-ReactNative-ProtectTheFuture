import { StyleSheet, Text, TouchableOpacity, View, Platform, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, signOut } from '@react-native-firebase/auth';
import { router } from 'expo-router';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import axios from 'axios';
import { useAuth } from '../../components/AuthProvider';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../../service/api';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

async function addDeviceToUser(
  expoDeviceToken: string,
  userId: string | undefined,
  deviceName: string | null,
) {


  try {
    console.log(`expoDeviceToken: ${expoDeviceToken} userId: ${userId} deviceName: ${deviceName}`)

    const response = await api.post("/Device", {
      expoDeviceToken: expoDeviceToken,
      userId: userId,
      deviceName: deviceName
    });

    console.log(response);

    if (response.status == 201) {
      console.log("Device added successfully");
    } else {
      console.error("Failed to add device", response.status, response.data);
    }
  } catch (error: any) {
    console.error("Error adding device:", error.message || error);}
}

const Profile = () => {

    const [newName, setNewName] = useState("");
    const [expoPushToken, setExpoPushToken] = useState('');
    const { userResponse, getUserByFirebaseId, signOutProvider, updateUser} = useAuth();

    async function handleUpdate(newName: string) {
        const success = await updateUser(
          newName
        );        
        if (success) {
          router.reload();      
        } else {
          console.log("Falha na atualização do nome");
        }
      }

    useEffect(() => {
      
      registerForPushNotificationsAsync()
        .then(token => {
          if (token !== undefined) {
          const formattedToken = token.replace('ExponentPushToken[', '').replace(']', '');
          getUserByFirebaseId(formattedToken).then((user) => {
            console.log("Adding device to user:", formattedToken, user?.user.id, Device.deviceName);
            addDeviceToUser(formattedToken, user?.user.id, Device.deviceName);

          }).catch((error: any) => {
            console.error("Error getting user by Firebase ID:", error);
          })
        }
          setExpoPushToken(token ?? '')} )
        .catch((error: any) => setExpoPushToken(`${error}`));

          
    
  }, []);

  
  useEffect(() => {

    

  } , [expoPushToken]);

  function handleSignOut() {
    
      signOut(getAuth()).then(() => {
        signOutProvider();
          
          router.replace("/");
      });
  }



  return (
    <View className='flex-1 items-center justify-evenly p-6 h-full'>
      <View className='flex-row items-center justify-between w-full'>
        <TouchableOpacity className='mt-10' onPress={handleSignOut}>
          <Image source={require("../../assets/images/signout_icon.png")}/>
        </TouchableOpacity>
      </View>

      <View className='flex-1 items-center justify-evenly w-full mt-24'>
        <View className='flex-row items-center justify-center mb-24'>
          <Text className='font-black text-3xl self-center'>Olá, {userResponse?.user.name}</Text>
        </View>
        <View className='flex-1 items-center justify-center gap-16 w-full'>
          <Text className='font-black text-3xl self-center'>Trocar Nome</Text>
          <TextInput onChangeText={setNewName} className='w-[85%] h-12 border-2 border-gray-300 px-4 rounded-lg' placeholder='Novo Nome'></TextInput>
          <LinearGradient
            colors={['#ff4235', '#ff8348']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="self-center rounded-xl shadow-lg overflow-hidden"
          >
            <TouchableOpacity
              onPress={() => {handleUpdate(newName)}}
              activeOpacity={0.8}
              className="p-4 rounded-xl py-3"
              style={{ backgroundColor: 'transparent' }}
            >
              <Text className="text-white text-center font-semibold text-xl">
                Atualizar
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  )
}

export default Profile

