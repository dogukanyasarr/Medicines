import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { DetailRouteProp } from './type';
import ChatBoxPlaceholder from '../../components/ChatboxPlaceholder';
import Header from '../../components/header/header';
import { useRoute } from '@react-navigation/native';

export default function DetailScreen() {
  const { params } = useRoute<DetailRouteProp>();
  const navigation = useNavigation();
  const { drug } = params;

  const Row = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.rowContainer}>
      <View style={styles.labelBg}><Text style={styles.labelText}>{label}</Text></View>
      <View style={styles.valueBg}><Text style={styles.valueText}>{value}</Text></View>
    </View>
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f4f8fc', padding:10}}>
      <Header 
        text="İlaç Detayı" 
        onPress={handleGoBack}
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.productName}>{drug.productName}</Text>
          <Row label="Etken Madde:" value={drug.activeIngredient} />
          <Row label="Firma:" value={drug.company} />
          <Row label="ATC Kodu:" value={drug.atcCode} />
          <Row label="Ruhsat Tarihi:" value={drug.licenseDate.split(' ')[0]} />
          <Row label="Barkod:" value={drug.barcode} />
          <Row label="Ruhsat No:" value={drug.licenseNumber} />
          <ChatBoxPlaceholder />
        </View>
      </ScrollView>
    </View>
  );
}
