// components/AddressForm2.tsx
import React from 'react';
import { View } from 'react-native';
import ControlledTextInput from './ControlledTextInput'; // ajuste o caminho se necessário

type Props = {
  control: any;
  errors: any;
};

const AddressFormStep1: React.FC<Props> = ({ control, errors }) => {
  return (
    <View className="w-full px-4 mb-6 mt-10 justify-evenly">
      <View className="mb-10">
        <ControlledTextInput
          control={control}
          name="name"
          placeholder="Nome"
          error={errors.name}
          style="w-full h-12 border-2 border-gray-300 px-4 rounded-lg"
        />
      </View>

      <View className="mb-10">
        <ControlledTextInput
          control={control}
          name="email"
          placeholder="Email"
          error={errors.email}
          style="w-full h-12 border-2 border-gray-300 px-4 rounded-lg"
        />
      </View>

      <View className="mb-10">
        <ControlledTextInput
          control={control}
          name="password"
          placeholder="Senha"
          secureTextEntry
          error={errors.password}
          style="w-full h-12 border-2 border-gray-300 px-4 rounded-lg"
        />
      </View>
    </View>
  );
};

export default AddressFormStep1;
