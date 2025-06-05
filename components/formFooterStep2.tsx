// components/FooterRegister.tsx
import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

type Props = {
  onSubmit: () => void;
  onBack: () => void;
};

const FormFooterStep2: React.FC<Props> = ({ onSubmit, onBack }) => {
  return (
    <View className="w-full px-4 mt-10">
      <LinearGradient
        colors={['#ff4235', '#ff8348']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="w-[60%] self-center rounded-xl shadow-lg overflow-hidden mb-4"
      >
        <TouchableOpacity
          onPress={onSubmit}
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
        className="w-[35%] self-center rounded-xl shadow-lg overflow-hidden"
      >
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.8}
          className="p-4 rounded-xl py-3 flex-row items-center justify-center gap-2"
          style={{ backgroundColor: 'transparent' }}
        >
          <Image source={require('../assets/images/arrow_left.png')} />
          <Text className="text-white text-center font-semibold text-xl mr-2">
            Voltar
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      <TouchableOpacity
        onPress={() => router.replace('/')}
        className="self-center mt-4"
      >
        <Text className="text-black underline font-bold text-lg">
          Já possui conta? Fazer login.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormFooterStep2;
