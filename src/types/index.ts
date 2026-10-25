export interface TimelineItem{
    id: string;
    date: string;
    title: string;
    shortDescription: string;
    fullStory: string;
    imageUrl: string;    
}

export interface Song{
    id: string;
    title: string;
    artist: string;
    audioUrl: string;
    coverUrl?: string;
}

export interface LoveCountDown{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}