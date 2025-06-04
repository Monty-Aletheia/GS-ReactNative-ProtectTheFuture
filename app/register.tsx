import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router';
import { createUserWithEmailAndPassword, getAuth } from '@react-native-firebase/auth';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledTextInput from '../components/ControlledTextInput';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../components/AuthProvider';
import StepIndicator from 'react-native-step-indicator';
import axios from 'axios';



const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "O email é obrigatória"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  address: z.object({
    street: z.string().min(1, "Rua é obrigatória"),
    number: z.string().min(1, "Número é obrigatório"),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z.string().length(2, "Estado deve ter 2 letras"),
  })
});

type RegisterFormData = z.infer<typeof registerSchema>;




// function handleRegister(email: string, password: string) {
//     createUserWithEmailAndPassword(getAuth(), email, password)
//   .then(() => {
//     router.navigate("/")
//     console.log('User account created & signed in!');
//   })
//   .catch(error => {
//     if (error.code === 'auth/email-already-in-use') {
//       console.log('That email address is already in use!');
//     }

//     if (error.code === 'auth/invalid-email') {
//       console.log('That email address is invalid!');
//     }

//     console.error(error);
//   });
// }

const customLabels = ['Dados', 'Endereço'];

const customStyles = {
  stepIndicatorSize: 16,
  currentStepIndicatorSize: 16,
  separatorStrokeWidth: 0,
  currentStepStrokeWidth: 0,
  stepStrokeWidth: 0,
  separatorFinishedColor: '#FF3131',
  separatorUnFinishedColor: '#D9D9D9',
  labelColor: '#999',
  labelSize: 13,
  currentStepLabelColor: '#FF3131',
};

const Register = () => {

    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState({
    logradouro: ' ',
    bairro: ' ',
    localidade: ' ',
    uf: ' '
    });
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signUp, isLoading } = useAuth(); // Assuming you have a signUp function in your AuthProvide
    const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: {
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
      }
    },
  });


  async function handleRegister(data: RegisterFormData) {
    const success = await signUp(
      data.name,
      data.email,
      data.password,
      data.address
    );
    if (success) {
      router.replace("/");
    } else {
      console.log("Falha no cadastro");
    }
  }

