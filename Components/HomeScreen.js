import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import JobList from "./JobList";
import GuidanceComponent from "./GuidanceComponent";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const auth = getAuth();
const db = getFirestore();

const HomeScreen = () => {
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [layerButtonVisible, setLayerButtonVisible] = useState(false); // For the 3-layer button
  const [selectedTab, setSelectedTab] = useState("recommendation");
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

  const handleProfilePhotoPress = () => {
    setDropdownVisible(!dropdownVisible);
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

  const handleLayerButtonPress = () => {
    setLayerButtonVisible(!layerButtonVisible);
  };

  const handlePredictPress = () => {
    navigation.navigate("Predict");
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleProfilePhotoPress}
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
        {dropdownVisible && (
          <View style={styles.dropdownMenu}>
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

        {/* 3-Layer Button */}
        <TouchableOpacity
          style={styles.layerButton}
          onPress={handleLayerButtonPress}
        >
          <Text style={styles.layerButtonText}>Menu</Text>
        </TouchableOpacity>
        {layerButtonVisible && (
          <View style={styles.layerDropdown}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handlePredictPress}
            >
              <Text style={styles.dropdownText}>Predict</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleSignOut}
            >
              <Text style={styles.dropdownText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Tab Navigation */}
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

      {/* Content Based on Tab Selection */}
      {selectedTab === "recommendation" ? <JobList /> : <GuidanceComponent />}

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
    backgroundColor: "#000000",
    padding: 20,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  profileButton: {
    marginRight: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
  },
  dropdownMenu: {
    position: "absolute",
    top: 60,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    width: 150,
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  tabButton: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  tabText: {
    fontSize: 18,
    color: "white",
  },
  selectedTabButton: {
    backgroundColor: "#CCC098",
    elevation: 2,
  },
  selectedTab: {
    textDecorationLine: "underline",
    textDecorationColor: "#9EA58D", // Change this to your desired color
  },
  selectedTabText: {
    fontWeight: "bold",
    color: "black",
  },
  layerButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#9EA58D",
  },
  layerButtonText: {
    color: "white",
    fontSize: 16,
  },
  layerDropdown: {
    position: "absolute",
    top: 60,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    width: 100,
    zIndex: 1,
    right: 20, // Aligns to the right of the screen
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  modalButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default HomeScreen;
