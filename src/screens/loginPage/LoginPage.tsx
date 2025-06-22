import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { login } from '../../services/WebApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const user = await login(email, password);
      const userToStore = {
        firstName: user.firstName,
        lastName: user.lastName,
        profilePhoto: user.profilePhoto,
      };
      await AsyncStorage.setItem('user', JSON.stringify(userToStore));
      navigation.navigate('Profil');
    } catch (e) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/homebg.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <Text style={styles.title}>Giriş Yap</Text>
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        {error ? <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text> : null}
        <View style={styles.linksRow}>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Şifremi unuttum?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.linkText}>Kayıt ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    width: 320,
    maxWidth: '100%',
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  button: {
    width: 320,
    maxWidth: '100%',
    backgroundColor: 'rgba(19, 175, 249, 0.7)',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 320,
    maxWidth: '100%',
    gap: 12,
  },
  linkButton: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.13)',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  linkText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default LoginPage;