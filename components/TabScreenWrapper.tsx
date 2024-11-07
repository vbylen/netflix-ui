import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
    withSpring,
    runOnJS
} from 'react-native-reanimated';
import { usePathname, useNavigation } from 'expo-router';

interface Props {
    children: React.ReactNode;
    isActive: boolean;
    slideDirection: 'left' | 'right';
}

export function TabScreenWrapper({ children, isActive, slideDirection }: Props) {
    const navigation = useNavigation();

    // Only animate if it's a tab navigation
    const shouldAnimate = navigation.getState().type === 'tab';

    if (!shouldAnimate) {
        return <>{children}</>;
    }

    const translateX = useSharedValue(isActive ? 0 : (slideDirection === 'left' ? -500 : 500));
    const opacity = useSharedValue(isActive ? 1 : 0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
        if (isActive) {
            translateX.value = withSpring(0, {
                damping: 20,
                stiffness: 90,
                mass: 0.5
            }, () => {
                runOnJS(setIsAnimating)(false);
            });
            opacity.value = withTiming(1, { duration: 150 });
        } else {
            translateX.value = withSpring(slideDirection === 'left' ? -25 : 25, {
                damping: 20,
                stiffness: 90,
                mass: 0.5
            });
            opacity.value = withTiming(0, { duration: 150 }, () => {
                runOnJS(setIsAnimating)(false);
            });
        }
    }, [isActive, slideDirection]);

    const animatedStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: [{ translateX: translateX.value }],
        opacity: opacity.value,
    }));

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <Animated.View style={[{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
            }, isAnimating ? animatedStyle : null]}>
                {children}
            </Animated.View>
        </View>
    );
} 