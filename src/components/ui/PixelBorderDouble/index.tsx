import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { styles } from './style';

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
