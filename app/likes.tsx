import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';

export default function Likes() {
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
        
        <ScrollView style={styles.content}>
          <View style={styles.emptyState}>
            <Heart color="#FFFFFF" size={64} />
            <Text style={styles.emptyTitle}>No likes yet</Text>
            <Text style={styles.emptySubtitle}>
              Keep swiping to see who likes you!
            </Text>
          </View>
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
    paddingHorizontal: 20,
  },
  emptyState: {
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
});