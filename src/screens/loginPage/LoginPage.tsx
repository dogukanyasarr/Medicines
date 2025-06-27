import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { login } from '../../services/WebApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';

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
        <View style={styles.socialContainer}>
          <Text style={styles.socialLabel}>Sosyal Medya Araçlarında Devam Et</Text>
          <View style={styles.socialDivider} />
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => Alert.alert('yakında hizmete açılacak')}
            >
              <Image source={require('../../assets/images/google.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => Alert.alert('yakında hizmete açılacak')}
            >
              <Image
                source={require('../../assets/images/edevlet.jpg')}
                style={[styles.socialIcon, { backgroundColor: 'transparent' }]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginPage;