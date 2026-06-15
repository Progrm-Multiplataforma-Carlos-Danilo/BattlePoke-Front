import { useState, useRef } from 'react';
import Toast from 'react-native-toast-message';
import { Pokemon } from '@/shared/types/pokemon';

const STASTS_ORDER = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

export function useBattleSimulation(pokemonList: Pokemon[], opponentTeam: Pokemon[]) {
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);
    const [activeOpponentIndex, setActiveOpponentIndex] = useState(0);
    const [activeStatIndex, setActiveStatIndex] = useState(0);
    const [activeOpponentStatIndex, setActiveOpponentStatIndex] = useState(0);

    const [playerWins, setPlayerWins] = useState(0);
    const [opponentWins, setOpponentWins] = useState(0);
    const [isBattling, setIsBattling] = useState(false);

    const pIndexRef = useRef(activePlayerIndex);
    pIndexRef.current = activePlayerIndex;
    const oIndexRef = useRef(activeOpponentIndex);
    oIndexRef.current = activeOpponentIndex;

    const pWinsRef = useRef(playerWins);
    pWinsRef.current = playerWins;
    const oWinsRef = useRef(opponentWins);
    oWinsRef.current = opponentWins;

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
                
                const finalPStatIdx = Math.floor(Math.random() * STASTS_ORDER.length);
                const finalOStatIdx = Math.floor(Math.random() * STASTS_ORDER.length);
                
                setActiveStatIndex(finalPStatIdx);
                setActiveOpponentStatIndex(finalOStatIdx);

                setTimeout(() => {
                    resolveRound(finalPStatIdx, finalOStatIdx);
                }, 800);
            }
        }, 100);
    };

    const resolveRound = (pStatIdx: number, oStatIdx: number) => {
        const currentPIndex = pIndexRef.current;
        const currentOIndex = oIndexRef.current;

        const pPoke = pokemonList[currentPIndex];
        const oPoke = opponentTeam[currentOIndex];

        const pStatName = STASTS_ORDER[pStatIdx];
        const oStatName = STASTS_ORDER[oStatIdx];

        const pVal = pPoke.stats.find(s => s.name === pStatName)?.forca || 0;
        const oVal = oPoke.stats.find(s => s.name === oStatName)?.forca || 0;

        let newPWins = pWinsRef.current;
        let newOWins = oWinsRef.current;

        if (pVal > oVal) {
            newPWins++;
            setPlayerWins(newPWins);
            Toast.show({
                type: 'success',
                text1: `Vitória no Round!`,
                text2: `${pPoke.name} (${pStatName.toUpperCase()}: ${pVal}) venceu ${oPoke.name} (${oStatName.toUpperCase()}: ${oVal})`,
                position: 'bottom'
            });
        } else if (oVal > pVal) {
            newOWins++;
            setOpponentWins(newOWins);
            Toast.show({
                type: 'error',
                text1: `Derrota no Round!`,
                text2: `${oPoke.name} (${oStatName.toUpperCase()}: ${oVal}) venceu ${pPoke.name} (${pStatName.toUpperCase()}: ${pVal})`,
                position: 'bottom'
            });
        } else {
            Toast.show({
                type: 'success', // Aproveitando o tema de success para avisos amigaveis
                text1: `Empate no Round!`,
                text2: `Ambos tiraram ${pVal} em seus respectivos status.`,
                position: 'bottom'
            });
        }

        // Aguarda 2 segundos para o usuário ver o resultado (borda focada, placar e toast)
        setTimeout(() => {
            if (newPWins >= 3) {
                Toast.show({
                    type: 'success',
                    text1: '🏆 VITÓRIA NA BATALHA 🏆',
                    text2: 'Você atingiu 3 vitórias primeiro! Clique em Batalhar para reiniciar.',
                    position: 'bottom',
                    visibilityTime: 4000
                });
                setIsBattling(false);
            } else if (newOWins >= 3) {
                Toast.show({
                    type: 'error',
                    text1: '💀 DERROTA NA BATALHA 💀',
                    text2: 'O Oponente atingiu 3 vitórias primeiro! Clique em Batalhar para reiniciar.',
                    position: 'bottom',
                    visibilityTime: 4000
                });
                setIsBattling(false);
            } else {
                // Batalha continua, avança os pokemons
                setActivePlayerIndex((currentPIndex + 1) % pokemonList.length);
                setActiveOpponentIndex((currentOIndex + 1) % opponentTeam.length);
                setIsBattling(false);
            }
        }, 2200);
    };

    const resetBattle = () => {
        setPlayerWins(0);
        setOpponentWins(0);
        setActivePlayerIndex(0);
        setActiveOpponentIndex(0);
        setActiveStatIndex(0);
        setActiveOpponentStatIndex(0);
        setIsBattling(false);
    };

    return {
        activePlayerIndex,
        setActivePlayerIndex,
        activeOpponentIndex,
        setActiveOpponentIndex,
        activeStatIndex,
        activeOpponentStatIndex,
        playerWins,
        opponentWins,
        isBattling,
        handleBattle,
        STASTS_ORDER
    };
}