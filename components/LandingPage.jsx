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

// ✅ Gradient Icon
const GradientIcon = ({ name, size }) => (
  <MaskedView maskElement={<Ionicons name={name} size={size} color="white" />}>
    <LinearGradient
      colors={['#00BFFF', '#0077FF']} // darker blue tones
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width: size, height: size }}
    />
  </MaskedView>
);

// ✅ Gradient Text
const GradientText = ({ text, style }) => (
  <MaskedView maskElement={<Text style={[style, { backgroundColor: 'transparent' }]}>{text}</Text>}>
    <LinearGradient
      colors={['#00BFFF', '#0077FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={[style, { opacity: 0 }]}>{text}</Text>
    </LinearGradient>
  </MaskedView>
);

const LandingPage = ({ navigation }) => {
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

  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;
  const bottomSafeArea = Platform.OS === 'ios' ? 34 : 28;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" translucent={false} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: statusBarHeight + 4 }]}>
        <TouchableOpacity onPress={toggleMenu}>
          <GradientIcon name="menu" size={32} />
        </TouchableOpacity>
      </View>

      {/* Sidebar Overlay */}
      {menuOpen && <Pressable style={styles.overlay} onPress={toggleMenu} />}

      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.sidebarContent}>
          {/* Menu Title */}
          <Text style={styles.sidebarTitle}>Menu</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Login/Register section */}
          <View style={styles.authSection}>
            <View style={styles.authLinks}>
              <TouchableOpacity
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('Login');
                }}
              >
                <Text style={styles.authTextWhite}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('Register');
                }}
              >
                <Text style={styles.authTextWhite}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sidebar items */}
          {[
            { icon: 'briefcase-outline', label: 'Forum' },
            { icon: 'settings-outline', label: 'Settings' },
            { icon: 'help-circle-outline', label: 'Help' },
            { icon: 'log-out-outline', label: 'Logout' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.sidebarItem}>
              <GradientIcon name={item.icon} size={20} />
              <Text style={styles.sidebarText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Image
          source={require('../assets/images/nativebridge_logo2.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>
          Bridge the gap between developers and innovation.
        </Text>

        {/* ✅ Go Online Button */}
        <TouchableOpacity style={styles.goOnlineBtn}>
          <View style={styles.goOnlineBlack}>
            <GradientText text="Go Online" style={styles.goOnlineText} />
          </View>
        </TouchableOpacity>
      </View>

      {/* ✅ Bottom Navigation (fully black and flush to bottom) */}
      <View style={[styles.bottomFill, { paddingBottom: bottomSafeArea }]}>
        <View style={styles.bottomNav}>
          {[
            { icon: 'home', label: 'Home' },
            { icon: 'briefcase', label: 'Jobs' },
            { icon: 'chatbubbles', label: 'Forum' },
            { icon: 'person', label: 'Profile' },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={styles.navItem}>
              <GradientIcon name={item.icon} size={24} />
              <Text style={styles.navText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // black background for everything except middle section
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#000',
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
    backgroundColor: '#000',
    zIndex: 10,
    padding: 30,
  },

  sidebarContent: { marginTop: 50 },
  sidebarTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  divider: { borderBottomWidth: 1, borderBottomColor: '#fff', marginVertical: 10, opacity: 0.3 },
  authSection: { marginBottom: 20 },
  authLinks: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  authTextWhite: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  sidebarItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 18 },
  sidebarText: { fontSize: 16, marginLeft: 10, fontWeight: '600', color: '#fff' },

  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff', // keeps the white middle
  },

  logo: { width: 160, height: 160, marginBottom: 20 },
  subtitle: { color: '#333', textAlign: 'center', marginBottom: 40, fontSize: 14 },

  goOnlineBtn: { borderRadius: 30, overflow: 'hidden' },
  goOnlineBlack: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goOnlineText: { fontWeight: 'bold', fontSize: 18, textAlign: 'center' },

  bottomFill: {
    backgroundColor: '#000', // full black bottom fill
    width: '100%',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: 'transparent',
  },

  navItem: { alignItems: 'center' },
  navText: { color: '#00FFFF', fontSize: 12, marginTop: 3 },
});

export default LandingPage;
