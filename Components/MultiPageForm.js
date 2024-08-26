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
    education12th: { marks: '', maths: '', physics: '', chemistry: '' , AptitudeScore :''},
    collegeDetails: { collegeName: '', courseBranch: '', course: '', cgpa: '' },
    skills: [''],
    interests: [' '],
    currentskills: [],
  });

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };
  const interstDic = {
    "Full Stack Software Development": 1,
    "Data Science": 2,
    "Machine Learning Engineering": 3,
    "Cybersecurity": 4,
    "Software Engineering": 5,
    "Cloud Engineering": 6,
    "Web Development": 7,
    "DevOps": 8,
    "Game Development": 9,
    "IT Support": 10
  };
  const skillDictionary = {
    "HTML": "1",
    "CSS": "2",
    "JavaScript": "3",
    "React.js": "4",
    "Angular.js": "5",
    "Node.js": "6",
    "Express.js": "7",
    "Python": "8",
    "Ruby on Rails": "9",
    "Java": "10",
    "SQL": "11",
    "NoSQL": "12",
    "MongoDB": "13",
    "Git": "14",
    "GitHub": "15",
    "Docker": "16",
    "Kubernetes": "17",
    "CI/CD pipelines": "18",
    "R": "19",
    "Pandas": "20",
    "NumPy": "21",
    "Scikit-Learn": "22",
    "TensorFlow": "23",
    "Keras": "24",
    "Matplotlib": "25",
    "Seaborn": "26",
    "Tableau": "27",
    "Hadoop": "28",
    "Spark": "29",
    "PyTorch": "30",
    "Flask": "31",
    "Regression": "32",
    "Classification": "33",
    "Clustering": "34",
    "Firewalls": "35",
    "VPNs": "36",
    "IDS/IPS": "37",
    "Encryption algorithms": "38",
    "PKI": "39",
    "Penetration testing": "40",
    "Risk analysis": "41",
    "Forensics": "42",
    "Log analysis": "43",
    "Wireshark": "44",
    "Metasploit": "45",
    "Nessus": "46",
    "C++": "47",
    "Agile": "48",
    "Scrum": "49",
    "MVC": "50",
    "Singleton": "51",
    "Factory": "52",
    "Unit Testing": "53",
    "Integration Testing": "54",
    "Selenium": "55",
    "AWS": "56",
    "Azure": "57",
    "Google Cloud": "58",
    "EC2": "59",
    "S3": "60",
    "Lambda": "61",
    "Terraform": "62",
    "CloudFormation": "63",
    "VPC": "64",
    "Load Balancers": "65",
    "DNS": "66",
    "IAM": "67",
    "Security Groups": "68",
    "Encryption": "69",
    "Vue.js": "70",
    "Django": "71",
    "GraphQL": "72",
    "Jenkins": "73",
    "Ansible": "74",
    "Puppet": "75",
    "Nagios": "76",
    "Prometheus": "77",
    "Grafana": "78",
    "Bitbucket": "79",
    "Unity": "80",
    "Unreal Engine": "81",
    "OpenGL": "82",
    "DirectX": "83",
    "Havok": "84",
    "Bullet": "85",
    "Multiplayer game networking": "86",
    "APIs": "87",
    "Windows": "88",
    "Linux": "89",
    "MacOS": "90",
    "TCP/IP": "91",
    "PC assembly": "92",
    "Peripheral troubleshooting": "93",
    "OS issues": "94",
    "Application errors": "95",
    "TeamViewer": "96",
    "Remote Desktop": "97"
  };

  const skillsList = [
    "HTML", "CSS", "JavaScript", "React.js", "Angular.js", "Node.js", 
    "Express.js", "Python", "Ruby on Rails", "Java", "SQL", "NoSQL", 
    "MongoDB", "Git", "GitHub", "Docker", "Kubernetes", "CI/CD pipelines", 
    "R", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "Keras", 
    "Matplotlib", "Seaborn", "Tableau", "Hadoop", "Spark", "PyTorch", 
    "Flask", "Regression", "Classification", "Clustering", "Firewalls", 
    "VPNs", "IDS/IPS", "Encryption algorithms", "PKI", "Penetration testing", 
    "Risk analysis", "Forensics", "Log analysis", "Wireshark", "Metasploit", 
    "Nessus", "C++", "Agile", "Scrum", "MVC", "Singleton", "Factory", 
    "Unit Testing", "Integration Testing", "Selenium", "AWS", "Azure", 
    "Google Cloud", "EC2", "S3", "Lambda", "Terraform", "CloudFormation", 
    "VPC", "Load Balancers", "DNS", "IAM", "Security Groups", "Encryption", 
    "Vue.js", "Django", "GraphQL", "Jenkins", "Ansible", "Puppet", "Nagios", 
    "Prometheus", "Grafana", "Bitbucket", "Unity", "Unreal Engine", "OpenGL", 
    "DirectX", "Havok", "Bullet", "Multiplayer game networking", "APIs", 
    "Windows", "Linux", "MacOS", "TCP/IP", "PC assembly", 
    "Peripheral troubleshooting", "OS issues", "Application errors", 
    "TeamViewer", "Remote Desktop"
  ];

  const interestsList = ["Full Stack Software Development",
  "Data Science",
  "Machine Learning Engineering",
  "Cybersecurity",
  "Software Engineering",
  "Cloud Engineering",
  "Web Development",
  "DevOps",
  "Game Development",
  "IT Support"];
 
  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePrevious = () => setCurrentPage((prev) => prev - 1);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User is not authenticated.');
      }
      const currentSkills = formData.skills.map(skill => skillDictionary[skill]);
      // Verify that all non-array fields are filled
      const skillgoals = interstDic[formData.interests[0]];
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
      await setDoc(userRef, { ...formData, skillgoals: skillgoals, currentskills: currentSkills, formSubmitted: true }, { merge: true });
  
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