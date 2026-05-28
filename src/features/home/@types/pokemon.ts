export interface Stats {
    name: string;
    forca: number;
}

export interface Pokemon {
    id: number;
    name: string;
    image: string;
    type: string[];
    stats: Stats[];
}