export interface IVolume {
    id: string;
    title: string;
    author: string;
    category: string;
    image_url: string;
}

export interface IHighlight {
    id: number; // readwise ID
    highlight: string;
    volume: number;
}
