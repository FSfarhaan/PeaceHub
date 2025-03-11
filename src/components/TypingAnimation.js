import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const TypingAnimation = ({ message }) => {
  const words = message.split(' '); // Split response into words
  const [visibleWords, setVisibleWords] = useState([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < words.length) {
        setVisibleWords((prev) => [...prev, words[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 200); // Delay between each word
    return () => clearInterval(interval);
  }, [message]);

  return (
    <View style={styles.container}>
      {visibleWords.map((word, index) => (
        <AnimatedWord key={index} word={word} />
      ))}
    </View>
  );
};

const AnimatedWord = ({ word }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 }); // Fade-in effect
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.Text style={[styles.text, animatedStyle]}>
      {word}{' '}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default TypingAnimation;
