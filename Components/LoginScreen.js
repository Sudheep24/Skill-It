import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // For back arrow icon
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgq4SskmQElLpZbffEfahr7_meuLwEoYw",
  authDomain: "skill-it-33ebb.firebaseapp.com",
  projectId: "skill-it-33ebb",
  storageBucket: "skill-it-33ebb.appspot.com",
  messagingSenderId: "1050592758957",
  appId: "1:1050592758957:web:ea89e434ef286f93734a24",
  measurementId: "G-K2RMZWE854"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const user = auth.currentUser;
      if (user) {
        navigation.navigate('MultiPageForm');
      }
    };

    checkUser();
  }, [navigation]);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('MultiPageForm');
    } catch (error) {
      console.error('Sign In Error:', error);
      if (error.code === 'auth/user-not-found') {
        alert('No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Incorrect password.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Invalid email address.');
      } else {
        alert('Failed to sign in. Please check your credentials.');
      }
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('MultiPageForm');
    } catch (error) {
      console.error('Register Error:', error);
      alert('Failed to register. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      {/* Local Image */}
      <Image
        source={require('../assets/logo.png')} // Path to your local image file
        style={styles.image}
      />

      {/* Title */}
      <Text style={styles.title}>Welcome To Skill IT</Text>

      {/* Google Sign-In Button */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => alert('Google Sign-In functionality has been disabled.')}
      >
        <FontAwesome name="google" size={24} color="black" />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Divider with "OR" */}
      <Text style={styles.orText}>OR</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  image: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Arial', // Changed to a normal font
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
  },
  googleButtonText: {
    marginLeft: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  orText: {
    color: '#fff',
    marginVertical: 20,
    fontSize: 18,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#fff',
  },
  signInButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  signInButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  registerButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
