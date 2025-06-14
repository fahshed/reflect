import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import AddEntryScreen from "../screens/AddEntryScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Add Entry" component={AddEntryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {/* <Tab.Screen name="Edit Entry" component={EditEntryScreen} /> */}
    </Tab.Navigator>
  );
}
