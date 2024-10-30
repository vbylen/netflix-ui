import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Platform, StyleSheet, Image, View } from 'react-native';
import { BlurView } from 'expo-blur';

// Helper component for cross-platform icons
function TabIcon({ ionIcon, color }: { ionIcon: 'home-sharp' | 'play-square' | 'person'; color: string }) {
  return <TabBarIcon name={ionIcon} color={color} />;
}

// Netflix profile image component
function ProfileImage({ focused }: { focused: boolean }) {
  return (
    <React.Fragment>
      <Image
        source={{ uri: 'https://i.imgur.com/KKkzRv7.png' }}
        style={{
          width: 24,
          height: 24,
          borderRadius: 4,
          opacity: focused ? 1 : 0.5,
          borderWidth: 2,
          borderColor: 'white',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: -18,
          alignSelf: 'center',
          width: 5,
          height: 5,
          borderRadius: 2,
          backgroundColor: '#db0000',
        }}
      />
    </React.Fragment>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#ffffff3f',
        headerShown: false,
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={95}
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          height: 94,
          paddingTop: 0,
          paddingBottom: 40,
        },
        tabBarLabelStyle: {
          marginBottom: 10,
          // fontSize: 12,
          // fontWeight: '700',
        },
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
          title: 'New & Hot',
          tabBarIcon: ({ color }) => (
            <TabIcon
              ionIcon="play-square"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'My Netflix',
          tabBarIcon: ({ focused }) => <ProfileImage focused={focused} />,
        }}
      />
    </Tabs>
  );
}
