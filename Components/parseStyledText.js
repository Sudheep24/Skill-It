import React from "react";
import { Text, View, StyleSheet } from "react-native";

const parseStyledText = (text) => {
  const patterns = [
    { regex: /\*\*([^*]+)\*\*/g, style: { fontWeight: "bold" } }, // **bold**
    { regex: /\*([^*]+)\*/g, style: { fontStyle: "italic" } }, // *italic*
    { regex: /_([^_]+)_/g, style: { textDecorationLine: "underline" } }, // _underline_
  ];

  const codePattern = /```([\s\S]+?)```/g; // Pattern for code blocks

  let elements = [];
  let lastIndex = 0;

  for (let i = 0; i < text.length; i++) {
    // Check for code block first
    codePattern.lastIndex = i;
    const codeMatch = codePattern.exec(text);

    if (codeMatch && codeMatch.index === i) {
      // Add preceding text
      if (lastIndex < codeMatch.index) {
        elements.push(text.slice(lastIndex, codeMatch.index));
      }

      // Add code block
      elements.push(
        <View key={i} style={styles.codeBlock}>
          <Text style={styles.codeText}>{codeMatch[1]}</Text>
        </View>
      );

      lastIndex = codeMatch.index + codeMatch[0].length;
      i = lastIndex - 1;
      continue;
    }

    // Apply other styles
    for (const { regex, style } of patterns) {
      regex.lastIndex = i;
      const match = regex.exec(text);

      if (match && match.index === i) {
        if (lastIndex < match.index) {
          elements.push(text.slice(lastIndex, match.index));
        }

        elements.push(
          <Text key={i} style={style}>
            {match[1]}
          </Text>
        );

        lastIndex = match.index + match[0].length;
        i = lastIndex - 1;
        break;
      }
    }
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
};

const styles = StyleSheet.create({
  codeBlock: {
    backgroundColor: "#2e2e2e",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: 282,
  },
  codeText: {
    fontFamily: "monospace",
    color: "#ffffff",
  },
});

export default parseStyledText;
