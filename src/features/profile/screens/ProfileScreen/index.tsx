import { View, ScrollView, StatusBar, useWindowDimensions } from 'react-native';
import { colors } from '@/constants/colors';
import { TrainerCard } from '../../components/TrainerCard';
import { BattleRecord } from '../../components/BattleRecord';
import { QuickActions } from '../../components/QuickActions';
import { BadgesGrid } from '../../components/BadgesGrid';
import { styles } from './styles';
import Loading from '@/components/layout/Loading';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getProfile } from '../../integration/profileIntegration';
import { Profile } from '../../../../shared/types/Profile';

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const data = await getProfile(userId);
        if (active) setProfile(data);
        console.log("Meu perfil: " + profile?.username)
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      active = false;
    };
  }, [userId]);

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {isWide ? (
          <>
            <View style={styles.row}>
              <View style={styles.mainCol}>
                <TrainerCard profile={profile} />
              </View>
              <View style={styles.sideCol}>
                <BattleRecord profile={profile} />
                <QuickActions />
              </View>
            </View>
            <BadgesGrid level={profile?.level ?? 0} />
          </>
        ) : (
          <>
            <TrainerCard profile={profile} />
            <BattleRecord profile={profile} />
            <QuickActions />
            <BadgesGrid level={profile?.level ?? 0} />
          </>
        )}
      </ScrollView>
    </View>
  );
}
