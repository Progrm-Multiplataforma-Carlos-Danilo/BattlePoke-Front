import { View } from "react-native";
import { Pokemon } from "@sharedTypes/pokemon";
import { useEffect, useState } from "react";
import { styles } from "./style";
import { getRandomPokemons } from "@/utils/pokemonCache";
import { PokemonCard } from "@/components/ui/Cards/PokeCard/PokemonCard";
import SelectionPokemon from "../../components/selectionsPokemon";
import Toast from "react-native-toast-message";
import { Navbar } from "@/components/layout/Landinpage/Navbar";
import Loading from "@/components/layout/Loading";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function HomeScreen() {
  const router = useRouter();
  const { team: savedTeam, updateTeam } = useAuth();
  const [loading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>(savedTeam);

  useEffect(() => {
    async function loadData() {
      try {
        const randomPokemons = await getRandomPokemons();
        setPokemonList(randomPokemons);
      } catch (e) {
        console.error("Error fetching Pokemon:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

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
      <Navbar />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.listContainer}>
            <PokemonCard
              pokemonList={pokemonList}
              columns={3}
              onPokemonPress={handleSelectPokemon}
            />
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
