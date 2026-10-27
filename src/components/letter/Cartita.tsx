import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, X, Sparkles } from 'lucide-react';

interface CartaSecretaProps {
  remitente?: string;
  destinataria?: string;
  mensaje: string;
}

export const CartaSecreta: React.FC<CartaSecretaProps> = ({
  remitente = "Miguel",
  destinataria = "La Reina de mis Sueños",
  mensaje
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón / Sobre para abrir la carta (Se puede poner al final de la línea del tiempo) */}
      <div className="w-full max-w-md mx-auto px-4 my-12 text-center">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(true)}
          className="cursor-pointer relative p-6 rounded-3xl bg-linear-to-r from-magia-pink-600/20 via-magia-dark to-magia-pink-600/20 border border-magia-pink-500/40 shadow-xl shadow-magia-pink-600/10 flex flex-col items-center group overflow-hidden"
        >
          {/* Destellos decorativos */}
          <div className="absolute top-2 left-3 text-magia-pink-300/40 text-xs">✨</div>
          <div className="absolute bottom-2 right-3 text-magia-pink-300/40 text-xs">🌸</div>

          <div className="w-14 h-14 rounded-full bg-magia-pink-600/30 border border-magia-pink-400/50 flex items-center justify-center mb-3 group-hover:bg-magia-pink-500/40 transition-colors shadow-inner">
            <Mail className="w-7 h-7 text-magia-pink-300 animate-bounce" />
          </div>

          <h3 className="text-xl md:text-2xl font-script text-magia-sky-100 mb-1">
            Una Cartita para la Niña Consentida.
          </h3>
          <p className="text-xs text-magia-pink-300 font-sans">
            Toca para abrir mi corazon.💌
          </p>
        </motion.div>
      </div>

      {/* Modal / Carta Desplegada */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-magia-dark/90 backdrop-blur-md p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.8, y: 30, rotate: 2 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-linear-to-b from-magia-pink-600/20 via-magia-dark to-magia-dark border border-magia-pink-500/50 p-6 md:p-10 shadow-2xl shadow-magia-pink-600/30 overflow-hidden my-auto max-h-[85vh] flex flex-col"
            >
              {/* Botón cerrar */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-magia-dark/80 border border-magia-pink-400/40 text-magia-sky-200 hover:text-white hover:border-magia-pink-300 transition-all z-20 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Encabezado de la carta */}
              <div className="flex items-center justify-center gap-2 mb-4 text-magia-pink-300">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest font-semibold">Palabras de mi Corazon</span>
                <Sparkles className="w-4 h-4" />
              </div>

              <h2 className="text-2xl md:text-3xl font-script text-magia-sky-100 mb-4 text-center">
                Para: {destinataria} 💖
              </h2>

              {/* Cuerpo del mensaje con scroll interno si es largo */}
              <div className="overflow-y-auto pr-2 custom-scrollbar my-2 flex-1">
                <p className="text-sm md:text-base text-magia-sky-100/90 leading-relaxed font-sans whitespace-pre-line text-left px-2 bg-magia-dark/40 p-4 rounded-2xl border border-magia-pink-500/20 shadow-inner">
                  {mensaje}
                </p>
              </div>

              {/* Firma */}
              <div className="mt-6 text-right pt-2 border-t border-magia-pink-500/30">
                <p className="text-xs text-magia-pink-300 font-sans">Con todo mi amor,</p>
                <p className="text-lg font-script text-magia-sky-100">{remitente}</p>
              </div>

              {/* Corazoncito decorativo inferior */}
              <div className="flex justify-center mt-3">
                <Heart className="w-5 h-5 text-magia-pink-500 fill-magia-pink-500 animate-pulse" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};