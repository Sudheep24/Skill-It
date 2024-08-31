import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import JobListing from "./JobListing";

// Helper function to shuffle array
const shuffleArray = (array) => {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const JobList = () => {
  const jobs = [
    {
      type: "job",
      company: "Amazon",
      position: "Full Stack Developer",
      time: "5min",
      logo: require("../assets/amazon.png"),
      requirements: [
        "Proficiency in JavaScript, TypeScript, and at least one backend language (e.g., Java, Python, Node.js).",
        "Experience with React, Angular, or Vue.js.",
      ],
      experience: "Fresher",
    },
    {
      type: "job",
      company: "Microsoft",
      position: "Software Engineer",
      time: "1hr",
      logo: require("../assets/amazon.png"),
      requirements: [
        "Proficiency in JavaScript, TypeScript, and at least one backend language (e.g., Java, Python, Node.js).",
        "Experience with React, Angular, or Vue.js.",
      ],
      experience: "Fresher",
    },
    {
      type: "job",
      company: "Google",
      position: "Business Analyst",
      time: "5min",
      logo: require("../assets/amazon.png"),
      requirements: [
        "Proficiency in JavaScript, TypeScript, and at least one backend language (e.g., Java, Python, Node.js).",
        "Experience with React, Angular, or Vue.js.",
      ],
      experience: "1 or 2 Years",
    },
    {
      type: "video",
      title: "Learn Full Stack Development in 2024",
      channel: "Code Academy",
      thumbnail: require("../assets/chatbot-icon.png"),
      videoUrl: "https://www.youtube.com/watch?v=12345",
    },
    {
      type: "video",
      title: "JavaScript Best Practices",
      channel: "Tech Talks",
      thumbnail: require("../assets/chatbot-icon.png"),
      videoUrl: "https://www.youtube.com/watch?v=67890",
    },
    {
      type: "video",
      title: "React Native Tutorial for Beginners",
      channel: "Dev Journey",
      thumbnail: require("../assets/chatbot-icon.png"),
      videoUrl: "https://www.youtube.com/watch?v=ABCDE",
    },
  ];

  // State to store the shuffled list
  const [combinedList, setCombinedList] = useState(jobs);

  useEffect(() => {
    // Shuffle jobs and videos only once when the component is mounted
    setCombinedList(shuffleArray(jobs));
  }, []);

  return (
    <ScrollView style={styles.container}>
      {combinedList.map((item, index) => {
        if (item.type === "job") {
          return <JobListing key={index} {...item} />;
        } else if (item.type === "video") {
          return (
            <View key={index} style={styles.videoCard}>
              <View style={styles.videoHeader}>
                <Image source={item.thumbnail} style={styles.videoThumbnail} />
                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle}>{item.title}</Text>
                  <Text style={styles.videoChannel}>{item.channel}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.watchButton}
                onPress={() => Linking.openURL(item.videoUrl)}
              >
                <Text style={styles.watchButtonText}>Watch Video</Text>
              </TouchableOpacity>
            </View>
          );
        }
        return null;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 20,
    backgroundColor: "white",
  },
  videoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 20,
    padding: 15,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  videoHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  videoThumbnail: {
    width: 120,
    height: 90,
    borderRadius: 8,
  },
  videoInfo: {
    flex: 1,
    marginLeft: 15,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  videoChannel: {
    fontSize: 14,
    color: "#555",
  },
  watchButton: {
    backgroundColor: "#0073b1", // LinkedIn blue color
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
  },
  watchButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default JobList;
