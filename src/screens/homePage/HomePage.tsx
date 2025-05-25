import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Drug } from '../../types/drugs';
import { getDrugs } from '../../services/WebApi';
import { NavigationProp } from './type';
import { styles } from './style';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const data = await getDrugs();
        setDrugs(data);
      } catch (error) {
        console.error('API Hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrugs();
  }, []);

  const filtered = drugs.filter(drug =>
    drug.productName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleFavoritePress = () => {
    navigation.navigate('Favoriler');
  };

  if (loading) {
    return <ActivityIndicator style={styles.loadingContainer} size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>İlaçlar</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            activeOpacity={0.7}
          >
            <Image
              source={require('../../assets/images/favorite.png')}
              style={[
                styles.favoriteIcon
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/user.png')}
            style={styles.userImage}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Image
          source={require('../../assets/images/search.png')}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          placeholder="İlaç ismi ara..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor="#13aff9"
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
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

            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity onPress={() => console.log('Add pressed')} style={styles.actionButton}>
                <Image
                  source={require('../../assets/images/add.png')}
                  style={styles.actionIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => console.log('Ellips pressed')} style={styles.actionButton}>
                <Image
                  source={require('../../assets/images/remove.png')}
                  style={styles.actionIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
