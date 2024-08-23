import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // For logout icon
import { getAuth, signOut } from 'firebase/auth';

// Initialize Firebase Auth (assuming Firebase config is already set up elsewhere)
const auth = getAuth();

const MultiPageForm = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    email: '',
    dob: '',
    phone: '',
  });
  const [education10th, setEducation10th] = useState({
    marks: '',
    maths: '',
    physics: '',
    chemistry: '',
  });
  const [education12th, setEducation12th] = useState({
    marks: '',
    maths: '',
    physics: '',
    chemistry: '',
  });
  const [collegeDetails, setCollegeDetails] = useState({
    collegeName: '',
    courseBranch: '',
    course: '',
    cgpa: '',
  });
  const [skills, setSkills] = useState(['']);
  const [interests, setInterests] = useState(['']);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log({
      personalDetails,
      education10th,
      education12th,
      collegeDetails,
      skills,
      interests,
    });
    navigation.navigate('Home');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login'); // Navigate to the Login route
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <FontAwesome name="sign-out" size={24} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {currentPage === 1 && (
        <View style={styles.page}>
          <Text style={styles.title}>Personal Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={personalDetails.name}
            onChangeText={(text) => setPersonalDetails({ ...personalDetails, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Official Email ID"
            value={personalDetails.email}
            onChangeText={(text) => setPersonalDetails({ ...personalDetails, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={personalDetails.dob}
            onChangeText={(text) => setPersonalDetails({ ...personalDetails, dob: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={personalDetails.phone}
            onChangeText={(text) => setPersonalDetails({ ...personalDetails, phone: text })}
          />
          <View style={styles.buttonContainer}>
            <Button title="Next" onPress={handleNext} />
          </View>
        </View>
      )}
      {currentPage === 2 && (
        <View style={styles.page}>
          <Text style={styles.title}>10th Grade Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Marks"
            value={education10th.marks}
            onChangeText={(text) => setEducation10th({ ...education10th, marks: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Maths"
            value={education10th.maths}
            onChangeText={(text) => setEducation10th({ ...education10th, maths: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Physics"
            value={education10th.physics}
            onChangeText={(text) => setEducation10th({ ...education10th, physics: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Chemistry"
            value={education10th.chemistry}
            onChangeText={(text) => setEducation10th({ ...education10th, chemistry: text })}
          />
          <View style={styles.buttonContainer}>
            <Button title="Previous" onPress={handlePrevious} />
            <Button title="Next" onPress={handleNext} />
          </View>
        </View>
      )}
      {currentPage === 3 && (
        <View style={styles.page}>
          <Text style={styles.title}>12th Grade Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Marks"
            value={education12th.marks}
            onChangeText={(text) => setEducation12th({ ...education12th, marks: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Maths"
            value={education12th.maths}
            onChangeText={(text) => setEducation12th({ ...education12th, maths: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Physics"
            value={education12th.physics}
            onChangeText={(text) => setEducation12th({ ...education12th, physics: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Chemistry"
            value={education12th.chemistry}
            onChangeText={(text) => setEducation12th({ ...education12th, chemistry: text })}
          />
          <View style={styles.buttonContainer}>
            <Button title="Previous" onPress={handlePrevious} />
            <Button title="Next" onPress={handleNext} />
          </View>
        </View>
      )}
      {currentPage === 4 && (
        <View style={styles.page}>
          <Text style={styles.title}>College Details</Text>
          <TextInput
            style={styles.input}
            placeholder="College Name"
            value={collegeDetails.collegeName}
            onChangeText={(text) => setCollegeDetails({ ...collegeDetails, collegeName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Course Branch"
            value={collegeDetails.courseBranch}
            onChangeText={(text) => setCollegeDetails({ ...collegeDetails, courseBranch: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Course"
            value={collegeDetails.course}
            onChangeText={(text) => setCollegeDetails({ ...collegeDetails, course: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="CGPA"
            value={collegeDetails.cgpa}
            onChangeText={(text) => setCollegeDetails({ ...collegeDetails, cgpa: text })}
          />
          <View style={styles.buttonContainer}>
            <Button title="Previous" onPress={handlePrevious} />
            <Button title="Next" onPress={handleNext} />
          </View>
        </View>
      )}
      {currentPage === 5 && (
        <View style={styles.page}>
          <Text style={styles.title}>Skills & Interests</Text>
          {skills.map((skill, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Skill ${index + 1}`}
              value={skill}
              onChangeText={(text) => {
                const newSkills = [...skills];
                newSkills[index] = text;
                setSkills(newSkills);
              }}
            />
          ))}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setSkills([...skills, ''])}
          >
            <Text style={styles.addButtonText}>+ Add Skill</Text>
          </TouchableOpacity>
          {interests.map((interest, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Interest ${index + 1}`}
              value={interest}
              onChangeText={(text) => {
                const newInterests = [...interests];
                newInterests[index] = text;
                setInterests(newInterests);
              }}
            />
          ))}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setInterests([...interests, ''])}
          >
            <Text style={styles.addButtonText}>+ Add Interest</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <Button title="Previous" onPress={handlePrevious} />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Ensure background color matches the login page
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF', // Use primary color or matching color from login page
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  logoutText: {
    color: '#fff', // Ensure text color matches the button color
    marginLeft: 5,
  },
  page: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    marginVertical: 10,
  },
  addButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default MultiPageForm;
