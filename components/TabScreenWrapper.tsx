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
}

export function TabScreenWrapper({ children, isActive }: Props) {
    const translateX = useSharedValue(isActive ? 0 : 500);
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
            translateX.value = withSpring(500, {
                damping: 20,
                stiffness: 90,
                mass: 0.5
            });
            opacity.value = withTiming(0, { duration: 150 });
        }
    }, [isActive]);

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