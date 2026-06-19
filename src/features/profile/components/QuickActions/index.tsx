import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { styles } from './style';

function QuickAction({ label }: { label: string }) {
  return (
    <Pressable style={({ pressed }) => [styles.actionBtn, pressed && styles.actionBtnPressed]}>
      {({ pressed }) => (
        <>
          <Text style={[styles.actionLabel, pressed && { color: colors.text.primary }]}>{label}</Text>
          <MaterialIcons
            name="chevron-right"
            size={20}
            color={pressed ? colors.text.primary : colors.text.secondary}
          />
        </>
      )}
    </Pressable>
  );
}

export function QuickActions() {
  return (
    <View style={styles.actions}>
      <QuickAction label="VIEW RIBBONS" />
      <QuickAction label="HALL OF FAME" />
    </View>
  );
}
