import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

type MenuItemProps = {
  icon: any;
  label: string;
  color?: string;
};

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={require('../../assets/images/user.png')}
          style={styles.avatar}
        />
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
        <MenuItem icon={require('../../assets/images/favorite.png')} label="Favorilerim" />
        <MenuItem icon={require('../../assets/images/user.png')} label="Settings" />
        <MenuItem icon={require('../../assets/images/user.png')} label="AI Asistanı" />
        <MenuItem icon={require('../../assets/images/user.png')} label="Log out" color="#ff3b30" />
      </View>
    </View>
  );
};

const MenuItem = ({ icon, label, color = '#222' }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem}>
    <Image source={icon} style={styles.menuIcon} />
    <Text style={[styles.menuLabel, { color }]}>{label}</Text>
    <Image source={require('../../assets/images/next.png')} style={styles.menuArrow} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf6f0',
    alignItems: 'center',
    paddingTop: 40,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#e0e0e0',
    marginBottom: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },
  email: {
    fontSize: 16,
    color: '#3498db',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#eaf6fd',
    borderRadius: 16,
    marginBottom: 32,
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  statBox: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  statLabel: {
    fontSize: 14,
    color: '#ff6600',
    marginTop: 2,
  },
  menuContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    width: 38,
    height: 38,
    marginRight: 16,
    resizeMode: 'contain',
  },
  menuLabel: {
    fontSize: 17,
    flex: 1,
    fontWeight: '500',
  },
  menuArrow: {
    width: 38,
    height: 38,
    marginLeft: 8,
    resizeMode: 'contain',
  },
});

export default ProfilePage;