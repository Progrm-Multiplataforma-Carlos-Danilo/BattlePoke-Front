import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { styles } from './style';
import { Colors } from '../../../../constants/colors';
import { router } from 'expo-router';

export function Navbar() {
  return (
    <View style={styles.container}>
     <Image
     source={require('../../../../../assets/images/Logo.png')}
     style={styles.logo}
     />
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.bellIcon}>
          <Text style={{ color: Colors.text.primary }}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.battleButton} onPress={() => router.push('/Login')}>
          <Text style={styles.battleButtonText}>BATTLE NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

 
