// HomeScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity } from "react-native"; // Import TouchableOpacity here
import JobList from "./JobList";
import GuidanceComponent from "./GuidanceComponent";
import NavBar from "./NavBar";
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
      <NavBar
        userData={userData}
        setDropdownVisible={setDropdownVisible}
        dropdownVisible={dropdownVisible}
        setLayerButtonVisible={setLayerButtonVisible}
        layerButtonVisible={layerButtonVisible}
      />

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
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
