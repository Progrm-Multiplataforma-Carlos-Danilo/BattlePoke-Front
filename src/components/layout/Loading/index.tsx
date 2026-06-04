import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Loading() {
  const moveAnim = useRef(new Animated.Value(-100)).current; 

  useEffect(() => {
    Animated.loop(
      Animated.timing(moveAnim, {
        toValue: width + 100, 
        duration: 2000,      
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [moveAnim]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
      <Animated.View style={{ transform: [{ translateX: moveAnim }] }}>
        <Image 
          source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' }} 
          style={{ width: 150, height: 150 }}
        />
      </Animated.View>
    </View>
  );
}