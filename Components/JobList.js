import React from "react";
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
      logo: {
        uri: "https://cdn.vox-cdn.com/thumbor/qwYo7XAE3Loy8QPMmJjRKrCLWAY=/0x0:2040x1360/1200x628/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/23935561/acastro_STK103__04.jpg",
      },
      requirements: [
        "Proficiency in JavaScript, TypeScript, and at least one backend language (e.g., Java, Python, Node.js).",
        "Experience with React, Angular, or Vue.js.",
      ],
      experience: "Fresher",
      applyUrl: "https://www.amazon.jobs/en/jobs/123456", // Add apply URL here
    },
    {
      type: "job",
      company: "Microsoft",
      position: "Software Engineer",
      time: "1hr",
      logo: {
        uri: "https://bsmedia.business-standard.com/_media/bs/img/article/2023-06/06/full/1686046036-9475.jpeg",
      },
      requirements: [
        "Proficiency in JavaScript, TypeScript, and at least one backend language (e.g., Java, Python, Node.js).",
        "Experience with React, Angular, or Vue.js.",
      ],
      experience: "Fresher",
      applyUrl: "https://careers.microsoft.com/virtualjobfair", // Add apply URL here
    },
    {
      type: "job",
      company: "Google",
      position: "Business Analyst",
      time: "5min",
      logo: {
        uri: "https://cdn.vox-cdn.com/thumbor/DZh9VoCJ3ci4j3nCI-HmwWVLByk=/0x0:2040x1360/1400x1050/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/24016885/STK093_Google_04.jpg",
      },
      requirements: [
        "Proficiency in JavaScript, TypeScript, and at least one backend language (e.g., Java, Python, Node.js).",
        "Experience with React, Angular, or Vue.js.",
      ],
      experience: "1 or 2 Years",
      applyUrl: "https://careers.google.com/jobs/results/1234567890", // Add apply URL here
    },
    {
      type: "job",
      company: "NPTEL",
      position: "Mobile Application Development",
      time: "Upcoming",
      logo: {
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8VRmuwZhG40QDxM_IF9klXkzNA96GmX1z2Q&s",
      },
      requirements: [
        "Experience in mobile application development.",
        "Knowledge of React Native or Flutter.",
      ],
      experience: "Varies",
      applyUrl: "https://nptel.ac.in/courses/123456789", // Add apply URL here
    },
    {
      type: "job",
      company: "Naan Mudhalvan and Open Mentor Trust",
      position: "Free Full Stack and Software Testing Training Program",
      time: "Ongoing",
      logo: {
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsMxxGsCr27cJafqIAAkzYPfZDKPDwfK7XpA&s",
      },
      requirements: [
        "Interest in full stack development and software testing.",
        "No prior experience required.",
      ],
      experience: "Beginner-friendly",
      applyUrl: "https://example.com/training-program", // Add apply URL here
    },
    {
      type: "video",
      title: "Learn Full Stack Development in 2024",
      channel: "Code Academy",
      thumbnail: {
        uri: "https://miro.medium.com/v2/resize:fit:1400/0*cl7fc6pt1MHjIF4K.png",
      },
      videoUrl: "https://www.youtube.com/watch?v=12345",
    },
    {
      type: "video",
      title: "JavaScript Best Practices",
      channel: "Tech Talks",
      thumbnail: {
        uri: "https://ehuwt7zd2je.exactdn.com/wp-content/uploads/2024/03/future-o-javascript.jpg",
      },
      videoUrl: "https://www.youtube.com/watch?v=67890",
    },
    {
      type: "video",
      title: "React Native Tutorial for Beginners",
      channel: "Dev Journey",
      thumbnail: {
        uri: "https://readybytes.in/media/pages/blog/how-to-setup-react-native-localization-for-react-native-app/4081d4f11e-1680348760/1-cover.jpg",
      },
      videoUrl: "https://www.youtube.com/watch?v=ABCDE",
    },
  ];

  // Shuffle jobs and videos
  const combinedList = shuffleArray(jobs);

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
