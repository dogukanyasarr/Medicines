import { View, Text, TouchableOpacity, Image, ImageBackground, SafeAreaView, Modal, TextInput, Platform, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDrugs } from '../../services/WebApi';
import styles from './style';

const PRESCRIPTIONS_KEY = 'PRESCRIPTIONS';

const PrescriptionPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleGoBack = () => navigation.goBack();

  const [modalVisible, setModalVisible] = useState(false);
  const [prescriptionTitle, setPrescriptionTitle] = useState('');
  const [prescriptionDate, setPrescriptionDate] = useState('');
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [allDrugs, setAllDrugs] = useState<any[]>([]);
  const [drugQuery, setDrugQuery] = useState('');
  const [drugSuggestions, setDrugSuggestions] = useState<any[]>([]);
  const [selectedDrugs, setSelectedDrugs] = useState<any[]>([]);

  useEffect(() => {
    loadPrescriptions();
    fetchDrugs();
  }, []);

  const fetchDrugs = async () => {
    try {
      const drugs = await getDrugs();
      setAllDrugs(drugs);
    } catch (e) {
      setAllDrugs([]);
    }
  };

  useEffect(() => {
    if (drugQuery.length > 0) {
      const filtered = allDrugs.filter((drug: any) =>
        drug.productName.toLowerCase().includes(drugQuery.toLowerCase())
      ).slice(0, 8);
      setDrugSuggestions(filtered);
    } else {
      setDrugSuggestions([]);
    }
  }, [drugQuery, allDrugs]);

  const handleSelectDrug = (drug: any) => {
    if (!selectedDrugs.some((d: any) => d.id === drug.id)) {
      setSelectedDrugs([...selectedDrugs, drug]);
    }
    setDrugQuery('');
    setDrugSuggestions([]);
  };

  const handleRemoveDrug = (id: string) => {
    setSelectedDrugs(selectedDrugs.filter((d: any) => d.id !== id));
  };

  const loadPrescriptions = async () => {
    const json = await AsyncStorage.getItem(PRESCRIPTIONS_KEY);
    setPrescriptions(json ? JSON.parse(json) : []);
  };

  const savePrescriptions = async (data: any[]) => {
    await AsyncStorage.setItem(PRESCRIPTIONS_KEY, JSON.stringify(data));
  };

  const handleSave = async () => {
    if (!prescriptionTitle && selectedDrugs.length === 0) return;
    const newPrescription = {
      id: Date.now().toString(),
      title: prescriptionTitle || 'Başlıksız',
      date: prescriptionDate || '',
      text: '',
      drugs: selectedDrugs,
      color: '#fff',
    };
    const updated = [newPrescription, ...prescriptions];
    setPrescriptions(updated);
    await savePrescriptions(updated);
    setModalVisible(false);
    setPrescriptionTitle('');
    setPrescriptionDate('');
    setSelectedDrugs([]);
    setDrugQuery('');
  };

  const handleDelete = async (id: string) => {
    const updated = prescriptions.filter(p => p.id !== id);
    setPrescriptions(updated);
    await savePrescriptions(updated);
  };

  const renderCard = ({ item }: { item: any }) => (
    <View style={styles.card}> 
      <View style={styles.cardHeaderRow}>
        <View style={styles.cardTitleRow}>
          <Image source={require('../../assets/images/drugs.png')} style={styles.cardTitleIcon} />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
        <View style={styles.cardDateRow}>
          <Image source={require('../../assets/images/calendar.png')} style={styles.cardDateIcon} />
          <Text style={styles.cardDate}>{item.date}</Text>
        </View>
      </View>
      <View style={styles.cardDivider} />
      <Text style={styles.cardText} numberOfLines={4}>{item.text}</Text>
      {item.drugs && item.drugs.length > 0 && (
        <View style={styles.selectedDrugsRow}>
          {item.drugs.map((drug: any) => (
            <View key={drug.id} style={styles.drugTagRow}>
              <View style={styles.drugTagIconBg}>
                <Image source={require('../../assets/images/meds.png')} style={styles.drugTagIcon} />
              </View>
              <TouchableOpacity style={styles.drugTag} onPress={() => navigation.navigate('İlaç Detayı', { drug })}>
                <Text style={styles.drugTagText} numberOfLines={2} ellipsizeMode="tail">{drug.productName}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
        <View style={styles.deleteIconBg}>
          <Image source={require('../../assets/images/trash.png')} style={styles.deleteIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <ImageBackground
      source={require('../../assets/images/homebg.png')}
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
          <Text style={styles.headerTitle}>Reçetem</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>
        <FlatList
          data={prescriptions}
          keyExtractor={item => item.id}
          renderItem={renderCard}
          numColumns={1}
          contentContainerStyle={styles.cardsContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>Henüz reçete eklenmedi.</Text>}
        />
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Image source={require('../../assets/images/addpre.png')} style={styles.fabIcon} />
        </TouchableOpacity>
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Reçete Ekle</Text>
              <Text style={styles.modalLabel}>Başlık</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Başlık"
                value={prescriptionTitle}
                onChangeText={setPrescriptionTitle}
                placeholderTextColor="#aaa"
              />
              <Text style={styles.modalLabel}>Tarih</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="YYYY-AA-GG"
                value={prescriptionDate}
                onChangeText={setPrescriptionDate}
                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                placeholderTextColor="#aaa"
              />
              <Text style={styles.modalLabel}>İlaçlar</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="İlaç ismi ara..."
                value={drugQuery}
                onChangeText={setDrugQuery}
                placeholderTextColor="#aaa"
              />
              {drugSuggestions.length > 0 && (
                <View style={styles.suggestionsBox}>
                  {drugSuggestions.map((drug: any) => (
                    <TouchableOpacity key={drug.id} style={styles.suggestionItem} onPress={() => handleSelectDrug(drug)}>
                      <Text style={styles.suggestionText}>{drug.productName}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {selectedDrugs.length > 0 && (
                <View style={styles.selectedDrugsRow}>
                  {selectedDrugs.map((drug: any) => (
                    <View key={drug.id} style={styles.drugTag}>
                      <Text style={styles.drugTagText}>{drug.productName}</Text>
                      <TouchableOpacity onPress={() => handleRemoveDrug(drug.id)}>
                        <Text style={styles.removeDrugText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
              <View style={styles.modalButtonRow}>
                <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#13aff9' }]} onPress={handleSave}>
                  <Text style={[styles.modalButtonText, { color: '#fff' }]}>Kaydet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default PrescriptionPage