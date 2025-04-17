import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  QuizHome: undefined;
  GoalTracker: undefined;
  AIChat: undefined;
};

export default function ExploreScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🔍 Explore</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('QuizHome')}>
        <Text style={styles.cardText}>🧠 Quiz Generator</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('GoalTracker')}>
        <Text style={styles.cardText}>🎯 Goal Tracker</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AIChat')}>
        <Text style={styles.cardText}>🤖 AI Chat Assistant</Text>
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
