import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onNext: () => void;
};

const formFooterStep1: React.FC<Props> = ({ onNext }) => {
  return (
    <View style={localStyles.container}>
      <LinearGradient
        colors={["#ff4235", "#ff8348"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={localStyles.gradient}
      >
        <TouchableOpacity
          onPress={onNext}
          activeOpacity={0.8}
          style={[localStyles.button, { backgroundColor: "transparent" }]}
        >
          <Text style={localStyles.buttonText}>Avançar</Text>
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
    marginTop: 50,
  },
  gradient: {
    width: "50%",
    alignSelf: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    overflow: "hidden",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
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

export default formFooterStep1;
