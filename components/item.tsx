import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Report } from "../types/report";

type ListItemProps = {
  report: Report;
};

const ListItems: React.FC<ListItemProps> = ({ report }) => {
  const router = useRouter();

  const handlePress = () => {
    console.log(report.id);
  };

  return (
    <View className="flex-row justify-between bg-orange-400 rounded-2xl shadow-xl m-5 pt-3 pb-3 ">
      <View className="ml-2 px-4 pb-4 flex-1 justify-center gap-4">
        <Text className="text-lg font-bold color-white">
          {report.disasterReported}
        </Text>
        <Text className="text-lg color-white">{report.locale}</Text>
      </View>

      <View className="flex-col justify-center">
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require("../assets/images/delete_icon.png")}
            className="w-9 h-9 mr-6"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListItems;
