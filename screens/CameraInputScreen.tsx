import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const aiModels = ['GPT-4', 'Gemini Pro', 'Meta AI', 'Custom'];

export default function CameraInputScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState('');
  const [selectedModel, setSelectedModel] = useState(aiModels[0]);
  const [loading, setLoading] = useState(false);

  const takePicture = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Camera access is required');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ base64: false });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      simulateOCR(uri); // Placeholder for real OCR
    }
  };

  const simulateOCR = async (uri: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // simulate delay
    setOcrText(
      'Mock OCR Result:\n"Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water."'
    );
    setLoading(false);
  };

  const handleGenerateQuestions = () => {
    if (!ocrText) {
      Alert.alert('Please scan text first!');
      return;
    }
    Alert.alert(`Sending to ${selectedModel}`, 'This will send the extracted text to your AI model.');
    // Here you'd send the OCR text + selectedModel to your backend or directly to the model
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📷 Camera Input</Text>

      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Ionicons name="camera" size={24} color="#fff" />
        <Text style={styles.buttonText}>Take Picture</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}

      {loading && <ActivityIndicator size="large" color="#8000ff" style={{ marginTop: 20 }} />}

      {ocrText !== '' && (
        <View style={styles.textBox}>
          <Text style={styles.textLabel}>Extracted Text:</Text>
          <Text style={styles.textContent}>{ocrText}</Text>
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
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 15,
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
