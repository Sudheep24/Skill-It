import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import Navbar from './NavBar';

const auth = getAuth();
const db = getFirestore();

const LoadingScreen = () => (
  <View style={styles.loadingScreen}>
    <ActivityIndicator size="large" color="#fff" />
    <Text style={styles.loadingText}>Submitting...</Text>
  </View>
);

const MultiPageForm = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    personalDetails: { name: '', email: '', dob: '', phone: '' },
    education10th: { marks: '', maths: '', physics: '', chemistry: '' },
    education12th: { marks: '', maths: '', physics: '', chemistry: '' },
    collegeDetails: { collegeName: '', courseBranch: '', course: '', cgpa: '' },
    skills: [''],
    interests: [''],
  });

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePrevious = () => setCurrentPage((prev) => prev - 1);

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User is not authenticated.');
    }

    // Verify that formData is defined and contains required fields
    console.log('Form Data:', formData);

    // Check if `formData` has required fields
    if (!formData || !formData.someField) {
      throw new Error('Form data is incomplete.');
    }

    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, { ...formData, formSubmitted: true }, { merge: true });

    console.log('Data submitted:', formData);

    navigation.navigate('Home');
  } catch (error) {
    console.error('Error adding document: ', error);
  } finally {
    setIsLoading(false);
  }
};



  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const renderPageContent = () => {
    const { personalDetails, education10th, education12th, collegeDetails, skills, interests } = formData;
    switch (currentPage) {
      case 1:
        return (
          <FormSection title="Personal Details">
            {Object.entries(personalDetails).map(([key, value]) => (
              <FormInput key={key} placeholder={capitalize(key)} value={value} onChangeText={(text) => handleChange('personalDetails', key, text)} />
            ))}
            <FormNavigation onNext={handleNext} />
          </FormSection>
        );
      case 2:
        return (
          <FormSection title="10th Grade Details">
            {Object.entries(education10th).map(([key, value]) => (
              <FormInput key={key} placeholder={capitalize(key)} value={value} onChangeText={(text) => handleChange('education10th', key, text)} />
            ))}
            <FormNavigation onNext={handleNext} onPrevious={handlePrevious} />
          </FormSection>
        );
      case 3:
        return (
          <FormSection title="12th Grade Details">
            {Object.entries(education12th).map(([key, value]) => (
              <FormInput key={key} placeholder={capitalize(key)} value={value} onChangeText={(text) => handleChange('education12th', key, text)} />
            ))}
            <FormNavigation onNext={handleNext} onPrevious={handlePrevious} />
          </FormSection>
        );
      case 4:
        return (
          <FormSection title="College Details">
            {Object.entries(collegeDetails).map(([key, value]) => (
              <FormInput key={key} placeholder={capitalize(key)} value={value} onChangeText={(text) => handleChange('collegeDetails', key, text)} />
            ))}
            <FormNavigation onNext={handleNext} onPrevious={handlePrevious} />
          </FormSection>
        );
      case 5:
        return (
          <FormSection title="Skills & Interests">
            {skills.map((skill, index) => (
              <FormInput
                key={index}
                placeholder={`Skill ${index + 1}`}
                value={skill}
                onChangeText={(text) => {
                  const newSkills = [...skills];
                  newSkills[index] = text;
                  setFormData({ ...formData, skills: newSkills });
                }}
              />
            ))}
            <AddButton onPress={() => setFormData({ ...formData, skills: [...skills, ''] })} text="+ Add Skill" />
            {interests.map((interest, index) => (
              <FormInput
                key={index}
                placeholder={`Interest ${index + 1}`}
                value={interest}
                onChangeText={(text) => {
                  const newInterests = [...interests];
                  newInterests[index] = text;
                  setFormData({ ...formData, interests: newInterests });
                }}
              />
            ))}
            <AddButton onPress={() => setFormData({ ...formData, interests: [...interests, ''] })} text="+ Add Interest" />
            <FormNavigation onSubmit={handleSubmit} onPrevious={handlePrevious} />
          </FormSection>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Navbar onLogout={handleLogout} />
      <View style={styles.centerContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {renderPageContent()}
        </ScrollView>
      </View>
      {isLoading && <LoadingScreen />}
    </View>
  );
};

const FormSection = ({ title, children }) => (
  <View style={styles.page}>
    <Text style={styles.title}>{title}</Text>
    {children}
  </View>
);

const FormInput = ({ placeholder, value, onChangeText }) => (
  <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor="#7F7F7F" value={value} onChangeText={onChangeText} />
);

const FormNavigation = ({ onNext, onPrevious, onSubmit }) => (
  <View style={styles.buttonContainer}>
    {onPrevious && (
      <TouchableOpacity style={styles.navButton} onPress={onPrevious}>
        <Text style={styles.navButtonText}>Previous</Text>
      </TouchableOpacity>
    )}
    {onNext && (
      <TouchableOpacity style={styles.navButton} onPress={onNext}>
        <Text style={styles.navButtonText}>Next</Text>
      </TouchableOpacity>
    )}
    {onSubmit && (
      <TouchableOpacity style={styles.navButton} onPress={onSubmit}>
        <Text style={styles.navButtonText}>Submit</Text>
      </TouchableOpacity>
    )}
  </View>
);

const AddButton = ({ onPress, text }) => (
  <TouchableOpacity style={styles.addButton} onPress={onPress}>
    <Text style={styles.addButtonText}>{text}</Text>
  </TouchableOpacity>
);

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  page: {
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#3E3E3E',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: '#fff',
    backgroundColor: '#1C1C1C',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  navButton: {
    backgroundColor: '#393939',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#1C1C1C',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  loadingScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
});

export default MultiPageForm;