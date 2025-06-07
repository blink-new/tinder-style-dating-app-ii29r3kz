import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeCard } from '@/components/SwipeCard';
import { ActionButtons } from '@/components/ActionButtons';
import { Flame, Settings } from 'lucide-react-native';

// Sample data - in a real app, this would come from your backend
const sampleProfiles = [
  {
    id: '1',
    name: 'Emma',
    age: 26,
    distance: '2 miles away',
    occupation: 'Photographer',
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616b69a6c89?w=400&h=600&fit=crop',
    ],
    bio: 'Adventure seeker 🌟 Love capturing moments and exploring new places. Coffee enthusiast ☕️',
  },
  {
    id: '2',
    name: 'Sophie',
    age: 24,
    distance: '5 miles away',
    occupation: 'Yoga Instructor',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
    ],
    bio: 'Namaste 🧘‍♀️ Teaching yoga and spreading good vibes. Vegan lifestyle 🌱',
  },
  {
    id: '3',
    name: 'Jessica',
    age: 28,
    distance: '1 mile away',
    occupation: 'Marketing Manager',
    photos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop',
    ],
    bio: 'Creative mind with a love for art and design. Weekend hiker 🥾 Dog mom to a golden retriever 🐕',
  },
  {
    id: '4',
    name: 'Mia',
    age: 25,
    distance: '3 miles away',
    occupation: 'Software Engineer',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop',
    ],
    bio: 'Code by day, dance by night 💻💃 Always up for trying new restaurants and exploring the city!',
  },
  {
    id: '5',
    name: 'Olivia',
    age: 27,
    distance: '4 miles away',
    occupation: 'Doctor',
    photos: [
      'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop',
    ],
    bio: 'Saving lives and spreading smiles 👩‍⚕️ Love reading, cooking, and long conversations over wine 🍷',
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles, setProfiles] = useState(sampleProfiles);

  const handleSwipeLeft = () => {
    console.log('Swiped left on:', profiles[currentIndex]?.name);
    nextCard();
  };

  const handleSwipeRight = () => {
    console.log('Liked:', profiles[currentIndex]?.name);
    nextCard();
  };

  const nextCard = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handlePass = () => handleSwipeLeft();
  const handleLike = () => handleSwipeRight();
  const handleSuperLike = () => {
    console.log('Super liked:', profiles[currentIndex]?.name);
    nextCard();
  };
  const handleBoost = () => {
    console.log('Boost activated!');
  };
  const handleRewind = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const hasMoreCards = currentIndex < profiles.length;
  const visibleProfiles = profiles.slice(currentIndex, currentIndex + 3);

  return (
    <LinearGradient
      colors={['#FF6B5F', '#FF8A80', '#FFAB91']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Settings color="#FFFFFF" size={24} />
          </TouchableOpacity>
          
          <View style={styles.logo}>
            <Flame color="#FFFFFF" size={32} />
            <Text style={styles.logoText}>tinder</Text>
          </View>
          
          <TouchableOpacity style={styles.iconButton}>
            <Settings color="#FFFFFF" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          {hasMoreCards ? (
            visibleProfiles.map((profile, index) => (
              <SwipeCard
                key={profile.id}
                profile={profile}
                onSwipeLeft={index === 0 ? handleSwipeLeft : () => {}}
                onSwipeRight={index === 0 ? handleSwipeRight : () => {}}
                index={index}
              />
            ))
          ) : (
            <View style={styles.noMoreCards}>
              <Flame color="#FFFFFF" size={64} />
              <Text style={styles.noMoreTitle}>No more people nearby</Text>
              <Text style={styles.noMoreSubtitle}>
                Check back later for new people or expand your distance
              </Text>
            </View>
          )}
        </View>

        {hasMoreCards && (
          <ActionButtons
            onPass={handlePass}
            onLike={handleLike}
            onSuperLike={handleSuperLike}
            onBoost={handleBoost}
            onRewind={handleRewind}
          />
        )}
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
    letterSpacing: 1,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  noMoreCards: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  noMoreTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  noMoreSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 24,
  },
});