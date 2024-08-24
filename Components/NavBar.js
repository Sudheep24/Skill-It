// Navbar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Navbar = ({ onLogout }) => (
  <View style={styles.navbar}>
    <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
      <FontAwesome name="sign-out" size={24} color="#fff" />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1C1C1C',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#393939',
    padding: 10,
    borderRadius: 25,
  },
  logoutText: {
    color: '#fff',
    marginLeft: 5,
  },
});

export default Navbar;