import { View, Text, FlatList } from 'react-native'
import { getPokemon } from '@homeIntegrations/pokemonIntegration';
import { Pokemon } from '@homeTypes/pokemon';
import { useEffect, useState } from 'react';
import { PokemonCard } from '@/components/ui/Cards/PokeCard/PokemonCard';
import { styles } from './style';

export default function HomeScreen() {
    const [loading, setLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {

        async function loadData() {
            try {
                const data = await getPokemon(151);
                setPokemonList(data);
            } catch (e) {
                console.error('Error fetching Pokemon:', e);
            }
            finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={pokemonList}
                numColumns={3}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContent}
                keyExtractor={(item: Pokemon) => item.id.toString()}
                renderItem={({ item }: { item: Pokemon }) => (
                    <View style={styles.itemWrapper}>
                        <PokemonCard
                            name={item.name}
                            image={item.image}
                            type={item.type[0]} // Assuming the first type is the primary one
                            atk={item.stats.find(m => m.name === 'attack')?.forca}
                            def={item.stats.find(m => m.name === 'defense')?.forca}
                            spd={item.stats.find(m => m.name === 'speed')?.forca}
                        />
                    </View>
                )}
            />
        </View>
    )
}