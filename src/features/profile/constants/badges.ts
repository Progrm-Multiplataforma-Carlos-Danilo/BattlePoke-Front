import {colors} from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

export const BADGES: { name: string; icon: IconName; bg: string; tint: string }[] = [
  { name: 'BOULDER', icon: 'filter-hdr', bg: colors.types.rock, tint: colors.text.primary },
  { name: 'CASCADE', icon: 'water-drop', bg: colors.types.water, tint: colors.text.primary },
  { name: 'THUNDER', icon: 'bolt', bg: colors.types.electric, tint: colors.background },
  { name: 'RAINBOW', icon: 'eco', bg: colors.types.grass, tint: colors.text.primary },
  { name: 'SOUL', icon: 'diamond', bg: colors.types.fairy, tint: colors.text.primary },
  { name: 'MARSH', icon: 'psychology', bg: colors.types.psychic, tint: colors.text.primary },
  { name: 'VOLCANO', icon: 'local-fire-department', bg: colors.types.fire, tint: colors.text.primary },
  { name: 'EARTH', icon: 'shield', bg: colors.types.steel, tint: colors.text.primary },
];