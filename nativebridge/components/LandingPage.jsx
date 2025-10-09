import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LandingPage = () => {
  return (
    <LinearGradient colors={['#ffffff', '#e0f7ff']} style={styles.container}>
      <Text style={styles.title}>Welcome to NativeBridge</Text>
      <Text style={styles.subtitle}>
        Bridging innovation, creativity, and technology.
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0b3d91',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
  },
});

export default LandingPage;
