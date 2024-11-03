import { View, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { useState } from 'react';
import Animated, {
    useAnimatedStyle,
    withSpring,
    withTiming,
    interpolate,
    runOnJS,
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';

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
        <View style={styles.container}>
            <ThemedText style={styles.title}>Who's Watching?</ThemedText>

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
                                contentFit="cover"
                            />
                            <ThemedText style={styles.profileName}>{profile.name}</ThemedText>
                        </Animated.View>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.profileButton}>
                    <View style={styles.addProfileContainer}>
                        <ThemedText style={styles.plusIcon}>+</ThemedText>
                        <ThemedText style={styles.addProfileText}>Add Profile</ThemedText>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 48,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: width * 0.8,
        gap: 24,
    },
    profileButton: {
        width: width * 0.3,
        aspectRatio: 1,
    },
    profileContainer: {
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 8,
    },
    profileName: {
        fontSize: 16,
        fontWeight: '500',
    },
    addProfileContainer: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: {
        fontSize: 32,
        color: '#333',
    },
    addProfileText: {
        fontSize: 16,
        color: '#333',
        marginTop: 8,
    },
}); 