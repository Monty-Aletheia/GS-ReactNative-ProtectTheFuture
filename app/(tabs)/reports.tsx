import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ListItems from '../../components/item'


const reports = [
  { id: "1", disasterReported: "Deslizamento Reportado", locale: "Osasco - SP" },
  { id: "2", disasterReported: "Deslizamento Reportado", locale: "Guarulhos - SP" },
  { id: "3", disasterReported: "Deslizamento Reportado", locale: "Itaquera - SP" },
  { id: "4", disasterReported: "Enchente Reportada", locale: "São Bernardo do Campo - SP" },
  { id: "5", disasterReported: "Incêndio Reportado", locale: "Santo André - SP" },
  { id: "6", disasterReported: "Crime Reportado", locale: "Barueri - SP" },
  { id: "7", disasterReported: "Enchente Reportada", locale: "Carapicuíba - SP" },
  { id: "8", disasterReported: "Incêndio Reportado", locale: "Taboão da Serra - SP" },
  { id: "9", disasterReported: "Crime Reportado", locale: "Mauá - SP" },
  { id: "10", disasterReported: "Deslizamento Reportado", locale: "Diadema - SP" },
  { id: "11", disasterReported: "Enchente Reportada", locale: "Suzano - SP" },
  { id: "12", disasterReported: "Incêndio Reportado", locale: "Francisco Morato - SP" },
  { id: "13", disasterReported: "Crime Reportado", locale: "Ferraz de Vasconcelos - SP" },
];


const Reports = () => {
  return (
    
    <View>
      <View className='mt-28'>
        <Text className='font-black text-3xl self-center'>Suas Marcações</Text>
      </View>

      <View className="mt-10">
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListItems report={item} />}
        />
      </View>
    </View>
  )
}

export default Reports

const styles = StyleSheet.create({})