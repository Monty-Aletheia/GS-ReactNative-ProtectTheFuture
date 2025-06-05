import React from "react";
import { StyleSheet, View } from "react-native";
import ControlledTextInput from "./ControlledTextInput";

type Props = {
  control: any;
  errors: any;
};

const AddressFormStep1: React.FC<Props> = ({ control, errors }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <ControlledTextInput
          control={control}
          name="name"
          placeholder="Nome"
          error={errors.name}
          style="w-full h-12 border-2 border-gray-300 px-4 rounded-lg"
        />
      </View>

      <View style={styles.inputWrapper}>
        <ControlledTextInput
          control={control}
          name="email"
          placeholder="Email"
          error={errors.email}
          style="w-full h-12 border-2 border-gray-300 px-4 rounded-lg"
        />
      </View>

      <View style={styles.inputWrapper}>
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 24,
    marginTop: 40,
    justifyContent: "space-evenly",
  },
  inputWrapper: {
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 2,
    borderColor: "#D1D5DB", // gray-300
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});

export default AddressFormStep1;
