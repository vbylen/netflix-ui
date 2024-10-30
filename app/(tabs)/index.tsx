import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';
import { styles } from '@/styles';
import { AnimatedHeader } from '@/components/Header/AnimatedHeader';
import { FeaturedContent } from '@/components/FeaturedContent/FeaturedContent';
import { MovieList } from '@/components/MovieList/MovieList';
import { useDeviceMotion } from '@/hooks/useDeviceMotion';
import movieData from '../../data/movies.json';
import { MoviesData } from '@/types/movie';

const FEATURED_MOVIE = {
  id: 'dont-move',
  title: "Don't Move",
  thumbnail: 'https://images.squarespace-cdn.com/content/v1/511eea22e4b06642027a9a99/932ca36a-7b49-4d93-9df7-b4d1c123ba80/Don%27t+Move.jpg',
  categories: ['Ominous', 'Chilling', 'Thriller', 'Serial Killer']
};

export default function HomeScreen() {
  const { movies } = movieData as MoviesData;
  const insets = useSafeAreaInsets();
  const { tiltX, tiltY } = useDeviceMotion();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    intensity: interpolate(scrollY.value, [0, 10], [0, 90], 'clamp'),
  }));

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tiltX.value * 0.7 },
      { translateY: tiltY.value * 0.7 },
      { scale: 1.05 },
    ],
  }));

  const categoriesStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tiltX.value * -0.35 },
      { translateY: tiltY.value * -0.35 },
    ],
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tiltX.value * -0.45 },
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

      <AnimatedHeader headerAnimatedStyle={headerAnimatedStyle} title="For Saúl" />

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}
      >
        <FeaturedContent
          movie={FEATURED_MOVIE}
          imageStyle={imageStyle}
          categoriesStyle={categoriesStyle}
          buttonsStyle={buttonsStyle}
          topMargin={insets.top + 90}
        />

        {movies.map(row => (
          <MovieList key={row.rowTitle} {...row} />
        ))}
      </Animated.ScrollView>
    </View>
  );
}


