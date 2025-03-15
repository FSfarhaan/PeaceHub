import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome back 👏</Text>
        <Text style={styles.subtitle}>Please enter your details!</Text>

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

        {/* Email Input */}
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput style={styles.passwordInput} placeholder="Password" secureTextEntry />
          <MaterialIcons name="lock-outline" size={20} color="gray" />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>Did you forget your password?</Text>
          <TouchableOpacity>
            <Text style={styles.resetText}>Reset Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Create Account */}
        <TouchableOpacity>
          <Text style={styles.createAccount}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  card: {
    width: '85%',
    height: "70%",
    justifyContent: "center",
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    borderWidth: .1,
    borderColor: "#333"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 15,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  socialText: {
    marginLeft: 10,
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    color: 'gray',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: .5,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: .5,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#8E67FD',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  bottomText: {
    color: 'gray',
  },
  resetText: {
    color: '#8E67FD',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  createAccount: {
    textAlign: 'center',
    color: '#8E67FD',
    fontWeight: 'bold',
    marginTop: 15,
  },
});

export default LoginScreen;
