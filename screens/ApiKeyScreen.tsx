// screens/ApiKeyScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { getAllApiKeys, saveApiKey, deleteApiKey } from '../utils/secureStore';

export default function ApiKeyScreen() {
  const [label, setLabel] = useState('');
  const [key, setKey] = useState('');
  const [service, setService] = useState('ChatGPT');
  const [savedKeys, setSavedKeys] = useState<{ [label: string]: { key: string; service: string } }>(
    {}
  );

  useEffect(() => {
    loadKeys();
  }, []);

  const loadKeys = async () => {
    const keys = await getAllApiKeys();
    setSavedKeys(keys);
  };

  const handleSave = async () => {
    if (!label || !key || !service) {
      Alert.alert('Please fill all fields');
      return;
    }
    await saveApiKey(label, key, service);
    setLabel('');
    setKey('');
    loadKeys();
    Alert.alert('Saved!');
  };

  const handleDelete = async (lbl: string) => {
    await deleteApiKey(lbl);
    loadKeys();
    Alert.alert('Deleted!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.header}>🔑 Manage API Keys</Text>

        <TextInput
          style={styles.input}
          placeholder="Label (e.g., My GPT Key)"
          value={label}
          onChangeText={setLabel}
        />
        <TextInput
          style={styles.input}
          placeholder="API Key"
          value={key}
          onChangeText={setKey}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Service (e.g., ChatGPT, Gemini)"
          value={service}
          onChangeText={setService}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>💾 Save Key</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Saved Keys:</Text>
        {Object.keys(savedKeys).map((lbl) => (
          <View key={lbl} style={styles.keyCard}>
            <Text style={styles.keyText}>
              {lbl} ({savedKeys[lbl].service})
            </Text>
            <TouchableOpacity onPress={() => handleDelete(lbl)}>
              <Text style={styles.deleteText}>🗑</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  keyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f3f3f3',
    marginBottom: 10,
  },
  keyText: { fontSize: 16 },
  deleteText: { fontSize: 18 },
});
