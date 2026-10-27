import React, { useState, useRef, useEffect, useEffectEvent } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Disc, Shuffle } from 'lucide-react';
import type { Song } from '../../types';

interface VinylPlayerProps {
    songs: Song[];
}

export const VinylPlayer: React.FC<VinylPlayerProps> = ({ songs }) => {
    const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
    const [shufflePointer, setShufflePointer] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const sudioRef = useRef<HTMLAudioElement | null>(null);

    // Inicializar el orden aleatorio (Shuffle) al montar el componente
    useEffect(() => {
        if (songs.length === 0) return;

        // Crear array de índices y barajarlos aleatoriamente
        const indices = songs.map((_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        setShuffledIndices(indices);
        setShufflePointer(0);
    }, [songs]);

    
}