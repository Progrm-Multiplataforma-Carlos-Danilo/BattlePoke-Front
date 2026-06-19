import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { styles } from './style';
import { colors } from '../../../../constants/colors';
import { router } from 'expo-router';

export function Navbar() {
  return (
    <View style={styles.container}>
     <Image
     source={require('../../../../../assets/images/Logo.png')}
     style={styles.logo}
     />
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.battleButton} onPress={() => router.push('/Login')}>
          <Text style={styles.battleButtonText}>Batalhar agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

 
