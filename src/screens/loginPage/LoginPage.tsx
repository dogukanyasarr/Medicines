import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground
      source={require('../../assets/images/loginbg.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Giriş Yap</Text>
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            placeholderTextColor="#b0b0b0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            placeholderTextColor="#b0b0b0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
          <View style={styles.linksRow}>
            <TouchableOpacity>
              <Text style={styles.linkButton}>Şifremi unuttum?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.linkButton}>Kayıt ol</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  formContainer: {
    width: '110%',
    maxWidth: 420,
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#174ea6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#174ea6',
    fontWeight: 'bold',
    marginBottom: 28,
    textShadowColor: 'rgba(0,0,0,0.08)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    width: '100%',
    backgroundColor: '#f4f8fc',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    marginBottom: 16,
    color: '#222',
    borderWidth: 1,
    borderColor: '#e0e7ef',
  },
  button: {
    width: '100%',
    backgroundColor: '#174ea6',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 18,
    shadowColor: '#174ea6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
    gap: 12,
  },
  linkButton: {
    color: '#174ea6',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(19,175,249,0.08)',
    overflow: 'hidden',
  },
});

export default LoginPage;