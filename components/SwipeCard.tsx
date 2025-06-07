import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  useAnimatedGestureHandler,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Briefcase } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth - 40;
const SWIPE_THRESHOLD = screenWidth * 0.25;

interface Profile {
  id: string;
  name: string;
  age: number;
  distance: string;
  occupation: string;
  photos: string[];
  bio: string;
}

interface SwipeCardProps {
  profile: Profile;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  index: number;
}

export function SwipeCard({ profile, onSwipeLeft, onSwipeRight, index }: SwipeCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = 0.95;
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: (event) => {
      scale.value = 1;
      
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        translateX.value = event.translationX > 0 ? screenWidth * 2 : -screenWidth * 2;
        translateY.value = event.translationY;
        
        if (event.translationX > 0) {
          runOnJS(onSwipeRight)();
        } else {
          runOnJS(onSwipeLeft)();
        }
      } else {
        translateX.value = 0;
        translateY.value = 0;
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      translateX.value,
      [-screenWidth / 2, 0, screenWidth / 2],
      [-30, 0, 30],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation}deg` },
        { scale: scale.value },
      ],
    };
  });

  const likeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolate.CLAMP
    );

    return { opacity };
  });

  const nopeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolate.CLAMP
    );

    return { opacity };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View 
        style={[
          styles.card, 
          cardStyle,
          { zIndex: 10 - index }
        ]}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: profile.photos[0] }}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          />
          
          <Animated.View style={[styles.likeOverlay, likeStyle]}>
            <Text style={styles.likeText}>LIKE</Text>
          </Animated.View>
          
          <Animated.View style={[styles.nopeOverlay, nopeStyle]}>
            <Text style={styles.nopeText}>NOPE</Text>
          </Animated.View>
          
          <View style={styles.cardInfo}>
            <Text style={styles.name}>{profile.name}, {profile.age}</Text>
            
            <View style={styles.detailsRow}>
              <View style={styles.detail}>
                <MapPin color="#FFFFFF" size={14} />
                <Text style={styles.detailText}>{profile.distance}</Text>
              </View>
              
              <View style={styles.detail}>
                <Briefcase color="#FFFFFF" size={14} />
                <Text style={styles.detailText}>{profile.occupation}</Text>
              </View>
            </View>
            
            <Text style={styles.bio} numberOfLines={2}>
              {profile.bio}
            </Text>
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: 600,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  likeOverlay: {
    position: 'absolute',
    top: 50,
    left: 30,
    transform: [{ rotate: '-15deg' }],
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  likeText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#4CAF50',
    letterSpacing: 2,
  },
  nopeOverlay: {
    position: 'absolute',
    top: 50,
    right: 30,
    transform: [{ rotate: '15deg' }],
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: '#FF4444',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  nopeText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FF4444',
    letterSpacing: 2,
  },
  cardInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
    opacity: 0.9,
  },
  bio: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    lineHeight: 20,
  },
});