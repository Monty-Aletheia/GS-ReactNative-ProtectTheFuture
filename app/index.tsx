import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
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

const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;


// function handleLogin(email: string, password: string) {
//     signInWithEmailAndPassword(getAuth(), email, password)
//   .then(() => {
//     router.navigate("/profile")
//     console.log('User account signed in!');
//   })
//   .catch(error => {
//     console.error(error);
//   });
// }



const Login = () => {

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading } = useAuth();
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

  useEffect(() => {

     requestForegroundPermissionsAsync();

    const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        router.navigate("/profile")
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);


  async function handleLogin(data:LoginFormData) {
    const success = await signIn(data.email, data.password);
    if (success) {
      router.replace("/profile");
    } else {
      console.log("Falha no login");
    }
  }

  return (
    // <View>
    //   <Text className="text-2xl font-bold">Login</Text>
    //   <TextInput placeholder='email' onChangeText={setEmail}></TextInput>
    //   <TextInput placeholder='senha'onChangeText={setPassword}></TextInput>
    //   <TouchableOpacity onPress={()=>{handleLogin(email, password)}} ><Text>Logar</Text></TouchableOpacity>
    //   <Link href="/register">
    //     <Text>NÃO TENHO CONTA</Text>
    //   </Link>
    // </View>

    <View className="flex-1 self-center w-[80%] items-center h-full">

      <View className='mt-32 mb-14'>
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


      </View>
  
    </View>

  )
}

export default Login

const styles = StyleSheet.create({})