import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { styles } from './style';

export type BattleMode = '1v1' | '5v5';

interface ModeSelectorProps {
  mode: BattleMode;
  onChange: (mode: BattleMode) => void;
}

export function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.modesRow}>
        <Pressable
          style={[styles.modeBtn, mode === '1v1' && styles.modeBtnActive]}
          onPress={() => onChange('1v1')}
        >
          <MaterialIcons
            name="person"
            size={24}
            color={mode === '1v1' ? colors.primary : colors.text.secondary}
          />
          <Text style={[styles.modeBtnText, mode === '1v1' && styles.modeBtnTextActive]}>
            1v1 Solo
          </Text>
        </Pressable>

        <Pressable
          style={[styles.modeBtn, mode === '5v5' && styles.modeBtnActive]}
          onPress={() => onChange('5v5')}
        >
          <MaterialIcons
            name="group"
            size={24}
            color={mode === '5v5' ? colors.primary : colors.text.secondary}
          />
          <Text style={[styles.modeBtnText, mode === '5v5' && styles.modeBtnTextActive]}>
            5v5 Equipe
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
