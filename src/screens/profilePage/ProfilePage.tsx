import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getFavoriteDrugs } from '../../services/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import styles from './style';
import { MenuItemProps } from './type';

const ProfilePage = () => {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [prescriptionsCount, setPrescriptionsCount] = useState(0);
  const [user, setUser] = useState<{ firstName: string; lastName: string; profilePhoto: string; email?: string } | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      const fetchFavoritesCount = async () => {
        try {
          const favorites = await getFavoriteDrugs();
          setFavoritesCount(favorites.length);
        } catch (error) {
          console.error('Favori sayısı alınırken hata:', error);
          setFavoritesCount(0);
        }
      };

      const fetchUser = async () => {
        try {
          const userStr = await AsyncStorage.getItem('user');
          if (userStr) {
            setUser(JSON.parse(userStr));
          }
        } catch (e) {
          setUser(null);
        }
      };

      const fetchPrescriptionsCount = async () => {
        try {
          const prescriptionsStr = await AsyncStorage.getItem('PRESCRIPTIONS');
          if (prescriptionsStr) {
            const prescriptions = JSON.parse(prescriptionsStr);
            setPrescriptionsCount(Array.isArray(prescriptions) ? prescriptions.length : 0);
          } else {
            setPrescriptionsCount(0);
          }
        } catch (e) {
          setPrescriptionsCount(0);
        }
      };

      fetchFavoritesCount();
      fetchUser();
      fetchPrescriptionsCount();
    }, [])
  );

  return (
    <ImageBackground
      source={require('../../assets/images/homebg.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            {user?.profilePhoto ? (
              <Image
                source={{ uri: user.profilePhoto }}
                style={styles.avatar}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require('../../assets/images/user.png')}
                style={[styles.avatar, { tintColor: '#fff' }]}
              />
            )}
          </View>
          <Text style={styles.name}>{user ? `${user.firstName} ${user.lastName}` : 'Kullanıcı'}</Text>
          {user?.email && <Text style={styles.email}>{user.email}</Text>}
        </View>

        {/* Shortcuts */}
        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.shortcutBox} onPress={() => navigation.navigate('PrescriptionPage')}>
            <View style={styles.shortcutCircleWrapper}>
              <View style={styles.shortcutCircle}>
                <Text style={styles.shortcutCountText}>{prescriptionsCount}</Text>
              </View>
              <View style={styles.badgeContainer}>
                <Image
                  source={require('../../assets/images/meds.png')}
                  style={styles.badgeIcon}
                />
              </View>
            </View>
            <Text style={styles.shortcutLabel}>Reçetem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcutBox}>
            <View style={styles.shortcutCircleWrapper}>
              <View style={styles.shortcutCircle}>
                <Text style={styles.shortcutCountText}>{favoritesCount}</Text>
              </View>
              <View style={styles.badgeContainer}>
                <Image
                  source={require('../../assets/images/favorite.png')}
                  style={styles.badgeIcon}
                />
              </View>
            </View>
            <Text style={styles.shortcutLabel}>Favorilerim</Text>
          </TouchableOpacity>
        </View>

        {/* Menu */}
        <View style={styles.menuContainer}>
          <View style={styles.menuRow}>
            <TouchableOpacity style={styles.menuSquare} onPress={() => navigation.navigate('İlaçlar')}>
              <Image source={require('../../assets/images/home.png')} style={styles.menuSquareIcon} />
              <Text style={styles.menuSquareLabel}>Anasayfa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuSquare} onPress={() => navigation.navigate('Favoriler')}>
              <Image source={require('../../assets/images/heart.png')} style={styles.menuSquareIcon} />
              <Text style={styles.menuSquareLabel}>Favorilerim</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuRow}>
            <TouchableOpacity style={styles.menuSquare}>
              <Image source={require('../../assets/images/setting.png')} style={styles.menuSquareIcon} />
              <Text style={styles.menuSquareLabel}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuSquare}>
              <Image source={require('../../assets/images/ai.png')} style={styles.menuSquareIcon} />
              <Text style={styles.menuSquareLabel}>AI Asistanı</Text>
            </TouchableOpacity>
          </View>
          <MenuItem 
            icon={require('../../assets/images/user.png')} 
            label="Log out" 
            color="#ff3b30"
            onPress={async () => {
              await AsyncStorage.removeItem('user');
              navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const MenuItem = ({ icon, label, color = '#222', onPress }: MenuItemProps & { onPress?: () => void }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Image source={icon} style={[styles.menuIcon, { tintColor: color }]} />
    <Text style={[styles.menuLabel, { color }]}>{label}</Text>
    <View style={[styles.menuDot, { backgroundColor: color }]} />
  </TouchableOpacity>
);

export default ProfilePage;