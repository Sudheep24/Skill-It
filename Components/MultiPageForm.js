import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import Navbar from './NavBar';

const auth = getAuth();
const db = getFirestore();

const LoadingScreen = () => (
  <View className="absolute inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
    <ActivityIndicator size="large" color="#fff" />
    <Text className="text-white text-lg mt-2">Submitting...</Text>
  </View>
);

const MultiPageForm = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    personalDetails: { name: '', email: '', dob: '', phone: '' },
    education10th: { marks: '', maths: '', physics: '', chemistry: '' },
    education12th: { marks: '', maths: '', physics: '', chemistry: '', AptitudeScore: '' },
    collegeDetails: { collegeName: '', courseBranch: '', course: '', cgpa: '' },
    skills: [''],
    interests: [''],
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
  }
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
              <View className="w-full h-12 border border-blue-300 rounded-lg mb-3 bg-blue-700" key={index}>
                <Picker
                  selectedValue={skill}
                  onValueChange={(itemValue) => {
                    const newSkills = [...skills];
                    newSkills[index] = itemValue;
                    setFormData({ ...formData, skills: newSkills });
                  }}
                  className="text-white"
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
              <View className="w-full h-12 border border-blue-300 rounded-lg mb-3 bg-blue-700" key={index}>
                <Picker
                  selectedValue={interest}
                  onValueChange={(itemValue) => {
                    const newInterests = [...interests];
                    newInterests[index] = itemValue;
                    setFormData({ ...formData, interests: newInterests });
                  }}
                  className="text-white"
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
    <View className="flex-1 bg-gray-900">
      <Navbar onLogout={handleLogout} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        {renderPageContent()}
      </ScrollView>
      {isLoading && <LoadingScreen />}
    </View>
  );
};

const FormSection = ({ title, children }) => (
  <View className="w-11/12 flex items-center my-6 p-5 rounded-lg bg-gray-800">
    <Text className="text-3xl text-white font-semibold mb-5">{title}</Text>
    {children}
  </View>
);

const FormInput = ({ placeholder, value, onChangeText }) => (
  <TextInput
    className="w-full h-12 border border-blue-300 rounded-lg mb-4 px-4 text-white bg-gray-700"
    placeholder={placeholder}
    placeholderTextColor="#9CA3AF"
    value={value}
    onChangeText={onChangeText}
  />
);

const FormNavigation = ({ onNext, onPrevious, onSubmit }) => (
  <View className="flex-row justify-between w-full mt-8">
    {onPrevious && (
      <TouchableOpacity className="bg-blue-600 rounded-lg py-3 px-6" onPress={onPrevious}>
        <Text className="text-white text-lg">Previous</Text>
      </TouchableOpacity>
    )}
    {onNext && (
      <TouchableOpacity className="bg-blue-600 rounded-lg py-3 px-6" onPress={onNext}>
        <Text className="text-white text-lg">Next</Text>
      </TouchableOpacity>
    )}
    {onSubmit && (
      <TouchableOpacity className="bg-green-600 rounded-lg py-3 px-6" onPress={onSubmit}>
        <Text className="text-white text-lg">Submit</Text>
      </TouchableOpacity>
    )}
  </View>
);

const AddButton = ({ onPress, text }) => (
  <TouchableOpacity className="bg-green-500 rounded-lg py-3 px-6 my-4" onPress={onPress}>
    <Text className="text-white text-lg">{text}</Text>
  </TouchableOpacity>
);

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default MultiPageForm;
