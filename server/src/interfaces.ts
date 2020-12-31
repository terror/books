interface IVolume {
    id: number; // readwise ID
    title: string;
    author: string;
    link: string;
}

interface IHighlight {
    id: number; // readwise ID
    text: string;
    volume: number;
}

interface IReadwiseHighlight {
    id: number;
    text: string;
    note: string;
    location: number;
    location_type: string;
    highlighted_at: Date;
    url: string;
    color: string;
    updated: Date;
    book_id: number;
}

interface IReadwiseVolume {
    id: number;
    title: string;
    author: string;
    catory: string;
    num_highlights: number;
    last_highlight_at: Date;
    updated: Date;
    cover_image_url: string;
    highlights_url: string;
}

export { IVolume, IHighlight, IReadwiseHighlight, IReadwiseVolume };
