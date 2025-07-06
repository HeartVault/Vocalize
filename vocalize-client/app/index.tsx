import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Screen dimensions (for random circle placement)
const { width, height } = Dimensions.get("window");

// Tweak this to add / remove background circles
const NUM_CIRCLES = 15;

type Circle = {
  key: string;
  size: number;
  left: number;
  top: number;
  opacity: Animated.Value;
  scale: Animated.Value;
};

// Generate a list of circle descriptors with random positions / sizes
const generateCircles = (): Circle[] =>
  Array.from({ length: NUM_CIRCLES }).map((_, i) => {
    const size = Math.random() * 80 + 40; // 40 – 120 px
    const left = Math.random() * (width - size);
    const top = Math.random() * (height - size);
    return {
      key: `circle-${i}`,
      size,
      left,
      top,
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.5),
    };
  });

/**
 * Splash screen with:
 *  – Random purple circles that fade / pop in.
 *  – Center‑aligned “Vocalize” logo that scales / fades.
 *  – Auto‑navigates to the "home" route after animation.
 *
 *  No third‑party animation libs required (pure React Native Animated API).
 */
const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  // Logo animation values
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  // Pre‑computed circles stay stable across renders
  const circles = useRef<Circle[]>(generateCircles()).current;

  useEffect(() => {
    // Animate each circle with a small stagger
    const circleAnimSequences = circles.map((c, idx) =>
      Animated.parallel([
        Animated.timing(c.opacity, {
          toValue: 0.25,
          duration: 700,
          delay: idx * 100,
          useNativeDriver: true,
        }),
        Animated.spring(c.scale, {
          toValue: 1,
          delay: idx * 100,
          friction: 5,
          useNativeDriver: true,
        }),
      ])
    );

    // Full splash timeline: circles pop in → logo shows → pause → fade out
    Animated.sequence([
      Animated.stagger(80, circleAnimSequences),
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 5,
          tension: 120,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1600),
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      (navigation as any).replace("auth/index");
    });
  }, [navigation, circles, logoOpacity, logoScale]);

// TODO:REPLACE VOCALIZE LOGO WITH THE NEW LOGO


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Background circles */}
      {circles.map((c) => (
        <Animated.View
          key={c.key}
          style={[
            styles.circle,
            {
              width: c.size,
              height: c.size,
              left: c.left,
              top: c.top,
              opacity: c.opacity,
              transform: [{ scale: c.scale }],
            },
          ]}
        />
      ))}

      {/* Centered logo */}
      <View style={styles.centerContent}>
        <Animated.View
          style={[styles.logoWrapper, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
        >
          <Text style={styles.logo}>Vocalize</Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  // Absolute‑positioned circle base style
  circle: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "#6B21A8",
  },
  // Fills screen and centers children
  centerContent: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    padding: 32,
    borderRadius: 100,
    backgroundColor: "#6B21A8",
    shadowColor: "#A78BFA",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 14,
  },
  logo: {
    fontSize: 48,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
});
