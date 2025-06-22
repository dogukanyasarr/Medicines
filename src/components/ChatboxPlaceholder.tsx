import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

export interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatBoxProps {
  messages: Message[];
  onSend: (question: string) => void;
  loading?: boolean;
}

export default function ChatBox({ messages, onSend, loading }: ChatBoxProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.card}>
        <ScrollView style={styles.messagesContainer} contentContainerStyle={{ paddingBottom: 10 }}>
          {messages.length === 0 ? (
            <Text style={styles.placeholderText}>Sorunuzu yazın ve gönderin.</Text>
          ) : (
            messages.map((msg, idx) => (
              <View
                key={idx}
                style={[
                  styles.messageRow,
                  msg.sender === 'user' ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' },
                ]}
              >
                <View style={[
                  styles.messageBubble,
                  msg.sender === 'user' ? styles.userBubble : styles.botBubble,
                ]}>
                  <Text style={msg.sender === 'user' ? styles.userText : styles.botText}>{msg.text}</Text>
                </View>
              </View>
            ))
          )}
          {loading && <ActivityIndicator size="small" color="#13aff9" style={{ marginTop: 8 }} />}
        </ScrollView>
        <View style={styles.divider} />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Sorunuzu yazın..."
            placeholderTextColor="#aaa"
            editable={!loading}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, (loading || !input.trim()) && { opacity: 0.5 }]}
            onPress={handleSend}
            disabled={loading || !input.trim()}
          >
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>➤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: 220,
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 18,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 220,
    maxHeight: 400,
    marginBottom: 8,
  },
  messagesContainer: {
    flex: 1,
    maxHeight: 220,
    marginBottom: 6,
  },
  placeholderText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 2,
    width: '100%',
  },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    maxWidth: '80%',
    marginVertical: 2,
  },
  userBubble: {
    backgroundColor: '#13aff9',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#f1f2f6',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  userText: {
    color: '#fff',
    fontSize: 15,
  },
  botText: {
    color: '#222',
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#e3e3e3',
    marginVertical: 8,
    borderRadius: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 15,
    minHeight: 36,
    maxHeight: 80,
  },
  sendButton: {
    backgroundColor: '#13aff9',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    shadowColor: '#13aff9',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
    elevation: 2,
  },
});
