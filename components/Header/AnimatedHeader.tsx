import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    AnimatedProps,
    useAnimatedStyle,
    interpolate
} from 'react-native-reanimated';

import { styles } from '@/styles';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

interface AnimatedHeaderProps {
    headerAnimatedProps: AnimatedProps<any>;
    title: string;
    scrollDirection: Animated.SharedValue<number>;
}

export function AnimatedHeader({ headerAnimatedProps, title, scrollDirection }: AnimatedHeaderProps) {
    const insets = useSafeAreaInsets();

    const tabsAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollDirection.value,
                [0, 1],
                [40, 0],
                'clamp'
            ),
            opacity: interpolate(
                scrollDirection.value,
                [0, 0.5, 1],
                [1, 0.8, 0],
                'clamp'
            ),
            transform: [
                {
                    translateY: interpolate(
                        scrollDirection.value,
                        [0, 1],
                        [0, -40],
                        'clamp'
                    )
                }
            ],
            overflow: 'hidden'
        };
    });

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
                <Animated.View style={[styles.categoryTabs, tabsAnimatedStyle]}>
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
                </Animated.View>
            </AnimatedBlurView>
        </Animated.View>
    );
} 