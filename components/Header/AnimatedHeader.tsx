import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { styles } from '@/styles';

interface AnimatedHeaderProps {
    headerAnimatedStyle: { intensity: number };
    title: string;
}

export function AnimatedHeader({ headerAnimatedStyle, title }: AnimatedHeaderProps) {
    const insets = useSafeAreaInsets();

    return (
        <Animated.View style={[styles.header]}>
            <BlurView
                tint="systemUltraThinMaterialDark"
                intensity={headerAnimatedStyle.intensity}
                style={[styles.blurContainer, { paddingTop: insets.top }]}
            >
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>{title}</Text>
                    <Pressable style={styles.searchButton}>
                        <Ionicons name="search" size={24} color="#fff" />
                    </Pressable>
                </View>
                <View style={styles.categoryTabs}>
                    <Pressable style={styles.categoryTab}>
                        <Text style={styles.categoryTabText}>TV Shows</Text>
                    </Pressable>
                    <Pressable style={styles.categoryTab}>
                        <Text style={styles.categoryTabText}>Movies</Text>
                    </Pressable>
                    <Pressable style={styles.categoryTab}>
                        <Text style={styles.categoryTabTextWithIcon}>Categories</Text>
                        <Ionicons name="chevron-down" size={16} color="#fff" />
                    </Pressable>
                </View>
            </BlurView>
        </Animated.View>
    );
} 