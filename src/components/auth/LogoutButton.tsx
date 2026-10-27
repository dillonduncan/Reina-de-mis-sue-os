import React from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onLogout}
      /* 
        En móvil: Se ubica abajito del contador (top-24 / top-28 izquierdo), asegurando que nunca se monten.
        En escritorio (md:): Vuelve a su esquina superior derecha habitual.
      */
      className="fixed top-24 left-3 sm:left-4 md:top-4 md:right-4 md:left-auto z-40 flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-2 rounded-full bg-magia-dark/85 backdrop-blur-md border border-magia-red-500/40 text-magia-sky-100 shadow-xl shadow-magia-red-400/30 hover:border-magia-red-400 transition-all pointer-events-auto group"
      title="Salir y bloquear aplicación"
    >
      <span className="text-[10px] md:text-xs font-script text-magia-red-300">Salir</span>
      <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4 text-magia-red-400 group-hover:translate-x-0.5 transition-transform" />
    </motion.button>
  );
};