const renderStepIndicator = ({
  position,
  stepStatus,
}: {
  position: number;
  stepStatus: string;
}) => {
  if (stepStatus === 'current') {
    return (
      <LinearGradient
        colors={['#FF3131', '#FF914D']}
        style={{
          width: 16,
          height: 16,
          borderRadius: 8,
        }}
      />
    );
  }

  return (
    <View
      style={{
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#D9D9D9',
      }}
    />
  );
};

  const buscarCep = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, '');
    console.log('Buscando CEP:', cepLimpo);
    

    if (cepLimpo.length !== 8) {
      console.error('CEP inválido');
      return;
    }

    try{
      console.log('Dentro do trey:', cepLimpo);
      
      const reponse = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = reponse.data;
      if (data.erro) {
        console.error('CEP não encontrado');
        return;
      }
      setEndereco({
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf
      });

    }catch(error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      console.log('Busca de CEP concluída: ', endereco);
    }
  }

  const logradouro = endereco.logradouro;
  const bairro = endereco.bairro;
  const localidade = endereco.localidade;
  const uf = endereco.uf;
        
  return (
    // <View>
    //     <Text>Register</Text>
    //     <TextInput placeholder='email' onChangeText={setEmail}></TextInput>
    //     <TextInput placeholder='senha' onChangeText={setPassword}></TextInput>
    //     <TouchableOpacity onPress={() => {handleRegister(email, password)}}><Text>Registrar</Text></TouchableOpacity>
    //     <Link href="/">
    //         <Text>TENHO CONTA</Text>
    //     </Link>
    // </View>

    <View className="flex-1 self-center w-[80%] items-center h-full">

      <View className='mt-32 '>
        <Image source={require("../assets/images/watchtower_logo.png")}
        className='w-64 h-52'
        />
      </View>

      { step === 2 && (
      <View className="w-full px-4 mt-10">
        
        <View className='flex-row'>

          <TextInput value={cep}
            onChangeText={setCep}
            keyboardType="numeric"
            style={styles.input} 
            className='w-[80%] h-12 border-2 border-gray-300 px-4 mb-10' 
            placeholder='CEP'
            >
          </TextInput>

          <LinearGradient
            colors={['#ff4235', '#ff8348']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonIcon} 
            className='w-[20%] h-12 px-4 mb-10 items-center justify-center'
            >
            <TouchableOpacity
              onPress={() => buscarCep(cep)}
              activeOpacity={0.8}
              style={{ backgroundColor: 'transparent' }}
            >
              <Image source={require("../assets/images/search_icon.png")}/>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View className='flex-row justify-between gap-4'>
          <ControlledTextInput
            control={control}
            name="address.street"
            placeholder="Rua"
            error={errors.address?.street?.message}
            style='w-[75%] h-12 border-2 border-gray-300 px-4 rounded-lg mb-10'
            value={logradouro}
          />

          <ControlledTextInput
            control={control}
            name="adress.number"
            placeholder="N°"
            secureTextEntry
            error={errors.address?.number?.message}
            style='w-[20%] h-12 border-2 border-gray-300 px-4 rounded-lg'
          />
        </View>

        <ControlledTextInput
          control={control}
          name="address.neighborhood"
          placeholder="Bairro"
          error={errors.address?.neighborhood?.message}
          style='w-full h-12 border-2 border-gray-300 px-4 rounded-lg mb-10' 
          value={bairro}
        />

        <View className='flex-row justify-between gap-4'>
          <ControlledTextInput
            control={control}
            name="address.city"
            placeholder="Cidade"
            error={errors.address?.city?.message}
            style='w-[75%] h-12 border-2 border-gray-300 px-4 rounded-lg mb-10' 
            value={localidade}
          />

          <ControlledTextInput
            control={control}
            name="adress.state"
            placeholder="UF"
            secureTextEntry
            error={errors.address?.number?.message}
            style='w-[20%] h-12 border-2 border-gray-300 px-4 rounded-lg' 
            value={uf}
          />
        </View>

      </View>)}


      {step === 1 &&(
        <View className="w-full px-4 mb-20 mt-20">
        
        <ControlledTextInput
          control={control}
          name="name"
          placeholder="Nome"
          error={errors.name}
          style='w-full h-12 border-2 border-gray-300 px-4 rounded-lg mb-10' 
        />

  
        <ControlledTextInput
          control={control}
          name="email"
          placeholder="Email"
          error={errors.email}
          style='w-full h-12 border-2 border-gray-300 px-4 rounded-lg mb-10' 
        />

        <ControlledTextInput
          control={control}
          name="password"
          placeholder="Senha"
          secureTextEntry
          error={errors.email}
          style='w-full h-12 border-2 border-gray-300 px-4 rounded-lg' 
        />
      </View>
      )}

      <View className='w-28 px-4'>
        <StepIndicator
        currentPosition={step - 1}
        stepCount={2}
        customStyles={customStyles}
        renderStepIndicator={renderStepIndicator}
        />
      </View>

      {step === 1 && (
      <View className='w-full px-4 mt-16'>
        <LinearGradient
          colors={['#ff4235', '#ff8348']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="w-[50%] self-center rounded-xl  shadow-lg overflow-hidden"
        >
          <TouchableOpacity
            onPress={() => setStep(2)}
            activeOpacity={0.8}
            className="p-4 rounded-xl py-3"
            style={{ backgroundColor: 'transparent' }}
          >
            <Text className="text-white text-center font-semibold text-xl">
              Avançar
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <Link href="/" className="self-center mt-4">
          <Text className="text-black underline font-bold text-lg">Já possui conta? Fazer login.</Text>
        </Link>

      </View>)}

      {step === 2 && (

        <View className='w-full px-4 mt-14'>

          <LinearGradient
            colors={['#ff4235', '#ff8348']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="w-[60%] self-center rounded-xl  shadow-lg overflow-hidden mb-4"
          >
            <TouchableOpacity
              onPress={handleSubmit(handleRegister)}
              activeOpacity={0.8}
              className="p-4 rounded-xl py-3"
              style={{ backgroundColor: 'transparent' }}
            >
              <Text className="text-white text-center font-semibold text-xl">
                Cadastrar
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['#ff4235', '#ff8348']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="w-[35%] self-center rounded-xl  shadow-lg overflow-hidden"
          >
            <TouchableOpacity
              onPress={() => setStep(1)}
              activeOpacity={0.8}
              className="p-4 rounded-xl py-3 flex-row items-center justify-center gap-2"
              style={{ backgroundColor: 'transparent' }}
            >
              <Image source={require("../assets/images/arrow_left.png")}/>
              <Text className="text-white text-center font-semibold text-xl mr-2">
                Voltar
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <Link href="/" className="self-center mt-4">
            <Text className="text-black underline font-bold text-lg">Já possui conta? Fazer login.</Text>
          </Link>
        </View>

      )}


    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  input:{
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  buttonIcon:{
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  }
})


