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

interface ComingSoonItem {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
    description: string;
    rating: string;
    logo: string;
}

const COMING_SOON_DATA: ComingSoonItem[] = [
    {
        id: '1',
        title: 'Jake Paul vs. Mike Tyson',
        date: 'NOV 15',
        imageUrl: 'https://occ-0-7-6.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABe2bvw9phUMK1Q7bwrtu1vIHZuqJnpH5MZOlIXePqKZay4zRFAo2NcKsYckFB4Q-uDPaSlpGDN57Q4gHJyW-LAiOQonOP9_m2BwBC36YzfDw9OGC-aFb7iUtk3hxGrx1wDA9MwM9olUNXK9Q_54Gaq0IPH1FelfhOdCOeVHIBNaqrO714jryhoRPT277og-tzWGzFEHA90tU5wSUDEHTePFNkuE8nviW3ba2yRXNrsFt3bZvPyuwoPYTfurBZ3OLO-WA9G3uZN5KieZs71cao2XUVzk5a8c6-yX3ILag1px5JJEdUWMpcevyzu7oJHI0leNZDwFhnHno1rrVhuGt0g0nbe21-3SicR3nBT3typIySugKkKvbs8Yei5HjggkFgmNCAEK13IGAhs_vvszZOpy9KUmiq4wuDkkkZgChcwLb000hXnOUHbnQeg.jpg?r=bfd',
        description: 'Jake Paul battles Mike Tyson as they headline this must-see boxing mega-event streaming live in five languages from AT&T Stadium in Arlington, Texas.',
        rating: 'TV-14',
        logo: 'https://i.imgur.com/u5gJO8v.png'
    },

    {
        id: '2',
        title: 'My Boo',
        date: 'NOV 10',
        imageUrl: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZ7I1Otnn_uWjUs8sZ3_33Hs_S4H9f1czAgLrrIwHuiAVZtYpoGb7PuafokPbqlca23N4AW8uhBT68YCGkmdzt4Gy7L0Lco4Kzvp.jpg?r=4e5',
        description: 'A gamer comes up with a moneymaking scheme for the haunted house his grandfather left him and soon ends up in a romance with one of the ghosts in it.',
        rating: 'TV-14',
        logo: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABYQCLVhhcZ-wUcItP7QigVHhCd20AFvyssK-HBBWE4L9lSKfFfHJMA1PkRduUYlI_zLFswIDz9cPV5W9O0OXHhhhB2vSp0fKUDuTF0L8cNkjvkZouHWT5z1GaPjrK8lEjfmZ7lr3WYkp8wJ7DRftFJDYTYc68XCtomtoCUuX3KJggBDxu-XsZw.png?r=ea7'
    },
    {
        id: '3',
        title: 'Jake Paul vs. Mike Tyson',
        date: 'NOV 15',
        imageUrl: 'https://occ-0-7-6.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABe2bvw9phUMK1Q7bwrtu1vIHZuqJnpH5MZOlIXePqKZay4zRFAo2NcKsYckFB4Q-uDPaSlpGDN57Q4gHJyW-LAiOQonOP9_m2BwBC36YzfDw9OGC-aFb7iUtk3hxGrx1wDA9MwM9olUNXK9Q_54Gaq0IPH1FelfhOdCOeVHIBNaqrO714jryhoRPT277og-tzWGzFEHA90tU5wSUDEHTePFNkuE8nviW3ba2yRXNrsFt3bZvPyuwoPYTfurBZ3OLO-WA9G3uZN5KieZs71cao2XUVzk5a8c6-yX3ILag1px5JJEdUWMpcevyzu7oJHI0leNZDwFhnHno1rrVhuGt0g0nbe21-3SicR3nBT3typIySugKkKvbs8Yei5HjggkFgmNCAEK13IGAhs_vvszZOpy9KUmiq4wuDkkkZgChcwLb000hXnOUHbnQeg.jpg?r=bfd',
        description: 'Jake Paul battles Mike Tyson as they headline this must-see boxing mega-event streaming live in five languages from AT&T Stadium in Arlington, Texas.',
        rating: 'TV-14',
        logo: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABcvy79ayB-9FKjXltu6TB8XXlK-c2-9C6kQfkLw-JXDxuGS-LXytzHgw61Hva_YYsoQtazhZhfSgiyGsmP-NtS-KliYvUSJ1O4cMPBCwHGTU.png?r=011'
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
        icon: 'https://i.imgur.com/VrFDja2.png',
        label: "Everyone's Watching"
    },
    {
        id: 'top-10',
        icon: 'https://www.netflix.com/tudum/top10/images/top10.png',
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


    const renderComingSoonItem = (item: ComingSoonItem) => (
        <View key={item.id} style={newStyles.comingSoonItem}>
            <View style={newStyles.dateContainer}>
                <Text style={newStyles.dateMonth}>{item.date.split(' ')[0]}</Text>
                <Text style={newStyles.dateDay}>{item.date.split(' ')[1]}</Text>
            </View>

            <View style={newStyles.contentContainer}>
                <View style={newStyles.previewCard}>
                    <Image source={{ uri: item.imageUrl }} style={newStyles.previewImage} />

                </View>


                <View style={newStyles.featuredContainer}>

                    <View style={{ gap: 6 }}>
                        <Image source={{ uri: item.logo }} style={newStyles.featuredLogo} />

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

                <View style={newStyles.titleContainer}>
                    <Text style={newStyles.eventDate}>Live Event Coming November 15 at 8:00 PM EST</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, marginBottom: 2 }}>
                        <Image
                            source={{ uri: 'https://loodibee.com/wp-content/uploads/Netflix-N-Symbol-logo.png' }}
                            style={{ width: 20, height: 20, top: -4, position: 'absolute', left: 0 }}
                        />
                        <Text style={newStyles.netflixTag}>SPECIAL</Text>
                    </View>
                    <Text style={newStyles.title}>{item.title}</Text>
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
                    <View style={newStyles.categoryTabs}>
                        {TAB_OPTIONS.map(renderTab)}
                    </View>
                </View>

                <ScrollView>


                    <View style={newStyles.activeTabContainer}>

                        <Image
                            source={{ uri: TAB_OPTIONS[0].icon }}
                            style={newStyles.activeTabIcon}
                        />
                        <Text style={newStyles.activeTabTitle}>Coming Soon</Text>
                    </View>



                    <View style={newStyles.comingSoonList}>
                        {COMING_SOON_DATA.map(renderComingSoonItem)}
                    </View>
                </ScrollView>
            </SafeAreaView>

        </View>
    );
}


