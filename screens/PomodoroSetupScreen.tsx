import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PomodoroSetupScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏱️ Pomodoro Setup</Text>
      <Text>Coming Soon!</Text>
    </View>
  );
};

export default PomodoroSetupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
