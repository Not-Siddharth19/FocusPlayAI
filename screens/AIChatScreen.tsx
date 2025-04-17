import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AIChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🤖 AI Chat Assistant</Text>
    </View>
  );
};

export default AIChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: '600' },
});
