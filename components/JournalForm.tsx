import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const presetTags = ["Work", "Personal", "Fitness", "Health", "Hobby", "Travel"];

export default function JournalForm({
  post,
  setPost,
  selectedTags,
  toggleTag,
}: any) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Write your journal entry here..."
        value={post}
        onChangeText={setPost}
        multiline
      />
      <Text style={styles.subtitle}>Select Tags:</Text>
      <FlatList
        data={presetTags}
        keyExtractor={(item) => item}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.tag,
              selectedTags.includes(item) && styles.selectedTag,
            ]}
            onPress={() => toggleTag(item)}
          >
            <Text
              style={
                selectedTags.includes(item)
                  ? styles.selectedTagText
                  : styles.tagText
              }
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    textAlignVertical: "top",
    minHeight: 100,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tag: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  selectedTag: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  tagText: {
    color: "#000",
  },
  selectedTagText: {
    color: "#fff",
  },
});
