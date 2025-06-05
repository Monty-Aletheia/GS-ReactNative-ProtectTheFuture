import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, FirebaseAuthTypes } from '@react-native-firebase/auth'
import { requestForegroundPermissionsAsync } from 'expo-location'
import { useAuth } from '../components/AuthProvider'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import ControlledTextInput from '../components/ControlledTextInput'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'

const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

async function removeFirebaseIdAsyncStorage() {
    await AsyncStorage.removeItem("@userFirebaseId"); 
  }

const Login = () => {

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading, userFirebaseId, getUserByFirebaseId } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function getUid() {
    const id = await AsyncStorage.getItem("@userFirebaseId")
    return id;
  }

  useEffect(() => {

    getUid().then((id) => {
      if (id) {

    const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        router.navigate("/profile")
      } else {
        setUser(null);
      }
    });
    

    return unsubscribe;

    }})

  }, []);

  useEffect(()=>{
    removeFirebaseIdAsyncStorage();    
  }, [])


  async function handleLogin(data:LoginFormData) {
    const success = await signIn(data.email, data.password);
    if (success) {
      router.replace("/profile");
    } else {
      console.log("Falha no login");
    }
  }

  return (

    <View className="flex-1 self-center w-[80%] items-center h-full">

      <View className='mt-20 mb-14'>
        <Image source={require("../assets/images/watchtower_logo.png")}
        className='w-64 h-52'
        />
      </View>

      <View className="w-full px-4">
        <Text className="self-start ml-3 mt-6 mb-2 text-dark_blue text-xl font-semibold">
          Email
        </Text>
        <ControlledTextInput
          control={control}
          name="email"
          placeholder=""
          error={errors.email}
          style='w-full h-12 border-2 border-gray-300 px-4 rounded-lg' 
        />

        <Text className="self-start ml-3 mt-6 mb-2 text-dark_blue text-xl font-semibold">
          Senha
        </Text>
        <ControlledTextInput
          control={control}
          name="password"
          placeholder=""
          secureTextEntry
          error={errors.password}
          style='w-full h-12 border-2 border-gray-300 px-4 rounded-lg' 
        />
      </View>

      {isLoading && (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator
            size="large"
            color="#FF3131"
          />
        </View>
      )}
      <View className='w-full px-4 mt-36'>
        <LinearGradient
          colors={['#ff4235', '#ff8348']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="w-[50%] self-center rounded-xl  shadow-lg overflow-hidden"
        >
          <TouchableOpacity
            onPress={handleSubmit(handleLogin)}
            activeOpacity={0.8}
            className="p-4 rounded-xl py-3"
            style={{ backgroundColor: 'transparent' }}
          >
            <Text className="text-white text-center font-semibold text-xl">
              Login
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <Link href="/register" className="self-center mt-4">
          <Text className="text-black underline font-bold text-lg">Não possui conta? Cadastrar.</Text>
        </Link>

        <Link href="/profile" className="self-center mt-4">
          <Text className="text-black underline font-bold text-lg">Bypass</Text>
        </Link>


      </View>
  
    </View>

  )
}

export default Login

const styles = StyleSheet.create({})