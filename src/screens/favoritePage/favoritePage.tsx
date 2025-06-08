import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Drug } from '../../types/drugs';
import { getFavoriteDrugs, removeFavoriteDrug } from '../../services/storage';
import { NavigationProp } from '../homePage/type';
import { styles } from './style';

export default function FavoritePage() {
  const navigation = useNavigation<NavigationProp>();
  const [favoriteDrugs, setFavoriteDrugs] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favorites = await getFavoriteDrugs();
      setFavoriteDrugs(favorites);
    } catch (error) {
      console.error('Favoriler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (drug: Drug) => {
    try {
      await removeFavoriteDrug(drug.id);
      setFavoriteDrugs(prev => prev.filter(item => item.id !== drug.id));
    } catch (error) {
      console.error('Favori silme hatası:', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return <ActivityIndicator style={styles.loadingContainer} size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorilerim</Text>
        <Image
          source={require('../../assets/images/user.png')}
          style={styles.userIcon}
          resizeMode="contain"
        />
      </View>

      {favoriteDrugs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Henüz favori ilacınız bulunmamaktadır.</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteDrugs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('İlaç Detayı', { drug: item })}
              style={styles.drugItemContainer}
              activeOpacity={0.85}
            >
              <View style={styles.drugItemContent}>
                <Image
                  source={require('../../assets/images/meds.png')}
                  style={styles.drugIcon}
                  resizeMode="contain"
                />
                <Text
                  style={styles.drugName}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.productName}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => handleRemoveFavorite(item)}
                style={styles.removeButton}
              >
                <Image
                  source={require('../../assets/images/remove.png')}
                  style={styles.removeIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}