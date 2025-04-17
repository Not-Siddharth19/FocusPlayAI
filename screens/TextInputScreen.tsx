import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, Alert, SafeAreaView, ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { getAllApiKeys } from '../utils/secureStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TextInputScreen'>;

export default function TextInputScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [text, setText] = useState('');
  const [apiKeys, setApiKeys] = useState<{ [label: string]: { key: string; service: string } }>({});
  const [selectedKey, setSelectedKey] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const keys = await getAllApiKeys();
      setApiKeys(keys);
      const firstKey = Object.keys(keys)[0];
      if (firstKey) setSelectedKey(firstKey);
    };
    load();
  }, []);

  const handleGenerate = async () => {
    if (!text.trim()) return Alert.alert('Please enter some text.');
    if (!selectedKey) return Alert.alert('Please select an API key.');

    const { key: apiKey, service } = apiKeys[selectedKey];
    setLoading(true);

    try {
      let endpoint = '';
      let headers: any = {};
      let body: any = {};
      let questions: string[] = [];

      if (service.toLowerCase() === 'gemini') {
        endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
        headers = { 'Content-Type': 'application/json' };
        body = {
          contents: [{ parts: [{ text: `Generate 5 quiz questions from this paragraph:\n\n${text}` }] }]
        };

        const res = await fetch(endpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        });
        const data = await res.json();
        const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (typeof content === 'string') {
          questions = content.split('\n').filter(line => line.trim() !== '');
        } else {
          throw new Error('Invalid Gemini response format');
        }

      } else if (service.toLowerCase() === 'chatgpt' || service.toLowerCase() === 'openai') {
        endpoint = 'https://api.openai.com/v1/chat/completions';
        headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        };
        body = {
          model: 'gpt-4',
          messages: [
            {
              role: 'user',
              content: `Read the following paragraph and generate 5 quiz questions:\n\n"${text}"`,
            },
          ],
          temperature: 0.7,
        };

        const res = await fetch(endpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        });

        const data = await res.json();

        const content = data?.choices?.[0]?.message?.content;
        if (!content) {
          console.log('Full response:', JSON.stringify(data, null, 2));
          throw new Error('Invalid response format from ChatGPT');
        }

        questions = content
          .split('\n')
          .map((q: string) => q.trim())
          .filter((q: string) => q.length > 0);
      } else {
        throw new Error('Unsupported API service.');
        
      }

      setLoading(false);

      if (!questions.length) {
        Alert.alert('No questions generated.');
        return;
      }

      navigation.navigate('QuestionDisplayScreen', { questions });

    } catch (error: any) {
      console.error('Error generating questions:', error);
      setLoading(false);
      Alert.alert('Error', error.message || 'Failed to generate questions.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>📝 Text Input</Text>

        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Paste or type your study material here..."
          value={text}
          onChangeText={setText}
        />

        <Text style={styles.label}>Select API Key:</Text>
        <Picker
          selectedValue={selectedKey}
          onValueChange={(itemValue) => setSelectedKey(itemValue)}
          style={styles.picker}
        >
          {Object.keys(apiKeys).map(label => (
            <Picker.Item
              label={`${label} (${apiKeys[label].service})`}
              value={label}
              key={label}
            />
          ))}
        </Picker>

        <TouchableOpacity style={styles.button} onPress={handleGenerate}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Generate Questions</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  textArea: {
    height: 160,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  picker: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8000ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
