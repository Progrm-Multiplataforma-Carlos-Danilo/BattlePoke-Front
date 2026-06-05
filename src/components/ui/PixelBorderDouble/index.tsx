import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';

export function PixelBorderDouble({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.pixelOuter, style]}>
      <View style={styles.pixelInner}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  pixelOuter: {
    borderWidth: 2,
    borderColor: colors.border,
    padding: 2,
    backgroundColor: 'transparent',
  },
  pixelInner: {
    borderWidth: 2,
    borderColor: colors.border,
  },
});
