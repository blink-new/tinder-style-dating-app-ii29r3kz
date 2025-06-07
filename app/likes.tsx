import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');
const CARD_MARGIN = 8;
const NUM_COLUMNS = 2;
const CARD_WIDTH = (screenWidth - (CARD_MARGIN * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

interface LikedProfile {
  id: string;
  name: string;
  age: number;
  photo: string;
}

const sampleLikedProfiles: LikedProfile[] = [
  {
    id: '6',
    name: 'Chloe',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1508214751196-cdcfb49e593f?w=400&h=600&fit=crop',
  },
  {
    id: '7',
    name: 'Lily',
    age: 25,
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop',
  },
  {
    id: '8',
    name: 'Zoe',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=600&fit=crop',
  },
  {
    id: '9',
    name: 'Ava',
    age: 27,
    photo: 'https://images.unsplash.com/photo-1509840841025-ac928e4057eth?w=400&h=600&fit=crop',
  },
  {
    id: '10',
    name: 'Grace',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1520813795785-f5159c326542?w=400&h=600&fit=crop',
  },
];

function LikedProfileCard({ profile }: { profile: LikedProfile }) {
  return (
    <TouchableOpacity style={styles.likedCard}>
      <Image source={{ uri: profile.photo }} style={styles.likedImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)']}
        style={styles.likedGradient}
      />
      <View style={styles.likedInfo}>
        <Text style={styles.likedName}>{profile.name}, {profile.age}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Likes() {
  const likedProfiles = sampleLikedProfiles;

  return (
    <LinearGradient
      colors={['#FF6B5F', '#FF8A80', '#FFAB91']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Heart color="#FFFFFF" size={28} />
          <Text style={styles.headerTitle}>Likes You</Text>
        </View>
        
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {likedProfiles.length > 0 ? (
            <View style={styles.likedGrid}>
              {likedProfiles.map(profile => (
                <LikedProfileCard key={profile.id} profile={profile} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Heart color="#FFFFFF" size={64} />
              <Text style={styles.emptyTitle}>No likes yet</Text>
              <Text style={styles.emptySubtitle}>
                Keep swiping to see who likes you!
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: CARD_MARGIN,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  likedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  likedCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.3,
    marginBottom: CARD_MARGIN,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  likedImage: {
    width: '100%',
    height: '100%',
  },
  likedGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  likedInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  likedName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});