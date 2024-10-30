import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContentDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </Pressable>
            </SafeAreaView>

            <Image
                source={{ uri: 'YOUR_CONTENT_IMAGE_URL' }}
                style={styles.contentImage}
            />

            <View style={styles.contentInfo}>
                <Text style={styles.title}>Movie Title</Text>
                <Text style={styles.categories}>Ominous • Chilling • Thriller • Serial Killer</Text>

                <View style={styles.buttons}>
                    <Pressable style={styles.playButton}>
                        <Ionicons name="play" size={24} color="#000" />
                        <Text style={styles.playButtonText}>Play</Text>
                    </Pressable>
                    <Pressable style={styles.myListButton}>
                        <Ionicons name="add" size={24} color="#fff" />
                        <Text style={styles.myListButtonText}>My List</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    backButton: {
        padding: 16,
    },
    contentImage: {
        width: '100%',
        height: '50%',
    },
    contentInfo: {
        padding: 16,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    categories: {
        color: '#999',
        fontSize: 14,
        marginBottom: 24,
    },
    buttons: {
        flexDirection: 'row',
        gap: 16,
    },
    playButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingVertical: 12,
        borderRadius: 4,
        gap: 8,
    },
    playButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    myListButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        paddingVertical: 12,
        borderRadius: 4,
        gap: 8,
    },
    myListButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
}); 