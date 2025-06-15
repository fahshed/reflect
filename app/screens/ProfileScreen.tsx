import { useAuth } from "@/context/authContext";
import { scheduleReflectionReminder } from "@/utils/notification";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      {/* Circular Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: "https://doodleipsum.com/1000x1000/avatar?bg=f8acff",
          }}
          style={styles.avatar}
        />
      </View>

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
    backgroundColor: "#fff",
  },
  avatarContainer: {
    marginBottom: 16, // Space below the avatar
  },
  avatar: {
    width: 120, // Width of the avatar
    height: 120, // Height of the avatar
    borderRadius: 60, // Half of the width/height to make it circular
    borderWidth: 2, // Optional: Add a border
    borderColor: "#444", // Optional: Border color
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
