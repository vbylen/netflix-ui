import React from 'react';
import { View, Text, Pressable, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '@/styles';
import { Movie, MovieRow } from '@/types/movie';

const MovieItem = ({ item, router }: { item: Movie; router: any }) => (
    <Pressable
        onPress={() => router.push({
            pathname: '/movie/[id]',
            params: { id: item.id }
        })}
        style={styles.contentItem}
    >
        <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
    </Pressable>
);

export function MovieList({ rowTitle, movies }: MovieRow) {
    const router = useRouter();

    return (
        <View style={styles.movieRow}>
            <Text style={styles.sectionTitle}>{rowTitle}</Text>
            <FlatList
                horizontal
                data={movies}
                renderItem={(props) => <MovieItem {...props} router={router} />}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentList}
            />
        </View>
    );
} 