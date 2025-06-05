import React from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import ListItems from "../../components/item";

const reports = [
  {
    id: "1",
    disasterReported: "Deslizamento Reportado",
    locale: "Osasco - SP",
  },
  {
    id: "2",
    disasterReported: "Deslizamento Reportado",
    locale: "Guarulhos - SP",
  },
  {
    id: "3",
    disasterReported: "Deslizamento Reportado",
    locale: "Itaquera - SP",
  },
  {
    id: "4",
    disasterReported: "Enchente Reportada",
    locale: "São Bernardo do Campo - SP",
  },
  {
    id: "5",
    disasterReported: "Incêndio Reportado",
    locale: "Santo André - SP",
  },
  { id: "6", disasterReported: "Crime Reportado", locale: "Barueri - SP" },
  {
    id: "7",
    disasterReported: "Enchente Reportada",
    locale: "Carapicuíba - SP",
  },
  {
    id: "8",
    disasterReported: "Incêndio Reportado",
    locale: "Taboão da Serra - SP",
  },
  { id: "9", disasterReported: "Crime Reportado", locale: "Mauá - SP" },
  {
    id: "10",
    disasterReported: "Deslizamento Reportado",
    locale: "Diadema - SP",
  },
  { id: "11", disasterReported: "Enchente Reportada", locale: "Suzano - SP" },
  {
    id: "12",
    disasterReported: "Incêndio Reportado",
    locale: "Francisco Morato - SP",
  },
  {
    id: "13",
    disasterReported: "Crime Reportado",
    locale: "Ferraz de Vasconcelos - SP",
  },
];

// const reports: number[] = [];


const Reports = () => {
  return (
    <View className="flex-1">
      <View className="mt-28">
        <Text className="font-black text-3xl self-center">Suas Marcações</Text>
      </View>

      { reports.length === 0 ? ( 
        <View className="flex-1 justify-center items-center mb-20">
          <Image source={require("../../assets/images/empty_list.png")} className="w-30 h-30"/>
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
      )
      }
    </View>
  );
};

export default Reports;

const styles = StyleSheet.create({});
