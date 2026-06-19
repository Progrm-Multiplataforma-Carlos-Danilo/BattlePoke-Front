import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Pokemon } from "@sharedTypes/pokemon";
import { useEffect, useState } from "react";
import { styles } from "./style";
import { captureRandomPokemons } from "@/utils/pokemonCache";
import { addCaptured, removeCaptured, saveTeam, getCaptured, getTeamData } from "@/features/home/integration/teamIntegration";
import { PokemonCard } from "@/components/ui/Cards/PokeCard/PokemonCard";
import SelectionPokemon from "../../components/selectionsPokemon";
import Toast from "react-native-toast-message";
import { Navbar } from "@/components/layout/LandingPage/Navbar";
import Loading from "@/components/layout/Loading";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { getProfile } from "@/features/profile/integration/profileIntegration";
import { Profile } from "@/shared/types/Profile";

export default function HomeScreen() {
  const router = useRouter();
  const { userId, team: savedTeam, updateTeam } = useAuth();
  const [loading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [profile, setProfile] = useState<Profile | null>();
  const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>(savedTeam);
  const [activeBankPokemon, setActiveBankPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {

    let active = true;

    async function loadData() {
      if (!userId) {
        setLoading(false)
        return;
      }
      try {
        const data = await getProfile(userId);
        if (active) setProfile(data);
        // Time e bolsa são a fonte de verdade do backend (mesma chamada).
        const { team, capture } = await getTeamData(userId);
        if (active) {
          setSelectedPokemons(team);
          setPokemonList(capture);
        }
      } catch (e) {
        console.error("Error fetching Pokemon:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [userId]);

  const handleCaptureRandom = async () => {
    setLoading(true);
    try {
      const sorted = await captureRandomPokemons();
      if (userId) {
        // Captura no backend e recarrega a bolsa (fonte de verdade).
        const prevIds = new Set(pokemonList.map((p) => p.id));
        const justCaptured = sorted.filter((p) => !prevIds.has(p.id));
        await Promise.all(justCaptured.map((p) => addCaptured(userId, p.id)));
        setPokemonList(await getCaptured(userId));
      } else {
        setPokemonList(sorted);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePokemon = async (pokemon: Pokemon) => {
    setSelectedPokemons((prev) => prev.filter((p) => p.id !== pokemon.id));
    setPokemonList((prev) => prev.filter((p) => p.id !== pokemon.id));
    try {
      if (userId) {
        await removeCaptured(userId, pokemon.id);
        setPokemonList(await getCaptured(userId));
      }
      Toast.show({ type: 'success', text1: 'Pokémon liberado', text2: `${pokemon.name} foi removido da bolsa.` });
    } catch (e) {
      console.error(e);
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Não foi possível remover o pokémon.' });
    }
  };

  if (loading) {
    return <Loading />;
  }

  // Persiste a seleção atual no backend pareando as trocas contra o time real
  // (saveTeam faz o diff). Como time e bolsa são mutuamente exclusivos no
  // backend (selecionar move da bolsa para o time, e o substituído volta para a
  // bolsa), ressincronizamos ambos do backend após salvar. Best-effort: avisa
  // em caso de erro, mas não bloqueia a edição.
  const persistTeam = async (team: Pokemon[]) => {
    updateTeam(team);
    if (!userId) return;
    try {
      await saveTeam(userId, team.map((p) => p.id));
      const { team: freshTeam, capture } = await getTeamData(userId);
      setSelectedPokemons(freshTeam);
      updateTeam(freshTeam);
      setPokemonList(capture);
    } catch (e) {
      console.error(e);
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Não foi possível salvar o time.' });
    }
  };

  const handleSelectPokemon = (pokemon: Pokemon) => {
    if (selectedPokemons.find((pok) => pok.id === pokemon.id)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Você já selecionou este pokémon!",
      });
      return;
    }

    if (selectedPokemons.length >= 5) {
      if (activeBankPokemon?.id === pokemon.id) {
        setActiveBankPokemon(null);
      } else {
        setActiveBankPokemon(pokemon);
        Toast.show({
          type: "edicaoToast",
          text1: "Trocar Pokémon",
          text2: `Você selecionou ${pokemon.name}. Agora clique em um Pokémon do seu time para substituí-lo.`,
        });
      }
      return;
    }

    const newTeam = [...selectedPokemons, pokemon];
    setSelectedPokemons(newTeam);
    persistTeam(newTeam);
  };

  const handleSlotPress = (index: number) => {
    if (activeBankPokemon) {
      const newTeam = [...selectedPokemons];
      newTeam[index] = activeBankPokemon;
      setSelectedPokemons(newTeam);
      persistTeam(newTeam);
      setActiveBankPokemon(null);
    } else {
      Toast.show({
        type: "edicaoToast",
        text1: "Substituir Pokémon",
        text2: "Para trocar este Pokémon, primeiro selecione um Pokémon da sua bolsa.",
      });
    }
  };

  const handleReadyPress = () => {
    router.push('/(dashboard)/Battle');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Seja bem vindo <Text style={styles.username}>{profile?.username}</Text></Text>

        </View>
        <View style={styles.content}>
          <View style={styles.listContainer}>
            {pokemonList.length > 0 ? (
              <PokemonCard
                pokemonList={pokemonList}
                columns={3}
                onPokemonPress={handleSelectPokemon}
                onDeletePress={handleDeletePokemon}
                activePokemonId={activeBankPokemon?.id}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>Nenhum Pokémon Capturado</Text>
                <Text style={styles.emptySubtitle}>Explore o mundo para encontrar novos aliados!</Text>
                <TouchableOpacity style={styles.captureButton} onPress={handleCaptureRandom} activeOpacity={0.8}>
                  <Text style={styles.captureButtonText}>Capturar 5 Pokémons</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.sidebarContainer}>
            <SelectionPokemon
              selectedPokemons={selectedPokemons}
              onSlotPress={handleSlotPress}
              onReadyPress={handleReadyPress}
            />
          </View>
        </View>
      </View>
    </>
  );
}
