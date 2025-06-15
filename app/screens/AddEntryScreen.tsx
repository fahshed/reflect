import JournalForm from "@/components/JournalForm";
import { useAuth } from "@/context/authContext";
import { createJournalEntry, uploadImageAsync } from "@/firebase/journal";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateEntryScreen({ navigation }: any) {
  const [post, setPost] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const { user } = useAuth();

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
      let imageUrl: string | null = null;

      if (imageUri) {
        imageUrl = await uploadImageAsync(imageUri);
      }

      const newEntry = await createJournalEntry(
        post,
        selectedTags,
        user.uid,
        imageUrl
      );

      Alert.alert("Success", `Journal entry created with ID: ${newEntry.id}`);
      navigation.goBack();
    } catch (error) {
      console.error("Error saving journal entry:", error);
      Alert.alert("Error", "Failed to create journal entry.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text style={styles.title}>Add Journal Entry</Text>
          <Button title="Submit" onPress={handleSubmit} />
        </View>

        <JournalForm
          post={post}
          setPost={setPost}
          selectedTags={selectedTags}
          toggleTag={toggleTag}
          imageUri={imageUri}
          setImageUri={setImageUri}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    // marginBottom: 16,
  },
});
