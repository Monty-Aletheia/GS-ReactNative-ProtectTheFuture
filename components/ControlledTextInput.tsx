import { useController } from "react-hook-form";
import { Text, TextInput, StyleSheet } from "react-native";

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
      {error && <Text style={styles.error}>{error.message}</Text>}
    </>
  );
};

export default ControlledTextInput;

const styles = StyleSheet.create({
  error: {
    fontSize: 14,
    color: 'red',
    marginTop: 4,
    marginLeft: 8,
  },
})