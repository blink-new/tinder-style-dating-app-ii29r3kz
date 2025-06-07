import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { X, Heart, Star, Zap, RotateCcw } from 'lucide-react-native';

interface ActionButtonsProps {
  onPass: () => void;
  onLike: () => void;
  onSuperLike: () => void;
  onBoost: () => void;
  onRewind: () => void;
}

export function ActionButtons({ onPass, onLike, onSuperLike, onBoost, onRewind }: ActionButtonsProps) {
  const passScale = useSharedValue(1);
  const likeScale = useSharedValue(1);
  const superLikeScale = useSharedValue(1);
  const boostScale = useSharedValue(1);
  const rewindScale = useSharedValue(1);

  const createAnimatedStyle = (scale: Animated.SharedValue<number>) =>
    useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

  const createPressHandlers = (scale: Animated.SharedValue<number>, action: () => void) => ({
    onPressIn: () => {
      scale.value = withSpring(0.9);
    },
    onPressOut: () => {
      scale.value = withSpring(1);
    },
    onPress: action,
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.buttonContainer, createAnimatedStyle(rewindScale)]}>
        <TouchableOpacity 
          style={[styles.button, styles.rewindButton]} 
          {...createPressHandlers(rewindScale, onRewind)}
        >
          <RotateCcw color="#FFC107" size={20} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.buttonContainer, createAnimatedStyle(passScale)]}>
        <TouchableOpacity 
          style={[styles.button, styles.passButton]} 
          {...createPressHandlers(passScale, onPass)}
        >
          <X color="#FF4444" size={28} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.buttonContainer, createAnimatedStyle(superLikeScale)]}>
        <TouchableOpacity 
          style={[styles.button, styles.superLikeButton]} 
          {...createPressHandlers(superLikeScale, onSuperLike)}
        >
          <Star color="#009FFF" size={24} fill="#009FFF" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.buttonContainer, createAnimatedStyle(likeScale)]}>
        <TouchableOpacity 
          style={[styles.button, styles.likeButton]} 
          {...createPressHandlers(likeScale, onLike)}
        >
          <Heart color="#4CAF50" size={28} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.buttonContainer, createAnimatedStyle(boostScale)]}>
        <TouchableOpacity 
          style={[styles.button, styles.boostButton]} 
          {...createPressHandlers(boostScale, onBoost)}
        >
          <Zap color="#9C27B0" size={20} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonContainer: {
    marginHorizontal: 8,
  },
  button: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  rewindButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#FFC107',
  },
  passButton: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  superLikeButton: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#009FFF',
  },
  likeButton: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  boostButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#9C27B0',
  },
});