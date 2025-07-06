import { useNavigation } from "expo-router";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    key: "slide1",
    title: "Welcome to Vocalize",
    description: "Talk freely, connect deeply. Vocalize makes chatting feel real.",
    image: require("../../assets/images/slide1.png"), 
  },
  {
    key: "slide2",
    title: "Instant Text Translation",
    description: "Translate chats instantly across all major languages without breaking the flow.",
    image: require("../../assets/images/slide2.png"), 
    
  },
  {
    key: "slide3",
    title: "Voice & Video Calls Translation",
    description: "Crystal-clear voice and video communication, worldwide.",
        image: require("../../assets/images/slide3.png"), 

  },
  {
    key: "slide4",
    title: "Simple & Seamless",
    description: "A smooth interface designed for real human connection.",
       image: require("../../assets/images/slide4.png"), 
  },
];

const AuthLanding: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dotsWrapper}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* CTA Buttons */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={() => {
          (navigation as any).replace("auth/signup");
         
        }} style={styles.registerBtn}>
          <Text style={styles.registerText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInBtn}>
          <Text style={styles.signInText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthLanding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: 48,
    justifyContent: "space-between",
  },
  slide: {
    width,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: "contain",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  dotsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#555",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#A855F7",
    width: 12,
    height: 12,
  },
  buttonWrapper: {
    paddingHorizontal: 24,
  },
  registerBtn: {
    backgroundColor: "#A855F7",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  registerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInBtn: {
    alignItems: "center",
  },
  signInText: {
    color: "#A78BFA",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
