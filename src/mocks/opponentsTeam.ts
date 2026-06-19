import { Pokemon } from "@/shared/types/pokemon";

export const mockOpponentTeam: Pokemon[] = [
    {
        id: 6,
        name: "Charizard",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
        type: ["fire", "flying"],
        stats: [{ name: "attack", forca: 84 }, { name: "defense", forca: 78 }, { name: "speed", forca: 100 }, { name: "hp", forca: 80 }, { name: "special-attack", forca: 80 }, { name: "special-defense", forca: 80 }],
        height: 17, weight: 905, base_experience: 240, abilities: [],
    },
    {
        id: 9,
        name: "Blastoise",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
        type: ["water"],
        stats: [{ name: "attack", forca: 83 }, { name: "defense", forca: 100 }, { name: "speed", forca: 78 }, { name: "hp", forca: 80 }, { name: "special-attack", forca: 80 }, { name: "special-defense", forca: 80 }],
        height: 16, weight: 855, base_experience: 239, abilities: [],
    },
    {
        id: 3,
        name: "Venusaur",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
        type: ["grass", "poison"],
        stats: [{ name: "attack", forca: 82 }, { name: "defense", forca: 83 }, { name: "speed", forca: 80 }, { name: "hp", forca: 80 }, { name: "special-attack", forca: 80 }, { name: "special-defense", forca: 80 }],
        height: 20, weight: 1000, base_experience: 236, abilities: [],
    },
    {
        id: 25,
        name: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        type: ["electric"],
        stats: [{ name: "attack", forca: 30 }, { name: "defense", forca: 20 }, { name: "speed", forca: 20 }, { name: "hp", forca: 20 }, { name: "special-attack", forca:20 }, { name: "special-defense", forca: 20 }],
        height: 4, weight: 60, base_experience: 112, abilities: [],
    },
    {
        id: 150,
        name: "Mewtwo",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
        type: ["psychic"],
        stats: [{ name: "attack", forca: 110 }, { name: "defense", forca: 90 }, { name: "speed", forca: 130 }, { name: "hp", forca: 80 }, { name: "special-attack", forca: 80 }, { name: "special-defense", forca: 80 }],
        height: 20, weight: 1220, base_experience: 306, abilities: [],
    }
];
