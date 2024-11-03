import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@/contexts/UserContext';

export default function ProfileScreen() {
    const { selectedProfile } = useUser();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Netflix</Text>
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.profileSection}>
                <Image
                    source={{ uri: selectedProfile?.avatar }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>{selectedProfile?.name}</Text>
                <Ionicons name="chevron-down" size={16} color="white" />
            </View>

            <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIconContainer}>
                    <View style={styles.notificationIconContainer}>
                        <Ionicons name="notifications" size={24} color="#E51013" />
                    </View>
                </View>
                <View style={styles.menuContent}>
                    <Text style={styles.menuText}>Notifications</Text>
                    <Ionicons name="chevron-forward" size={20} color="#666" />
                </View>
            </TouchableOpacity>

            <View style={styles.notificationPreview}>
                <View style={styles.notificationDot} />
                <Image
                    source={{ uri: 'https://dnm-cache.netflix.com/images/title/81661247/tile.jpg' }}
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
                    <View style={styles.downloadIconContainer}>
                        <Ionicons name="arrow-down-circle" size={24} color="#0071EB" />
                    </View>
                </View>
                <View style={styles.menuContent}>
                    <Text style={styles.menuText}>Downloads</Text>
                    <Ionicons name="chevron-forward" size={20} color="#666" />
                </View>
            </TouchableOpacity>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>TV Shows & Movies You've Liked</Text>
            </View>
        </ScrollView>
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 4,
    },
    profileName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
    },
    menuItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    menuIconContainer: {
        marginBottom: 8,
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
    },
    menuText: {
        fontSize: 16,
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
}); 