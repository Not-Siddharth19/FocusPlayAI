import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';

const aiModels = ['GPT-4', 'Gemini Pro', 'Meta AI', 'Custom'];

export default function FileUploadScreen() {
  const [fileName, setFileName] = useState('');
  const [fileText, setFileText] = useState('');
  const [selectedModel, setSelectedModel] = useState(aiModels[0]);
  const [loading, setLoading] = useState(false);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (!result.canceled) {
        setFileName(result.assets[0].name);
        simulateExtractText(result.assets[0].name);
      }
    } catch (error) {
      console.error('File selection error:', error);
    }
  };

  const simulateExtractText = async (name: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setFileText(`Mock content from file "${name}":\n\n"Newton’s First Law states that an object in motion stays in motion..."`);
    setLoading(false);
  };

  const handleGenerateQuestions = () => {
    if (!fileText) {
      Alert.alert('No content extracted!');
      return;
    }
    Alert.alert(`Sending to ${selectedModel}`, 'Simulating question generation from file text.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📄 Upload File</Text>

      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <Ionicons name="document-attach" size={22} color="#fff" />
        <Text style={styles.buttonText}>Select File</Text>
      </TouchableOpacity>

      {fileName ? (
        <Text style={{ marginTop: 10, fontWeight: '500' }}>Selected: {fileName}</Text>
      ) : null}

      {loading && <ActivityIndicator size="large" color="#8000ff" style={{ marginTop: 20 }} />}

      {fileText !== '' && (
        <View style={styles.textBox}>
          <Text style={styles.textLabel}>Extracted Text:</Text>
          <Text style={styles.textContent}>{fileText}</Text>
        </View>
      )}

      <Text style={styles.textLabel}>Select AI Model:</Text>
      <View style={styles.modelSelector}>
        {aiModels.map((model) => (
          <TouchableOpacity
            key={model}
            style={[
              styles.modelButton,
              selectedModel === model && styles.modelSelected,
            ]}
            onPress={() => setSelectedModel(model)}
          >
            <Text style={{ color: selectedModel === model ? '#fff' : '#8000ff' }}>{model}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={handleGenerateQuestions}>
        <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
        <Text style={styles.buttonText}>Generate Questions</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8000ff',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  textBox: {
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  textLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  textContent: {
    fontSize: 14,
    color: '#333',
  },
  modelSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    gap: 10,
  },
  modelButton: {
    borderWidth: 1,
    borderColor: '#8000ff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  modelSelected: {
    backgroundColor: '#8000ff',
  },
});
