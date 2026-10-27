import React from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onLogout}
      className="cursor-pointer fixed top-3 right-3 md:top-4 md:right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-full bg-magia-dark/85 backdrop-blur-md border border-magia-red-500/40 text-magia-sky-100 shadow-xl shadow-magia-red-500/30 hover:border-red-pink-400 transition-all pointer-events-auto group"
      title="Salir y bloquear aplicación"
    >
      <span className="text-xs font-script text-magia-red-400 hidden sm:inline">Salir</span>
      <LogOut className="w-4 h-4 text-magia-red-400 group-hover:translate-x-0.5 transition-transform" />
    </motion.button>
  );
};