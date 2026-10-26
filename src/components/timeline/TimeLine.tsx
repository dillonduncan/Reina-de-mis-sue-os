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
                                        <div className="flex items-center justify-between gap-2 text-ts font-semibold text-magia-pink-300 mb-2">
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

            {/*Modal flotante*/}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                        className='fixed inset-0 z-50 flex items-center justify-center bg-magia-dark/90 backdrop-blur-md p-4 overflow-y-auto'
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 30 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className='relative w-full max-w-lg rounded-exl bg-linear-to-b from-magia-pink-600/20 via-magia-dark to-magia-dark border border-magia-pink-500/40 p-5 md:p-8 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col'
                        >
                            {/*boton de cerrar*/}
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-magia-dark/80 border border-magia-pink-400/30 text-magia-sky-200 hover:text-white transition-all z-20 active:scale-95"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            {/*Imagen */}
                            {selectedItem.imageUrl && (
                                <div className='relative w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-5 border border-magia-pink-400/30 shrink-0'>
                                    <img
                                        src={selectedItem.imageUrl}
                                        alt={selectedItem.title}
                                        className='w-full h-full object-cover'
                                        />
                                        <div className='absolute inset-0 bg-linear-to-t from-magie-dark via-transparent to-transparent'/>
                                </div>                               
                            )}

                            {/*contenido de la historia */}
                            <div className='overflow-y-auto pr-1 custom-scrollbar'>
                                <div className='flex items-center gap-2 tet-xs font-semibold text-magia-pink-300 mb-2'>
                                    <Calendar className='w-4 h-4'/>
                                    <span>{selectedItem.date}</span>
                                </div>

                                <h3 className='text-2xl md:text-exl font-script text-magia-sky-100 mb-4'>
                                    {selectedItem.title}
                                </h3>

                                <p className='text-xs md:text-sm text-magia-sky-100/90 leading-relaxed font-sans whitespace-pre-line'>
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