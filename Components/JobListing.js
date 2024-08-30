import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const JobListing = ({ company, position, time, logo, requirements, experience }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.headerText}>
          <Text style={styles.company}>{company}</Text>
          <Text style={styles.position}>{position}</Text>
          <Text style={styles.time}>{time} · Hiring</Text>
        </View>
        <TouchableOpacity style={styles.starButton}>
          <Text style={styles.starText}>★</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.requirements}>
        <Text style={styles.sectionTitle}>Requirements</Text>
        {requirements.map((req, index) => (
          <Text key={index} style={styles.requirementItem}>• {req}</Text>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.experience}>Experience: {experience}</Text>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 5,
  },
  headerText: {
    flex: 1,
  },
  company: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 18,
  },
  position: {
    color: '#666666',
    fontSize: 16,
  },
  time: {
    color: '#888888',
    fontSize: 14,
  },
  starButton: {
    padding: 5,
  },
  starText: {
    fontSize: 18,
    color: '#FFD700',
  },
  requirements: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#333333',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  requirementItem: {
    color: '#555555',
    marginLeft: 10,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  experience: {
    color: '#333333',
    fontSize: 14,
  },
  applyButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default JobListing;
