import { useState } from 'react';
import { MagicWordModal } from './components/auth/MagicWordModal';
import { Heart } from 'lucide-react';
import { TimeLine } from './components/timeline/TimeLine';
import { TimelineData } from './data/TimeLineData';
import { VinylPlayer } from './components/audio/VinylPlayer';
import { playList } from './data/SongsData';
import { Cartita } from './components/letter/Cartita';
import { RelacionCounter } from './components/counter/RelacionCounter';
import { LogoutButton } from './components/auth/LogoutButton';
import { SkyBackground } from './components/background/SkyBackgraund';
import { motion } from 'framer-motion';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const mensajeCarta = `Jelou broder, ¿Como se siente mi niña? esto es un lugar donde puedes ver nuestra historia, para que nunca se te olvide cuanto te ama tu principe, para que sepas que aqui estare para cuidarte.
    Gracias por cada uno de estos momentos, gracias por tus caricias, gracias por tu amor.
    TE AMO, TE QUIERO Y TE EXTRAÑO, de aqui a las estrellas.
  `;

  return (
    <div className="min-h-screen text-magia-sky-100 font-sans relative overflow-hidden">
      {!isUnlocked && (
        <MagicWordModal onUnlock={() => setIsUnlocked(true)} />
      )}

      {/* Fondo mágico global */}
      {isUnlocked && <SkyBackground />}

      {/* LUNA INTERACTIVA FLOTANTE (Fixed con z-40 para que nunca la tape nada) */}
      {isUnlocked && (
        <motion.div 
          whileHover={{ scale: 1.15 }}
          whileTap={{ rotate: [0, -6, 6, -6, 6, 0], scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="fixed top-6 right-8 md:top-10 md:right-20 w-36 h-36 md:w-52 md:h-52 drop-shadow-[0_0_35px_rgba(255,255,255,0.4)] cursor-pointer pointer-events-auto z-40"
        >
          <img 
            src="/image/luna sin fondo.png" 
            alt="Luna" 
            className="w-full h-full object-contain filter brightness-110 contrast-105 pointer-events-none"
          />
        </motion.div>
      )}

      {/* Contenido principal */}
      {isUnlocked && (
        <main className="pb-72 w-full relative z-10 flex flex-col items-center pt-8 px-4">
          <RelacionCounter startDate='2025-07-04T14:00:00' />
          <LogoutButton onLogout={() => setIsUnlocked(false)} />
          <VinylPlayer songs={playList} />           

          <div className="flex flex-col items-center justify-center text-center mt-6 mb-12">
            <div className="mb-6 p-4 rounded-full bg-magia-pink-500/10 border border-magia-pink-400/30 text-magia-pink-300 animate-pulse shadow-lg shadow-magia-pink-500/20">
              <Heart className="w-12 h-12 fill-magia-pink-400 stroke-magia-pink-300" />
            </div>

            <h1 className="text-4xl md:text-6xl font-script text-magia-sky-100 mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              Reina de mis sueños
            </h1>
            <p className="text-magia-sky-200/90 max-w-md mb-2 text-sm md:text-base font-medium drop-shadow">
              Bienvenida a la Patria Milagro. Mentiiraaaa.
            </p>
            <p className="text-magia-sky-200/90 max-w-md text-sm md:text-base font-medium drop-shadow">
              Bienvenida a Nuestra Linea del Tiempo.
            </p>
          </div>

          <TimeLine items={TimelineData} />

          <Cartita
            destinataria='Reina de mis Sueños'
            remitente='Miguel'
            mensaje={mensajeCarta}
          />
        </main>
      )}
    </div>
  );
}

export default App;