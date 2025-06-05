import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onSubmit: () => void;
  onBack: () => void;
};

const FormFooterStep2: React.FC<Props> = ({ onSubmit, onBack }) => {
  return (
    <View style={localStyles.container}>
      <LinearGradient
        colors={["#ff4235", "#ff8348"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={localStyles.primaryButton}
      >
        <TouchableOpacity
          onPress={onSubmit}
          activeOpacity={0.8}
          style={[localStyles.touchable, { backgroundColor: "transparent" }]}
        >
          <Text style={localStyles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        colors={["#ff4235", "#ff8348"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={localStyles.secondaryButton}
      >
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.8}
          style={[localStyles.touchableRow, { backgroundColor: "transparent" }]}
        >
          <Image source={require("../assets/images/arrow_left.png")} />
          <Text style={localStyles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </LinearGradient>

      <TouchableOpacity
        onPress={() => router.replace("/")}
        style={localStyles.loginLink}
      >
        <Text style={localStyles.loginText}>Já possui conta? Fazer login.</Text>
      </TouchableOpacity>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  primaryButton: {
    width: "60%",
    alignSelf: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    overflow: "hidden",
    marginBottom: 16,
  },
  secondaryButton: {
    width: "45%",
    alignSelf: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    overflow: "hidden",
  },
  touchable: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  touchableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
    marginLeft: 8,
  },
  loginLink: {
    alignSelf: "center",
    marginTop: 16,
  },
  loginText: {
    color: "#000",
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default FormFooterStep2;
