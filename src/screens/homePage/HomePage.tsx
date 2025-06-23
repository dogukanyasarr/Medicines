import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Drug } from '../../types/drugs';
import { getDrugs } from '../../services/WebApi';
import { NavigationProp } from './type';
import { styles } from './style';
import { addFavoriteDrug, removeFavoriteDrug, getFavoriteDrugs } from '../../services/storage';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteDrugs, setFavoriteDrugs] = useState<Drug[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [drugsData, favoritesData] = await Promise.all([
          getDrugs(),
          getFavoriteDrugs()
        ]);
        setDrugs(drugsData);
        setFavoriteDrugs(favoritesData);
      } catch (error) {
        console.error('API Hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = drugs.filter(drug =>
    drug.productName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleFavoritePress = () => {
    navigation.navigate('Favoriler');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profil');
  };

  const handleAddToFavorites = async (drug: Drug) => {
    try {
      await addFavoriteDrug(drug);
      setFavoriteDrugs(prev => [...prev, drug]);
    } catch (error) {
      console.error('Favori ekleme hatası:', error);
    }
  };

  const handleRemoveFromFavorites = async (drug: Drug) => {
    try {
      await removeFavoriteDrug(drug.id);
      setFavoriteDrugs(prev => prev.filter(item => item.id !== drug.id));
    } catch (error) {
      console.error('Favori silme hatası:', error);
    }
  };

  const isFavorite = (drugId: string) => {
    return favoriteDrugs.some(drug => drug.id === drugId);
  };

  if (loading) {
    return (
      <ImageBackground
        source={require('../../assets/images/homebg.png')}
        style={styles.backgroundImage}
      >
        <ActivityIndicator style={styles.loadingContainer} size="large" color="#13aff9" />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/homebg.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={[styles.headerTitle, { color: '#fff' }]}>İlaçlar</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={[styles.favoriteButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}
              onPress={handleFavoritePress}
              activeOpacity={0.7}
            >
              <Image
                source={require('../../assets/images/favorite.png')}
                style={[styles.favoriteIcon, { tintColor: '#fff' }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.profileButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}
              onPress={handleProfilePress}
            >
              <Image
                source={require('../../assets/images/user.png')}
                style={[styles.userImage, { tintColor: '#fff' }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.searchContainer, { backgroundColor: 'rgba(255, 255, 255, 0.9)' }]}>
          <Image
            source={require('../../assets/images/search.png')}
            style={[styles.searchIcon, { tintColor: '#13aff9' }]}
            resizeMode="contain"
          />
          <TextInput
            placeholder="İlaç ismi ara..."
            value={search}
            onChangeText={setSearch}
            style={[styles.searchInput, { color: '#000' }]}
            placeholderTextColor="#13aff9"
          />
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('İlaç Detayı', { drug: item })}
              style={[styles.drugItemContainer, { backgroundColor: 'rgba(255, 255, 255, 0.9)' }]}
              activeOpacity={0.85}
            >
              <View style={styles.drugItemContent}>
                <Image
                  source={require('../../assets/images/meds.png')}
                  style={[styles.drugIcon, { tintColor: '#13aff9' }]}
                  resizeMode="contain"
                />
                <Text
                  style={[styles.drugName, { color: '#000' }]}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.productName}
                </Text>
              </View>

              <View style={styles.actionButtonsContainer}>
                {!isFavorite(item.id.toString()) ? (
                  <TouchableOpacity 
                    onPress={() => handleAddToFavorites(item)} 
                    style={[styles.actionButton, { backgroundColor: 'rgba(19, 175, 249, 0.1)', padding: 8,
                      borderRadius: 100, }]}
                  >
                    <Image
                      source={require('../../assets/images/heart.png')}
                      style={[styles.actionIcon, { tintColor: '#13aff9' }]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    onPress={() => handleRemoveFromFavorites(item)} 
                    style={[styles.actionButton, { backgroundColor: 'rgba(255, 59, 48, 0.1)',
                      borderRadius: 100,  padding: 8}]}
                  >
                    <Image
                      source={require('../../assets/images/heart.png')}
                      style={[styles.actionIcon, { tintColor: '#ff3b30'}]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </ImageBackground>
  );
}
