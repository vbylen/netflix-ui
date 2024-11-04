import { Tabs, useRouter, usePathname } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Platform, StyleSheet, Image, View, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useUser } from '@/contexts/UserContext';
import { TabScreenWrapper } from '@/components/TabScreenWrapper';

// Helper component for cross-platform icons
function TabIcon({ ionIcon, color }: { ionIcon: 'home-sharp' | 'person' | 'play-outline'; color: string }) {
  return <TabBarIcon name={ionIcon} color={color} />;
}

// Netflix profile image component
function ProfileImage({ focused }: { focused: boolean }) {
  const { selectedProfile } = useUser();

  return (
    <React.Fragment>
      <Image
        source={{ uri: selectedProfile?.avatar }}
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
  const pathname = usePathname();
  const handleTabPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#ffffff3f',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#1f1f1f',
          borderTopWidth: 0,
          elevation: 0,
          height: 84,
          paddingTop: 0,
          paddingBottom: 35,
        },
        tabBarLabelStyle: {
          marginBottom: 10,
        },
        tabBarButton: (props) => (
          <Pressable
            {...props}
            onPress={(e) => {
              handleTabPress();
              props.onPress?.(e);
            }}
          />
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
          title: 'New & Hot',
          tabBarIcon: ({ color }) => (
            <TabIcon
              ionIcon="play-outline"
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
