// components/FooterStep.tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

type Props = {
  onNext: () => void;
};

const formFooterStep1: React.FC<Props> = ({ onNext }) => {
  return (
    <View className="w-full px-4 mt-16">
      <LinearGradient
        colors={['#ff4235', '#ff8348']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="w-[50%] self-center rounded-xl shadow-lg overflow-hidden"
      >
        <TouchableOpacity
          onPress={onNext}
          activeOpacity={0.8}
          className="p-4 rounded-xl py-3"
          style={{ backgroundColor: 'transparent' }}
        >
          <Text className="text-white text-center font-semibold text-xl">
            Avançar
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

export default formFooterStep1;
