import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, KeyRound, Sparkles } from 'lucide-react';

interface MagicWordModalProps {
    onUnlock: () => void;
    correctWord?: string;
}

export const MagicWordModal: React.FC<MagicWordModalProps> = ({
    onUnlock,
    correctWord = 'princesa',
}) => {
    const [inputWord, setInputWord] = useState('');
    const [error, setError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputWord.trim().toLowerCase() === correctWord.toLowerCase()) {
            setIsSuccess(true);
            setError(false);
            setTimeout(() => {
                onUnlock();
            }, 1200);
        } else {
            setError(true);
            setTimeout(() => setError(false), 800);
        }
    };

    return (
        <AnimatePresence>
            {!isSuccess && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.8 } }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-magia-dark/95 backdrop-blur-md p-4"
                >
                    <motion.div
                        initial={{ scale: 0.8, y: 20 }}
                        animate={
                            error ? { x: [-10, 10, -10, 10, 0], scale: 1 } : { scale: 1, y: 0 }
                        }
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-md rounded-3xl bg-gradient-to-b from-magia-pink-600/20 to-magia-dark p-8 shadow-2xl border border-magia-pink-500/30 text-center relative overflow-hidden"
                    >
                        {/* Destellos del fondo */}
                        <div className="absolute -top-12 -left-12 w-32 h-32 bg-magia-pink-500/20 rounded-full blur-2xl" />
                        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-magia-sky-400/20 rounded-full blur-2xl" />

                        <div className="relative z-10 flex flex-col items-center">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                                className="mb-4 inline-flex p-4 rounded-full bg-magia-pink-500/10 border border-magia-pink-400/30 text-magia-pink-300"
                            >
                                <Heart className="w-10 h-10 fill-magia-pink-400 stroke-magia-pink-300" />
                            </motion.div>

                            <h2 className="text-3xl font-script text-magia-sky-100 mb-2">Palabra Mágica</h2>
                            <p className="text-sm text-magia-sky-200/80 mb-6 font-sans">
                                Para ingresar al universo de nuestros recuerdos, escribe la palabra mágica.
                            </p>

                            <form onSubmit={handleSubmit} className="w-full space-y-4 flex flex-col items-center">
                                <div className="relative w-full">
                                    <input 
                                        type="password"
                                        value={inputWord}
                                        onChange={(e) => setInputWord(e.target.value)}
                                        placeholder="Escribe la palabra mágica"
                                        className="w-full px-5 py-3.5 pr-12 rounded-2xl bg-magia-dark/80 border border-magia-pink-400/40 text-magia-sky-100 placeholder-magia-sky-200/40 focus:outline-none focus:border-magia-pink-300 focus:ring-2 focus:ring-magia-pink-400/30 transition-all text-center tracking-widest font-semibold"
                                    />
                                    <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-magia-pink-300/60 pointer-events-none" />
                                </div>

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xs text-magia-red-200 font-medium"
                                    >
                                        Palabra mágica incorrecta, jummmm -_-
                                    </motion.p>
                                )}

                                <button 
                                    type="submit" 
                                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-magia-pink-500 to-magia-pink-600 text-white font-semibold shadow-lg shadow-magia-pink-600/30 hover:shadow-magia-pink-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    Iniciar Nuestra Historia
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};