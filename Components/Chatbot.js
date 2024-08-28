import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { chatWithGemini } from "./ChatService";
import { Ionicons } from "@expo/vector-icons";
import parseStyledText from "./parseStyledText"; // Ensure correct import

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", text: message },
    ]);

    setLoading(true);

    try {
      const aiResponse = await chatWithGemini(message);

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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={1}
      >
        <ScrollView
          style={styles.chatContainer}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          {chatHistory.map((message, index) => (
            <View
              key={index}
              style={
                message.role === "user"
                  ? [styles.message, styles.userMessage]
                  : [styles.message, styles.aiMessage]
              }
            >
              <Text
                style={
                  message.role === "user"
                    ? styles.userMessageText
                    : styles.aiMessageText
                }
              >
                {parseStyledText(message.text)}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Send a message..."
            placeholderTextColor="#A9A9A9"
            editable={!loading}
          />
          <TouchableOpacity
            onPress={() => {
              sendMessage(input);
              setInput("");
            }}
            disabled={loading}
            style={styles.sendButton}
          >
            <Ionicons
              name={loading ? "ellipsis-horizontal" : "send"}
              size={24}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#343541",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  message: {
    maxWidth: "90%",
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#10a37f",
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#444654",
  },
  userMessageText: {
    fontSize: 16,
    color: "#ffffff",
  },
  aiMessageText: {
    fontSize: 16,
    color: "#dcdcdc",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopColor: "#444654",
    borderTopWidth: 1,
    backgroundColor: "#40414f",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#3b3c42",
    borderRadius: 25,
    fontSize: 16,
    color: "#ffffff",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#10a37f",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chatbot;
