import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { PixelBorderDouble } from '@/components/ui/PixelBorderDouble';
import { BADGES } from '../../constants/badges';
import { styles } from './styles';

export function BadgesGrid() {
  return (
    <PixelBorderDouble style={[styles.section, styles.shadowLg]}>
      <View style={styles.badgesHeader}>
        <Text style={styles.headlineMd}>REGIONAL BADGES</Text>
        <Text style={styles.badgesCount}>8 / 8 COLLECTED</Text>
      </View>
      <View style={styles.badgesGrid}>
        {BADGES.map((b) => (
          <View key={b.name} style={styles.badge}>
            <View style={[styles.badgeCircle, { backgroundColor: b.bg }]}>
              <MaterialIcons name={b.icon} size={26} color={b.tint} />
            </View>
            <Text style={styles.badgeName}>{b.name}</Text>
          </View>
        ))}
      </View>
    </PixelBorderDouble>
  );
}
