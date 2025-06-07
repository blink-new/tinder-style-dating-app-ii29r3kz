import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { Heart, MessageCircle, User, Flame } from 'lucide-react-native';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <Tabs screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          height: 80,
          paddingTop: 8,
          paddingBottom: 20,
        },
        tabBarActiveTintColor: '#FF6B5F',
        tabBarInactiveTintColor: '#8E8E93',
      }}>
        <Tabs.Screen 
          name="index" 
          options={{
            title: 'Discover',
            tabBarIcon: ({ color, size }) => <Flame color={color} size={size} />,
          }}
        />
        <Tabs.Screen 
          name="likes" 
          options={{
            title: 'Likes',
            tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
          }}
        />
        <Tabs.Screen 
          name="messages" 
          options={{
            title: 'Messages',
            tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} />,
          }}
        />
        <Tabs.Screen 
          name="profile" 
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      </Tabs>
      <StatusBar style="light" />
    </>
  );
}