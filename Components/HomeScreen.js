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
  const [layerButtonVisible, setLayerButtonVisible] = useState(false);
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
      <View style={styles.navBar}>
        {/* Menu Button */}
        <TouchableOpacity
          style={styles.layerButton}
          onPress={handleLayerButtonPress}
        >
          <Text style={styles.layerButtonText}>Menu</Text>
        </TouchableOpacity>
        {layerButtonVisible && (
          <View style={[styles.dropdownMenu, { left: 0 }]}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handlePredictPress}
            >
              <Text style={styles.dropdownText}>Predict</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Profile Button */}
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
          <View style={[styles.dropdownMenuProfile, { right: 0 }]}>
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
    backgroundColor: "#F3F2EF", // Light grey background similar to LinkedIn
    padding: 10,
    paddingTop: 20,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  profileButton: {
    marginLeft: 30,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "grey",
  },
  dropdownMenu: {
    position: "absolute",
    top: 60, // Adjust this value if needed
    left: 0,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    width: 150,
    zIndex: 1,
  },
  dropdownMenuProfile: {
    position: "absolute",
    top: 60, // Adjust this value if needed
    right: 0,
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
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
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
  layerButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#9EA58D",
    position: "relative",
  },
  layerButtonText: {
    color: "white",
    fontSize: 16,
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
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalButton: {
    backgroundColor: "#0A66C2",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default HomeScreen;
