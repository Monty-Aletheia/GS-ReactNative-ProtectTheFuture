import React from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
    <View style={localStyles.container}>
      <View style={localStyles.cepRow}>
        <TextInput
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
          style={[styles.input, localStyles.cepInput]}
          placeholder="CEP"
        />

        <LinearGradient
          colors={['#ff4235', '#ff8348']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.buttonIcon, localStyles.gradientIcon]}
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

      <View style={localStyles.row}>
        <View style={localStyles.streetInput}>
          <ControlledTextInput
            control={control}
            name="address.street"
            placeholder="Rua"
            error={errors.address?.street}
            style="h-12 border-2 border-gray-300 px-4 rounded-lg"
          />
        </View>

        <View style={localStyles.numberInput}>
          <ControlledTextInput
            control={control}
            name="address.number"
            placeholder="N°"
            error={errors.address?.number}
            style="h-12 border-2 border-gray-300 px-4 rounded-lg"
          />
        </View>
      </View>

      <View style={localStyles.inputWrapper}>
        <ControlledTextInput
          control={control}
          name="address.neighborhood"
          placeholder="Bairro"
          error={errors.address?.neighborhood}
          style="w-full h-12 border-2 border-gray-300 px-4 rounded-lg"
        />
      </View>

      <View style={localStyles.row}>
        <View style={localStyles.cityInput}>
          <ControlledTextInput
            control={control}
            name="address.city"
            placeholder="Cidade"
            error={errors.address?.city}
            style="h-12 border-2 border-gray-300 px-4 rounded-lg"
          />
        </View>

        <View style={localStyles.stateInput}>
          <ControlledTextInput
            control={control}
            name="address.state"
            placeholder="UF"
            error={errors.address?.state}
            style="h-12 border-2 border-gray-300 px-4 rounded-lg"
          />
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  cepRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  cepInput: {
    width: '80%',
    height: 48,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    paddingHorizontal: 16,
    borderTopLeftRadius: 6,
  },
  gradientIcon: {
    width: '20%',
    height: 48,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  streetInput: {
    width: '75%',
  },
  numberInput: {
    width: '20%',
  },
  inputWrapper: {
    marginBottom: 24,
  },
  cityInput: {
    width: '75%',
  },
  stateInput: {
    width: '20%',
  },
});

export default AddressFormStep2;
