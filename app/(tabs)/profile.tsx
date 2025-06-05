import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, signOut } from '@react-native-firebase/auth';
import { router } from 'expo-router';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import axios from 'axios';
import { useAuth } from '../../components/AuthProvider';


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

    const response = await axios.post("/Device", {
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
console.error("❌ Erro completo (detalhado):", JSON.stringify(error, null, 2));    
  }
}

const Profile = () => {

    const [expoPushToken, setExpoPushToken] = useState('');
    const { userResponse, getUserByFirebaseId, signOutProvider} = useAuth();


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
    <View>
      <Text>Profile</Text>
      <TouchableOpacity className='mt-10' onPress={handleSignOut}><Text>SignOut</Text></TouchableOpacity>
    </View>
  )
}

export default Profile

