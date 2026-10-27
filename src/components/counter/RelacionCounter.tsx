import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronUp, ChevronDown } from 'lucide-react';

interface RelacionCounterProps {
    startDate: string; // Formato ISO, ej: "2024-10-12T00:00:00"
}

export const RelacionCounter: React.FC<RelacionCounterProps> = ({ startDate }) => {
    const [timeLeft, setTimeLeft] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0 , seconds:0});
    const [isMinimized, setIsMinimized] = useState<boolean>(true);

    useEffect(() => {
        const calculateTime = () => {
            const start = new Date(startDate);
            const now = new Date();

            let years = now.getFullYear() - start.getFullYear();
            let months = now.getMonth() - start.getMonth();
            let days = now.getDate() - start.getDate();
            let hours = now.getHours() - start.getHours();
            let minutes = now.getMinutes() - start.getMinutes();
            let seconds=now.getSeconds()- start.getSeconds();

            if(seconds<0){
                seconds+=60;
                minutes-=1;
            }
            if (minutes < 0) {
                minutes += 60;
                hours -= 1;
            }
            if (hours < 0) {
                hours += 24;
                days -= 1;
            }
            if (days < 0) {
                months -= 1;
                const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += prevMonth.getDate();
            }
            if (months < 0) {
                years -= 1;
                months += 12;
            }

            setTimeLeft({ years, months, days, hours, minutes, seconds });
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000 * 60); // Se actualiza cada minuto exacto
        return () => clearInterval(timer);
    }, [startDate]);

    return (
        <div className="fixed top-3 left-3 md:top-4 md:left-4 z-40 flex flex-col items-start pointer-events-auto">
            {/* Panel Expandido del Contador */}
            <AnimatePresence>
                {!isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -20 }}
                        className="flex flex-col items-start bg-magia-dark/85 backdrop-blur-md border border-magia-pink-500/40 px-3 py-2.5 rounded-2xl shadow-xl shadow-magia-pink-600/10 text-magia-sky-100 max-w-71.25 md:max-w-sm relative"
                    >
                        {/* Botón minimizar */}
                        <button
                            onClick={() => setIsMinimized(true)}
                            className="absolute top-2 right-2 text-magia-sky-200/70 hover:text-white p-1 rounded-full transition-all"
                            title="Minimizar contador"
                        >
                            <ChevronUp className="w-4 h-4" />
                        </button>

                        {/* Mensajito superior */}
                        <div className="flex items-center gap-1.5 mb-1.5 pr-6">
                            <Heart className="w-3 h-3 text-magia-pink-400 fill-magia-pink-400 animate-pulse shrink-0" />
                            <span className="text-[10px] md:text-[11px] font-script tracking-wide text-magia-pink-300 truncate">
                                Nuestro tiempo juntos 💖
                            </span>
                        </div>

                        {/* Grid de 5 columnas para años, meses, días, horas y minutos */}
                        <div className="grid grid-cols-6 gap-1 text-center w-full bg-magia-dark/50 p-1.5 rounded-xl border border-magia-pink-500/20">
                            <div className="flex flex-col">
                                <span className="text-[11px] md:text-xs font-bold text-magia-sky-100">{timeLeft.years}</span>
                                <span className="text-[7px] md:text-[8px] text-magia-sky-200/70 uppercase tracking-wider">Años</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] md:text-xs font-bold text-magia-sky-100">{timeLeft.months}</span>
                                <span className="text-[7px] md:text-[8px] text-magia-sky-200/70 uppercase tracking-wider">Meses</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] md:text-xs font-bold text-magia-sky-100">{timeLeft.days}</span>
                                <span className="text-[7px] md:text-[8px] text-magia-sky-200/70 uppercase tracking-wider">Días</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] md:text-xs font-bold text-magia-sky-100">{timeLeft.hours}</span>
                                <span className="text-[7px] md:text-[8px] text-magia-sky-200/70 uppercase tracking-wider">Horas</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] md:text-xs font-bold text-magia-sky-100">{timeLeft.minutes}</span>
                                <span className="text-[7px] md:text-[8px] text-magia-sky-200/70 uppercase tracking-wider">Min</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] md:text-xs font-bold text-magia-sky-100">{timeLeft.seconds}</span>
                                <span className="text-[7px] md:text-[8px] text-magia-sky-200/70 uppercase tracking-wider">Seg</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Botón flotante minimizado (Pastilla elegante en la esquina superior izquierda) */}
            {isMinimized && (
                <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => setIsMinimized(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-magia-dark/90 backdrop-blur-md border border-magia-pink-500/50 text-magia-sky-100 shadow-xl shadow-magia-pink-600/20 hover:border-magia-pink-400 transition-all group"
                >
                    <Heart className="w-4 h-4 text-magia-pink-400 fill-magia-pink-400 animate-pulse" />
                    <span className="text-xs font-script truncate">
                        {timeLeft.years}a {timeLeft.months}m {timeLeft.days}d
                    </span>
                    <ChevronDown className="w-4 h-4 text-magia-pink-300 group-hover:translate-y-0.5 transition-transform" />
                </motion.button>
            )}
        </div>
    );
};