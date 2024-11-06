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
import { SafeAreaView } from 'react-native-safe-area-context';
import { TAB_SCREENS } from '@/app/(tabs)/_layout';
import { TabScreenWrapper } from '@/components/TabScreenWrapper';
import { usePathname } from 'expo-router';

interface ComingSoonItem {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
    description: string;
    subText: string;
    rating: string;
    logo: string;
}

const COMING_SOON_DATA: ComingSoonItem[] = [
    {
        id: '-1',
        title: 'Jake Paul vs. Mike Tyson',
        date: 'NOV 15',
        subText: 'Live Event Coming November 15 at 8:00 PM EST',
        imageUrl: 'https://occ-0-2430-2433.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABSWRinEsQOaPuYqcT8MP4lkknrc5czNm9qgpVzfBrl7maTIufi_VLNohrkfAyT4zPnHfos7z0-PMaq-cjPP8qI4fmsmo7F4nRO6M.jpg?r=77a',
        description: 'Jake Paul battles Mike Tyson as they headline this must-see boxing mega-event streaming live in five languages from AT&T Stadium in Arlington, Texas.',
        rating: 'TV-14',
        logo: 'https://i.imgur.com/T9zM4Ro.png'
    },

    {
        id: '0',
        title: 'My Boo',
        date: 'NOV 10',
        imageUrl: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZ7I1Otnn_uWjUs8sZ3_33Hs_S4H9f1czAgLrrIwHuiAVZtYpoGb7PuafokPbqlca23N4AW8uhBT68YCGkmdzt4Gy7L0Lco4Kzvp.jpg?r=4e5',
        description: 'A gamer comes up with a moneymaking scheme for the haunted house his grandfather left him and soon ends up in a romance with one of the ghosts in it.',
        rating: 'TV-14',
        logo: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABYQCLVhhcZ-wUcItP7QigVHhCd20AFvyssK-HBBWE4L9lSKfFfHJMA1PkRduUYlI_zLFswIDz9cPV5W9O0OXHhhhB2vSp0fKUDuTF0L8cNkjvkZouHWT5z1GaPjrK8lEjfmZ7lr3WYkp8wJ7DRftFJDYTYc68XCtomtoCUuX3KJggBDxu-XsZw.png?r=ea7'
    },
    {
        id: '1',
        title: 'Outer Banks',
        date: 'NOV 7',
        description: 'Season 4: Part 2 of the popular teen mystery drama continues the adventures of the Pogues in their treasure-hunting escapades.',
        rating: 'TV-MA',
    },
    {
        id: '2',
        title: 'cane',
        date: 'NOV 9',
        description: 'Season 2, Act I of the critically acclaimed animated series based on League of Legends returns with more action and intrigue.',
        rating: 'TV-14',
    },
    {
        id: '3',
        title: 'The Lost City',
        date: 'NOV 9',
        description: 'A romantic comedy adventure starring Sandra Bullock and Channing Tatum as an unlikely duo thrust into a dangerous jungle expedition.',
        rating: 'PG-13',
    },
    {
        id: '4',
        title: 'Emilia Pérez',
        date: 'NOV 13',
        description: 'A musical crime drama directed by Jacques Audiard, starring Zoe Saldaña and Selena Gomez, about a cartel leader\'s transformation.',
        rating: 'R',
    },
    {
        id: '5',
        title: 'The Empress',
        date: 'NOV 22',
        description: 'Season 2 of the historical drama series continues to follow the life of Empress Elisabeth of Austria.',
        rating: 'TV-MA',
    },
    {
        id: '6',
        title: 'The Madness',
        date: 'NOV 28',
        description: 'A thriller series starring Colman Domingo as a media pundit caught in a deadly conspiracy.',
        rating: 'TV-MA',
    },
    {
        id: '7',
        title: 'Joy',
        date: 'NOV 22',
        description: 'A historical drama about the development of IVF technology in the 1960s and 1970s, starring Bill Nighy and Thomasin McKenzie.',
        rating: 'PG-13',
    },
    {
        id: '8',
        title: 'The Piano Lesson',
        date: 'NOV 22',
        description: 'An adaptation of August Wilson\'s Pulitzer Prize-winning play about family legacy and the power of a piano.',
        rating: 'PG-13',
    },
    {
        id: '9',
        title: 'Rhythm + Flow: Brazil',
        date: 'NOV 12',
        description: 'A new season of the hip-hop competition series, this time focusing on Brazilian talent.',
        rating: 'TV-MA',
    },
    {
        id: '10',
        title: 'Tokyo Override',
        date: 'NOV 21',
        description: 'A new Japanese anime series set in a futuristic Tokyo.',
        rating: 'TV-14',
    }
];

