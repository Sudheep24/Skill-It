import React, { useState, useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, getFirestore } from 'firebase/firestore';
import SplashScreen from './Components/SplashScreen';
import LoginScreen from './Components/LoginScreen';
import MultiPageForm from './Components/MultiPageForm';
import HomeScreen from './Components/HomeScreen';
import { name as appName } from './app.json';

const auth = getAuth();
const db = getFirestore();

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Splash');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.formSubmitted) {
            setInitialRoute('Home');
          } else {
            setInitialRoute('MultiPageForm');
          }
        } else {
          setInitialRoute('MultiPageForm'); // Default to MultiPageForm if no user data exists
        }
        setLoading(false);
      } else {
        setInitialRoute('Login');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <SplashScreen />; // Or any other loading indicator
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MultiPageForm" component={MultiPageForm} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;
