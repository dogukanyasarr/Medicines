import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getFavoriteDrugs } from '../../services/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type MenuItemProps = {
  icon: any;
  label: string;
  color?: string;
  onPress?: () => void;
};

const ProfilePage = () => {
  const [favoritesCount, setFavoritesCount] = useState(0);
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

      fetchFavoritesCount();
      fetchUser();
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
          <TouchableOpacity style={styles.shortcutBox}>
            <View style={styles.shortcutCircleWrapper}>
              <View style={styles.shortcutCircle}>
                <Image
                  source={require('../../assets/images/meds.png')}
                  style={styles.shortcutIcon}
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
          <MenuItem 
            icon={require('../../assets/images/homebg.png')} 
            label="Anasayfa" 
            color="#13aff9"
            onPress={() => navigation.navigate('İlaçlar')}
          />
          <MenuItem 
            icon={require('../../assets/images/favorite.png')} 
            label="Favorilerim" 
            color="#13aff9"
          />
          <MenuItem 
            icon={require('../../assets/images/user.png')} 
            label="Settings" 
            color="#13aff9"
          />
          <MenuItem 
            icon={require('../../assets/images/user.png')} 
            label="AI Asistanı" 
            color="#13aff9"
          />
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

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  email: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    justifyContent: 'space-around',
  },
  shortcutBox: {
    alignItems: 'center',
  },
  shortcutCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },
  shortcutIcon: {
    width: 40,
    height: 40,
    tintColor: '#fff',
  },
  shortcutCircleWrapper: {
    marginBottom: 10,
  },
  badgeContainer: {
    position: 'absolute',
    right: -6,
    bottom: -6,
    backgroundColor: 'white',
    borderRadius: 17,
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  badgeIcon: {
    width: 18,
    height: 18,
    tintColor: '#13aff9',
  },
  shortcutCountText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  shortcutLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  menuContainer: {
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 2,
  },
  menuIcon: {
    width: 28,
    height: 28,
    marginRight: 16,
    resizeMode: 'contain',
  },
  menuLabel: {
    fontSize: 17,
    flex: 1,
    fontWeight: '500',
  },
  menuDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default ProfilePage;