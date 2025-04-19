import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
 
import MainTabs from './navigation/MainTabs';
import QuizHomeScreen from './screens/QuizHomeScreen';
import PomodoroScreen from './screens/PomodoroSetupScreen';
import GoalTrackerScreen from './screens/GoalTrackerScreen';
import AIChatScreen from './screens/AIChatScreen';
import ApiKeyScreen from './screens/ApiKeyScreen';
import CameraInputScreen from './screens/CameraInputScreen';
import FileUploadScreen from './screens/FileUploadScreen';
import TextInputScreen from './screens/TextInputScreen';
import QuestionDisplayScreen from './screens/QuestionDisplayScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  QuizHome: undefined;
  Pomodoro: undefined;
  GoalTracker: undefined;
  AIChat: undefined;
  ApiKeyScreen: undefined;
  CameraInputScreen: undefined;
  FileUploadScreen: undefined;
  TextInputScreen: undefined;
  QuestionDisplayScreen: { questions: string[] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="QuizHome" component={QuizHomeScreen} />
          <Stack.Screen name="Pomodoro" component={PomodoroScreen} />
          <Stack.Screen name="GoalTracker" component={GoalTrackerScreen} />
          <Stack.Screen name="AIChat" component={AIChatScreen} />
          <Stack.Screen name="ApiKeyScreen" component={ApiKeyScreen} />
          <Stack.Screen name="CameraInputScreen" component={CameraInputScreen} />
          <Stack.Screen name="FileUploadScreen" component={FileUploadScreen} />
          <Stack.Screen name="TextInputScreen" component={TextInputScreen} />
          <Stack.Screen name="QuestionDisplayScreen" component={QuestionDisplayScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
