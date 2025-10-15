import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import axios from 'axios';

const GradientText = ({ text, style }) => (
  <MaskedView maskElement={<Text style={[style, { backgroundColor: 'transparent' }]}>{text}</Text>}>
    <LinearGradient colors={['#00FFFF', '#0077FF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <Text style={[style, { opacity: 0 }]}>{text}</Text>
    </LinearGradient>
  </MaskedView>
);

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const res = await axios.post('http://192.168.1.171:3000/api/auth/login', { email, password });
      console.log('Token:', res.data.token);
      Alert.alert('Success', 'Login successful!');
      navigation.navigate('Landing'); // redirect after login
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Invalid credentials. Please try again.');
    }
  };

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0e17" />
      <View style={[styles.header, { paddingTop: statusBarHeight + 4 }]}>
        <Image source={require('../assets/nativebridge_logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.subtitle}>Login to your account</Text>
      </View>
      <View style={styles.form}>
        <TextInput placeholder="Email" placeholderTextColor="#888" style={styles.input} value={email} onChangeText={setEmail} />
        <TextInput placeholder="Password" placeholderTextColor="#888" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <LinearGradient colors={['#0a0e17', '#000']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.loginGradient}>
            <GradientText text="Login" style={styles.loginText} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.switchText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 30 },
  logo: { width: 160, height: 160, marginBottom: 20 },
  subtitle: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 20 },

  form: { width: '80%', alignItems: 'center' },
  input: { width: '100%', padding: 12, marginVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', color: '#000' },
  loginBtn: { borderRadius: 30, overflow: 'hidden', marginTop: 20, width: '100%' },
  loginGradient: { paddingVertical: 14, borderRadius: 30, alignItems: 'center' },
  loginText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  switchText: { color: '#000', marginTop: 15, fontSize: 14 }, // switched to black
});

export default LoginPage;
