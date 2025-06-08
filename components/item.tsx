import { useRouter } from "expo-router";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { MarkerInfo } from "../types/markerInfo";
import { formatDate } from "../utils/format";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMarker } from "../service/markerService";

type ListItemProps = {
  report: MarkerInfo;
};

const ListItems: React.FC<ListItemProps> = ({ report }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ latitude, longitude, markerType }: { latitude: number, longitude: number, markerType: string }) =>
      deleteMarker(latitude, longitude, markerType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userMarkers'] });
    },
  });

  const handlePress = () => {
  mutation.mutate({
    latitude: report.latitude,
    longitude: report.longitude,
    markerType: report.markerType,
  });
  };

  return (
    <View className="flex-row justify-between bg-orange-400 rounded-2xl shadow-xl m-5 pt-3 pb-3 ">
      <View className="ml-2 px-4 pb-4 flex-1 justify-center gap-4">
        <Text className="text-lg font-bold color-white">{report.desasterType}</Text>
        <Text className="text-lg color-white">{formatDate(report.timestamp)}</Text>
      </View>

      <View className="flex-col justify-center">
        <TouchableOpacity onPress={() => {
          Alert.alert(
            "Tem certeza?",
            "Você realmente deseja deletar este report?",
            [
              { text: "Cancelar", style: "cancel" },
              { text: "Deletar", style: "destructive", onPress: handlePress },
            ]
          );
        }}>
          <Image source={require("../assets/images/delete_icon.png")} className="w-9 h-9 mr-6"/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListItems;
