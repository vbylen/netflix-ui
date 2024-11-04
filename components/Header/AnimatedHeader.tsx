import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { AnimatedProps } from 'react-native-reanimated';

import { styles } from '@/styles';

// Create an animated BlurView component
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

interface AnimatedHeaderProps {
    headerAnimatedProps: AnimatedProps<any>;
    title: string;
}

export function AnimatedHeader({ headerAnimatedProps, title }: AnimatedHeaderProps) {
    const insets = useSafeAreaInsets();

    return (
        <Animated.View style={[styles.header]}>
            <AnimatedBlurView
                tint="systemUltraThinMaterialDark"
                style={[styles.blurContainer, { paddingTop: insets.top }]}
                animatedProps={headerAnimatedProps}
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
            </AnimatedBlurView>
        </Animated.View>
    );
} 