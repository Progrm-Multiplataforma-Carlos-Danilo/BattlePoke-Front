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
}
