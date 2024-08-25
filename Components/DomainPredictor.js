import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import ProgressBar from 'react-native-progress/Bar';

const DomainPredictor = () => {
  const defaultValues = {
    currentSkills: '4',
    aptitudeScore: '80',
    mathMarks: '90',
    scienceMarks: '92',
    interestsGoals: '3',
  };

  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFetchRecommendation = async () => {
    setLoading(true); // Start loading
    setProgress(0); // Reset progress

    try {
      const userData = {
        current_skills: parseInt(defaultValues.currentSkills, 10),
        aptitude_score: parseInt(defaultValues.aptitudeScore, 10),
        math_marks: parseInt(defaultValues.mathMarks, 10),
        science_marks: parseInt(defaultValues.scienceMarks, 10),
        interests_goals: parseInt(defaultValues.interestsGoals, 10),
      };

      // Use the correct IP address based on your environment
      const API_URL = 'http://192.168.29.24:8000/predict/';

      console.log('Sending request to:', API_URL);
      console.log('Request body:', userData);

      const response = await axios.post(API_URL, userData);

      console.log('API response:', response.data);

      setRecommendation(response.data.recommended_domain);
    } catch (error) {
      console.error('Error fetching recommendation:', error.message);
      Alert.alert('Error', 'There was an error fetching the recommendation.');
    } finally {
      setLoading(false); // End loading
      setProgress(1); // Ensure progress is complete
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
