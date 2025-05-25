import React from 'react';
import { View, Text } from 'react-native';

export default function ChatBoxPlaceholder() {
  return (
    <View style={{
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      marginTop: 20,
      padding: 10,
      justifyContent: 'flex-end'
    }}>
      <Text style={{ color: '#aaa', textAlign: 'center' }}>
        [Chat kutusu burada yer alacak]
      </Text>
    </View>
  );
}
