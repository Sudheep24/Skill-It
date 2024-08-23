import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Components/SplashScreen';
import LoginScreen from './Components/LoginScreen';
import MultiPageForm from './Components/MultiPageForm'; // Ensure this component is correctly implemented
import HomeScreen from './Components/HomeScreen';
import { name as appName } from './app.json'; // Adjust path if necessary

AppRegistry.registerComponent(appName, () => App); // Ensure this component is correctly implemented

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MultiPageForm" component={MultiPageForm} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
