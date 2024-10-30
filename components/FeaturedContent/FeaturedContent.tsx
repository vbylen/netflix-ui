import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { styles } from '@/styles';
import { FeaturedMovie } from '@/types/movie';

interface FeaturedContentProps {
    movie: FeaturedMovie;
    imageStyle: any;
    categoriesStyle: any;
    buttonsStyle: any;
    topMargin: number;
}

export function FeaturedContent({
    movie,
    imageStyle,
    categoriesStyle,
    buttonsStyle,
    topMargin
}: FeaturedContentProps) {
    return (
        <View style={[styles.featuredContent, { marginTop: topMargin }]}>
            <View style={styles.featuredWrapper}>
                <View style={styles.featuredImageContainer}>
                    <Animated.Image
                        source={{ uri: movie.thumbnail }}
                        style={[styles.featuredImage, imageStyle]}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.featuredGradient}
                    />
                </View>
                <View style={styles.featuredOverlay}>
                    <Animated.View style={[styles.featuredCategories, categoriesStyle]}>
                        <Text style={styles.categoriesText}>
                            {movie.categories.join(' • ')}
                        </Text>
                    </Animated.View>
                    <Animated.View style={[styles.featuredButtons, buttonsStyle]}>
                        <Pressable style={styles.playButton}>
                            <Ionicons name="play" size={24} color="#000" />
                            <Text style={styles.playButtonText}>Play</Text>
                        </Pressable>
                        <Pressable style={styles.myListButton}>
                            <Ionicons name="add" size={24} color="#fff" />
                            <Text style={styles.myListButtonText}>My List</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
} 