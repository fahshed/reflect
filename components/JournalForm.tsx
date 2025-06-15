import { areasOfLife, reflectionTypes } from "@/utils/tags";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Alert,
  Image,
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
  imageUri,
  setImageUri,
}: any) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Camera permission denied");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Write your journal entry here..."
        value={post}
        onChangeText={setPost}
        multiline
      />

      {imageUri && (
        <View style={styles.imagePreviewContainer}>
          <Text style={styles.subtitle}>Selected Image:</Text>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>Pick from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
          <Text style={styles.imageButtonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

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
  imagePreviewContainer: {
    marginBottom: 12,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  imageButton: {
    backgroundColor: "#444",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  imageButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
