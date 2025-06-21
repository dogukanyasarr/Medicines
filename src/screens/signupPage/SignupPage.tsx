import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Fotoğraf seçme fonksiyonu (şimdilik placeholder)
  const handleSelectPhoto = () => {
    // Burada image picker entegre edilebilir
    Alert.alert('Profil fotoğrafı seçme fonksiyonu eklenecek!');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/homebg.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <Text style={styles.title}>Kayıt Ol</Text>
        <TouchableOpacity style={styles.avatarContainer} onPress={handleSelectPhoto} activeOpacity={0.7}>
          {profilePhoto ? (
            <Image source={{ uri: profilePhoto }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>Fotoğraf Ekle</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.rowInputs}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="Ad"
            placeholderTextColor="rgba(255,255,255,0.85)"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, { flex: 1, marginLeft: 8 }]}
            placeholder="Soyad"
            placeholderTextColor="rgba(255,255,255,0.85)"
            value={surname}
            onChangeText={setSurname}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="rgba(255,255,255,0.85)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="rgba(255,255,255,0.85)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Şifreyi Tekrar Gir"
          placeholderTextColor="rgba(255,255,255,0.85)"
          value={passwordAgain}
          onChangeText={setPasswordAgain}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('İlaçlar')}>
          <Text style={styles.secondaryButtonText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

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
    marginBottom: 28,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  avatarContainer: {
    marginBottom: 24,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(0,0,0,0.22)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    resizeMode: 'cover',
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    width: 40,
    height: 40,
    tintColor: '#fff',
    marginBottom: 4,
  },
  avatarText: {
    color: '#fff',
    fontSize: 13,
    opacity: 0.8,
  },
  rowInputs: {
    flexDirection: 'row',
    width: 320,
    maxWidth: '100%',
    marginBottom: 8,
  },
  input: {
    width: 320,
    maxWidth: '100%',
    backgroundColor: 'rgba(0,0,0,0.32)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)'
  },
  button: {
    width: 320,
    maxWidth: '100%',
    backgroundColor: 'rgba(19, 100, 249, 0.92)',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    width: 160,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: '#156ee2',
    fontSize: 15,
    fontWeight: '700',
  },
});