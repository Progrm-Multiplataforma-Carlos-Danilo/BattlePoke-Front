import { Pokemon } from '@/shared/types/pokemon';
import { colors } from '@/constants/colors';

export const typeColors: Record<string, string> = {
    'normal': colors.types.normal,
    'fire': colors.types.fire,
    'water': colors.types.water,
    'grass': colors.types.grass,
    'electric': colors.types.electric,
    'ice': colors.types.ice,
    'fighting': colors.types.fighting,
    'poison': colors.types.poison,
    'ground': colors.types.ground,
    'flying': colors.types.flying,
    'psychic': colors.types.psychic,
    'bug': colors.types.bug,
    'rock': colors.types.rock,
    'ghost': colors.types.ghost,
    'dragon': colors.types.dragon,
    'steel': colors.types.steel,
    'dark': colors.types.dark,
    'fairy': colors.types.fairy,
};

export function getStatValue(pokemon: Pokemon, statName: string): number {
    return pokemon.stats.find(s => s.name === statName)?.forca ?? 0;
}
