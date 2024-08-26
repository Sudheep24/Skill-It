import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import JobListing from "./JobListing";

const JobList = () => {
  const jobs = [
    {
      company: "Amazon",
      position: "Full Stack Developer",
      time: "5min",
      logo: require("../assets/amazon.jpg"),
      requirements: [
        "Proficiency in JavaScript, TypeScript, and at least one backend language (e.g., Java, Python, Node.js).",
        "Experience with React, Angular, or Vue.js.",
      ],
      experience: "Fresher",
    },
    {
      company: "Microsoft",
      position: "Software Engineer",
      time: "1hr",
      logo: require("../assets/amazon.jpg"),
      requirements: [
        "Proficiency in JavaScript, TypeScript, and at least one backend language (e.g., Java, Python, Node.js).",
        "Experience with React, Angular, or Vue.js.",
      ],
      experience: "Fresher",
    },
    {
      company: "Google",
      position: "Business Analyst",
      time: "5min",
      logo: require("../assets/amazon.jpg"),
      requirements: [
        "Proficiency in JavaScript, TypeScript, and at least one backend language (e.g., Java, Python, Node.js).",
        "Experience with React, Angular, or Vue.js.",
      ],
      experience: "1 or 2 Years",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {jobs.map((job, index) => (
        <JobListing key={index} {...job} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 10,
  },
});

export default JobList;
