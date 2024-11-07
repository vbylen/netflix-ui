import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Text,
    Dimensions,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import moviesData from '../data/movies.json';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3 - 16;

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
    const inputRef = useRef<TextInput>(null);
    const router = useRouter();

    useEffect(() => {
        // Focus input on mount
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }, []);

    useEffect(() => {
        if (searchQuery.length > 0) {
            // Flatten all movies from different categories
            const allMovies = moviesData.movies.reduce((acc, category) => {
                return [...acc, ...category.movies];
            }, [] as any[]);

            // Filter movies based on search query
            const filtered = allMovies.filter(
                (movie) =>
                    movie.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    movie.type?.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setFilteredMovies(filtered);
        } else {
            setFilteredMovies([]);
        }
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <BlurView intensity={100} tint="dark" style={styles.header}>
                <View style={styles.searchContainer}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <TextInput
                        ref={inputRef}
                        style={styles.searchInput}
                        placeholder="Search games, shows, movies..."
                        placeholderTextColor="#666"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoCapitalize="none"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={24} color="#666" />
                        </TouchableOpacity>
                    )}
                </View>
            </BlurView>

            <ScrollView style={styles.content}>
                {searchQuery.length === 0 ? (
                    <View style={styles.topSearchesContainer}>
                        <Text style={styles.sectionTitle}>Popular Searches</Text>
                        <View style={styles.grid}>
                            {moviesData.movies[0].movies.slice(0, 12).map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.gridItem}
                                    onPress={() => router.push(`/movie/${item.id}`)}
                                >
                                    <Image
                                        source={{ uri: item.imageUrl }}
                                        style={styles.gridImage}
                                    />
                                    <Text style={styles.itemTitle} numberOfLines={2}>
                                        {item.title || `Item ${item.id}`}
                                    </Text>
                                    {item.type && (
                                        <Text style={styles.itemType}>{item.type}</Text>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ) : (
                    <View style={styles.searchResults}>
                        {filteredMovies.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.searchResultItem}
                                onPress={() => router.push(`/movie/${item.id}`)}
                            >
                                <Image
                                    source={{ uri: item.imageUrl }}
                                    style={styles.searchResultImage}
                                />
                                <View style={styles.searchResultInfo}>
                                    <Text style={styles.itemTitle} numberOfLines={2}>
                                        {item.title || `Item ${item.id}`}
                                    </Text>
                                    {item.type && <Text style={styles.itemType}>{item.type}</Text>}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderBottomColor: '#222',
        borderBottomWidth: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    searchInput: {
        flex: 1,
        height: 40,
        color: 'white',
        fontSize: 16,
    },
    content: {
        flex: 1,
    },
    topSearchesContainer: {
        padding: 16,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    gridItem: {
        width: ITEM_WIDTH,
    },
    gridImage: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH * 1.5,
        borderRadius: 4,
        marginBottom: 8,
    },
    itemTitle: {
        color: 'white',
        fontSize: 14,
    },
    itemType: {
        color: '#666',
        fontSize: 12,
        marginTop: 4,
    },
    searchResults: {
        padding: 16,
    },
    searchResultItem: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 12,
    },
    searchResultImage: {
        width: 100,
        height: 150,
        borderRadius: 4,
    },
    searchResultInfo: {
        flex: 1,
        justifyContent: 'center',
    },
});
