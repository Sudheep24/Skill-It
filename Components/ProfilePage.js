import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import tw from 'twrnc'; // Tailwind React Native for styling

const auth = getAuth();
const db = getFirestore();

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setError('No data found for this user.');
          }
        } else {
          setError('No user is currently signed in.');
        }
      } catch (err) {
        setError('Failed to fetch data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-800`}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-800`}>
        <Text style={tw`text-red-500 text-lg`}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-900`}>
      <ScrollView contentContainerStyle={tw`flex-grow`}>

        {/* Top Banner */}
        <View style={tw`relative`}>
          <Image source={{ uri: 'https://via.placeholder.com/1500x500' }} style={styles.bannerImage} />
          <View style={styles.profileContainer}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Connect</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Information */}
        <View style={tw`p-5`}>
          <Text style={tw`text-3xl text-white mb-5 font-bold`}>John Doe</Text>
          <Text style={tw`text-lg text-gray-400 mb-5`}>Software Engineer at XYZ Company</Text>

          {/* Personal Details Section */}
          <ProfileSection icon={<MaterialIcons name="person-outline" size={24} color="white" />} title="Personal Details">
            <Text style={tw`text-white mb-1`}>Name: {userData.personalDetails?.name}</Text>
            <Text style={tw`text-white mb-1`}>Email: {userData.personalDetails?.email}</Text>
            <Text style={tw`text-white mb-1`}>Date of Birth: {userData.personalDetails?.dob}</Text>
            <Text style={tw`text-white mb-1`}>Phone: {userData.personalDetails?.phone}</Text>
          </ProfileSection>

          {/* Education Details Section */}
          <ProfileSection icon={<FontAwesome5 name="graduation-cap" size={24} color="white" />} title="Education">
            <Text style={tw`text-white mb-1`}>10th Grade Marks: {userData.education10th?.marks}</Text>
            <Text style={tw`text-white mb-1`}>12th Grade Marks: {userData.education12th?.marks}</Text>
            <Text style={tw`text-white mb-1`}>College: {userData.collegeDetails?.collegeName}</Text>
            <Text style={tw`text-white mb-1`}>Branch: {userData.collegeDetails?.courseBranch}</Text>
            <Text style={tw`text-white mb-1`}>CGPA: {userData.collegeDetails?.cgpa}</Text>
          </ProfileSection>

          {/* Skills Section */}
          <ProfileSection icon={<Entypo name="tools" size={24} color="white" />} title="Skills">
            <Text style={tw`text-white mb-1`}>{userData.skills?.join(', ')}</Text>
          </ProfileSection>

          {/* Interests Section */}
          <ProfileSection icon={<MaterialIcons name="interests" size={24} color="white" />} title="Interests">
            <Text style={tw`text-white mb-1`}>{userData.interests?.join(', ')}</Text>
          </ProfileSection>
        </View>
      </ScrollView>
    </View>
  );
};

// ProfileSection Component for each section
const ProfileSection = ({ icon, title, children }) => (
  <View style={tw`mb-5 p-5 bg-gray-800 rounded-lg`}>
    <View style={tw`flex-row items-center mb-3`}>
      {icon}
      <Text style={tw`text-xl text-white ml-2 font-semibold`}>{title}</Text>
    </View>
    {children}
  </View>
);

// Styles for Banner and Profile Image
const styles = StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  profileContainer: {
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    alignItems: 'center', // Center the profile image horizontally
    justifyContent: 'center', // Center the profile image vertically (if needed)
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'space-evenly', // Evenly distribute buttons in the container
    alignItems: 'center', // Center align buttons vertically
    marginTop: 40, // Add space above the button container
    paddingHorizontal: 10, // Add some padding on the sides
  },
  button: {
    backgroundColor: '#FDFDFD', // Button background color
    borderRadius: 30, // Rounded corners
    borderWidth: 1, // Border width
    borderColor: '#8F9092', // Border color
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    marginHorizontal: 8, // Space between buttons
    shadowColor: '#D6D7D9', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 6, // Shadow radius
    elevation: 5, // Android shadow
  },
  buttonText: {
    color: '#606060', // Text color
    fontSize: 14, // Font size
    fontWeight: '600', // Font weight
    textAlign: 'center', // Center text horizontally
  },
});

export default ProfileScreen;
