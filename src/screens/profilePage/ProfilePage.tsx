import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';

type MenuItemProps = {
  icon: any;
  label: string;
  color?: string;
};

const ProfilePage = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/homebg.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../../assets/images/user.png')}
              style={[styles.avatar, { tintColor: '#fff' }]}
            />
          </View>
          <Text style={styles.name}>Doğukan</Text>
          <Text style={styles.email}>dogukan@example.com</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>120</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>305</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuContainer}>
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
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const MenuItem = ({ icon, label, color = '#222' }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem}>
    <Image source={icon} style={[styles.menuIcon, { tintColor: color }]} />
    <Text style={[styles.menuLabel, { color }]}>{label}</Text>
    <Image 
      source={require('../../assets/images/next.png')} 
      style={[styles.menuArrow, { tintColor: color }]} 
    />
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
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatar: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    marginBottom: 32,
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statBox: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#13aff9',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  menuContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
    resizeMode: 'contain',
  },
  menuLabel: {
    fontSize: 17,
    flex: 1,
    fontWeight: '500',
  },
  menuArrow: {
    width: 20,
    height: 20,
    marginLeft: 8,
    resizeMode: 'contain',
  },
});

export default ProfilePage;