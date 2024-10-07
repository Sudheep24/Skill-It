// TabNavigation.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const TabNavigation = ({ selectedTab, setSelectedTab }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          selectedTab === "recommendation" && styles.selectedTabButton,
        ]}
        onPress={() => setSelectedTab("recommendation")}
      >
        <Text
          style={[
            styles.tabText,
            selectedTab === "recommendation" && styles.selectedTabText,
          ]}
        >
          Recommendation
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButton,
          selectedTab === "guidance" && styles.selectedTabButton,
        ]}
        onPress={() => setSelectedTab("guidance")}
      >
        <Text
          style={[
            styles.tabText,
            selectedTab === "guidance" && styles.selectedTabText,
          ]}
        >
          Guidance
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
   
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  selectedTabButton: {
    backgroundColor: "#E6E9EC",
  },
  selectedTabText: {
    fontWeight: "bold",
    color: "#333",
  },
});

export default TabNavigation;
