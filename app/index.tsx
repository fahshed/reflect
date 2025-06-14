import { AuthProvider, useAuth } from "@/context/authContext";
import React, { useEffect } from "react";
import AuthStack from "./navigation/AuthStack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

function AppNavigator() {
  const { user } = useAuth();

  return user ? <BottomTabNavigator /> : <AuthStack />;
}

export default function Index() {
  useEffect(() => {
    // setupDataListener("history", (items) => {
    //   console.log("setting state with: ", items);
    //   setHistory(items);
    // });
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
