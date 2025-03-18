import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { CommonActions } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showToast = (type, message) => {
    Toast.show({
      type: type, // 'success' | 'error' | 'info'
      text1: message,
      position: 'top',
      visibilityTime: 3000, // 3 seconds
    });
  };

  const handleAuth = async () => {
    const url = isSignup
      ? "http://192.168.237.209:3001/signup"
      : "http://192.168.237.209:3001/login";
    const body = isSignup ? { name, email, password } : { email, password };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Response Data:", data);
  
        if (data.token) {
          await AsyncStorage.setItem("token", data.token);
        }
  
        if (data.user) {
          if (data.user.name) await AsyncStorage.setItem("name", data.user.name);
          if (data.user.email) await AsyncStorage.setItem("email", data.user.email);
          if (data.user.password) await AsyncStorage.setItem("password", data.user.password);
        }
  
        showToast("success", isSignup ? "Signup Successful" : "Login Successful");
        
        setTimeout(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Initial' }],
            })
          );
        }, 200);
      } else {
        showToast("error", data.message || "Login Failed");
      }
    } catch (error) {
      showToast("error", "Something went wrong " + error);
      console.log(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{isSignup ? 'Create an account 🎉' : 'Welcome back 👏'}</Text>
        <Text style={styles.subtitle}>{isSignup ? 'Sign up to get started!' : 'Please enter your details!'}</Text>

        {/* Google Login */}
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={20} color="black" />
          <Text style={styles.socialText}>Log in with Google</Text>
        </TouchableOpacity>

        {/* Apple Login */}
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={20} color="black" />
          <Text style={styles.socialText}>Log in with Apple</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        {isSignup && (
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <MaterialIcons name="lock-outline" size={20} color="gray" />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleAuth}>
          <Text style={styles.loginText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
        </TouchableOpacity>

        {!isSignup && (
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>Did you forget your password?</Text>
            <TouchableOpacity>
              <Text style={styles.resetText}>Reset Password?</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
          <Text style={styles.createAccount}>{isSignup ? 'Back to Login' : 'Create Account'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8' },
  card: { width: '85%', height: '70%', justifyContent: 'center', backgroundColor: 'white', padding: 20, borderRadius: 15, borderWidth: 0.1, borderColor: '#333' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 14, color: 'gray', textAlign: 'center', marginBottom: 15 },
  socialButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', padding: 10, borderRadius: 10, marginVertical: 5 },
  socialText: { marginLeft: 10, fontSize: 16 },
  orText: { textAlign: 'center', color: 'gray', marginVertical: 10 },
  input: { width: '100%', padding: 12, borderWidth: 0.5, borderColor: 'gray', borderRadius: 10, marginBottom: 10 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, borderColor: 'gray', borderRadius: 10, padding: 12, marginBottom: 10 },
  passwordInput: { flex: 1 },
  loginButton: { backgroundColor: '#8E67FD', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  loginText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  bottomTextContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  bottomText: { color: 'gray' },
  resetText: { color: '#8E67FD', marginLeft: 5, fontWeight: 'bold' },
  createAccount: { textAlign: 'center', color: '#8E67FD', fontWeight: 'bold', marginTop: 15 },
});

export default LoginScreen;