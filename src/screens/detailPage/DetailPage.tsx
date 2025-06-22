import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './style';
import { DetailRouteProp } from './type';
import ChatBox, { Message } from '../../components/ChatboxPlaceholder';
import { askQuestion } from '../../services/WebApi';

const VIBRANT_COLORS = [
  '#1abc9c', '#2ecc71', '#9b59b6', '#f1c40f', 
  '#e67e22', '#16a085', '#8e44ad', '#d35400'
];

const getRandomColor = () => VIBRANT_COLORS[Math.floor(Math.random() * VIBRANT_COLORS.length)];

export default function DetailScreen() {
  const { params } = useRoute<DetailRouteProp>();
  const navigation = useNavigation();
  const { drug } = params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (question: string) => {
    setMessages(prev => [...prev, { sender: 'user', text: question }]);
    setLoading(true);
    try {
      const answer = await askQuestion(question);
      setMessages(prev => [...prev, { sender: 'bot', text: answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Bir hata oluştu. Lütfen tekrar deneyin.' }]);
    } finally {
      setLoading(false);
    }
  };

  const Row = ({ label, value }: { label: string; value: string }) => {
    const rowColor = useMemo(() => getRandomColor(), []);

    return (
      <View style={styles.rowContainer}>
        <View style={[styles.infoChip, { backgroundColor: rowColor }]}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
        <View style={[styles.infoChip, { backgroundColor: rowColor }]}>
          <Text style={styles.valueText}>{value}</Text>
        </View>
      </View>
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('../../assets/images/homebg.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            onPress={handleGoBack}
            style={styles.backButton}
          >
            <Image 
              source={require('../../assets/images/back.png')}
              style={styles.backIcon} 
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>İlaç Detayı</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.productNameContainer}>
            <Text style={styles.productName}>{drug.productName}</Text>
          </View>

          <Row label="Etken Madde:" value={drug.activeIngredient} />
          <Row label="Firma:" value={drug.company} />
          <Row label="ATC Kodu:" value={drug.atcCode} />
          <Row label="Ruhsat Tarihi:" value={drug.licenseDate.split(' ')[0]} />
          <Row label="Barkod:" value={drug.barcode} />
          <Row label="Ruhsat No:" value={drug.licenseNumber} />

          <View style={styles.chatboxContainer}>
            <ChatBox
              messages={messages}
              onSend={handleSend}
              loading={loading}
            />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
