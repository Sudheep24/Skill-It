import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import skillNames from "./skillNames.json"; // Import the local JSON file for skill names
import domainSkills from "./domainSkills.json"; // Import the local JSON file for domain skills

const GuidanceComponent = () => {
  const [missingSkills, setMissingSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Initialize useNavigation hook

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        console.log("User is logged in:", user.uid); // Log user ID
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("User data fetched:", userData); // Log user data
            const userSkills = userData.currentSkills || [];
            const interestedDomain = userData.interests[0] || "";

            console.log("User skills:", userSkills);
            console.log("Interested domain:", interestedDomain);

            const requiredSkills = domainSkills[interestedDomain] || [];
            console.log("Required skills for domain:", requiredSkills);

            // Calculate missing skills
            const missing = requiredSkills.filter(
              (skill) => !userSkills.includes(skill)
            );
            console.log("Missing skills:", missing);

            // Map missing skill numbers to their names using the skillNames JSON file
            const mappedMissingSkills = missing.map(
              (skill) => skillNames[skill] || "Unknown Skill"
            );
            console.log("Mapped missing skills:", mappedMissingSkills);

            setMissingSkills(mappedMissingSkills); // Update state with missing skills
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        } finally {
          setLoading(false); // Set loading to false after data is fetched
        }
      } else {
        console.log("No user is logged in");
        setLoading(false); // Set loading to false if no user is logged in
      }
    };

    fetchUserData();
  }, [auth, db]); // Added auth and db as dependencies

  if (loading) {
    return <Text>Loading...</Text>;
  }
  const handleChatbotPress = () => {
    navigation.navigate("Chatbot");
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Based On Your Profile</Text>

        {/* Render Missing Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Required Skills to Achieve Your Goal
          </Text>
          {missingSkills.length > 0 ? (
            <View style={styles.skillsContainer}>
              {missingSkills.map((skill, index) => (
                <View key={index} style={styles.skillCard}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.skillText}>
              You have all the required skills!
            </Text>
          )}
        </View>

        {/* Other sections (Higher Education, Jobs, Personal Assistance) */}
        {/* Omitted for brevity, the rest of your component remains unchanged */}
      </ScrollView>

      {/* Chatbot Button */}
      <TouchableOpacity
        style={styles.chatbotButton}
        onPress={handleChatbotPress} // Navigate to ChatbotComponent
      >
        <Image
          source={require("../assets/chatbot-icon.png")} // Replace with your chatbot icon
          style={styles.chatbotIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 100, // Add padding at the bottom to ensure content is not hidden by the chatbot button
  },
  title: {
    fontSize: 28,
    color: "black",
    marginBottom: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#2f3336",
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    color: "black",
    marginBottom: 15,
    fontWeight: "bold",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  skillCard: {
    backgroundColor: "#2f3336",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    margin: 5,
    minWidth: "30%",
    alignItems: "center",
  },
  skillText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  chatbotButton: {
    position: "absolute",
    bottom: 30, // Adjust to position the button slightly up from the bottom edge
    right: 20, // Position button from the right edge
    backgroundColor: "transparent", // Ensure the button's background is transparent
    borderRadius: 50,
    padding: 10,
    elevation: 5, // Optional: Add shadow for better visibility
    zIndex: 1000, // Ensure it appears above other components
  },
  chatbotIcon: {
    width: 60, // Adjust width to fit the icon size
    height: 60, // Adjust height to fit the icon size
    borderRadius: 30, // Half of the width/height to make it round
  },
});

export default GuidanceComponent;
