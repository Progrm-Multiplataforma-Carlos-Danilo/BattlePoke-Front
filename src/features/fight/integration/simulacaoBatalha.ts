import { useState, useRef } from 'react';
import Toast from 'react-native-toast-message';
import { Pokemon } from '@/shared/types/pokemon';
import { captureRandomPokemons } from '@/utils/pokemonCache';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { addCaptured } from '@/features/home/integration/teamIntegration';

const STASTS_ORDER = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

export function useBattleSimulation(pokemonList: Pokemon[], opponentTeam: Pokemon[]) {
    const { userId } = useAuth();
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);
    const [activeOpponentIndex, setActiveOpponentIndex] = useState(0);
    const [activeStatIndex, setActiveStatIndex] = useState(0);
    const [activeOpponentStatIndex, setActiveOpponentStatIndex] = useState(0);
    const [pokemonListNew, setPokemonListNew] = useState<Pokemon[]>([]);

    const [playerWins, setPlayerWins] = useState(0);
    const [opponentWins, setOpponentWins] = useState(0);
    const [isBattling, setIsBattling] = useState(false);

    const playerIndexRef = useRef(activePlayerIndex); playerIndexRef.current = activePlayerIndex;
    const opponentIndexRef = useRef(activeOpponentIndex); opponentIndexRef.current = activeOpponentIndex;

    const playerWinsRef = useRef(playerWins); playerWinsRef.current = playerWins;
    const opponentWinsRef = useRef(opponentWins); opponentWinsRef.current = opponentWins;

    const handleBattle = () => {
        if (isBattling || pokemonList.length === 0) return;

        // Se a partida já acabou e o usuário clicar de novo, nós reiniciamos
        if (playerWins >= 3 || opponentWins >= 3) {
            resetBattle();
            return;
        }

        setIsBattling(true);
        let rollCount = 0;

        const interval = setInterval(() => {
            setActiveStatIndex(Math.floor(Math.random() * STASTS_ORDER.length));
            setActiveOpponentStatIndex(Math.floor(Math.random() * STASTS_ORDER.length));
            rollCount++;

            if (rollCount >= 15) {
                clearInterval(interval);

                const finalPlayerStatIdx = Math.floor(Math.random() * STASTS_ORDER.length);
                const finalOpponentStatIdx = Math.floor(Math.random() * STASTS_ORDER.length);

                setActiveStatIndex(finalPlayerStatIdx);
                setActiveOpponentStatIndex(finalOpponentStatIdx);

                setTimeout(() => {
                    calculationRound(finalPlayerStatIdx, finalOpponentStatIdx);
                }, 1000);
            }
        }, 200);
    };

    const calculationRound = (playerStatIdx: number, opponentStatIdx: number) => {
        const currentPlayerIndex = playerIndexRef.current;
        const currentOpponentIndex = opponentIndexRef.current;

        const playerPokemon = pokemonList[currentPlayerIndex];
        const opponentPokemon = opponentTeam[currentOpponentIndex];

        const playerStatName = STASTS_ORDER[playerStatIdx];
        const opponentStatName = STASTS_ORDER[opponentStatIdx];

        const playerVal = playerPokemon.stats.find(stats => stats.name === playerStatName)?.forca || 0;
        const opponentVal = opponentPokemon.stats.find(stats => stats.name === opponentStatName)?.forca || 0;

        let newPlayerWins = playerWinsRef.current;
        let newOpponentWins = opponentWinsRef.current;

        if (playerVal > opponentVal) {
            newPlayerWins++;
            setPlayerWins(newPlayerWins);
            Toast.show({
                type: 'success',
                text1: `Vitória no Round!`,
                text2: `${playerPokemon.name} (${playerStatName.toUpperCase()}: ${playerVal}) venceu ${opponentPokemon.name} (${opponentStatName.toUpperCase()}: ${opponentVal})`,
                position: 'top'
            });

        } else if (opponentVal > playerVal) {
            newOpponentWins++;
            setOpponentWins(newOpponentWins);
            Toast.show({
                type: 'error',
                text1: `Derrota no Round!`,
                text2: `${opponentPokemon.name} (${opponentStatName.toUpperCase()}: ${opponentVal}) venceu ${playerPokemon.name} (${playerStatName.toUpperCase()}: ${playerVal})`,
                position: 'top'
            });
        } else {
            Toast.show({
                type: 'success',
                text1: `Empate no Round!`,
                text2: `Ambos tiraram ${playerVal} em seus respectivos status.`,
                position: 'top'
            });
        }

        // Toasts de fim de batalha
        setTimeout(async () => {
            if (newPlayerWins >= 3) {
                Toast.show({
                    type: 'success',
                    text1: '🏆 VITÓRIA NA BATALHA 🏆',
                    text2: 'Você atingiu 3 vitórias primeiro!',
                    position: 'top',
                    visibilityTime: 6000
                });

                const newPokemons = await captureRandomPokemons(1);
                const pokemonCapturado = newPokemons[0];

                if (userId) {
                    try {
                        await addCaptured(userId, pokemonCapturado.id);
                    } catch (e) {
                        Toast.show({
                            type: 'error',
                            text1: 'Erro ao capturar pokemon',
                            text2: 'Tente novamente mais tarde.',
                            position: 'top',
                            visibilityTime: 4000
                        });
                    }
                }
                router.replace({
                    pathname: '/Victory',
                    params: {
                        pokemonData: JSON.stringify(pokemonCapturado),
                    }
                });

                setPokemonListNew(newPokemons);
                setIsBattling(false);
            } else if (newOpponentWins >= 3) {
                Toast.show({
                    type: 'error',
                    text1: '💀 DERROTA NA BATALHA 💀',
                    text2: 'O Oponente atingiu 3 vitórias primeiro! Clique em Batalhar para reiniciar.',
                    position: 'top',
                    visibilityTime: 4000
                });
                setIsBattling(false);
            } else {
                // Batalha irá continuar e avançar para o proximo pokemon
                setActivePlayerIndex((currentPlayerIndex + 1) % pokemonList.length);
                setActiveOpponentIndex((currentOpponentIndex + 1) % opponentTeam.length);
                setIsBattling(false);
            }
        }, 2200);
    };

    const resetBattle = () => {
        setPlayerWins(0); setOpponentWins(0); setActivePlayerIndex(0); setActiveOpponentIndex(0); setActiveStatIndex(0); setActiveOpponentStatIndex(0); setIsBattling(false);
    };

    return {
        activePlayerIndex, setActivePlayerIndex,
        activeOpponentIndex, setActiveOpponentIndex,
        activeStatIndex,
        activeOpponentStatIndex,
        playerWins,
        opponentWins,
        isBattling,
        handleBattle,
        STASTS_ORDER
    };
}