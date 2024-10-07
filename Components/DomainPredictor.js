import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import ProgressBar from 'react-native-progress/Bar';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const DomainPredictor = () => {
  const [defaultValues, setDefaultValues] = useState({
    currentSkills: [], 
    aptitudeScore: '9',
    mathMarks: '70',
    scienceMarks: '100',
    interestsGoals: '2',
  });

  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('Fetched user data:', userData);
            setDefaultValues({
              currentSkills: userData.currentskills || [],
              aptitudeScore: userData["education12th"]?.AptitudeScore || '9',
              mathMarks: userData["education12th"]?.maths || '70',
              scienceMarks: userData["education12th"]?.physics || '100',
              interestsGoals: userData.skillgoals || '2',
            });
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      } else {
        console.log('No user is logged in');
      }
    };

    fetchUserData();
  }, []);
const handleFetchRecommendation = async () => {
  setLoading(true);
  setProgress(0.1); // Start progress at 10%

  try {
    const userData = {
      current_skills: defaultValues.currentSkills.map(skill => parseInt(skill, 10)),
      aptitude_score: parseInt(defaultValues.aptitudeScore, 10),
      math_marks: parseInt(defaultValues.mathMarks, 10),
      science_marks: parseInt(defaultValues.scienceMarks, 10),
      interests_goals: parseInt(defaultValues.interestsGoals, 10),
    };

    console.log('Sending request to API:', userData);

    const API_URL = 'https://domain-model-1.onrender.com/recommend-domain';
    const response = await axios.post(API_URL, userData, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

    console.log('API response:', response.data);

    setRecommendation(response.data.recommended_domain || 'No recommendation available');
  } catch (error) {
    console.error('Error fetching recommendation:', error.message);
    Alert.alert('Error', 'There was an error fetching the recommendation.');
  } finally {
    setLoading(false);
    setProgress(1); // End progress at 100%
  }
};
  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <Text>Fetching recommendation...</Text>
          <ProgressBar
            progress={progress}
            width={300}
            height={10}
            borderRadius={5}
            color="#3498db"
            style={styles.progressBar}
          />
        </>
      ) : (
        <>
          {recommendation ? (
            <Text style={styles.recommendation}>Recommended Domain: {recommendation}</Text>
          ) : (
            <Text>No recommendation available yet.</Text>
          )}
          <Button title="Fetch Recommendation" onPress={handleFetchRecommendation} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  recommendation: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    marginTop: 20,
  },
});

export default DomainPredictor;
