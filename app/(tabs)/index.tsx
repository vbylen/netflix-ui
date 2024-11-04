import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import { styles } from '@/styles';
import { AnimatedHeader } from '@/components/Header/AnimatedHeader';
import { FeaturedContent } from '@/components/FeaturedContent/FeaturedContent';
import { MovieList } from '@/components/MovieList/MovieList';
import { useDeviceMotion } from '@/hooks/useDeviceMotion';
import movieData from '../../data/movies.json';
import { MoviesData } from '@/types/movie';
import { TabScreenWrapper } from '@/components/TabScreenWrapper';
import { usePathname } from 'expo-router';
import { TAB_SCREENS } from '@/app/(tabs)/_layout';
import { GameList } from '@/components/GameList/GameList';

const FEATURED_MOVIE = {
  id: 'dont-move',
  title: "Don't Move",
  thumbnail: 'https://i.redd.it/q53e4iwud0971.jpg',
  categories: ['Violent', 'Gritty', 'Thriller', 'Drug Lord']
};

export default function HomeScreen() {
  const { movies } = movieData as MoviesData;
  const insets = useSafeAreaInsets();
  const { tiltX, tiltY } = useDeviceMotion();

  const SCROLL_THRESHOLD = 4;
  const SLIDE_ACTIVATION_POINT = 90; // Point at which sliding can start
  const scrollY = useSharedValue(0);
  const lastScrollY = useSharedValue(0);
  const scrollDirection = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      const scrollDelta = currentScrollY - lastScrollY.value;

      // Only trigger direction change if we've scrolled past SLIDE_ACTIVATION_POINT
      if (currentScrollY >= SLIDE_ACTIVATION_POINT) {
        if (scrollDelta > SCROLL_THRESHOLD) {
          // Scrolling down - hide tabs
          scrollDirection.value = withTiming(1, { duration: 400 });
        } else if (scrollDelta < -SCROLL_THRESHOLD) {
          // Scrolling up - show tabs
          scrollDirection.value = withTiming(0, { duration: 400 });
        }
      } else {
        // Before SLIDE_ACTIVATION_POINT, always show tabs
        scrollDirection.value = withTiming(0, { duration: 400 });
      }

      lastScrollY.value = currentScrollY;
      scrollY.value = currentScrollY;
    },
  });

  const headerAnimatedProps = useAnimatedProps(() => {
    return {
      intensity: interpolate(
        scrollY.value,
        [0, 90],
        [0, 90],
        'clamp'
      )
    };
  });

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

  const pathname = usePathname();
  const isActive = pathname === '/' || pathname === '/index';

  const currentTabIndex = TAB_SCREENS.findIndex(screen =>
    screen.name === 'index'
  );
  const activeTabIndex = TAB_SCREENS.findIndex(screen =>
    pathname === `/${screen.name}` || (screen.name === 'index' && pathname === '/')
  );

  const slideDirection = activeTabIndex > currentTabIndex ? 'right' : 'left';

  return (
    <TabScreenWrapper isActive={isActive} slideDirection={slideDirection}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <LinearGradient
          colors={['#03341b', '#002820', '#000000']}
          locations={[0, 0.4, 0.8]}
          style={styles.gradient}
        />

        <AnimatedHeader
          headerAnimatedProps={headerAnimatedProps}
          title="For Saúl"
          scrollDirection={scrollDirection}
        />

        <Animated.ScrollView
          style={styles.scrollView}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <FeaturedContent
            movie={FEATURED_MOVIE}
            imageStyle={imageStyle}
            categoriesStyle={categoriesStyle}
            buttonsStyle={buttonsStyle}
            topMargin={insets.top + 90}
          />

          {movies.map(row => (
            row.rowTitle === 'Mobile Games' ? <GameList key={row.rowTitle} {...row} /> : <MovieList key={row.rowTitle} {...row} />
          ))}
        </Animated.ScrollView>
      </View>
    </TabScreenWrapper>
  );
}


