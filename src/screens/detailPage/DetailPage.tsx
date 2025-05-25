import React from 'react';
import { View, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

import ChatBoxPlaceholder from '../../components/ChatboxPlaceholder';

type DetailRouteProp = RouteProp<RootStackParamList, 'İlaç Detayı'>;

export default function DetailScreen() {
  const { params } = useRoute<DetailRouteProp>();
  const { drug } = params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{drug.name}</Text>
      <Text style={{ marginVertical: 5 }}>Etken Madde: {drug.activeSubstance}</Text>
      <Text style={{ marginVertical: 5 }}>Firma: {drug.company}</Text>
      <Text style={{ marginVertical: 5 }}>ATC Kodu: {drug.atcCode}</Text>
      <Text style={{ marginVertical: 5 }}>Ruhsat Tarihi: {drug.licenseDate}</Text>
      <Text style={{ marginVertical: 5 }}>Barkod: {drug.barcode}</Text>

      <ChatBoxPlaceholder />
    </View>
  );
}
