import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { View, Animated, Easing, Image, Dimensions } from 'react-native';
import { styles } from './style';

export default function Loading() {

  ;
  const progressAnim = useRef(new Animated.Value(0)).current; //COMEÇA EM 0

  useEffect(() => {
    Animated.loop(
      Animated.timing(progressAnim, {
        toValue: 1, //vai de 0 a 100
        duration: 8000,      
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  //Onde o bulbassauro esta na tela
  const MoveBulbasaur = progressAnim.interpolate({
    inputRange: [0, 1], //Vai de 0 a 1
    outputRange: [-200,  200], //Vai de 0 a 500
  })  
  const fillBarLoading = progressAnim.interpolate({
    inputRange: [0, 1], //Vai de 0 a 1
    outputRange: ['0%', '100%'], //Vai de 0 a 100
  })  

  return (
    <View style={styles.container}>

      <Animated.View style={{ transform: [{ translateX: MoveBulbasaur }] }}>
        <LottieView
          source={require('../../../../assets/images/Bulbassaur.json')} 
          style={styles.image}
          autoPlay
          loop
        />
         </Animated.View>


        <View style={styles.barLoading}>
        <Animated.View 
          style={[
            styles.barLoadingFill, 
            { width: fillBarLoading } // A largura é controlada pela interpolação
          ]} 
        />
      </View>
     
    </View>
  );
}