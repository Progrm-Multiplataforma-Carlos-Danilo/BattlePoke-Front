import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import { styles } from './style';
import { Colors } from '../../../constants/colors';

export function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>KINETIC STADIUM</Text>
      
      {Platform.OS === 'web' && (
        <View style={styles.nav}>
          <TouchableOpacity><Text style={[styles.navLink, styles.activeLink]}>Home</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navLink}>Features</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navLink}>Pokedex</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navLink}>Rankings</Text></TouchableOpacity>
        </View>
      )}

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.bellIcon}>
          <Text style={{ color: Colors.text.primary }}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.battleButton}>
          <Text style={styles.battleButtonText}>BATTLE NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

 
