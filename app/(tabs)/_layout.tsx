import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet } from 'react-native';

// Helper component for cross-platform icons
function TabIcon({ ionIcon, color }: { ionIcon: 'home-sharp' | 'apps-sharp' | 'person'; color: string }) {
  return <TabBarIcon name={ionIcon} color={color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FA2D48',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: Platform.select({
            ios: 'transparent',
            android: 'rgba(255, 255, 255, 0.8)', // Fallback for Android
          }),
          borderTopWidth: 0,
          elevation: 0,
          height: 94,
          paddingTop: 0,
          paddingBottom: 40,
        },
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView
              tint={colorScheme === 'dark' ? 'systemThickMaterialDark' : 'systemThickMaterialLight'}
              intensity={80}
              style={StyleSheet.absoluteFill}
            />
          ) : null
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabIcon
              ionIcon="home-sharp"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'New',
          tabBarIcon: ({ color }) => (
            <TabIcon
              ionIcon="apps-sharp"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'My Netflix',
          tabBarIcon: ({ color }) => (
            <TabIcon
              ionIcon="person"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
