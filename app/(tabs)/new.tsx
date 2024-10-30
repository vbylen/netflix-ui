import React from 'react';
import { Text, Image, View, Pressable, ScrollView as RNScrollView } from 'react-native';
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
        imageUrl: 'https://occ-0-7-6.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABe2bvw9phUMK1Q7bwrtu1vIHZuqJnpH5MZOlIXePqKZay4zRFAo2NcKsYckFB4Q-uDPaSlpGDN57Q4gHJyW-LAiOQonOP9_m2BwBC36YzfDw9OGC-aFb7iUtk3hxGrx1wDA9MwM9olUNXK9Q_54Gaq0IPH1FelfhOdCOeVHIBNaqrO714jryhoRPT277og-tzWGzFEHA90tU5wSUDEHTePFNkuE8nviW3ba2yRXNrsFt3bZvPyuwoPYTfurBZ3OLO-WA9G3uZN5KieZs71cao2XUVzk5a8c6-yX3ILag1px5JJEdUWMpcevyzu7oJHI0leNZDwFhnHno1rrVhuGt0g0nbe21-3SicR3nBT3typIySugKkKvbs8Yei5HjggkFgmNCAEK13IGAhs_vvszZOpy9KUmiq4wuDkkkZgChcwLb000hXnOUHbnQeg.jpg?r=bfd',
        description: 'Jake Paul battles Mike Tyson as they headline this must-see boxing mega-event streaming live in five languages from AT&T Stadium in Arlington, Texas.',
        rating: 'TV-14'
    },
    // Add more items...
];

const TAB_OPTIONS = [
    {
        id: 'coming-soon',
        icon: 'https://img.icons8.com/?size=96&id=97192&format=png',
        label: 'Coming Soon'
    },
    {
        id: 'everyone-watching',
        icon: 'https://img.icons8.com/?size=96&id=97192&format=png',
        label: "Everyone's Watching"
    },
    {
        id: 'top-10',
        icon: 'https://img.icons8.com/?size=96&id=97192&format=png',
        label: 'Top 10'
    }
];

export default function NewAndHotScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const scrollY = useSharedValue(0);
    const [activeTab, setActiveTab] = React.useState('coming-soon');

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

    const renderTab = (tab: typeof TAB_OPTIONS[0]) => (
        <Pressable
            key={tab.id}
            style={[styles.categoryTab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
        >
            <Image
                source={{ uri: tab.icon }}
                style={styles.tabIcon}
            />
            <Text style={styles.categoryTabText}>{tab.label}</Text>
        </Pressable>
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
                    intensity={0}
                    style={[styles.blurContainer, { paddingTop: insets.top, backgroundColor: '#000000' }]}
                >
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>New & Hot</Text>
                        <Pressable style={styles.searchButton}>
                            <Ionicons name="search" size={24} color="#fff" />
                        </Pressable>
                    </View>
                </BlurView>
            </Animated.View>

            <RNScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryTabs}
            >
                {TAB_OPTIONS.map(renderTab)}
            </RNScrollView>

            <View style={styles.comingSoonList}>
                {COMING_SOON_DATA.map(renderComingSoonItem)}
            </View>
        </View>
    );
}


