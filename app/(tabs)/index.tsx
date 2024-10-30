import React from 'react';
import { Text, Image, View, Pressable, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@/styles/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withSpring,
} from 'react-native-reanimated';
import { DeviceMotion } from 'expo-sensors';

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

// Add type for DeviceMotion data
type DeviceMotionData = {
  rotation: {
    alpha: number;
    beta: number;
    gamma: number;
  };
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

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const intensity = interpolate(
      scrollY.value,
      [0, 10],
      [0, 90],
      'clamp'
    );
    return {
      intensity,
    };
  });

  const tiltX = useSharedValue(0);
  const tiltY = useSharedValue(0);

  React.useEffect(() => {
    const subscription = DeviceMotion.addListener((data: DeviceMotionData) => {
      // Increased from 3 to 4
      tiltX.value = withSpring(data.rotation.gamma * 4);
      tiltY.value = withSpring(data.rotation.beta * 4);
    });

    DeviceMotion.setUpdateInterval(16);

    return () => {
      subscription.remove();
    };
  }, []);

  // Create separate animated styles for image and content with increased multipliers
  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tiltX.value * 0.7 },  // Increased from 0.5 to 0.7
      { translateY: tiltY.value * 0.7 },
      { scale: 1.05 },
    ],
  }));

  const categoriesStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tiltX.value * -0.35 },  // Increased from -0.25 to -0.35
      { translateY: tiltY.value * -0.35 },
    ],
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tiltX.value * -0.45 },  // Increased from -0.35 to -0.45
      { translateY: tiltY.value * -0.45 },
    ],
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1e311b', '#002200', '#000000']}
        locations={[0, 0.4, 0.8]}
        style={styles.gradient}
      />

      <Animated.View style={[styles.header]}>
        <BlurView
          tint="systemUltraThickMaterialDark"
          intensity={headerAnimatedStyle.intensity}
          style={[styles.blurContainer, { paddingTop: insets.top }]}
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
                Categories
              </Text>
              <Ionicons name="chevron-down" size={16} color="#fff" />
            </Pressable>
          </View>
        </BlurView>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={[styles.featuredContent, { marginTop: insets.top + 90 }]}>
          <View style={styles.featuredWrapper}>
            <View style={styles.featuredImageContainer}>
              <Animated.Image
                source={{ uri: FEATURED_MOVIE.thumbnail }}
                style={[styles.featuredImage, imageStyle]}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.featuredGradient}
              />
            </View>
            <View style={styles.featuredOverlay}>
              <Animated.View style={[styles.featuredCategories, categoriesStyle]}>
                <Text style={styles.categoriesText}>
                  {FEATURED_MOVIE.categories.join(' • ')}
                </Text>
              </Animated.View>
              <Animated.View style={[styles.featuredButtons, buttonsStyle]}>
                <Pressable style={styles.playButton}>
                  <Ionicons name="play" size={24} color="#000" />
                  <Text style={styles.playButtonText}>Play</Text>
                </Pressable>
                <Pressable style={styles.myListButton}>
                  <Ionicons name="add" size={24} color="#fff" />
                  <Text style={styles.myListButtonText}>My List</Text>
                </Pressable>
              </Animated.View>
            </View>
          </View>
        </View>

        {movies.map(row => renderMovieRow(row, router))}
      </Animated.ScrollView>
    </View>
  );
}


