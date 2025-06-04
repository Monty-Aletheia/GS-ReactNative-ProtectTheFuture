import { useEffect } from "react";
import { Controller, useController } from "react-hook-form";
import { View, Text, TextInput } from "react-native";

type Props = {
  control: any;
  name: string;
  placeholder: string;
  error?: any;
  secureTextEntry?: boolean;
  style?: string;
  onChangeText?: (text: string) => void;
  value?: string;
};
const ControlledTextInput = ({
  control,
  secureTextEntry,
  placeholder,
  name,
  error,
  style,
  onChangeText
}: Props) => {
  const {
    field: { onChange, value },
  } = useController({ name, control });

  

  
  return (
    <>
      <TextInput 
        className={style}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        onChangeText={(text) => {
          onChange(text);
          onChangeText?.(text); 
        }}
        value={value}
        
      />
      {error && <Text className="text-red-600">{error.message}</Text>}
    </>
  );
};

export default ControlledTextInput;
