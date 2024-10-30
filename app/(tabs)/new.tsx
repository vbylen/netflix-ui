import React from 'react';
import { Text, Image, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@/styles/index';
import { newStyles } from '@/styles/new';
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
        <View key={item.id} style={newStyles.comingSoonItem}>
            <View style={newStyles.dateContainer}>
                <Text style={newStyles.dateMonth}>{item.date.split(' ')[0]}</Text>
                <Text style={newStyles.dateDay}>{item.date.split(' ')[1]}</Text>
            </View>

            <View style={newStyles.contentContainer}>
                <View style={newStyles.previewCard}>
                    <Image source={{ uri: item.imageUrl }} style={newStyles.previewImage} />
                    <View style={newStyles.liveTag}>
                        <Text style={newStyles.liveText}>Live</Text>
                        <Text style={newStyles.dateText}>11/15</Text>
                    </View>
                </View>
                <View style={newStyles.titleContainer}>
                    <Text style={newStyles.netflixTag}>N SPECIAL</Text>
                    <Text style={newStyles.title}>{item.title}</Text>
                    <Text style={newStyles.eventDate}>Live Event Coming November 15 at 8:00 PM EST</Text>
                    <Text style={newStyles.description}>{item.description}</Text>
                    <View style={newStyles.tags}>
                        <Text style={newStyles.tag}>Rousing</Text>
                        <Text style={newStyles.tag}>•</Text>
                        <Text style={newStyles.tag}>Exciting</Text>
                        <Text style={newStyles.tag}>•</Text>
                        <Text style={newStyles.tag}>Sports Event</Text>
                        <Text style={newStyles.tag}>•</Text>
                        <Text style={newStyles.tag}>Clash of Generations</Text>
                        <Text style={newStyles.tag}>•</Text>
                        <Text style={newStyles.tag}>Boxing</Text>
                        <Text style={newStyles.tag}>•</Text>
                        <Text style={newStyles.tag}>TV-14</Text>
                    </View>
                </View>
                <View style={newStyles.actionButtons}>
                    <Pressable style={newStyles.actionButton}>
                        <Ionicons name="notifications-outline" size={24} color="#fff" />
                        <Text style={newStyles.actionButtonText}>Remind Me</Text>
                    </Pressable>
                    <Pressable style={newStyles.actionButton}>
                        <Ionicons name="information-circle-outline" size={24} color="#fff" />
                        <Text style={newStyles.actionButtonText}>Info</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );

    const renderTab = (tab: typeof TAB_OPTIONS[0]) => (
        <Pressable
            key={tab.id}
            style={[newStyles.categoryTab, activeTab === tab.id && newStyles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
        >
            <Image
                source={{ uri: tab.icon }}
                style={[newStyles.tabIcon, activeTab === tab.id && { tintColor: '#000' }]}
            />
            <Text style={[
                newStyles.categoryTabText,
                activeTab === tab.id && newStyles.activeTabText
            ]}>
                {tab.label}
            </Text>
        </Pressable>
    );

    return (
        <View style={newStyles.container}>
            <StatusBar style="light" />

            <Animated.View style={[newStyles.header, headerAnimatedStyle]}>
                <View style={newStyles.headerContent}>
                    <Text style={newStyles.headerTitle}>New & Hot</Text>
                    <View style={newStyles.headerRight}>
                        <Pressable>
                            <Ionicons name="download-outline" size={24} color="#fff" />
                        </Pressable>
                        <Pressable>
                            <Ionicons name="search" size={24} color="#fff" />
                        </Pressable>
                    </View>
                </View>
            </Animated.View>

            <ScrollView>
                <View style={newStyles.categoryTabs}>
                    {TAB_OPTIONS.map(renderTab)}
                </View>
                <View style={newStyles.comingSoonList}>
                    {COMING_SOON_DATA.map(renderComingSoonItem)}
                </View>
            </ScrollView>
        </View>
    );
}


