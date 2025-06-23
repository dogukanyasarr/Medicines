import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, SafeAreaView, Modal, TextInput, Platform, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDrugs } from '../../services/WebApi';

const PRESCRIPTIONS_KEY = 'PRESCRIPTIONS';

const PrescriptionPage = () => {
  const navigation = useNavigation();
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
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>
      <View style={styles.cardDivider} />
      <Text style={styles.cardText} numberOfLines={4}>{item.text}</Text>
      {item.drugs && item.drugs.length > 0 && (
        <View style={styles.selectedDrugsRow}>
          {item.drugs.map((drug: any) => (
            <View key={drug.id} style={styles.drugTag}>
              <Text style={styles.drugTagText}>{drug.productName}</Text>
            </View>
          ))}
        </View>
      )}
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
        <Image source={require('../../assets/images/trash.png')} style={styles.deleteIcon} />
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

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 12,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRightPlaceholder: {
    width: 44,
  },
  fab: {
    position: 'absolute',
    right: 28,
    bottom: 36,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#13aff9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
  },
  fabIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    tintColor: '#13aff9',
  },
  cardsContainer: {
    padding: 16,
    paddingBottom: 120,
    gap: 16,
  },
  card: {
    flex: 1,
    minHeight: 160,
    margin: 8,
    borderRadius: 18,
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
    textAlign: 'left',
  },
  cardDate: {
    fontSize: 14,
    color: '#222',
    fontWeight: 'bold',
    textAlign: 'right',
    marginLeft: 12,
  },
  cardText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.7,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#13aff9',
    marginBottom: 18,
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
    marginTop: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    color: '#222',
    backgroundColor: '#f7f7f7',
    marginBottom: 8,
  },
  modalTextarea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginLeft: 8,
  },
  modalButtonText: {
    fontWeight: 'bold',
    color: '#13aff9',
    fontSize: 15,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    bottom: 3,
    padding: 8,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: '#13aff9',
  },
  suggestionsBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    marginBottom: 8,
    maxHeight: 140,
    overflow: 'hidden',
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    color: '#13aff9',
    fontSize: 15,
  },
  selectedDrugsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  drugTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f3fa',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  drugTagText: {
    color: '#13aff9',
    fontSize: 14,
    marginRight: 4,
  },
  removeDrugText: {
    color: '#13aff9',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 2,
    marginTop: -2,
  },
  cardDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#e3e3e3',
    marginBottom: 8,
  },
});

export default PrescriptionPage