import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FourPointStar = ({ className = "w-4 h-4 text-amber-100", style = {} }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
);

const RealisticTulip = ({ colorClass, glowColor, height = "h-20" }: { colorClass: string; glowColor: string; height?: string }) => (
    <div className="relative flex flex-col items-center group">
        <div className={`relative w-6 h-9 md:w-8 md:h-11 ${colorClass} rounded-b-full rounded-t-3xl shadow-lg ${glowColor} transition-transform duration-300 group-hover:scale-110`}>
            <div className="absolute inset-x-1 top-0 bottom-1 bg-white/20 rounded-b-full rounded-t-2xl pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-black/10 rounded-full" />
        </div>
        <div className="relative w-full flex justify-center">
            <div className="absolute -left-2 top-2 w-3 h-8 bg-emerald-700 rounded-tl-full rounded-br-full transform -rotate-12" />
            <div className="absolute -right-2 top-3 w-3 h-7 bg-emerald-800 rounded-tr-full rounded-bl-full transform rotate-12" />
            <div className={`w-1 ${height} bg-linear-to-b from-emerald-600 to-emerald-950 rounded-full shadow-sm`} />
        </div>
    </div>
);

export const SkyBackground: React.FC = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 30;
        const y = (e.clientY / innerHeight - 0.5) * 20;
        setMousePos({ x, y });
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-linear-to-b from-[#05030a] via-[#0d071b] to-[#120a24]"
        >
            {/* ESTRELLAS */}
            <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-12 left-1/6">
                <FourPointStar className="w-5 h-5 text-amber-100/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </motion.div>
            <motion.div animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 4.5, delay: 1 }} className="absolute top-28 left-1/3">
                <FourPointStar className="w-7 h-7 text-magia-pink-200 drop-shadow-[0_0_12px_rgba(244,114,182,0.8)]" />
            </motion.div>
            <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} className="absolute top-44 left-10">
                <FourPointStar className="w-4 h-4 text-sky-200" />
            </motion.div>
            <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} className="absolute top-80 left-40">
                <FourPointStar className="w-4 h-4 text-sky-200" />
            </motion.div>
            <motion.div animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }} transition={{ repeat: Infinity, duration: 3.8, delay: 2 }} className="absolute top-20 right-1/3">
                <FourPointStar className="w-6 h-6 text-amber-200 drop-shadow-[0_0_10px_rgba(251,191,36,0.7)]" />
            </motion.div>
            <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 4, delay: 1.5 }} className="absolute top-60 right-1/4">
                <FourPointStar className="w-5 h-5 text-magia-sky-100" />
            </motion.div>

            {/* ESTRELLA FUGAZ*/}
            <motion.div
                animate={{ x: [-100, 500], y: [0, 250], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 6, ease: 'easeInOut' }}
                className="absolute top-40 left-1/3 w-48 h-0.5 bg-linear-to-r from-transparent via-white to-transparent rotate-45 z-20 pointer-events-none"
            />

            <motion.div
                animate={{ x: [-100, 500], y: [0, 250], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 5, ease: 'easeInOut' }}
                className="absolute top-40 right-40 w-48 h-0.5 bg-linear-to-r from-transparent via-white to-transparent rotate-45 z-20 pointer-events-none"
            />

            {/* MAR Y TULIPANES */}
            <div className="absolute bottom-0 inset-x-0 h-48 md:h-64 flex flex-col justify-end overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-[#040814] via-[#091326]/90 to-transparent">
                    <motion.div
                        animate={{ opacity: [0.4, 0.7, 0.4], scaleX: [0.95, 1.05, 0.95] }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                        className="absolute right-8 md:right-20 top-0 bottom-0 w-40 md:w-64 bg-linear-to-b from-amber-100/25 via-sky-300/15 to-transparent blur-md transform -skew-x-12"
                    />
                    <div className="absolute inset-x-0 bottom-12 h-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/20 via-sky-400/10 to-transparent animate-pulse" />
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex justify-around items-end pb-1">
                    <RealisticTulip colorClass="bg-gradient-to-t from-red-700 via-red-500 to-red-400" glowColor="shadow-red-600/40" height="h-14" />
                    <RealisticTulip colorClass="bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-300" glowColor="shadow-amber-400/50" height="h-20" />
                    <RealisticTulip colorClass="bg-gradient-to-t from-blue-700 via-blue-500 to-sky-400" glowColor="shadow-blue-500/40" height="h-16" />
                    <RealisticTulip colorClass="bg-gradient-to-t from-red-700 via-red-500 to-rose-400" glowColor="shadow-red-500/40" height="h-22" />
                    <RealisticTulip colorClass="bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-200" glowColor="shadow-amber-300/50" height="h-16" />
                    <RealisticTulip colorClass="bg-gradient-to-t from-blue-800 via-blue-600 to-indigo-400" glowColor="shadow-blue-600/40" height="h-18" />
                    <RealisticTulip colorClass="bg-gradient-to-t from-red-700 via-red-500 to-pink-400" glowColor="shadow-red-500/40" height="h-24" />
                    <RealisticTulip colorClass="bg-gradient-to-t from-amber-600 via-yellow-400 to-amber-200" glowColor="shadow-amber-400/50" height="h-14" />
                    <RealisticTulip colorClass="bg-gradient-to-t from-blue-700 via-sky-500 to-cyan-300" glowColor="shadow-sky-400/40" height="h-20" />
                </div>
            </div>
        </div>
    );
};