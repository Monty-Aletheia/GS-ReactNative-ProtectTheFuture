import { getAuth, signOut } from "@react-native-firebase/auth";
import * as Device from "expo-device";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../components/AuthProvider";
import { formatName } from "../../utils/format";
import { registerForPushNotificationsAsync } from "../../service/notifications";
import { addDeviceToUser } from "../../service/deviceService";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const Profile = () => {
  const [newName, setNewName] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const { userResponse, getUserByFirebaseId, signOutProvider, updateUser } = useAuth();

  async function handleUpdate(newName: string) {
    const success = await updateUser(newName);
    if (success) {
      router.reload();
    } else {
      console.log("Falha na atualização do nome");
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync()
    .then((token) => {
      if (!token) return;

      const formattedToken = token.replace("ExponentPushToken[", "").replace("]", "");
      setExpoPushToken(formattedToken);

      getUserByFirebaseId(formattedToken)
        .then((user) => {
          addDeviceToUser(formattedToken, user?.user.id, Device.deviceName);
        })
        .catch((error) => {
          console.error("Erro ao buscar usuário:", error);
        });
    })
    .catch((error) => setExpoPushToken(`${error}`));
  }, []);

  useEffect(()=>{
    getUserByFirebaseId(expoPushToken)
  }, [])

  function handleSignOut() {
    signOut(getAuth()).then(() => {
      signOutProvider();
      router.replace("/");
    });
  }

  return (
    <View className="flex-1 items-center justify-evenly p-6 h-full">
      <View className="flex-row items-center justify-between w-full">
        <TouchableOpacity className="mt-10" onPress={handleSignOut}>
          <Image source={require("../../assets/images/signout_icon.png")} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-evenly w-full mt-24">
        <View className="flex-row items-center justify-center mb-24">
          <Text className="font-black text-3xl self-center">
            Olá, {formatName(userResponse?.user.name)}
          </Text>
        </View>
        <View className="flex-1 items-center justify-center gap-16 w-full">
          <Text className="font-black text-3xl self-center">Trocar Nome</Text>
          <TextInput
            onChangeText={setNewName}
            className="w-[85%] h-12 border-2 border-gray-300 px-4 rounded-lg"
            placeholder="Novo Nome"
          ></TextInput>
          <LinearGradient
            colors={["#ff4235", "#ff8348"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="self-center rounded-xl shadow-lg overflow-hidden"
          >
            <TouchableOpacity
              onPress={() => {
                handleUpdate(newName);
              }}
              activeOpacity={0.8}
              className="p-4 rounded-xl py-3"
              style={{ backgroundColor: "transparent" }}
            >
              <Text className="text-white text-center font-semibold text-xl">
                Atualizar
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default Profile;
