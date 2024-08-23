import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navigate to the Login screen after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer when component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>Welcome to MyApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Customize background color
  },
  logo: {
    width: 150, // Adjust logo size as needed
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
