import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Image, StatusBar } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { useState } from 'react';
import Animated, {
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';



const { width } = Dimensions.get('window');

interface Profile {
    id: string;
    name: string;
    avatar: string;
}

const PROFILES: Profile[] = [
    { id: '1', name: 'Saúl', avatar: 'https://occ-0-2430-2433.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABfnZLmfujuhA1nXtX4UoO77cH0CJNAFRN7-s4R92qiPUQqUgHh_Q_YscfkNEZNVc_0UAyoytd8gY4USUO7VSbKB0Zl806PdA3J6F.png?r=f4c' },
    { id: '2', name: 'Darshan', avatar: 'https://occ-0-2430-2433.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABUA9QLiVGC4PuLGarV3oGLJhrOoIewsw54mdcsVtROUf1TRm69Wzoio5Ml2Vc09n4_MvJMUpo_FzjkVbnPBrFaZLHcKVgTt9lcBZ.png?r=508' },
    { id: '3', name: 'Akriti', avatar: 'https://occ-0-2430-2433.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABZumJ3wvSKM7od-r3UjhVF9j3yteWlQYA-51F3SNoI682llhul1Xf_CUkMnfP_17Md2lpOOhbwHeGufvo8kOTjptoS_bcwtniHKz.png?r=e6e' },
    { id: '4', name: 'Kids', avatar: 'https://occ-0-2430-2433.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABfBs_RmrXu6XN02hkLZzUgrqSOMFIx6LUk_-T4dG4Vgr7rwnmYyejpUUebFqmVDbnrwxESqJu6ml0q-G6KQVzRqKA42KmNEPkDmn.png?r=f55' },
];

interface Props {
    onProfileSelect: (profileId: string) => void;
}

export function WhoIsWatching({ onProfileSelect }: Props) {
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const containerStyle = useAnimatedStyle(() => {
        if (!selectedProfile) return {};

        return {
            transform: [
                {
                    scale: withSpring(isAnimating ? 0.8 : 1),
                },
            ],
        };
    });

    const selectedProfileStyle = useAnimatedStyle(() => {
        if (!selectedProfile) return {};

        return {
            transform: [
                {
                    scale: withSpring(isAnimating ? 2 : 1),
                },
                {
                    rotate: withTiming(isAnimating ? '360deg' : '0deg', {
                        duration: 1000,
                    }),
                },
            ],
            opacity: withTiming(isAnimating ? 0 : 1),
        };
    });

    const handleProfileSelect = async (profile: Profile) => {
        setSelectedProfile(profile);
        setIsAnimating(true);

        setTimeout(() => {
            onProfileSelect(profile.id);
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <View style={styles.headerTitle}>
                    <ThemedText style={styles.title}>Who's Watching?</ThemedText>
                </View>
                <TouchableOpacity>
                    <ThemedText style={styles.editButton}>Edit</ThemedText>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>

                <Animated.View style={[styles.gridContainer, containerStyle]}>
                    {PROFILES.map((profile) => (
                        <TouchableOpacity
                            key={profile.id}
                            onPress={() => handleProfileSelect(profile)}
                            style={styles.profileButton}
                        >
                            <Animated.View
                                style={[
                                    styles.profileContainer,
                                    selectedProfile?.id === profile.id && selectedProfileStyle,
                                ]}
                            >
                                <Image
                                    source={{ uri: profile.avatar }}
                                    style={styles.avatar}
                                />
                                <ThemedText style={styles.profileName}>{profile.name}</ThemedText>
                            </Animated.View>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={styles.profileButton}>
                        <View style={styles.addProfileContainer}>
                            <Ionicons name="add" size={44} color="#fff" />
                        </View>
                        <ThemedText style={styles.addProfileText}>Add Profile</ThemedText>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        marginTop: -110,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerTitle: {
        flex: 1,
        alignItems: 'center',
        height: 40,
        justifyContent: 'center'

    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
    editButton: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        position: 'absolute',
        right: 0,
        top: -12,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        gap: 20,
        paddingHorizontal: 20,
    },
    profileButton: {
        width: width * 0.30,
        aspectRatio: 1,
        marginBottom: 24,
        alignItems: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        gap: 8,
    },
    avatar: {
        width: '80%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 6,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '500',
        color: '#e5e5e5',
        // marginTop: 12,
    },
    addProfileContainer: {
        width: width * (0.30 - 0.06),
        // height: undefined,
        aspectRatio: 1,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#424242',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    plusIcon: {
        // fontSize: 44,
        // color: '#ffffff',
        // fontWeight: '200',
    },
    addProfileText: {
        fontSize: 18,
        color: '#ffffff',
        marginTop: 8,
        fontWeight: '400',
    },
}); 