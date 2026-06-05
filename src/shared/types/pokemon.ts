import { ImageSourcePropType } from 'react-native';

export interface Stats {
    name: string;
    forca: number;
}

export interface Pokemon {
    id: number;
    name: string;
    image: string | ImageSourcePropType;
    type: string[];
    stats: Stats[];

    height: number;
    weight: number;
    base_experience: number;

    abilities: {
        name: string;
        isHidden: boolean;
    }[];

    description?: string;
    category?: string;

    evolutionChain?: string[];

    weaknesses?: string[];
}
