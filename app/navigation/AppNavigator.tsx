import { useAuth } from "@/context/authContext";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import EditEntryScreen from "../screens/EditEntryScreen";
import AuthStack from "./AuthStack";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user } = useAuth();

  console.log("AppNavigator user:", user);

  return user ? (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="Edit Entry" component={EditEntryScreen} />
    </Stack.Navigator>
  ) : (
    <AuthStack />
  );
}
