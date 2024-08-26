import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { chatWithGemini } from "./ChatService";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    if (!message.trim()) return; // Prevent sending empty messages

    // Add user's message to chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", text: message },
    ]);

    setLoading(true);

    try {
      const aiResponse = await chatWithGemini(message);

      // Add AI's response to chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "model", text: aiResponse },
      ]);
    } catch (error) {
      console.error("Error communicating with AI:", error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "model",
          text: "Error communicating with AI. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {chatHistory.map((message, index) => (
          <View
            key={index}
            style={
              message.role === "user" ? styles.userMessage : styles.aiMessage
            }
          >
            <Text style={styles.messageText}>
              {message.role === "user" ? "You: " : "AI: "}
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          editable={!loading}
        />
        <Button
          title={loading ? "Sending..." : "Send"}
          onPress={() => {
            sendMessage(input);
            setInput("");
          }}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#eee",
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  userMessage: {
    backgroundColor: "#d1ffd1",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  aiMessage: {
    backgroundColor: "#d1d1ff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
});

export default Chatbot;
