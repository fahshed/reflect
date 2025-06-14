import JournalForm from "@/components/JournalForm";
import { updateJournalEntry } from "@/firebase/journal";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditEntryScreen({ route, navigation }: any) {
  const { entry } = route.params;
  const [post, setPost] = useState(entry.content);
  const [selectedTags, setSelectedTags] = useState<string[]>(entry.tags);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async () => {
    if (!post.trim()) {
      Alert.alert("Error", "Post content cannot be empty.");
      return;
    }

    try {
      await updateJournalEntry(entry.id, post, selectedTags);
      Alert.alert("Success", "Journal entry updated successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to update journal entry.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Update Journal Entry</Text>
      <JournalForm
        post={post}
        setPost={setPost}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
      />
      <Button title="Update" onPress={handleSubmit} />
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
});
