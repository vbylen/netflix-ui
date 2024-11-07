import React, { useState, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Image, StatusBar, LayoutRectangle } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
    Easing,
    useSharedValue,
    runOnJS,
    FadeIn,
    withSequence,
    withDelay,
    withRepeat,
    withSpring,
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@/contexts/UserContext';
import { Audio } from 'expo-av';
import Svg, { Circle } from 'react-native-svg';
import { styles } from '@/styles/who-is-watching';


const { width, height } = Dimensions.get('window');
const PROFILE_ICON_SIZE = 24; // Size of the profile icon in the top-right corner
const PROFILE_ICON_MARGIN = 16; // Margin from the top and right edges

interface Profile {
    id: string;
    name: string;
    avatar: string;
}

interface Props {
    onProfileSelect: (profileId: string) => void;
}

export function WhoIsWatching({ onProfileSelect }: Props) {
    const { profiles } = useUser();
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    // const [selectedProfile, setSelectedProfile] = useState<Profile | null>(profiles[0]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [isMinimizing, setIsMinimizing] = useState(false);
    const profileRefs = useRef<{ [key: string]: LayoutRectangle | null }>({});
    const spinnerRotation = useSharedValue(0);

    const selectedProfilePosition = useSharedValue({ x: 0, y: 0, width: 0, height: 0 });

    const containerStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withTiming(isAnimating ? 0.9 : 1, {
                    duration: 800,
                    easing: Easing.bezier(0.33, 0, 0.67, 1),
                }),
            },
        ],
        opacity: withTiming(isAnimating ? 0 : 1, {
            duration: 500,
            easing: Easing.bezier(0.33, 0, 0.67, 1),
        }),
    }));

    const spinnerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${spinnerRotation.value}deg` }],
            opacity: withTiming(isMinimizing ? 0 : 1, {
                duration: 300,
                easing: Easing.bezier(0.33, 0, 0.67, 1),
            }),
        };
    });

    const selectedProfileStyle = useAnimatedStyle(() => {
        if (!selectedProfile) return {};

        const finalSize = width * 0.45;
        const centerY = height / 2;
        const targetY = centerY - finalSize / 2 - 100;

        if (isMinimizing) {
            return {
                position: 'absolute',
                width: withTiming(PROFILE_ICON_SIZE, {
                    duration: 800,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                }),
                height: withTiming(PROFILE_ICON_SIZE, {
                    duration: 800,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                }),
                top: withSpring(height - 80, {
                    damping: 12,
                    stiffness: 100,
                    mass: 0.5,
                }),
                left: withSpring(width - 84, {
                    damping: 12,
                    stiffness: 100,
                    mass: 0.5,
                }),
                borderRadius: withTiming(4, {
                    duration: 800,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                }),
                transform: [
                    {
                        translateY: withSequence(
                            withSpring(-200, {
                                damping: 12,
                                stiffness: 100,
                            }),
                            withSpring(0, {
                                damping: 12,
                                stiffness: 100,
                            })
                        ),
                    },
                    {
                        translateX: withSequence(
                            withSpring(150, {
                                damping: 12,
                                stiffness: 100,
                            }),
                            withSpring(0, {
                                damping: 12,
                                stiffness: 100,
                            })
                        ),
                    },
                    {
                        scale: withSpring(1, {
                            damping: 12,
                            stiffness: 100,
                        }),
                    },
                ],
                opacity: withTiming(0.8, {
                    duration: 800,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                }),
            };
        }

        return {
            position: 'absolute',
            width: withTiming(finalSize, {
                duration: 700,
                easing: Easing.bezier(0.33, 0, 0.67, 1),
            }),
            height: withTiming(finalSize, {
                duration: 700,
                easing: Easing.bezier(0.33, 0, 0.67, 1),
            }),
            top: withTiming(targetY - selectedProfilePosition.value.y, {
                duration: 700,
                easing: Easing.bezier(0.33, 0, 0.67, 1),
            }),
            left: withTiming((width - finalSize) / 2 - selectedProfilePosition.value.x, {
                duration: 700,
                easing: Easing.bezier(0.33, 0, 0.67, 1),
            }),
            transform: [
                {
                    scale: withSequence(
                        withTiming(1, { duration: 50 }),
                        withTiming(1.1, {
                            duration: 700,
                            easing: Easing.bezier(0.33, 0, 0.67, 1),
                        })
                    ),
                },
            ],
            borderRadius: withTiming(12, {
                duration: 700,
                easing: Easing.bezier(0.33, 0, 0.67, 1),
            }),
            opacity: 1,
        };
    });


    const handleProfileSelect = async (profile: Profile) => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/audio/profile-selected.mp3')
            );
            await sound.playAsync();

            const layout = profileRefs.current[profile.id];
            if (layout) {
                selectedProfilePosition.value = {
                    x: layout.x,
                    y: layout.y,
                    width: layout.width,
                    height: layout.height,
                };
            }

            setSelectedProfile(profile);
            setIsAnimating(true);

            // Start spinner animation after profile is centered
            setTimeout(() => {
                setShowSpinner(true);
                spinnerRotation.value = withRepeat(
                    withTiming(360, {
                        duration: 1000,
                        easing: Easing.linear,
                    }),
                    -1,
                    false
                );
            }, 800);

            // Start minimizing animation after 2 seconds
            setTimeout(() => {
                setIsMinimizing(true);
                // Call onProfileSelect after minimizing animation
                setTimeout(() => {
                    runOnJS(onProfileSelect)(profile.id);
                }, 500);
            }, 2000);
        } catch (error) {
            console.log('Error playing sound:', error);
        }
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
                    {profiles.map((profile, index) => (
                        <Animated.View
                            key={profile.id}
                            entering={FadeIn.delay(index * 100)}
                        >
                            <TouchableOpacity
                                onPress={() => handleProfileSelect(profile)}
                                style={styles.profileButton}
                                onLayout={(event) => {
                                    profileRefs.current[profile.id] = event.nativeEvent.layout;
                                }}
                            >
                                <Animated.View style={styles.profileContainer}>
                                    <Animated.Image
                                        source={{ uri: profile.avatar }}
                                        style={styles.avatar}
                                    />
                                    <ThemedText style={styles.profileName}>{profile.name}</ThemedText>
                                </Animated.View>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}

                    <TouchableOpacity style={styles.profileButton}>
                        <View style={styles.addProfileContainer}>
                            <Ionicons name="add" size={44} color="#fff" />
                        </View>
                        <ThemedText style={styles.addProfileText}>Add Profile</ThemedText>
                    </TouchableOpacity>
                </Animated.View>
            </View>

            {selectedProfile && (
                <Animated.Image
                    source={{ uri: selectedProfile.avatar }}
                    style={[styles.selectedAvatar, selectedProfileStyle]}
                />
            )}

            {showSpinner && (
                <Animated.View style={[styles.spinnerContainer, spinnerStyle]}>
                    <Svg height="100" width="100" viewBox="0 0 100 100">
                        <Circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#E50914"
                            strokeWidth="8"
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray="283"
                            strokeDashoffset="200"
                        />
                    </Svg>
                </Animated.View>
            )}
        </SafeAreaView>
    );
}
