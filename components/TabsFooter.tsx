import React from "react";
import { Tabs } from "expo-router";
import { Image } from "react-native";

const TabsFooter = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#6B889D",
          height: 80,
        },
        tabBarShowLabel: false,
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
                width: 65,
                height: 65,
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
                width: 65,
                height: 65,
                marginTop: 40,
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
                width: 75,
                height: 65,
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
