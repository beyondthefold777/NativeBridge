import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaskedView from '@react-native-masked-view/masked-view';

const { width } = Dimensions.get('window');

const GradientIcon = ({ name, size }) => (
  <MaskedView
    maskElement={
      <Ionicons name={name} size={size} color="white" />
    }>
    <LinearGradient
      colors={['#00FFFF', '#0077FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width: size, height: size }}
    />
  </MaskedView>
);

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-width))[0];

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? -width : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#000000', '#001a33']} style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <GradientIcon name="menu" size={28} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: slideAnim }] },
        ]}>
        <LinearGradient
          colors={['#00FFFF', '#0077FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.sidebarGradient}>
          <Text style={styles.sidebarTitle}>Menu</Text>
          <TouchableOpacity style={styles.sidebarItem}>
            <GradientIcon name="briefcase-outline" size={20} />
            <Text style={styles.sidebarText}>Forum</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem}>
            <GradientIcon name="settings-outline" size={20} />
            <Text style={styles.sidebarText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem}>
            <GradientIcon name="help-circle-outline" size={20} />
            <Text style={styles.sidebarText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem}>
            <GradientIcon name="log-out-outline" size={20} />
            <Text style={styles.sidebarText}>Logout</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>

      {/* Main content */}
      <View style={styles.mainContent}>
        <Image
          source={require('../assets/nativebridge_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <LinearGradient
          colors={['#00FFFF', '#0077FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientTitle}>
          <Text style={styles.welcome}>Welcome to NativeBridge</Text>
        </LinearGradient>
        <Text style={styles.subtitle}>
          Bridge the gap between developers and innovation.
        </Text>

        <TouchableOpacity style={styles.goOnlineBtn}>
          <LinearGradient
            colors={['#00FFFF', '#0077FF']}
            style={styles.goOnlineGradient}>
            <Text style={styles.goOnlineText}>Go Online</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <GradientIcon name="home" size={24} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <GradientIcon name="briefcase" size={24} />
          <Text style={styles.navText}>Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <GradientIcon name="chatbubbles" size={24} />
          <Text style={styles.navText}>Forum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <GradientIcon name="person" size={24} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: '100%',
    zIndex: 10,
  },
  sidebarGradient: {
    flex: 1,
    padding: 30,
  },
  sidebarTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  sidebarText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  gradientTitle: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 6,
    marginBottom: 10,
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 14,
  },
  goOnlineBtn: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  goOnlineGradient: {
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  goOnlineText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#0d0d0d',
    borderTopColor: '#111',
    borderTopWidth: 1,
  },
  navItem: { alignItems: 'center' },
  navText: { color: '#00FFFF', fontSize: 12, marginTop: 3 },
});

export default LandingPage;
