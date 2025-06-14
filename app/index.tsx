import { AuthProvider } from "@/context/authContext";
import React from "react";
import AppNavigator from "./navigation/AppNavigator";

export default function Index() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
