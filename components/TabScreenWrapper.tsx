import { View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

interface Props {
    children: React.ReactNode;
    isActive: boolean;
    slideDirection: 'left' | 'right';
}

export function TabScreenWrapper({ children, isActive, slideDirection }: Props) {
    const translateX = useSharedValue(isActive ? 0 : (slideDirection === 'left' ? -500 : 500));
    const opacity = useSharedValue(isActive ? 1 : 0);

    useEffect(() => {
        if (isActive) {
            translateX.value = withSpring(0, {
                damping: 20,
                stiffness: 90,
                mass: 0.5
            });
            opacity.value = withTiming(1, { duration: 150 });
        } else {
            translateX.value = withSpring(slideDirection === 'left' ? -500 : 500, {
                damping: 20,
                stiffness: 90,
                mass: 0.5
            });
            opacity.value = withTiming(0, { duration: 150 });
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
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
            {children}
        </Animated.View>
    );
} 