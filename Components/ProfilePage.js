import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

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
    return <ActivityIndicator size="large" color="#ffffff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {userData && (
          <View>
            <Text style={styles.title}>Profile Details</Text>
            <Text style={styles.text}>Name: {userData.personalDetails?.name}</Text>
            <Text style={styles.text}>Email: {userData.personalDetails?.email}</Text>
            <Text style={styles.text}>Date of Birth: {userData.personalDetails?.dob}</Text>
            <Text style={styles.text}>Phone: {userData.personalDetails?.phone}</Text>
            <Text style={styles.text}>10th Grade Marks: {userData.education10th?.marks}</Text>
            <Text style={styles.text}>12th Grade Marks: {userData.education12th?.marks}</Text>
            <Text style={styles.text}>College Name: {userData.collegeDetails?.collegeName}</Text>
            <Text style={styles.text}>Course Branch: {userData.collegeDetails?.courseBranch}</Text>
            <Text style={styles.text}>CGPA: {userData.collegeDetails?.cgpa}</Text>
            <Text style={styles.text}>Skills: {userData.skills?.join(', ')}</Text>
            <Text style={styles.text}>Interests: {userData.interests?.join(', ')}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default ProfileScreen;
