import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

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
          <Text>★</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.requirements}>
        <Text style={styles.sectionTitle}>Requirements</Text>
        <Text style={styles.requirementText}>Technical Skills:</Text>
        {requirements.map((req, index) => (
          <Text key={index} style={styles.requirementItem}>• {req}</Text>
        ))}
      </View>
      <TouchableOpacity style={styles.viewMoreButton}>
        <Text style={styles.viewMoreText}>View More</Text>
      </TouchableOpacity>
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
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  company: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  position: {
    color: 'white',
    fontSize: 14,
  },
  time: {
    color: 'gray',
    fontSize: 12,
  },
  starButton: {
    padding: 5,
  },
  requirements: {
    marginBottom: 10,
  },
  sectionTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  requirementText: {
    color: 'white',
  },
  requirementItem: {
    color: 'white',
    marginLeft: 10,
  },
  viewMoreButton: {
    alignItems: 'center',
    marginBottom: 10,
  },
  viewMoreText: {
    color: 'lightblue',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  experience: {
    color: 'white',
  },
  applyButton: {
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  applyButtonText: {
    color: 'white',
  },
});

export default JobListing;