import React from 'react';
import { View, Text } from 'react-native';
import { TabScreenWrapper } from '@/components/TabScreenWrapper';
import { usePathname } from 'expo-router';
import { TAB_SCREENS } from '@/app/(tabs)/_layout';

export default function DownloadsScreen() {
    const pathname = usePathname();
    const currentTabIndex = TAB_SCREENS.findIndex(screen =>
        screen.name === '(profile)/profile'
    );
    const activeTabIndex = TAB_SCREENS.findIndex(screen =>
        pathname === `/${screen.name}` || (screen.name === 'index' && pathname === '/')
    );

    const slideDirection = activeTabIndex > currentTabIndex ? 'right' : 'left';
    const isActive = pathname === '/(tabs)/(profile)/downloads';

    return (
        <TabScreenWrapper isActive={isActive} slideDirection={slideDirection}>
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <Text style={{ color: '#fff' }}>Downloads Screen</Text>
            </View>
        </TabScreenWrapper>
    );
} 