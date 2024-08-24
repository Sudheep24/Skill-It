import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import JobList from './JobList';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const auth = getAuth();
const db = getFirestore();

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
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
    navigation.navigate('Profile');
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Sign Out Error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.profileButton} onPress={handleProfilePhotoPress}>
          {/* Display user profile photo here */}
          <Image source={{ uri: 'https://example.com/profile-photo.jpg' }} style={styles.profileImage} />
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.dropdownItem} onPress={handleProfileOptionPress}>
              <Text style={styles.dropdownText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={handleSignOut}>
              <Text style={styles.dropdownText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Job Recommendations</Text>
      <JobList />

      {/* Modal for user details */}
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
                <Text style={styles.modalText}>Name: {userData.personalDetails?.name}</Text>
                <Text style={styles.modalText}>Email: {userData.personalDetails?.email}</Text>
                <Text style={styles.modalText}>Date of Birth: {userData.personalDetails?.dob}</Text>
                {/* Add more fields as needed */}
              </View>
            )}
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
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
    backgroundColor: '#000000',
    padding: 20,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Changed from 'flex-end' to 'space-between' to accommodate Logout button
    alignItems: 'center',
    paddingVertical: 10,
  },
  profileButton: {
    marginRight: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    width: 150,
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  logoutButton: {
    marginLeft: 20,
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
});

export default HomeScreen;
