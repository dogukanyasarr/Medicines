import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, ImageBackground, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Drug } from '../../types/drugs';
import { getFavoriteDrugs, removeFavoriteDrug } from '../../services/storage';
import { NavigationProp } from '../homePage/type';
import { styles } from './style';

export default function FavoritePage() {
  const navigation = useNavigation<NavigationProp>();
  const [favoriteDrugs, setFavoriteDrugs] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      setLoading(true);
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
      await removeFavoriteDrug(drug.id.toString());
      setFavoriteDrugs(prev => prev.filter(item => item.id !== drug.id));
    } catch (error) {
      console.error('Favori silme hatası:', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#13aff9" />
        </View>
      );
    }

    if (favoriteDrugs.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Henüz favori ilacınız bulunmamaktadır.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={favoriteDrugs}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
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
                source={require('../../assets/images/heart.png')}
                style={styles.removeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/favoritebg.png')}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Image
              source={require('../../assets/images/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Favorilerim</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>
        {renderContent()}
      </SafeAreaView>
    </ImageBackground>
  );
}