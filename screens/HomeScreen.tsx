import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const tools = [
  {
    title: 'Quiz Generator',
    route: 'QuizHome',
    icon: <MaterialCommunityIcons name="brain" size={32} color="#8000ff" />,
  },
  {
    title: 'Pomodoro Timer',
    route: 'Pomodoro',
    icon: <Ionicons name="timer-outline" size={32} color="#8000ff" />,
  },
  {
    title: 'Goal Tracker',
    route: 'GoalTracker',
    icon: <FontAwesome5 name="bullseye" size={28} color="#8000ff" />,
  },
  {
    title: 'AI Chat Assistant',
    route: 'AIChat',
    icon: <Ionicons name="chatbubble-ellipses-outline" size={30} color="#8000ff" />,
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.greeting}>👋 Welcome back!</Text>
        <Text style={styles.motivation}>Let’s stay productive today 🚀</Text>

        <Text style={styles.sectionTitle}>🧰 Tools</Text>
        <FlatList
          data={tools}
          keyExtractor={(item) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate(item.route)}
            >
              {item.icon}
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    flex: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
  },
  motivation: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  grid: {
    paddingVertical: 10,
  },
  card: {
    width: 140,
    height: 140,
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    marginRight: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
