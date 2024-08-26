import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker';

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

  const skillsList = ['JavaScript', 'React Native', 'Python', 'Django', 'Machine Learning'];
  const interestsList = ['Full Stack Developer', 'SDE', 'DevOps Engineer', 'Cloud Engineer'];

  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePrevious = () => setCurrentPage((prev) => prev - 1);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User is not authenticated.');
      }
  
      // Verify that all non-array fields are filled
      const allFieldsFilled = Object.values(formData).every((section) =>
        Array.isArray(section)
          ? section.every((item) => item.trim() !== '')
          : Object.values(section).every((field) => field.trim() !== '')
      );
  
      // Verify that all skills and interests are selected
      const skillsSelected = formData.skills.every((skill) => skill && skill.trim() !== '');
      const interestsSelected = formData.interests.every((interest) => interest && interest.trim() !== '');
  
      if (!allFieldsFilled || !skillsSelected || !interestsSelected) {
        throw new Error('Form data is incomplete. Please ensure all fields, skills, and interests are selected.');
      }
  
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { ...formData, formSubmitted: true }, { merge: true });
  
      console.log('Data submitted:', formData);
  
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding document: ', error.message);
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
              <FormInput
                key={key}
                placeholder={capitalize(key)}
                value={value}
                onChangeText={(text) => handleChange('personalDetails', key, text)}
              />
            ))}
            <FormNavigation onNext={handleNext} />
          </FormSection>
        );
      case 2:
        return (
          <FormSection title="10th Grade Details">
            {Object.entries(education10th).map(([key, value]) => (
              <FormInput
                key={key}
                placeholder={capitalize(key)}
                value={value}
                onChangeText={(text) => handleChange('education10th', key, text)}
              />
            ))}
            <FormNavigation onNext={handleNext} onPrevious={handlePrevious} />
          </FormSection>
        );
      case 3:
        return (
          <FormSection title="12th Grade Details">
            {Object.entries(education12th).map(([key, value]) => (
              <FormInput
                key={key}
                placeholder={capitalize(key)}
                value={value}
                onChangeText={(text) => handleChange('education12th', key, text)}
              />
            ))}
            <FormNavigation onNext={handleNext} onPrevious={handlePrevious} />
          </FormSection>
        );
      case 4:
        return (
          <FormSection title="College Details">
            {Object.entries(collegeDetails).map(([key, value]) => (
              <FormInput
                key={key}
                placeholder={capitalize(key)}
                value={value}
                onChangeText={(text) => handleChange('collegeDetails', key, text)}
              />
            ))}
            <FormNavigation onNext={handleNext} onPrevious={handlePrevious} />
          </FormSection>
        );
      case 5:
        return (
          <FormSection title="Skills & Interests">
            {skills.map((skill, index) => (
  <View style={styles.pickerContainer} key={index}>
    <Picker
      selectedValue={skill}
      onValueChange={(itemValue) => {
        const newSkills = [...skills];
        newSkills[index] = itemValue;
        setFormData({ ...formData, skills: newSkills });
      }}
      style={styles.pickerText} // Apply text color
    >
      {skillsList.map((skillOption, idx) => (
        <Picker.Item label={skillOption} value={skillOption} key={idx} />
      ))}
    </Picker>
  </View>
))}

<AddButton
  onPress={() => setFormData({ ...formData, skills: [...skills, skillsList[0]] })}
  text="+ Add Skill"
/>

{interests.map((interest, index) => (
  <View style={styles.pickerContainer} key={index}>
    <Picker
      selectedValue={interest}
      onValueChange={(itemValue) => {
        const newInterests = [...interests];
        newInterests[index] = itemValue;
        setFormData({ ...formData, interests: newInterests });
      }}
      style={styles.pickerText} // Apply text color
    >
      {interestsList.map((interestOption, idx) => (
        <Picker.Item label={interestOption} value={interestOption} key={idx} />
      ))}
    </Picker>
  </View>
))}

<AddButton
  onPress={() => setFormData({ ...formData, interests: [...interests, interestsList[0]] })}
  text="+ Add Interest"
/>
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
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor="#7F7F7F"
    value={value}
    onChangeText={onChangeText}
  />
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
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
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
    fontSize: 16,
    marginTop: 10,
  },
  pickerContainer: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
    backgroundColor: '#1E90FF', // Background color for Picker
  },
  pickerText: {
    color: '#fff', // Text color for Picker items
  },
  addButton: {
    backgroundColor: '#FF6347', // Changed to a distinct color (Tomato) for visibility
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default MultiPageForm;