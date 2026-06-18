import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Pokemon } from "@sharedTypes/pokemon";
import { useEffect, useState } from "react";
import { styles } from "./style";
import { getCachedPokemons, captureRandomPokemons, removeCachedPokemon } from "@/utils/pokemonCache";
import { addCaptured, removeCaptured } from "@/features/home/integration/teamIntegration";
import { PokemonCard } from "@/components/ui/Cards/PokeCard/PokemonCard";
import SelectionPokemon from "../../components/selectionsPokemon";
import Toast from "react-native-toast-message";
import { Navbar } from "@/components/layout/Landinpage/Navbar";
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
        const cachedPokemons = await getCachedPokemons();
        if (cachedPokemons) {
          setPokemonList(cachedPokemons);
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
      const prevIds = new Set(pokemonList.map((p) => p.id));
      const newPokemons = await captureRandomPokemons();
      setPokemonList(newPokemons);
      if (userId) {
        const justCaptured = newPokemons.filter((p) => !prevIds.has(p.id));
        await Promise.all(justCaptured.map((p) => addCaptured(userId, p.id)));
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
      await removeCachedPokemon(pokemon.id);
      if (userId) await removeCaptured(userId, pokemon.id);
      Toast.show({ type: 'success', text1: 'Pokémon liberado', text2: `${pokemon.name} foi removido da bolsa.` });
    } catch (e) {
      console.error(e);
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Não foi possível remover o pokémon.' });
    }
  };

  if (loading) {
    return <Loading />;
  }

  const handleSelectPokemon = (pokemon: Pokemon) => {
    if (selectedPokemons.length >= 5) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Seu time está cheio!",
      });
      return;
    }
    if (selectedPokemons.find((pok) => pok.id === pokemon.id)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Você já selecionou este pokémon!",
      });
      return;
    }
    setSelectedPokemons([...selectedPokemons, pokemon]);
  };

  const handleSlotPress = (index: number) => {
    const newTeam = selectedPokemons.filter((_, i) => i !== index);
    setSelectedPokemons(newTeam);
  };

  const handleReadyPress = () => {
    updateTeam(selectedPokemons);
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
            {pokemonList.length >= 5 ? (
              <PokemonCard
                pokemonList={pokemonList}
                columns={3}
                onPokemonPress={handleSelectPokemon}
                onDeletePress={handleDeletePokemon}
              />
            ) : pokemonList.length < 5 ? (
              <>
                <ScrollView style={styles.scroll}>
                  <PokemonCard
                    pokemonList={pokemonList}
                    columns={3}
                    onPokemonPress={handleSelectPokemon}
                    onDeletePress={handleDeletePokemon} />
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>Pokémons para Capturar</Text>
                    <Text style={styles.emptySubtitle}>Capture mais Pokémons para formar seu time</Text>
                    <TouchableOpacity style={styles.captureButton} onPress={handleCaptureRandom} activeOpacity={0.8}>
                      <Text style={styles.captureButtonText}>Capturar 5 Pokémons</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView></>
            ) : (

              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>Nenhum Pokémon Capturado</Text>
                <Text style={styles.emptySubtitle}>Explore o mundo para encontrar novos aliados!</Text>
                <TouchableOpacity style={styles.captureButton} onPress={handleCaptureRandom} activeOpacity={0.8}>
                  <Text style={styles.captureButtonText}>Capturar 5 Pokémons</Text>
                </TouchableOpacity>
              </View>)}
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
