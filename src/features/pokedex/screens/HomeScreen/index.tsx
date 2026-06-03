import { View } from 'react-native'
import { getPokemon } from '@sharedApi/pokemonIntegration';
import { Pokemon } from '@sharedTypes/pokemon';
import { useEffect, useState } from 'react';
import { styles } from './style';
import { PokemonCard } from '@/components/ui/Cards/PokeCard/PokemonCard';
import { PokemonDetailsModal } from '../../components/PokemonDetailsModal';

export default function PokedexScreen() {
    const [loading, setLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    const handlePokemonPress = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedPokemon(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <PokemonCard 
                    pokemonList={pokemonList} 
                    columns={3} 
                    onPokemonPress={handlePokemonPress}
                />
            </View>
            <PokemonDetailsModal 
                visible={isModalVisible} 
                pokemon={selectedPokemon} 
                onClose={handleCloseModal} 
            />
        </View>
    )
}