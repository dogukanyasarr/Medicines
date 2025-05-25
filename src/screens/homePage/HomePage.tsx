import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { Drug } from '../../types/drugs';
import { getDrugs } from '../../services/WebApi';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'İlaçlar'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f4f8fc' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#13aff9', marginBottom: 18 }}>İlaçlar</Text>
      <TextInput
        placeholder="İlaç ismi ara..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          marginBottom: 20,
          borderColor: '#13aff9',
          backgroundColor: '#fff',
          fontSize: 16
        }}
        placeholderTextColor="#13aff9"
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('İlaç Detayı', { drug: item })}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              marginBottom: 12,
              borderRadius: 16,
              padding: 14,
              shadowColor: '#13aff9',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 4,
              borderLeftWidth: 6,
              borderLeftColor: '#13aff9',
            }}
            activeOpacity={0.85}
          >
            <Image
              source={require('../../assets/images/meds.png')}
              style={{ width: 40, height: 40, marginRight: 16, tintColor: '#13aff9' }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#222',
                flex: 1,
                flexWrap: 'wrap',
                maxWidth: '85%'
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.productName}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
