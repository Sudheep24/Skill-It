import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Navbar = ({ onLogout }) => (
  <SafeAreaView className="bg-gray-800 w-full">
    <View className="flex-row justify-between items-center px-4 py-3">
      <Text className="text-white text-2xl font-bold">SKILL IT</Text>
      <TouchableOpacity
        onPress={onLogout}
        className="flex-row items-center bg-red-500 py-2 px-4 rounded-full"
      >
        <FontAwesome name="sign-out" size={20} color="#fff" />
        <Text className="text-white ml-2 text-base">Logout</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default Navbar;
