import { Text, Image, View, StyleSheet, Pressable, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

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

const TOP_PICKS = [
  {
    id: 'do-patti',
    title: 'Do Patti',
    type: 'movie' as const,
    thumbnail: 'https://m.media-amazon.com/images/M/MV5BYjQwOTRhMjctNGU4ZS00OWM2LWIyYzUtNDQ4MjQ5MTY5NjY3XkEyXkFqcGdeQXVyMTY3ODkyNDkz._V1_.jpg',
    categories: ['Thriller']
  },
  {
    id: 'khel-khel-mein',
    title: 'Khel Khel Mein',
    type: 'movie' as const,
    thumbnail: 'https://m.media-amazon.com/images/M/MV5BNjU5ZTY1ODMtMGY3OC00ZDg0LWE1ZjYtODk0ODc4MGI0ZDk4XkEyXkFqcGdeQXVyMTU0ODI1NTA2._V1_.jpg',
    categories: ['Drama']
  },
  {
    id: '1670',
    title: '1670',
    type: 'show' as const,
    thumbnail: 'https://m.media-amazon.com/images/M/MV5BZGYwZjNkYTctYzNiYS00YjQzLTg4MTAtZDM3NzU3YTYxYzBkXkEyXkFqcGdeQXVyMTEwMTY3NDI@._V1_.jpg',
    categories: ['Historical']
  },
  {
    id: 'animal',
    title: 'Animal',
    type: 'movie' as const,
    thumbnail: 'https://m.media-amazon.com/images/M/MV5BNGViM2M4NmUtMmNkNy00MTQ5LTk5MDYtNmNhODAzODkwOTJlXkEyXkFqcGdeQXVyMTY1NDY4NTIw._V1_.jpg',
    categories: ['Action']
  }
];

const renderContentItem = ({ item }: { item: Movie }) => (
  <Pressable
    onPress={() => router.push(`/movie/${item.id}`)}
    style={styles.contentItem}
  >
    <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
  </Pressable>
);

const renderMovieRow = ({ rowTitle, movies }: MovieRow) => (
  <View key={rowTitle} style={styles.movieRow}>
    <Text style={styles.sectionTitle}>{rowTitle}</Text>
    <FlatList
      horizontal
      data={movies}
      renderItem={renderContentItem}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentList}
    />
  </View>
);

export default function HomeScreen() {
  const router = useRouter();
  const { movies } = movieData as MoviesData;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#004400', '#002200', '#000000']}
        locations={[0, 0.4, 0.8]}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView}>
          <SafeAreaView style={styles.header}>
            <Text style={styles.headerTitle}>For Saúl</Text>
            <Pressable style={styles.searchButton}>
              <Ionicons name="search" size={24} color="#fff" />
            </Pressable>
          </SafeAreaView>

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

          <View style={styles.featuredContent}>
            <Image
              source={{ uri: FEATURED_MOVIE.thumbnail }}
              style={styles.featuredImage}
            />
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

          {movies.map(row => renderMovieRow(row))}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 8,
  },
  categoryTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
    marginTop: 12,
    gap: 24,
  },
  categoryTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
  },
  categoryTabText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTabTextWithIcon: {
    color: '#fff',
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredContent: {
    width: '100%',
    height: 480,
    marginBottom: 24,
    paddingHorizontal: 16,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 12,
  },
  featuredCategories: {
    position: 'absolute',
    bottom: 100,
    left: 32,
    right: 32,
    alignItems: 'center',
  },
  categoriesText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
    textAlign: 'center',
  },
  featuredButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    position: 'absolute',
    bottom: 24,
    left: 32,
    right: 32,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
    gap: 8,
    flex: 1,
  },
  playButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  myListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(51, 51, 51, 0.9)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
    gap: 8,
    flex: 1,
  },
  myListButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 16,
  },
  contentList: {
    paddingHorizontal: 16,
  },
  contentItem: {
    width: 120,
    marginRight: 12,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 6,
  },
  movieRow: {
    marginBottom: 24,
  },
});
