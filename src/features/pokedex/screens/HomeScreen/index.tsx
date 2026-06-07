import { View } from 'react-native'
import { getPokemon } from '@sharedApi/pokemonIntegration';
import { Pokemon } from '@sharedTypes/pokemon';
import { useEffect, useState, useMemo } from 'react';
import { styles } from './style';
import { PokemonCard } from '@/components/ui/Cards/PokeCard/PokemonCard';
import { PokemonDetailsModal } from '../../components/PokemonDetailsModal';
import { SearchFilter } from '../../components/SearchFilter';
import Loading from '@/components/layout/Loading';

export default function PokedexScreen() {
    const [loading, setLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [activeType, setActiveType] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getPokemon(151);
                setPokemonList(data);
            } catch (e) {
                console.error('Error fetching Pokemon:', e);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);
    

    const filteredList = useMemo(() => {
        return pokemonList.filter((p) => {
            const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
            const matchesType = activeType ? p.type.includes(activeType) : true;
            return matchesSearch && matchesType;
        });
    }, [pokemonList, search, activeType]);

    const handlePokemonPress = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedPokemon(null);
    };


    if(loading){
        return (
            <Loading />
        )
    }

    return (
        <View style={styles.container}>
            <SearchFilter
                search={search}
                onSearchChange={setSearch}
                activeType={activeType as any}
                onTypeChange={setActiveType}
            />
            <View style={styles.content}>
                <PokemonCard
                    pokemonList={filteredList}
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