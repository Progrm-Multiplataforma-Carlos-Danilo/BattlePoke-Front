import React, { useState } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

interface HoverButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  hoverStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function HoverButton({ style, hoverStyle, children, ...props }: HoverButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      {...props}
      {...{
        onHoverIn: () => setIsHovered(true),
        onHoverOut: () => setIsHovered(false),
      } as any}
      style={[style, isHovered && hoverStyle]}
    >
      {children}
    </Pressable>
  );
}
