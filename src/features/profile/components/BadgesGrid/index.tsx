import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { PixelBorderDouble } from '@/components/ui/PixelBorderDouble';
import { BADGES } from '../../constants/badges';
import { colors } from '@/constants/colors';
import { styles } from './styles';

const LEVELS_PER_BADGE = 10;

export function BadgesGrid({ level = 0 }: { level?: number }) {
  // 1 insígnia a cada 10 níveis: a badge no índice i exige nível (i + 1) * 10.
  const unlockedCount = Math.min(Math.floor(level / LEVELS_PER_BADGE), BADGES.length);

  return (
    <PixelBorderDouble style={[styles.section, styles.shadowLg]}>
      <View style={styles.badgesHeader}>
        <Text style={styles.headlineMd}>REGIONAL BADGES</Text>
        <Text style={styles.badgesCount}>{unlockedCount} / {BADGES.length} COLLECTED</Text>
      </View>
      <View style={styles.badgesGrid}>
        {BADGES.map((b, i) => {
          const requiredLevel = (i + 1) * LEVELS_PER_BADGE;
          const unlocked = level >= requiredLevel;
          return (
            <View key={b.name} style={styles.badge}>
              <View
                style={[
                  styles.badgeCircle,
                  { backgroundColor: unlocked ? b.bg : colors.surfaceHighlight },
                  !unlocked && styles.badgeLocked,
                ]}
              >
                <MaterialIcons
                  name={unlocked ? b.icon : 'lock'}
                  size={26}
                  color={unlocked ? b.tint : colors.text.secondary}
                />
              </View>
              <Text style={styles.badgeName}>{b.name}</Text>
              <Text style={styles.badgeLevel}>LV.{requiredLevel}</Text>
            </View>
          );
        })}
      </View>
    </PixelBorderDouble>
  );
}
