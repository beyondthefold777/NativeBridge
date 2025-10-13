import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaskedView from '@react-native-masked-view/masked-view';

const { width } = Dimensions.get('window');

const GradientIcon = ({ name, size }) => (
  <MaskedView maskElement={<Ionicons name={name} size={size} color="white" />}>
    <LinearGradient
      colors={['#00FFFF', '#0077FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width: size, height: size }}
    />
  </MaskedView>
);

const GradientText = ({ text, style }) => (
  <MaskedView maskElement={<Text style={[style, { backgroundColor: 'transparent' }]}>{text}</Text>}>
    <LinearGradient
      colors={['#00FFFF', '#0077FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    />
  </MaskedView>
);

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-width * 0.6))[0];

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? -width * 0.6 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };

  // Safe-area adjustments
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;
  const bottomSafeArea = Platform.OS === 'ios' ? 34 : 28;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0e17" translucent={false} />

      {/* Top Fill for status bar */}
      <View style={[styles.topFill, { height: statusBarHeight }]} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: statusBarHeight + 4 }]}>
        <TouchableOpacity onPress={toggleMenu}>
          <GradientIcon name="menu" size={32} />
        </TouchableOpacity>
      </View>

      {/* Sidebar Overlay */}
      {menuOpen && <Pressable style={styles.overlay} onPress={toggleMenu} />}

      {/* Sidebar */}
      <Animated.View
        style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
      >
        <View style={styles.sidebarContent}>
          <GradientText text="Menu" style={styles.sidebarTitle} />

          {[
            { icon: 'briefcase-outline', label: 'Forum' },
            { icon: 'settings-outline', label: 'Settings' },
            { icon: 'help-circle-outline', label: 'Help' },
            { icon: 'log-out-outline', label: 'Logout' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.sidebarItem}>
              <GradientIcon name={item.icon} size={20} />
              <GradientText text={item.label} style={styles.sidebarText} />
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Image
          source={require('../assets/nativebridge_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>
          Bridge the gap between developers and innovation.
        </Text>

        <TouchableOpacity style={styles.goOnlineBtn}>
          <LinearGradient
            colors={['#00FFFF', '#0077FF']}
            style={styles.goOnlineGradient}
          >
            <Text style={styles.goOnlineText}>Go Online</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Bottom Gradient + Nav */}
      <LinearGradient
        colors={['rgba(0,0,0,0.95)', '#0a0e17']}
        style={[styles.bottomGradient, { paddingBottom: bottomSafeArea + 10 }]}
      >
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
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  topFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0a0e17',
    zIndex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#0a0e17',
    zIndex: 2,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 5,
  },

  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.6,
    height: '100%',
    backgroundColor: '#0a0e17',
    zIndex: 10,
    padding: 30,
  },

  sidebarContent: {
    marginTop: 50,
  },

  sidebarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'left',
  },

  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },

  sidebarText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },

  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  logo: { width: 160, height: 160, marginBottom: 20 },

  subtitle: {
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 14,
  },

  goOnlineBtn: { borderRadius: 30, overflow: 'hidden' },

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

  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 80,
  },

  navItem: {
    alignItems: 'center',
  },

  navText: {
    color: '#00FFFF',
    fontSize: 12,
    marginTop: 3,
  },
});

export default LandingPage;
