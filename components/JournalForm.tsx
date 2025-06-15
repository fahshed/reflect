import { areasOfLife, reflectionTypes } from "@/utils/tags";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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

      <View style={styles.tagContainer}>
        {reflectionTypes.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.tag,
              selectedTags.includes(item) && styles.selectedTypeTag,
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
        ))}
      </View>
      <View style={styles.divider} />
      <View style={styles.tagContainer}>
        {areasOfLife.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.tag,
              selectedTags.includes(item) && styles.selectedAreaTag,
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
        ))}
      </View>
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
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    padding: 10,
    // margin: 5,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  selectedTypeTag: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  selectedAreaTag: {
    backgroundColor: "#007f5f",
    borderColor: "#007f5f",
  },
  tagText: {
    color: "#000",
  },
  selectedTagText: {
    color: "#fff",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 8,
  },
});
