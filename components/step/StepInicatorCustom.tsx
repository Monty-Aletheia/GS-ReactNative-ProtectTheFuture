// components/steps/StepIndicatorCustom.tsx
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

export const renderStepIndicator = ({
  stepStatus,
}: {
  position: number;
  stepStatus: string;
}) => {
  if (stepStatus === "current") {
    return (
      <LinearGradient
        colors={["#FF3131", "#FF914D"]}
        style={{ width: 16, height: 16, borderRadius: 8 }}
      />
    );
  }

  return (
    <View
      style={{
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "#D9D9D9",
      }}
    />
  );
};

export const customStyles = {
  stepIndicatorSize: 16,
  currentStepIndicatorSize: 16,
  separatorStrokeWidth: 0,
  currentStepStrokeWidth: 0,
  stepStrokeWidth: 0,
  separatorFinishedColor: "#FF3131",
  separatorUnFinishedColor: "#D9D9D9",
  labelColor: "#999",
  labelSize: 13,
  currentStepLabelColor: "#FF3131",
};
