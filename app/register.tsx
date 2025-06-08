import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Image, StyleSheet, View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import z from "zod";
import AddressFormStep1 from "../components/addressFormSetp1";
import AddressForm from "../components/addressFormStep2";
import { useAuth } from "../components/AuthProvider";
import FormFooterStep1 from "../components/formFooterStep1";
import FormFooterStep2 from "../components/formFooterStep2";
import { customStyles, renderStepIndicator } from "../components/step/StepInicatorCustom";
import { useSteps } from "../components/step/useStep";
import { useCepLookup } from "../hooks/useCepLookup";

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
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const { step, next, back } = useSteps();
  const [cep, setCep] = useState("");
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
      },
    },
  });

  const { buscarCep } = useCepLookup(setValue);

  useEffect(() => {
    AsyncStorage.getItem("@userFirebaseId").then((id) =>
      console.log("User Firebase ID:", id)
    );
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
      Alert.alert("Falha no cadastro", "Tente novamente mais tarde.");
    }
  }

  return (
    <View className="flex-1 self-center w-[80%] items-center h-full">
      <View className="mt-20">
        <Image
          source={require("../assets/images/watchtower_logo.png")}
          className="w-64 h-52"
        />
      </View>

      {step === 1 ? (
        <AddressFormStep1 control={control} errors={errors} />
      ) : (
        <AddressForm
          control={control}
          errors={errors}
          cep={cep}
          setCep={setCep}
          buscarCep={buscarCep}
          styles={styles}
        />
      )}

      <View className="w-28 px-4">
        <StepIndicator
          currentPosition={step - 1}
          stepCount={2}
          customStyles={customStyles}
          renderStepIndicator={renderStepIndicator}
        />
      </View>

      {isLoading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FF3131" />
        </View>
      )}

      {step === 1 ? (
        <FormFooterStep1 onNext={next} />
      ) : (
        <FormFooterStep2
          onSubmit={handleSubmit(handleRegister)}
          onBack={back}
        />
      )}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  input: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  buttonIcon: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
});
