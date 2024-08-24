import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const GuidanceComponent = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Based On Profile</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Higher Education</Text>
        <ScrollView horizontal contentContainerStyle={styles.horizontalScroll}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>MS In US:</Text>
            <Text style={styles.cardText}>
              Try getting a Master degree in the US which will help you to upskill your career.
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Enquire Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>GATE:</Text>
            <Text style={styles.cardText}>
              Get AIR Score and Secure a degree from Top IIT's and NIT's.
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Enquire Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>MS In UK:</Text>
            <Text style={styles.cardText}>
              Consider pursuing a Master’s degree in the UK to enhance your global career opportunities.
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Enquire Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Jobs</Text>
        <ScrollView horizontal contentContainerStyle={styles.horizontalScroll}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>RBI Grade B Officer</Text>
            <Text style={styles.cardText}>
              A RBI B grade officer is a mid-level officer in the Reserve Bank of India (RBI). The life of a RBI B grade officer involves a range of responsibilities, including managing the country’s monetary policy, regulating and supervising financial institutions, and managing foreign exchange operations.
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Enquire Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>TNTET (Tamilnadu Teacher Eligibility Test)</Text>
            <Text style={styles.cardText}>
              TNTET exam pattern 2024 is prescribed by the Teachers Recruitment Board (TRB), Tamil Nadu. The TNTET 2024 exam is conducted to determine the eligibility of the candidates for teaching posts at the primary and upper primary levels.
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Enquire Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Assistance</Text>
        <Text style={styles.sectionText}>
          Chat With Us and get Personalized Guidance and Get your doubts clarified.
        </Text>
        <TouchableOpacity style={styles.chatButton}>
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#2f3336',
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#1DA1F2',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  horizontalScroll: {
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#1C1E21',
    padding: 15,
    borderRadius: 10,
    marginRight: 15,
    width: 250,
  },
  cardTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
    color: '#AAB8C2',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1DA1F2',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  chatButton: {
    backgroundColor: '#1DA1F2',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    width: 100,
  },
  chatButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GuidanceComponent;
