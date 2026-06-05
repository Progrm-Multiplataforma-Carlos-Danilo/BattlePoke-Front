import { View, ScrollView, StatusBar, useWindowDimensions } from 'react-native';
import { colors } from '@/constants/colors';
import { TrainerCard } from '../../components/TrainerCard';
import { BattleRecord } from '../../components/BattleRecord';
import { QuickActions } from '../../components/QuickActions';
import { BadgesGrid } from '../../components/BadgesGrid';
import { styles } from './styles';

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {isWide ? (
          <>
            <View style={styles.row}>
              <View style={styles.mainCol}>
                <TrainerCard />
              </View>
              <View style={styles.sideCol}>
                <BattleRecord />
                <QuickActions />
              </View>
            </View>
            <BadgesGrid />
          </>
        ) : (
          <>
            <TrainerCard />
            <BattleRecord />
            <QuickActions />
            <BadgesGrid />
          </>
        )}
      </ScrollView>
    </View>
  );
}