const TAB_OPTIONS = [
    {
        id: 'coming-soon',
        icon: 'https://img.icons8.com/?size=96&id=97192&format=png',
        label: 'Coming Soon'
    },
    {
        id: 'everyone-watching',
        icon: 'https://i.imgur.com/VrFDja2.png',
        label: "Everyone's Watching"
    },
    {
        id: 'top-10-shows',
        icon: 'https://www.netflix.com/tudum/top10/images/top10.png',
        label: 'Top 10 TV Shows'
    },
    {
        id: 'top-10-movies',
        icon: 'https://www.netflix.com/tudum/top10/images/top10.png',
        label: 'Top 10 Movies'
    }
];

export default function NewScreen() {
    const pathname = usePathname();
    const isActive = pathname === '/new';

    const currentTabIndex = TAB_SCREENS.findIndex(screen =>
        screen.name === 'new'
    );
    const activeTabIndex = TAB_SCREENS.findIndex(screen =>
        pathname === `/${screen.name}` || (screen.name === 'index' && pathname === '/')
    );

    const slideDirection = activeTabIndex > currentTabIndex ? 'right' : 'left';

    const router = useRouter();
    const insets = useSafeAreaInsets();
    const scrollY = useSharedValue(0);
    const [activeTab, setActiveTab] = React.useState('coming-soon');

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const renderComingSoonItem = (item: ComingSoonItem) => (
        <View key={item.id} style={newStyles.comingSoonItem}>


            <View style={newStyles.contentContainer}>
                <View style={newStyles.previewCard}>
                    <Image source={{ uri: item.imageUrl }} style={newStyles.previewImage} />

                </View>


                <View style={newStyles.featuredContainer}>

                    <View style={{ gap: 6, }}>
                        <Image
                            source={{ uri: item.logo }}
                            style={{ width: 155, height: 80, marginRight: 4 }}
                        />

                    </View>

                </View>

                <View style={newStyles.titleContainer}>
                    <Text style={newStyles.eventDate}>{item.subText}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, marginBottom: 2 }}>
                        <Image
                            source={{ uri: 'https://loodibee.com/wp-content/uploads/Netflix-N-Symbol-logo.png' }}
                            style={{ width: 20, height: 20, top: -4, position: 'absolute', left: 0 }}
                        />
                        <Text style={newStyles.netflixTag}>SPECIAL</Text>
                    </View>
                    <Text style={newStyles.title}>{item.title}</Text>
                    <Text style={newStyles.description}>{item.description}</Text>

                </View>

                <View style={newStyles.actionButtons}>
                    <Pressable style={newStyles.actionButton}>
                        <Ionicons name="notifications-outline" size={20} color="#000" />
                        <Text style={newStyles.actionButtonText}>Remind Me</Text>
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
                style={[newStyles.tabIcon]}
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
        <TabScreenWrapper isActive={isActive} slideDirection={slideDirection}>
            <View style={newStyles.container}>
                <StatusBar style="light" />
                <SafeAreaView>
                    <View style={[newStyles.header]}>
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

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={newStyles.categoryTabs}
                        >
                            {TAB_OPTIONS.map(renderTab)}
                        </ScrollView>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}

                    >
                        {/* 

                        <View style={newStyles.activeTabContainer}>

                            <Image
                                source={{ uri: TAB_OPTIONS[0].icon }}
                                style={newStyles.activeTabIcon}
                            />
                            <Text style={newStyles.activeTabTitle}>Coming Soon</Text>
                        </View> */}



                        <View style={newStyles.comingSoonList}>
                            {COMING_SOON_DATA.map(renderComingSoonItem)}
                        </View>
                    </ScrollView>
                </SafeAreaView>

            </View>
        </TabScreenWrapper>
    );
}


