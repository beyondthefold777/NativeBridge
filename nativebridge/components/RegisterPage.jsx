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

const RegisterPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password || !confirm) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await axios.post('http://192.168.1.171:3000/api/auth/register', {
        username,
        email,
        password,
      });
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Landing'); // redirect to LandingPage
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to register. Please try again.');
    }
  };

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0e17" />
      <View style={[styles.header, { paddingTop: statusBarHeight + 4 }]}>
        <Image source={require('../assets/nativebridge_logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.subtitle}>Create a new account</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#888"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          style={styles.input}
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />

        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <LinearGradient colors={['#0a0e17', '#000']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.registerGradient}>
            <GradientText text="Register" style={styles.registerText} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.switchText}>Already have an account? Login</Text>
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
  registerBtn: { borderRadius: 30, overflow: 'hidden', marginTop: 20, width: '100%' },
  registerGradient: { paddingVertical: 14, borderRadius: 30, alignItems: 'center' },
  registerText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  switchText: { color: '#000', marginTop: 15, fontSize: 14 }, // switched to black
});

export default RegisterPage;
