import { useAuth } from "@/context/authContext";
import { setupDataListener } from "@/firebase/database";
import { deleteJournalEntry } from "@/firebase/journal";
import React, { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }: any) {
  const [entries, setEntries] = useState<any[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = setupDataListener(
      "journalEntries",
      user.uid,
      setEntries
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteJournalEntry(id);
      Alert.alert("Success", "Journal entry deleted.");
    } catch (error) {
      Alert.alert("Error", "Failed to delete journal entry.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Journal Entries</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text style={styles.content}>{item.content}</Text>
            <Text style={styles.tags}>Tags: {item.tags.join(", ")}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Edit"
                onPress={() =>
                  navigation.navigate("Edit Entry", { entry: item })
                }
              />
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  entry: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  tags: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
