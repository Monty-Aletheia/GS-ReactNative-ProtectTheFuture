import React from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ControlledTextInput from './ControlledTextInput'; 

type AddressFormProps = {
  control: any;
  errors: any;
  cep: string;
  setCep: (value: string) => void;
  buscarCep: (cep: string) => void;
  styles: any;
};

const AddressFormStep2: React.FC<AddressFormProps> = ({
  control,
  errors,
  cep,
  setCep,
  buscarCep,
  styles
}) => {
  return (
    <View className="w-full px-4 mt-10">
      <View className='flex-row mb-6'>
        <TextInput
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
          style={styles.input}
          className='w-[80%] h-12 border-2 border-gray-300 px-4'
          placeholder='CEP'
        />

        <LinearGradient
          colors={['#ff4235', '#ff8348']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonIcon}
          className='w-[20%] h-12 px-4 items-center justify-center'
        >
          <TouchableOpacity
            onPress={() => buscarCep(cep)}
            activeOpacity={0.8}
            style={{ backgroundColor: 'transparent' }}
          >
            <Image source={require('../assets/images/search_icon.png')} />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View className='flex-row justify-between mb-6'>
        <View className='w-[75%]'>
          <ControlledTextInput
            control={control}
            name="address.street"
            placeholder="Rua"
            error={errors.address?.street}
            style='h-12 border-2 border-gray-300 px-4 rounded-lg'
          />
        </View>

        <View className='w-[20%]'>
          <ControlledTextInput
            control={control}
            name="address.number"
            placeholder="N°"
            error={errors.address?.number}
            style='h-12 border-2 border-gray-300 px-4 rounded-lg'
          />
        </View>
      </View>

      <View className='mb-6'>
        <ControlledTextInput
          control={control}
          name="address.neighborhood"
          placeholder="Bairro"
          error={errors.address?.neighborhood}
          style='w-full h-12 border-2 border-gray-300 px-4 rounded-lg'
        />
      </View>

      <View className='flex-row justify-between mb-6'>
        <View className='w-[75%]'>
          <ControlledTextInput
            control={control}
            name="address.city"
            placeholder="Cidade"
            error={errors.address?.city}
            style='h-12 border-2 border-gray-300 px-4 rounded-lg'
          />
        </View>

        <View className='w-[20%]'>
          <ControlledTextInput
            control={control}
            name="address.state"
            placeholder="UF"
            error={errors.address?.state}
            style='h-12 border-2 border-gray-300 px-4 rounded-lg'
          />
        </View>
      </View>
    </View>
  );
};

export default AddressFormStep2;
