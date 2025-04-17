import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function QuizHomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📚 AI Quiz Generator</Text>
      <Text style={styles.subHeader}>
        Choose your input method to begin:
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CameraInputScreen')}
      >
        <MaterialCommunityIcons name="camera-outline" size={28} color="#8000ff" />
        <Text style={styles.cardText}>Use Camera (OCR)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('FileUploadScreen')}
      >
        <FontAwesome5 name="file-upload" size={24} color="#8000ff" />
        <Text style={styles.cardText}>Upload PDF / File</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('TextInputScreen')}
      >
        <Ionicons name="text-outline" size={28} color="#8000ff" />
        <Text style={styles.cardText}>Enter Text Manually</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 30,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  cardText: {
    fontSize: 18,
    marginLeft: 16,
    color: '#333',
    fontWeight: '600',
  },
});
