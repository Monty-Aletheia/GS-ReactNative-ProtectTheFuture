import React from "react";
import { Tabs } from "expo-router";
import { Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'


const TabsFooter = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#6B889D",
          height: 80,
        },
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <LinearGradient
            colors={['#ff4235', '#ff8348']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} // horizontal
            style={{ flex: 1 }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/profile_icon.png")}
              style={{
                width: 70,
                height: 70,
                marginTop: 40,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          headerShown: false,

          title: "Map",
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/map_icon.png")}
              style={{
                width: 45,
                height: 60,
                marginTop: 45,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          headerShown: false,
          title: "Reports",
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/report_icon.png")}
              style={{
                width: 52,
                height: 45,
                marginTop: 40,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsFooter;
