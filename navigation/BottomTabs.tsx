import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import QuizHomeScreen from '../screens/QuizHomeScreen';
import PomodoroSetupScreen from '../screens/PomodoroSetupScreen';
import GoalTrackerScreen from '../screens/GoalTrackerScreen';
import AIChatScreen from '../screens/AIChatScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home': iconName = 'home'; break;
            case 'Explore': iconName = 'search'; break;
            case 'Quiz': iconName = 'help-circle'; break;
            case 'Pomodoro': iconName = 'timer'; break;
            case 'Goals': iconName = 'checkmark-done'; break;
            case 'AI Chat': iconName = 'chatbubble-ellipses'; break;
            default: iconName = 'ellipse';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        headerShown: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Quiz" component={QuizHomeScreen} />
      <Tab.Screen name="Pomodoro" component={PomodoroSetupScreen} />
      <Tab.Screen name="Goals" component={GoalTrackerScreen} />
      <Tab.Screen name="AI Chat" component={AIChatScreen} />
    </Tab.Navigator>
  );
}
