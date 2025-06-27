import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import styles from './style';

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

        {/* Sosyal medya ile devam et bölümü */}
        <View style={styles.socialContainer}>
          <View style={styles.orRow}>
            <View style={styles.orDivider} />
            <Text style={styles.orText}>veya</Text>
            <View style={styles.orDivider} />
          </View>
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
              <Image source={require('../../assets/images/edevlet.jpg')} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}