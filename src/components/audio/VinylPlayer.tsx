import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, Disc, Music, ChevronUp, ChevronDown } from 'lucide-react';
import type { Song } from '../../types';

interface VinylPlayerProps {
    songs: Song[];
}

export const VinylPlayer: React.FC<VinylPlayerProps> = ({ songs }) => {
    const [shuffledIndices] = useState<number[]>(() => {
        if (!songs || songs.length === 0) return [];
        const indices = songs.map((_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        return indices;
    });

    const [shufflePointer, setShufflePointer] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [isMinimized, setIsMinimized] = useState<boolean>(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentIndex = shuffledIndices.length > 0 ? shuffledIndices[shufflePointer] : 0;
    const currentSong = songs[currentIndex];

    const togglePlay = () => {
        if (!audioRef.current || !currentSong) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => { });
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        if (shuffledIndices.length === 0) return;
        const nextPointer = (shufflePointer + 1) % shuffledIndices.length;
        setShufflePointer(nextPointer);
        setIsPlaying(true);
    };

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(() => { });
        }
    }, [shufflePointer]);

    if (!currentSong) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            {/* Elemento de audio */}
            <audio
                ref={audioRef}
                src={currentSong.audioUrl}
                onEnded={handleNext}
            />

            {/* Panel Expandido del Reproductor */}
            <AnimatePresence>
                {!isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-2 w-72 rounded-2xl bg-magia-dark/95 backdrop-blur-md border border-magia-gold/60 p-4 shadow-2xl shadow-magia-pink-600/30 flex flex-col items-center relative overflow-hidden"
                    >
                        {/* Botón minimizar */}
                        <button
                            onClick={() => setIsMinimized(true)}
                            className="absolute top-2 right-2 text-magia-sky-200/70 hover:text-white p-1 rounded-full transition-all"
                            title="Minimizar reproductor"
                        >
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2 mb-3 w-full px-1">
                            <Music className="w-4 h-4 text-magia-gold animate-pulse" />
                            <span className="text-[11px] font-medium text-magia-gold tracking-wide uppercase">
                                Musiquita
                            </span>
                        </div>

                        {/* Mini Vinilo Giratorio */}
                        <div className="relative w-32 h-32 flex items-center justify-center my-1">
                            <motion.div
                                animate={{ rotate: isPlaying ? 360 : 0 }}
                                transition={{
                                    repeat: isPlaying ? Infinity : 0,
                                    duration: 3,
                                    ease: 'linear',
                                }}
                                className="w-full h-full rounded-full bg-black border-2 border-magia-dark shadow-lg relative flex items-center justify-center overflow-hidden"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, #111 30%, #222 31%, #111 33%, #000 70%)',
                                }}
                            >
                                <div className="absolute inset-1 rounded-full border border-zinc-800/60 pointer-events-none" />
                                <div className="absolute inset-4 rounded-full border border-zinc-800/40 pointer-events-none" />

                                <div className="w-12 h-12 rounded-full bg-magia-gold/60 border border-magia-sky-100/50 overflow-hidden flex items-center justify-center relative shadow-inner">
                                    {currentSong.coverUrl ? (
                                        <img
                                            src={currentSong.coverUrl}
                                            alt={currentSong.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Disc className="w-5 h-5 text-white" />
                                    )}
                                    <div className="absolute w-2.5 h-2.5 rounded-full bg-magia-dark border border-magia-pink-300" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Información de la Canción */}
                        <div className="text-center my-2 w-full px-1 truncate">
                            <h4 className="text-xs font-script text-magia-sky-100 truncate">
                                {currentSong.title}
                            </h4>
                            <p className="text-[10px] text-magia-gold font-sans truncate mt-0.5">
                                {currentSong.artist}
                            </p>
                        </div>

                        {/* Controles */}
                        <div className="flex items-center gap-4 mt-1">
                            <button
                                onClick={togglePlay}
                                className="p-2.5 rounded-full bg-linear-to-r to-magia-gold/60 text-white shadow-md shadow-magia-gold/20 hover:scale-105 active:scale-95 transition-all"
                            >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                            </button>

                            <button
                                onClick={handleNext}
                                className="p-2 rounded-full bg-magia-dark border border-magia-gold/60 text-magia-sky-200 hover:text-white active:scale-95 transition-all"
                                title="Siguiente canción"
                            >
                                <SkipForward className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Botón flotante minimizado (Pastilla elegante en la esquina) */}
            {isMinimized && (
                <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => setIsMinimized(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-magia-dark/90 backdrop-blur-md border border-magia-gold/60 text-magia-sky-100 shadow-xl shadow-magia-gold/10 hover:border-magia-gold transition-all group"
                >
                    <div className="relative w-6 h-6 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: isPlaying ? 360 : 0 }}
                            transition={{ repeat: isPlaying ? Infinity : 0, duration: 3, ease: 'linear' }}
                            className="w-full h-full rounded-full bg-black border border-magia-gold/60 flex items-center justify-center overflow-hidden"
                        >
                            <div className="w-2 h-2 rounded-full bg-magia-gold/60" />
                        </motion.div>
                    </div>
                    <span className="text-xs font-script truncate max-w-25">
                        {currentSong.title}
                    </span>
                    <ChevronUp className="w-4 h-4 text-magia-gold group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>
            )}
        </div>
    );
};