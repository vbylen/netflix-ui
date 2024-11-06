import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabScreenWrapper } from '@/components/TabScreenWrapper';
import { usePathname } from 'expo-router';

export default function DownloadsScreen() {
    const pathname = usePathname();
    const isActive = pathname === '/downloads';

    return (
        <TabScreenWrapper isActive={isActive} slideDirection="left">
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Downloads</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="arrow-down-circle" size={80} color="#333" />
                    </View>

                    <Text style={styles.heading}>Never be without Netflix</Text>

                    <Text style={styles.description}>
                        Download shows and movies so you'll never be without something to watch — even when you're offline.
                    </Text>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>See What You Can Download</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
        gap: 16,
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 24,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 4,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
}); 