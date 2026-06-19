import {View, Text} from 'react-native';
import {styles} from './style';

export function DataField({ title, value, valueColor }: { title: string; value: string; valueColor?: string }) {
  return (
    <View>
      <Text style={styles.fieldLabel}>{title}</Text>
      <Text style={[styles.fieldValue, valueColor ? { color: valueColor } : null]}>{value}</Text>
    </View>
  );
}