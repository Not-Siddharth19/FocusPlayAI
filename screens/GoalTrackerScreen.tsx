import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GoalTrackerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎯 Goal Tracker</Text>
    </View>
  );
};

export default GoalTrackerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: '600' },
});
