import React from 'react';
import { Text, Image, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@/styles/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Animated, {
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    interpolate,
} from 'react-native-reanimated';

interface ComingSoonItem {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
    description: string;
    rating: string;
}

const COMING_SOON_DATA: ComingSoonItem[] = [
    {
        id: '1',
        title: 'Jake Paul vs. Mike Tyson',
        date: 'NOV 15',
        imageUrl: 'https://path-to-paul-tyson-image.jpg',
        description: 'Jake Paul battles Mike Tyson as they headline this must-see boxing mega-event streaming live in five languages from AT&T Stadium in Arlington, Texas.',
        rating: 'TV-14'
    },
    // Add more items...
];

export default function NewAndHotScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const headerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scrollY.value, [0, 100], [1, 0.9])
    }));

    const renderComingSoonItem = (item: ComingSoonItem) => (
        <View key={item.id} style={styles.comingSoonItem}>
            <View style={styles.dateBadge}>
                <Text style={styles.dateMonth}>{item.date.split(' ')[0]}</Text>
                <Text style={styles.dateDay}>{item.date.split(' ')[1]}</Text>
            </View>
            <View style={styles.contentPreview}>
                <Image source={{ uri: item.imageUrl }} style={styles.previewImage} />
                <View style={styles.previewInfo}>
                    <View style={styles.previewHeader}>
                        <Text style={styles.previewTitle}>{item.title}</Text>
                        <Text style={styles.previewRating}>{item.rating}</Text>
                    </View>
                    <Text style={styles.previewDescription}>{item.description}</Text>
                </View>
                <View style={styles.previewActions}>
                    <Pressable style={styles.reminderButton}>
                        <Ionicons name="notifications-outline" size={24} color="#fff" />
                        <Text style={styles.reminderText}>Remind Me</Text>
                    </Pressable>
                    <Pressable style={styles.infoButton}>
                        <Ionicons name="information-circle-outline" size={24} color="#fff" />
                        <Text style={styles.infoText}>Info</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient
                colors={['#000000', '#000000']}
                style={styles.gradient}
            />

            <Animated.View style={[styles.header, headerAnimatedStyle]}>
                <BlurView
                    tint="dark"
                    intensity={100}
                    style={[styles.blurContainer, { paddingTop: insets.top }]}
                >
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>New & Hot</Text>
                        <Pressable style={styles.searchButton}>
                            <Ionicons name="search" size={24} color="#fff" />
                        </Pressable>
                    </View>
                </BlurView>
            </Animated.View>

            <Animated.ScrollView
                style={styles.scrollView}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerStyle={[
                    styles.scrollViewContent,
                    { paddingTop: insets.top + 60 }
                ]}
            >
                <View style={styles.categoryTabs}>
                    <Pressable style={[styles.categoryTab, styles.activeTab]}>
                        <Ionicons name="popcorn-outline" size={20} color="#fff" />
                        <Text style={styles.categoryTabText}>Coming Soon</Text>
                    </Pressable>
                    <Pressable style={styles.categoryTab}>
                        <Ionicons name="flame-outline" size={20} color="#fff" />
                        <Text style={styles.categoryTabText}>Everyone's Watching</Text>
                    </Pressable>
                    <Pressable style={styles.categoryTab}>
                        <Text style={styles.categoryTabText}>Top 10</Text>
                    </Pressable>
                </View>

                <View style={styles.comingSoonList}>
                    {COMING_SOON_DATA.map(renderComingSoonItem)}
                </View>
            </Animated.ScrollView>
        </View>
    );
}


