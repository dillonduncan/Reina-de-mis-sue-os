import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const SkyBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Efecto de movimiento respecto a la posición del cursor (Parallax)
  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 25; // Desplazamiento horizontal suave
    const y = (e.clientY / innerHeight - 0.5) * 25; // Desplazamiento vertical suave
    setMousePos({ x, y });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="fixed inset-0 overflow-hidden pointer-events-auto z-0 bg-linear-to-b from-[#090514] via-[#120822] to-[#1c0d2c]"
    >
      {/* ================= PARTE DE ARRIBA: CIELO NOCTURNO ================= */}
      <motion.div 
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: 'spring', stiffness: 40, damping: 30 }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Luna brillante */}
        <div className="absolute top-12 right-16 w-16 h-16 rounded-full bg-linear-to-br from-magia-sky-100 to-magia-pink-200/40 shadow-[0_0_35px_rgba(255,255,255,0.25)] opacity-90" />

        {/* Estrellas con animación de pulsaciones */}
        <div className="absolute top-16 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        <div className="absolute top-28 left-1/3 w-2 h-2 bg-magia-pink-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-36 left-1/6 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-20 right-1/3 w-2 h-2 bg-magia-sky-200 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-48 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-32 right-12 w-2 h-2 bg-magia-pink-200 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
        <div className="absolute top-64 left-1/5 w-1.5 h-1.5 bg-magia-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-80 right-1/5 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />

        {/* Estrellas fugaces cruzando el cielo */}
        <motion.div 
          animate={{ x: [-120, 400], y: [0, 250], opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 4, repeatDelay: 6, ease: 'easeInOut' }}
          className="absolute top-10 left-10 w-28 h-0.5 bg-linear-to-r from-transparent via-white to-transparent rotate-45"
        />
        <motion.div 
          animate={{ x: [-100, 500], y: [0, 300], opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 5, repeatDelay: 9, ease: 'easeInOut', delay: 2.5 }}
          className="absolute top-24 right-1/4 w-36 h-0.5 bg-linear-to-r from-transparent via-magia-pink-300 to-transparent rotate-45"
        />
      </motion.div>

      {/* ================= PARTE DE ABAJO: TIERRA CON TULIPANES ================= */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 pointer-events-none flex items-end justify-center">
        {/* Colinas de fondo oscuras */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-linear-to-t from-[#0e0417] via-[#140620] to-transparent rounded-t-[100%] scale-x-125" />

        {/* Tulipanes (Amarillos, Rojos, Azules) simulando la tierra */}
        <div className="relative z-10 flex justify-between items-end w-full max-w-5xl px-6 pb-2">
          {[
            { color: 'bg-red-500', shadow: 'shadow-red-500/50', delay: '0s', height: 'h-12' },
            { color: 'bg-amber-400', shadow: 'shadow-amber-400/50', delay: '0.5s', height: 'h-16' },
            { color: 'bg-blue-500', shadow: 'shadow-blue-500/50', delay: '1s', height: 'h-14' },
            { color: 'bg-red-600', shadow: 'shadow-red-600/50', delay: '0.3s', height: 'h-12' },
            { color: 'bg-amber-400', shadow: 'shadow-amber-400/50', delay: '0.8s', height: 'h-15' },
            { color: 'bg-blue-600', shadow: 'shadow-blue-600/50', delay: '0.2s', height: 'h-13' },
            { color: 'bg-red-500', shadow: 'shadow-red-500/50', delay: '0.7s', height: 'h-16' },
            { color: 'bg-amber-400', shadow: 'shadow-amber-400/50', delay: '1.2s', height: 'h-14' },
            { color: 'bg-blue-500', shadow: 'shadow-blue-500/50', delay: '0.4s', height: 'h-12' },
          ].map((tulip, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center animate-bounce" 
              style={{ animationDuration: '3s', animationDelay: tulip.delay }}
            >
              {/* Flor / Pétalos del tulipán */}
              <div className={`w-3.5 h-6 md:w-4 md:h-7 ${tulip.color} rounded-t-full rounded-b-md shadow-lg ${tulip.shadow}`} />
              {/* Tallo */}
              <div className={`w-0.5 ${tulip.height} bg-emerald-600`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};