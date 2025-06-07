import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle } from 'lucide-react-native';

interface MessageThread {
  id: string;
  name: string;
  photo: string;
  lastMessage: string;
  time: string;
}

const sampleMessageThreads: MessageThread[] = [
  {
    id: '1',
    name: 'Emma',
    photo: 'https://images.unsplash.com/photo-1500917293891-ef795cee702c?w=100&h=100&fit=crop',
    lastMessage: 'Hey, how are you doing?',
    time: '1h ago',
  },
  {
    id: '2',
    name: 'Sophie',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
    lastMessage: 'Let's grab coffee this week!',
    time: '3h ago',
  },
  {
    id: '3',
    name: 'Jessica',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    lastMessage: 'Did you see that new movie?',
    time: 'Yesterday',
  },
  {
    id: '4',
    name: 'Mia',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
    lastMessage: 'Haha, that's hilarious!',
    time: '2 days ago',
  },
];

function MessageThreadItem({ thread }: { thread: MessageThread }) {
  return (
    <TouchableOpacity style={styles.threadItem}>
      <Image source={{ uri: thread.photo }} style={styles.threadPhoto} />
      <View style={styles.threadContent}>
        <Text style={styles.threadName}>{thread.name}</Text>
        <Text style={styles.threadLastMessage} numberOfLines={1}>{thread.lastMessage}</Text>
      </View>
      <Text style={styles.threadTime}>{thread.time}</Text>
    </TouchableOpacity>
  );
}

export default function Messages() {
  const messageThreads = sampleMessageThreads;

  return (
    <LinearGradient
      colors={['#FF6B5F', '#FF8A80', '#FFAB91']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <MessageCircle color="#FFFFFF" size={28} />
          <Text style={styles.headerTitle}>Messages</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {messageThreads.length > 0 ? (
            messageThreads.map(thread => (
              <MessageThreadItem key={thread.id} thread={thread} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <MessageCircle color="#FFFFFF" size={64} />
              <Text style={styles.emptyTitle}>No messages yet</Text>
              <Text style={styles.emptySubtitle}>
                Start matching to begin conversations!
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
    paddingHorizontal: 16,
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
  threadItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  threadPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  threadContent: {
    flex: 1,
    marginRight: 8,
  },
  threadName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  threadLastMessage: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  threadTime: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
  },
});