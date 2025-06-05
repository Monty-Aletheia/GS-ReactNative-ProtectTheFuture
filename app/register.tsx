import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddressForm from '../components/addressFormStep2';
import AddressFormStep1 from '../components/addressFormSetp1';
import FormFooterStep1 from '../components/formFooterStep1';
import FormFooterStep2 from '../components/formFooterStep2';



const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "O email é obrigatória"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  address: z.object({
    street: z.string().min(1, "Rua é obrigatória"),
    number: z.string().min(1, "Vazio"),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z.string().length(2, "Vazio"),
  })
});

type RegisterFormData = z.infer<typeof registerSchema>;


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
    const { signUp, isLoading } = useAuth(); 
    const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
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

async function getFirebaseId() {
    const userFirebaseId = await AsyncStorage.getItem("@userFirebaseId");
    console.log("User Firebase ID:", userFirebaseId);
    
  }
  useEffect(() => {
    getFirebaseId();
  }, []);

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
      
      const reponse = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = reponse.data;
      if (data.erro) {
        console.error('CEP não encontrado');
        return;
      }
      setValue("address.street", data.logradouro);
      setValue("address.neighborhood", data.bairro);
      setValue("address.city", data.localidade);
      setValue("address.state", data.uf);

    }catch(error) {
      console.error('Erro ao buscar CEP:', error);
    } 
  }
        
  return (

    <View className="flex-1 self-center w-[80%] items-center h-full">

      <View className='mt-20 '>
        <Image source={require("../assets/images/watchtower_logo.png")}
        className='w-64 h-52'
        />
      </View>

      { step === 2 && (
      <AddressForm
        control={control}
        errors={errors}
        cep={cep}
        setCep={setCep}
        buscarCep={buscarCep}
        styles={styles}
        />
    )}


      {step === 1 &&(
        <AddressFormStep1 control={control} errors={errors} />
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
        <FormFooterStep1 onNext={() => setStep(2)} />)}
      {step === 2 && (
        <FormFooterStep2 onSubmit={handleSubmit(handleRegister)} onBack={() => setStep(1)}/>
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


