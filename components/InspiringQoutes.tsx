import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function InspiringQuote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    getQuote(); // Fetch the initial quote when the component mounts
  }, []);

  const getQuote = async () => {
    const q = await fetchQuote();
    setQuote(q);
  };

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://zenquotes.io/api/random");
      const data = await response.json();
      return data[0].q + " — " + data[0].a;
    } catch {
      return "Reflect with gratitude.";
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getQuote}>
        <Text style={styles.quote}>{quote}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  quote: {
    fontStyle: "italic",
    color: "#333",
  },
});
