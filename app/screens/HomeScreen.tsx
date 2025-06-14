import InspiringQuote from "@/components/InspiringQoutes";
import { useAuth } from "@/context/authContext";
import { setupDataListener } from "@/firebase/database";
import { deleteJournalEntry } from "@/firebase/journal";
import { areasOfLife, reflectionTypes } from "@/utils/tags";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }: any) {
  const [entries, setEntries] = useState<any[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = setupDataListener(
      "journalEntries",
      user.uid,
      (data) => {
        setEntries(data);
        setFilteredEntries(data); // Initialize filtered entries
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedTags]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const applyFilters = () => {
    if (selectedTags.length === 0) {
      setFilteredEntries(entries);
    } else {
      const filtered = entries.filter((entry) =>
        entry.tags.some((tag: string) => selectedTags.includes(tag))
      );
      setFilteredEntries(filtered);
    }
  };

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
      <Text style={styles.title}>Reflect 🌱</Text>
      <Image
        source={{
          uri: "https://doodleipsum.com/1000x300/flat?bg=007bff",
        }}
        style={styles.topImage}
      />

      <InspiringQuote />

      {/* <View style={styles.tagContainer}>
        {[...reflectionTypes, ...areasOfLife].map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tag,
              selectedTags.includes(tag) && styles.selectedTag,
            ]}
            onPress={() => toggleTag(tag)}
          >
            <Text
              style={
                selectedTags.includes(tag)
                  ? styles.selectedTagText
                  : styles.tagText
              }
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}

      <View style={{ marginBottom: 16 }}>
        <FlatList
          data={[...reflectionTypes, ...areasOfLife]}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
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

      {/* <Button title="Apply Filters" onPress={applyFilters} /> */}

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 8,
              }}
            >
              <View>
                <View style={styles.tagBadgeContainer}>
                  {item.tags.map((tag: string, index: number) => (
                    <View key={index} style={styles.tagBadge}>
                      <Text style={styles.tagBadgeText}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.content}>{item.content}</Text>
              </View>
              {item.imageUrl && (
                <View>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: 60, height: 60, borderRadius: 8 }}
                  />
                </View>
              )}
            </View>
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
  topImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tag: {
    padding: 10,
    // margin: 5,
    marginRight: 8,
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
  entry: {
    marginBottom: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
    // fontWeight: "bold",
  },
  tags: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tagBadgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagBadge: {
    backgroundColor: "#f8acff",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  tagBadgeText: {
    color: "#fff",
    fontSize: 10,
    // fontWeight: "bold",
  },
});
