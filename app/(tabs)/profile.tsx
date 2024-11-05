import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@/contexts/UserContext';
import { usePathname, useRouter } from 'expo-router';
import { TAB_SCREENS } from '@/app/(tabs)/_layout';
import { TabScreenWrapper } from '@/components/TabScreenWrapper';

const exampleLikedShowsAndMovies = [
    { id: 2, imageUrl: 'https://occ-0-2348-2568.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABU2Tv7ElpWoaZskSjugnCfgUyxx0k8zFkrSLnw8OByra6I4Pu0hvpNMKPqHKk0_VIq_pP47WE4eiU6bLjH30mOAHixRdrQeMX5296hvGq7hFvPhm-1kaKYp2MLO5H3oxUV1q8UEmz3NwsmrYXnnzvNJ2aXgp7drGClF671VG2U62G9s3qaes9qXaz6ChmJpD31wnaRJjsoqvybX0wzGk0Ij_wU1zH2yqI5b7fNA3D4-AsawmmgN6jCiScTDHpH-252lKjP9LJsbjwVGMht06gnyOeADlJQ.jpg' },
    { id: 3, imageUrl: 'https://occ-0-2348-2568.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABU2Tv7ElpWoaZskSjugnCfgUyxx0k8zFkrSLnw8OByra6I4Pu0hvpNMKPqHKk0_VIq_pP47WE4eiU6bLjH30mOAHixRdrQeMX5296hvGq7hFvPhm-1kaKYp2MLO5H3oxUV1q8UEmz3NwsmrYXnnzvNJ2aXgp7drGClF671VG2U62G9s3qaes9qXaz6ChmJpD31wnaRJjsoqvybX0wzGk0Ij_wU1zH2yqI5b7fNA3D4-AsawmmgN6jCiScTDHpH-252lKjP9LJsbjwVGMht06gnyOeADlJQ.jpg' },
];

export default function ProfileScreen() {
    const { selectedProfile } = useUser();
    const pathname = usePathname();
    const isActive = pathname === '/profile';
    const router = useRouter();

    const currentTabIndex = TAB_SCREENS.findIndex(screen =>
        screen.name === 'profile'
    );
    const activeTabIndex = TAB_SCREENS.findIndex(screen =>
        pathname === `/${screen.name}` || (screen.name === 'index' && pathname === '/')
    );

    const slideDirection = activeTabIndex > currentTabIndex ? 'right' : 'left';

    const renderLikedContent = () => (
        <View style={styles.likedContent}>
            <FlatList
                horizontal
                data={exampleLikedShowsAndMovies}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.likedItemContainer}>
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.likedShowImage}
                        />
                        <TouchableOpacity style={styles.shareButton}>
                            <Ionicons name="send" size={18} color="white" style={{
                                marginRight: 4,
                                transform: [{ rotate: '320deg' }]
                            }} />
                            <Text style={styles.shareText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );

    const renderMyList = () => (
        <FlatList
            horizontal
            data={[1, 2, 3, 4]} // Replace with actual data
            renderItem={({ item }) => (
                <Image
                    style={styles.myListImage}
                    source={{ uri: 'https://path-to-show-image.jpg' }}
                />
            )}
            showsHorizontalScrollIndicator={false}
            style={styles.myList}
        />
    );

    return (
        <TabScreenWrapper isActive={isActive} slideDirection={slideDirection}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>My Netflix</Text>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.searchButton}>
                            <Ionicons name="search" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuButton}>
                            <Ionicons name="menu" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.profileSection} onPress={() => router.push('/switch-profile')}>
                    <Image
                        source={{ uri: selectedProfile?.avatar }}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileNameContainer}>
                        <Text style={styles.profileName}>{selectedProfile?.name}</Text>
                        <Ionicons name="chevron-down" size={16} color="white" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                        <View style={[styles.notificationIconContainer, { backgroundColor: '#E51013' }]}>
                            <Ionicons name="notifications" size={24} color="#fff" />
                        </View>
                    </View>
                    <View style={styles.menuContent}>
                        <Text style={styles.menuText}>Notifications</Text>
                        <Ionicons name="chevron-forward" size={20} color="#fff" />
                    </View>
                </TouchableOpacity>

                <View style={styles.notificationPreview}>
                    <View style={styles.notificationDot} />
                    <Image
                        source={{ uri: 'https://dnm.nflximg.net/api/v6/dGKhUGb9YF21yyDjKrWwmGN1H8o/AAAABdl3F7BjF71fC6gaLl7xCpGIak8CxmdDgY3FK8dEQhlfx5n5O-z9hhOTtzYyr1nr4Ajn5sAyHjAGGBIiFO0tCnDG5AevRDi10_WuPvvEFYTUQfZAEpUBPwrFbAKyalsQREodRB1mKPylnjU.jpg?r=c90' }}
                        style={styles.notificationImage}
                    />
                    <View style={styles.notificationText}>
                        <Text style={styles.notificationTitle}>New Arrival</Text>
                        <Text style={styles.notificationSubtitle}>The Perfect Couple</Text>
                        <Text style={styles.notificationDate}>Sep 05</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                        <View style={[styles.downloadIconContainer, { backgroundColor: '#0071EB' }]}>
                            <Ionicons name="arrow-down-circle" size={24} color="#fff" />
                        </View>
                    </View>
                    <View style={styles.menuContent}>
                        <Text style={styles.menuText}>Downloads</Text>
                        <Ionicons name="chevron-forward" size={20} color="#fff" />
                    </View>
                </TouchableOpacity>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>TV Shows & Movies You've Liked</Text>
                    {renderLikedContent()}
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeaderContainer}>
                        <Text style={styles.sectionHeader}>My List</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    {renderMyList()}
                </View>
            </ScrollView>
        </TabScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
    },
    searchButton: {
        padding: 8,
    },
    profileSection: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 4,
    },
    profileName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#fff',
    },
    menuItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    menuIconContainer: {
        // marginBottom: 8,
    },
    profileNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    notificationIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
    },
    downloadIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    menuText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
    },
    notificationPreview: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    notificationDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#E51013',
        position: 'absolute',
        left: 8,
        top: 8,
    },
    notificationImage: {
        width: 120,
        height: 70,
        borderRadius: 4,
    },
    notificationText: {
        flex: 1,
        gap: 4,
    },
    notificationTitle: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
    },
    notificationSubtitle: {
        fontSize: 14,
        color: '#999',
    },
    notificationDate: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#222',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 16,
    },
    menuButton: {
        padding: 8,
    },
    likedContent: {
        marginTop: 12,
    },
    likedItemContainer: {
        marginRight: 16,
        width: 100,
        backgroundColor: '#161616',
        alignItems: 'center'
    },
    likedShowImage: {
        width: 100,
        height: 150,
        borderRadius: 8,
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 8,
    },
    shareText: {
        color: 'white',
        fontSize: 13,
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    seeAll: {
        color: 'white',
        fontSize: 14,
    },
    myList: {
        marginTop: 12,
    },
    myListImage: {
        width: 120,
        height: 180,
        borderRadius: 4,
        marginRight: 8,
    },
}); 