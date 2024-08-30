// NavBar.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const auth = getAuth();

const NavBar = ({ userData }) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Sign Out Error: ", error);
    }
  };

  const handlePredictPress = () => {
    navigation.navigate("Predict");
  };

  return (
    <View style={styles.navBar}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "https://example.com/logo.png" }} // Replace with your logo URL
          style={styles.logo}
        />
      </View>

      {/* Menu Button */}
      <TouchableOpacity
        style={styles.layerButton}
        onPress={handlePredictPress}
      >
        <Text style={styles.layerButtonText}>Predict</Text>
      </TouchableOpacity>

      {/* Profile Button and Sign Out */}
      <View style={styles.profileContainer}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleProfilePress}
        >
          <Image
            source={{
              uri:
                userData?.profilePhoto ||
                "https://example.com/default-profile-photo.jpg",
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "center", // Center horizontally
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF", // White background for the header
    borderBottomWidth: 1,
    borderBottomColor: "#E6E9EC", // Subtle bottom border
    elevation: 6, // Adds a shadow to the navbar
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 130, // Adjust size as needed
    height: 45,
    resizeMode: "contain",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  profileButton: {
    marginRight: 15, // Spacing between profile image and sign out button
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#F3F4F6", // Light grey background
    borderColor: "#E6E9EC",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  signOutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#E74C3C", // Red color for sign-out button
    alignItems: "center",
    justifyContent: "center",
  },
  signOutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700", // Bold for better visibility
  },
  layerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#0077B5", // LinkedIn's blue color
    alignItems: "center",
    justifyContent: "center",
  },
  layerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700", // Bold for better readability
  },
});

export default NavBar;
