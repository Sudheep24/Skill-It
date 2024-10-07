import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import JobList from "./JobList";
import GuidanceComponent from "./GuidanceComponent";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons

const auth = getAuth();
const db = getFirestore();

const HomeScreen = () => {
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [layerButtonVisible, setLayerButtonVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("recommendation");
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchData();
  }, []);

  const handleLayerButtonPress = () => {
    setLayerButtonVisible(!layerButtonVisible);
    setDropdownVisible(false); // Close the profile dropdown
  };

  const handleProfilePhotoPress = () => {
    setDropdownVisible(!dropdownVisible);
    setLayerButtonVisible(false); // Close the menu dropdown
  };

  const handleProfileOptionPress = () => {
    setDropdownVisible(false);
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
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.navBar}>
        {/* Hamburger Menu Button */}
        <TouchableOpacity
          onPress={handleLayerButtonPress}
          style={styles.hamburgerMenuButton}
        >
          <Icon name="menu" size={30} color="#333" />
        </TouchableOpacity>
        {layerButtonVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handlePredictPress}
            >
              <Text style={styles.dropdownText}>Predict</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Profile Button */}
        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleProfilePhotoPress}
        >
          <Image
            source={{
              uri:
                userData?.profilePhoto ||
                "https://media.cnn.com/api/v1/images/stellar/prod/211227135008-02-the-batman-trailer.jpg?q=h_1406,w_2500,x_0,y_0",
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdownMenuProfile}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleProfileOptionPress}
            >
              <Text style={styles.dropdownText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleSignOut}
            >
              <Text style={styles.dropdownText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Content Based on Tab Selection */}
      <View style={styles.content}>
        {selectedTab === "recommendation" ? <JobList /> : <GuidanceComponent />}
      </View>

      {/* Bottom Tab Navigation */}
      <TabNavigation
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      {/* Modal for User Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {userData && (
              <View>
                <Text style={styles.modalTitle}>Your Details</Text>
                <Text style={styles.modalText}>
                  Name: {userData.personalDetails?.name}
                </Text>
                <Text style={styles.modalText}>
                  Email: {userData.personalDetails?.email}
                </Text>
                <Text style={styles.modalText}>
                  Date of Birth: {userData.personalDetails?.dob}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F4", // Slightly lighter grey
    padding: 15,
    paddingTop: 25,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  hamburgerMenuButton: {
    padding: 5,
  },
  profileButton: {
    marginLeft: 20,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "grey",
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderColor: "#E0E0E0",
    borderWidth: 1,
  },
  dropdownMenu: {
    position: "absolute",
    top: 60,
    left: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    width: 140,
    zIndex: 1,
  },
  dropdownMenuProfile: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    width: 140,
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "85%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  modalButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
  },
});

export default HomeScreen;
