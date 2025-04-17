import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

export default function SettingsScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>⚙️ Settings</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ApiKeyScreen')}>
        <Text style={styles.cardText}>🔑 Manage API Keys</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 26, fontWeight: '700', marginBottom: 20 },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 12,
  },
  cardText: { fontSize: 18 },
});
