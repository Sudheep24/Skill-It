import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login"); // Navigate to the Login screen after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer when component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")} // Use 'require' for local images
        style={styles.logo}
      />
      <Text style={styles.title}>Skill It</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black", // Light grey background similar to LinkedIn
  },
  logo: {
    width: 150, // Adjust logo size as needed
    height: 150,
    resizeMode: "contain", // Ensure the image maintains aspect ratio
    marginBottom: 20,
  },
  title: {
    fontSize: 28, // Larger font size for better visibility
    fontWeight: "bold",
    color: "white", // Darker text color for better contrast
  },
});

export default SplashScreen;
