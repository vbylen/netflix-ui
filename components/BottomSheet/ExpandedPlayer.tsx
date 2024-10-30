import { View as ThemedView, StyleSheet, Image, Pressable, Dimensions, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useEffect, useState, useCallback } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { expandedPlayerStyles as styles } from '@/styles/expanded-player';
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface ExpandedPlayerProps {
    scrollComponent?: (props: any) => React.ReactElement;
}

export function ExpandedPlayer({ scrollComponent }: ExpandedPlayerProps) {
    const ScrollComponentToUse = scrollComponent || ScrollView;

    const insets = useSafeAreaInsets();



    return (
        <LinearGradient
            colors={['#1f1f1f', '#1f1f1f']}
            style={[styles.rootContainer, { marginTop: insets.top }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >

            <ScrollComponentToUse
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >

            </ScrollComponentToUse>
        </LinearGradient>
    );
}

