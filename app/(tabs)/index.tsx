import React from 'react';
import { Text, Image, View, Pressable, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@/styles/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

interface Movie {
  id: string;
  imageUrl: string;
  // add other movie properties as needed
}

interface MovieRow {
  rowTitle: string;
  movies: Movie[];
}

interface MoviesData {
  movies: MovieRow[];
}

import movieData from '../../data/movies.json';

const FEATURED_MOVIE = {
  id: 'dont-move',
  title: "Don't Move",
  thumbnail: 'https://images.squarespace-cdn.com/content/v1/511eea22e4b06642027a9a99/932ca36a-7b49-4d93-9df7-b4d1c123ba80/Don%27t+Move.jpg',
  categories: ['Ominous', 'Chilling', 'Thriller', 'Serial Killer']
};



const renderContentItem = ({ item, router }: { item: Movie; router: any }) => (
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

const renderMovieRow = ({ rowTitle, movies }: MovieRow, router: any) => (
  <View key={rowTitle} style={styles.movieRow}>
    <Text style={styles.sectionTitle}>{rowTitle}</Text>
    <FlatList
      horizontal
      data={movies}
      renderItem={(props) => renderContentItem({ ...props, router })}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentList}
    />
  </View>
);

export default function HomeScreen() {
  const router = useRouter();
  const { movies } = movieData as MoviesData;
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1e311b', '#002200', '#000000']}
        locations={[0, 0.4, 0.8]}
        style={styles.gradient}
      />

      <BlurView
        tint="systemUltraThinMaterialDark"
        intensity={0}
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>For Saúl</Text>
          <Pressable style={styles.searchButton}>
            <Ionicons name="search" size={24} color="#fff" />
          </Pressable>
        </View>
        <View style={styles.categoryTabs}>
          <Pressable style={styles.categoryTab}>
            <Text style={styles.categoryTabText}>TV Shows</Text>
          </Pressable>
          <Pressable style={styles.categoryTab}>
            <Text style={styles.categoryTabText}>Movies</Text>
          </Pressable>
          <Pressable style={styles.categoryTab}>
            <Text style={styles.categoryTabTextWithIcon}>
              Categories <Ionicons name="chevron-down" size={16} color="#fff" />
            </Text>
          </Pressable>
        </View>
      </BlurView>

      <ScrollView style={styles.scrollView}>
        <View style={styles.featuredContent}>
          <View style={styles.featuredImageContainer}>
            <Image
              source={{ uri: FEATURED_MOVIE.thumbnail }}
              style={styles.featuredImage}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.featuredGradient}
            />
          </View>
          <View style={styles.featuredOverlay}>
            <View style={styles.featuredCategories}>
              <Text style={styles.categoriesText}>
                {FEATURED_MOVIE.categories.join(' • ')}
              </Text>
            </View>
            <View style={styles.featuredButtons}>
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

        {movies.map(row => renderMovieRow(row, router))}
      </ScrollView>

    </View>
  );
}


