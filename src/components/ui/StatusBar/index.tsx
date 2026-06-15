import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

interface StatusBarProps {
    label: string;
    value: number;
    maxValue: number;
    color: string;
    labelColor?: string;
}

export function StatusBar({ label, value, maxValue, color, labelColor }: StatusBarProps) {
    const percentage = maxValue > 0 ? Math.min(100, (value / maxValue) * 100) : 0;

    return (
        <View style={styles.statusBarSection}>
            <View style={styles.statusBarLabelRow}>
                <Text style={[styles.statusBarLabel, labelColor ? { color: labelColor } : {}]}>
                    {label}
                </Text>
                <Text style={[styles.statusBarValue, labelColor ? { color: labelColor } : {}]}>
                    {value} / {maxValue}
                </Text>
            </View>
            <View style={styles.statusBarBg}>
                <View style={[styles.statusBarFill, { width: `${percentage}%`, backgroundColor: color }]} />
            </View>
        </View>
    );
}
