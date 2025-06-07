import React, { RefObject } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import BottomSheet,{ BottomSheetView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  visible: boolean;
  onClose: () => void;
  selectedReport: string;
  setSelectedReport: (report: string) => void;
  handleReport: () => void;
  bottomSheetRef: RefObject<BottomSheet>;
  snapPoints: string[];
}

const DangerReportBottomSheet: React.FC<Props> = ({
  visible,
  onClose,
  selectedReport,
  setSelectedReport,
  handleReport,
  bottomSheetRef,
  snapPoints,
}) => {
  if (!visible) return null;

  const reportOptions = [
    { type: "Onda de Calor", color: "bg-red-500", icon: require("../assets/images/heat_waves_icon.png"), label: "Onda de calor" },
    { type: "Incêndio", color: "bg-orange-500", icon: require("../assets/images/fire_icon.png"), label: "Incêndio" },
    { type: "Tempestade", color: "bg-yellow-500", icon: require("../assets/images/storm_icon.png"), label: "Tempestade" },
    { type: "Enchente", color: "bg-blue-500", icon: require("../assets/images/flood_icon.png"), label: "Enchente" },
  ];

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={onClose}
    >
      <BottomSheetView>
        <View>
          <View className="p-4">
            <Text className="text-xl font-black self-center">Relatar Perigo</Text>
            <Text className="text-lg self-center">Selecione o perigo encontrado</Text>
          </View>

          <View className="flex px-10 flex-col items-center gap-10 mt-14">
            {Array.from({ length: 2 }).map((_, rowIndex) => (
              <View key={rowIndex} className="flex-row justify-around w-full">
                {reportOptions.slice(rowIndex * 2, rowIndex * 2 + 2).map((item) => (
                  <View key={item.type}>
                    <TouchableOpacity
                      onPress={() => setSelectedReport(item.type)}
                      className={`w-36 h-36 ${item.color} rounded-3xl items-center justify-center ${
                        selectedReport === item.type ? "border-black border-4" : "border-none"
                      }`}
                    >
                      <Image source={item.icon} />
                    </TouchableOpacity>
                    <Text className="self-center text-xl font-bold">{item.label}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <LinearGradient
            colors={["#ff4235", "#ff8348"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="self-center rounded-xl shadow-lg overflow-hidden mt-16 w-[50%]"
          >
            <TouchableOpacity
              onPress={handleReport}
              activeOpacity={0.8}
              className="p-4"
              style={{ backgroundColor: "transparent" }}
            >
              <Text className="text-white text-center font-semibold text-xl">Reportar</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default DangerReportBottomSheet;
