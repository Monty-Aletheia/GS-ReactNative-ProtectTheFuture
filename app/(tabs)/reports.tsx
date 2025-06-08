import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import ListItems from "../../components/item";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserMarkersById } from "../../service/markerService";
import { useAuth } from "../../components/AuthProvider";
import { useFocusEffect } from "expo-router";


const Reports = () => {
  const queryClient = useQueryClient();

  const { userResponse } = useAuth();

  const { data: userMarkers, isLoading } = useQuery({
    queryKey: ['userMarkers', userResponse?.user.id],
    queryFn: () => getUserMarkersById(userResponse?.user.id),
  });

  const reports = userMarkers || [];

  useFocusEffect(()=>{
    queryClient.invalidateQueries({queryKey: ['userMarkers']})
  })

  return (
    <View className="flex-1">
      <View className="mt-28">
        <Text className="font-black text-3xl self-center">Suas Marcações</Text>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center mb-20">
          <Text className="text-lg text-gray-500">Carregando...</Text>
        </View>
      ) : reports.length === 0 ? (
        <View className="flex-1 justify-center items-center mb-20">
          <Image source={require("../../assets/images/empty_list.png")} className="w-30 h-30" />
          <Text className="text-gray-400 text-2xl">Nenhum relatório encontrado</Text>
        </View>
      ) : (
        <View className="mt-10">
          <FlatList
            data={reports}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ListItems report={item} />}
          />
        </View>
      )}
    </View>
  );
};

export default Reports;

const styles = StyleSheet.create({});
