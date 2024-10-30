import { Text, Image, View, StyleSheet, Pressable, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

interface Content {
  id: string;
  title: string;
  type: 'movie' | 'show';
  thumbnail: string;
  categories: string[];
}

export default function HomeScreen() {
  const router = useRouter();

  const renderContentItem = ({ item }: { item: Content }) => (
    <Pressable
      onPress={() => router.push(`/content/${item.id}`)}
      style={styles.contentItem}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
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
            source={{ uri: 'YOUR_FEATURED_IMAGE_URL' }}
            style={styles.featuredImage}
          />
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

        <Text style={styles.sectionTitle}>Today's Top Picks for You</Text>
        <FlatList
          horizontal
          data={[]} // Add your content data here
          renderItem={renderContentItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    marginBottom: 16,
    gap: 16,
  },
  categoryTab: {
    paddingVertical: 8,
  },
  categoryTabText: {
    color: '#fff',
    fontSize: 16,
  },
  categoryTabTextWithIcon: {
    color: '#fff',
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredContent: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: 24,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 16,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 4,
    gap: 8,
  },
  playButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  myListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 4,
    gap: 8,
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
    width: 140,
    marginRight: 12,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 4,
  },
});
