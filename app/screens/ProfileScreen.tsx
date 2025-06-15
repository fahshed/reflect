import { useAuth } from "@/context/authContext";
import { scheduleReflectionReminder } from "@/utils/notification";
import React from "react";
import { Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.text}>Full Name: {user?.displayName || "N/A"}</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>
      <Button title="Logout" onPress={logout} />
      <Button
        title="Enable Daily Reflection Reminder"
        onPress={scheduleReflectionReminder}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});
