import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Sparkles, X, BookOpen } from 'lucide-react';
import type { TimelineItem } from '../../types';

interface TimelineProps {
    items: TimelineItem[];
}

export const TimeLine: React.FC<TimelineProps> = ({ items }) => {
    const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
            {/*cabecera*/}
            <div className="text-center mb-10 md:mb-12">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex p-3 rounded-full bg-magia-pink-500/10 border border-magia-pink-400/30 text-magia-pink-300 mb-3">
                    <Sparkles className='w-6 h-6' />
                </motion.div>

                <h2 className="text-3xl md:text-5xl font-script text-magia-sky-100 mb-2">Nuestra Historia</h2>
                <p className="text-xs md:text-base text-magia-sky-200/80 font-sans max-w-md mx-auto">
                    Recuerda los momentos más importantes de nuestra historia juntos.
                </p>
            </div>

            {/*contenedor linea del tiempo*/}
            <div className='relative border-l-2 border-magia-pink-500/30 ml-4 md:ml-auto md:border-l-0'>
                {/*linea central*/}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-linear-to-b from-magia-pink-500/50 via-magia-sky-400/30 to-transparent" />

                <div className="space-y-8 md:space-y-12">
                    {items.map((item, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={'relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""}'}>
                                {/*nodo corazon*/}
                                <div className="absolute -left-5.25 md:left-1/2 md:translate-x-1/2 top-1 flex items-center justify-center w-10 h-10 rounded-full bg-magia-dark border-2 border-magia-pink-400 text-magia-pink-300 shadow-lg shadow-magia-pink-600/30 z-10">
                                    <Heart className='w-4 h-4 fill-magia-red-400' />
                                </div>

                                {/*tarjeta interactiva*/}
                                <div className="ml-8 md:ml-0 md:w-1/2 md:px-8 w-full">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedItem(item)}
                                        className="cursor-pointer p-5 md:p-6 rounded-3xl bg-linear-to-b from-magia-pink-600/10 to-magia-dark border border-magia-pink-500/20 shadow-xl backdrop-blur-sm transition-all hover:border-magia-pink-400/50 group">
                                        <div className="flex items-center justify-between gap-2 text-ts font-semibold text-magia-sky-100 mb-2">
                                            <div className="flex items-center gap">
                                                <Calendar className='w-4 h-4' />
                                                <span>{item.date}</span>
                                            </div>
                                            <span className='text-[10px] px-2 py-0.5 rounded-full bg-magia-pink-200 border border-magia-pink-400/30 flex items-center gap-1 group-hover:bg-magia-pink-500Y40 transition-all'>
                                                <BookOpen className='w-3 h-3' /> Ver detalle
                                            </span>
                                        </div>

                                        <h3 className='text-xl md:text-2xl font-script text-magia-sky-100 mb-2'>
                                            {item.title}
                                        </h3>

                                        <p className='text-xs md:text-sm text-magia-sky-200/80 leading-relaxed font-sans line-clamp-3'>
                                            {item.shortDescription}
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Modal / Pantalla Flotante Romántica Decorada */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-magia-dark/90 backdrop-blur-md p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 30 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-lg rounded-3xl bg-linear-to-b from-magia-pink-600/25 via-magia-dark to-magia-dark border border-magia-pink-500/40 p-6 md:p-8 shadow-2xl shadow-magia-pink-600/20 overflow-hidden my-auto max-h-[90vh] flex flex-col items-center text-center"
                        >
                            {/* Decoraciones en las esquinas (Florecitas / Destellos) */}
                            <div className="absolute top-3 left-3 text-magia-gold text-lg select-none">
                                🌸✨
                            </div>                           
                            <div className="absolute bottom-3 left-4 text-magia-gold text-base select-none">
                                ✨🌸
                            </div>
                            <div className="absolute bottom-3 right-4 text-magia-gold text-base select-none">
                                🌸✨
                            </div>

                            {/* Botón cerrar táctil */}
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-magia-dark/80 border border-magia-pink-400/40 text-magia-sky-200 hover:text-white hover:border-magia-pink-300 transition-all z-20 active:scale-95 shadow-md"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Contenedor de la Foto en Forma de Corazón */}
                            {selectedItem.imageUrl && (
                                <div className="relative my-2 shrink-0 flex items-center justify-center">
                                    {/* Resplandor romántico detrás de la foto */}
                                    <div className="absolute w-48 h-48 md:w-56 md:h-56 bg-magia-pink-500/30 rounded-full blur-xl animate-pulse" />

                                    {/* Foto cortada en forma de corazón */}
                                    <div
                                        className="relative w-48 h-44 md:w-0 md:h-52 overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-300"
                                        style={{
                                            clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")',
                                            transform: 'scale(10)', // Escala para ajustar el path SVG
                                            transformOrigin: 'top left'
                                        }}
                                    >
                                        {/* Para asegurar compatibilidad responsiva fácil sin romper la SVG escala, se usa un contenedor SVG mask o clipPath estándar */}
                                    </div>

                                    {/* Alternativa limpia y 100% compatible para la máscara del Corazón: */}
                                    <div className="relative w-48 h-44 md:w-56 md:h-52 overflow-hidden">
                                        <img
                                            src={selectedItem.imageUrl}
                                            alt={selectedItem.title}
                                            className="w-full h-full object-cover"
                                            style={{
                                                clipPath: 'polygon(50% 15%, 65% 0%, 85% 0%, 100% 20%, 100% 45%, 50% 95%, 0% 45%, 0% 20%, 15% 0%, 35% 0%)',
                                                borderRadius: '12px'
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Contenido de la Historia */}
                            <div className="overflow-y-auto pr-1 mt-2 custom-scrollbar w-full">
                                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-magia-pink-300 mb-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{selectedItem.date}</span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-script text-magia-sky-100 mb-3 drop-shadow-sm">
                                    {selectedItem.title}
                                </h3>

                                <div className="w-12 h-0.5 bg-linear-to-r from-transparent via-magia-pink-400/50 to-transparent mx-auto mb-4" />

                                <p className="text-xs md:text-sm text-magia-sky-100/90 leading-relaxed font-sans whitespace-pre-line text-center px-2">
                                    {selectedItem.fullStory}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}