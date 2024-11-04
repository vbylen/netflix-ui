import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

interface CategoriesListModalProps {
    visible: boolean;
    onClose: () => void;
}

const categories = [
    'My List',
    'Available for Download',
    'Action',
    'AMC Collection',
    'Anime',
    'Comedies',
    'Crime',
    'Critically Acclaimed',
    'Documentaries',
    'Dramas',
    'Fantasy',
    'Holidays',
    'Horror',
    'Independent',
    'International',
    'Kids & Family',
    'LGBTQ',
    'Music & Musicals',
    'Reality',
    'Romance',
    'Sci-Fi',
    'Sports',
    'Stand-Up',
    'Thrillers',
    'Audio Description in English'
];

export function CategoriesListModal({ visible, onClose }: CategoriesListModalProps) {
    const insets = useSafeAreaInsets();

    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill}>
                <ScrollView
                    style={[styles.content, { paddingTop: insets.top }]}
                    contentContainerStyle={[
                        styles.scrollContent,
                        { paddingBottom: insets.bottom + 80 }
                    ]}
                >
                    {categories.map((category) => (
                        <Pressable
                            key={category}
                            style={styles.categoryItem}
                        >
                            <Text style={styles.categoryText}>{category}</Text>
                        </Pressable>
                    ))}
                </ScrollView>

                <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 20 }]}>
                    <Pressable
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Ionicons name="close" size={24} color="#fff" />
                    </Pressable>
                </View>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        elevation: 9999,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    categoryItem: {
        paddingVertical: 14,
    },
    categoryText: {
        color: 'rgba(255, 255, 255, 0.609)',
        fontSize: 18,
        fontWeight: '400',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingVertical: 20,
        zIndex: 1000,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
}); 