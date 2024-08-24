import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import JobList from './JobList';
import GuidanceComponent from './GuidanceComponent'; // Import the new component for guidance
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const auth = getAuth();
const db = getFirestore();

const HomeScreen = () => {
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('recommendation'); // State for selected tab
  const navigation = useNavigation();

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
          <Image source={{ uri: userData?.profilePhoto || 'https://example.com/default-profile-photo.jpg' }} style={styles.profileImage} />
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

      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButton} onPress={() => setSelectedTab('recommendation')}>
          <Text style={[styles.tabText, selectedTab === 'recommendation' && styles.selectedTab]}>Recommendation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => setSelectedTab('guidance')}>
          <Text style={[styles.tabText, selectedTab === 'guidance' && styles.selectedTab]}>Guidance</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'recommendation' ? (
        <>
         
          <JobList />
        </>
      ) : (
        <GuidanceComponent />
      )}

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
    justifyContent: 'space-between',
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
    top: 60,
    backgroundColor: 'white',
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
    color: '#000',
  },
  logoutButton: {
    marginLeft: 20,
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    gap: 50,
  },
  tabButton: {
    marginHorizontal: 10,
  },
  tabText: {
    fontSize: 18,
    color: 'white',
     paddingTop: 4, 
  },
  selectedTab: {
    textDecorationLine: 'underline',
    textDecorationColor: '#0FC2C0', // Change this to your desired underline color
   // Add padding between the text and the underline
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
});

export default HomeScreen;
