import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Disc, Shuffle } from 'lucide-react';
import type { Song } from '../../types';

interface VinylPlayerProps {
    songs: Song[];
}

export const VinylPlayer: React.FC<VinylPlayerProps> = ({ songs }) => {
    const [shuffledIndices] = useState<number[]>(()=>{
        if(!songs || songs.length===0) return [];
        const indices=songs.map((_,i)=>i);
        for(let i=indices.length - 1; i>0; i--){
            const j=Math.floor(Math.random()*(i+1));
        [indices[i], indices[j]]=[indices[j], indices[i]]
        }
        return indices;
    });
    const [shufflePointer, setShufflePointer] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    //indice actual de la cancion basado en el aleatorio
    const currentIndex = shuffledIndices.length > 0 ? shuffledIndices[shufflePointer] : 0;
    const currentSong=songs[currentIndex];

    const togglePlay=()=>{
        if(!audioRef.current || !currentSong) return;
        if(isPlaying){
            audioRef.current.pause();
        }else{
            audioRef.current.play().catch(()=>{});
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext=()=>{
        if(shuffledIndices.length===0) return;
        const nextPointer=(shufflePointer + 1) % shuffledIndices.length;
        setShufflePointer(nextPointer);
        setIsPlaying(true);
    };

    const handlePrev=()=>{
        if(shuffledIndices.length===0) return;
        const prevPointer = (shufflePointer - 1 + shuffledIndices.length) % shuffledIndices.length;
        setShufflePointer(prevPointer);
        setIsPlaying(true);
    };

    //reproducir automaticamente cuando cambie de cancion
    useEffect(()=>{
        if(isPlaying && audioRef.current){
            audioRef.current.play().catch(()=>{});
        }
    }, [shufflePointer]);

    if(!currentSong) return null;

    return(
        <div className="w-full max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-magia-pink-500/10 border border-magia-pink-400/30 text-magia-pink-300 text-xs mb-2">
          <Shuffle className="w-3.5 h-3.5" />
          <span>Modo Aleatorio Activo</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-script text-magia-sky-100 mb-1">
          Nuestra Banda Sonora
        </h3>
        <p className="text-xs text-magia-sky-200/80">
          La música que acompaña cada latido de nuestra historia.
        </p>
      </div>

      <div className="relative p-6 rounded-3xl bg-linear-to-b from-magia-pink-600/15 via-magia-dark to-magia-dark border border-magia-pink-500/30 shadow-2xl flex flex-col items-center">
        
        {/* Elemento de audio HTML5 */}
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          onEnded={handleNext}
        />

        {/* Disco de Vinilo Animado */}
        <div className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center my-4">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              repeat: isPlaying ? Infinity : 0,
              duration: 3,
              ease: 'linear',
            }}
            className="w-full h-full rounded-full bg-black border-4 border-magia-dark shadow-2xl relative flex items-center justify-center overflow-hidden shadow-magia-pink-600/20"
            style={{
              backgroundImage: 'radial-gradient(circle, #111 30%, #222 31%, #111 33%, #000 70%)',
            }}
          >
            {/* Surcos del vinilo */}
            <div className="absolute inset-2 rounded-full border border-zinc-800/60 pointer-events-none" />
            <div className="absolute inset-6 rounded-full border border-zinc-800/40 pointer-events-none" />
            <div className="absolute inset-10 rounded-full border border-zinc-800/40 pointer-events-none" />

            {/* Etiqueta central del vinilo con carátula o icono */}
            <div className="w-20 h-20 rounded-full bg-magia-pink-600 border-2 border-magia-sky-100/50 overflow-hidden flex items-center justify-center relative shadow-inner">
              {currentSong.coverUrl ? (
                <img
                  src={currentSong.coverUrl}
                  alt={currentSong.title}
                  className="w-full h-full object-cover opacity-90"
                />
              ) : (
                <Disc className="w-8 h-8 text-white animate-pulse" />
              )}
              {/* Hueco del centro del vinilo */}
              <div className="absolute w-4 h-4 rounded-full bg-magia-dark border border-magia-pink-300" />
            </div>
          </motion.div>

          {/* Aguja del Tocadiscos */}
          <motion.div
            animate={{ rotate: isPlaying ? 0 : -25 }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: 'top right' }}
            className="absolute -top-2 right-2 w-16 h-28 pointer-events-none z-10 flex flex-col items-end"
          >
            <div className="w-3 h-3 rounded-full bg-zinc-400 border border-zinc-600 shadow-md" />
            <div className="w-1 h-24 bg-linear-to-b from-zinc-300 to-zinc-500 rounded-full mr-1 shadow-lg" />
          </motion.div>
        </div>

        {/* Información de la Canción */}
        <div className="text-center my-4 w-full px-2">
          <h4 className="text-lg font-script text-magia-sky-100 truncate">
            {currentSong.title}
          </h4>
          <p className="text-xs text-magia-pink-300 font-sans mt-0.5">
            {currentSong.artist}
          </p>
        </div>

        {/* Controles Táctiles de Reproducción */}
        <div className="flex items-center gap-6 mt-2">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-magia-dark border border-magia-pink-400/30 text-magia-sky-200 hover:text-white active:scale-95 transition-all shadow-md"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlay}
            className="p-4 rounded-full bg-linear-to-r from-magia-pink-500 to-magia-pink-600 text-white shadow-lg shadow-magia-pink-600/40 hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-magia-dark border border-magia-pink-400/30 text-magia-sky-200 hover:text-white active:scale-95 transition-all shadow-md"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
    )
}