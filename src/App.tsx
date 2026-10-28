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
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [clickKey, setClickKey] = useState(0);
  const moonMessages = [
    "Te Extraño",
    "Ay Mi Niña, Mi Niña",
    "Te Quiero, Mi Princesa",
    "La Razon Eres Tu",
    "Te Amoooteeee",
    "Reina de Mis Sueños",
    "Seran tus Ojooss, Tus Ojooss Color Marroooonnn",
    "Quizás Tan Solo Seas Tu, Quizas Tan Soloo Sea Yo",
    "Ven y Transforma Mi Mundo, Mujer",
    "Tu Sonrisa es lo mas Bonito que Existe",
    "Libraameee, de Nooo Podeerr Ooirr Tu Voooozzzz",
    "Hoy Descubri el Amor al Final de Tus Besoss",
    "Mi Amor Eres Tuu, Tu Loco Soy Yoo",
    "Mi Reina Consentidaa",
    "Ay Porque Sin Tus Besos Yo No Tengo Nadaa",
    "See Felizzz, que Yo soy el Hombre mas Feliz Desde que nos Cuadramooossss",
    "Valioo la Pena Esperarlo, si un Beso Tuyo es la Glooorriaaaa",
    "Teee AAAMOOOO",
    "Quiubo Mamasiitaa",
    "De el Brillo de tus Ojos Aprendi a Decir 'Te Amo'",
    "Y Te Amoo y Te Amooo y Te Amooo y Te Amooo",
    "y Te Pienso y Te Sueño y Te Sueño y Te Piensoo",
    "Este es el Amor mas Grande del Planeta",
    "I Dont't Belieevee that Anybodyyy Feels the Way I do, Abut you Noowww",
    "You're My Wonderwaaaalllll",
    "You're the Closest to Heaven that I'll Ever Be",
    "Lo Siento si te Lastime",
    "Eres mi Estrellita",
    "Andd The Reason iss Youu",
    "Abachito?",
    "Cuidate Mucho, Toma Agua, Come bien, Duerme bien",
    "Cual es la planta mas valiente?",
    "Sabias que en el universo hay millones de estrellas? pero nadie tiene una, Solo Yo",
    "Usted esta bien rica mamasiita",
    "Eres Increible, Puedes Lograr lo que te Propongas",
    "Sonrie (por dentro), al menos que estes conmigo",
    "Te amo ¿ya te habia dicho?",
    "AYYYYYYYYYY, el hombre que trabaja y beebeee",
    "Eres Mia Solo Mia ¿OK?",
    "Beshitos a Tu Frentecita Preciosa",
    "Se come todo -_-",
    "Besoosss, MUAK MUAK",
    "Besos pa mis lindas",
    "Mi Princesa", 
    "Mi Reina",
    "Mi Niña", 
    "Mi Estrellita", 
    "Lindaaaa",
    "Te ves Preciosa Hoy",
    "Ven asomatee amoorr",
    "Y cuando las cosas esten mal, llora, pero valora mientras sonrias",
    "Dont't worry, be happy",
    "ME AMAASS?",
    "Cada vez que Sonries una Estrella Aumenta su Brillo",
    "Tu sabes como se llama el doble de riesgo del agente 007? 014 JAJAAJAJJAJAJ",
    "Como se dice 'Misterio' en china? CHANCHANCHAN JAJAAJAJAJAJJ",
    "Quisiera ser pobre por un dia. Esto de serlo todos los dias ya esta canson"

  ];
  const mensajeCarta = `Jelou broder, ¿Como se siente mi niña? esto es un lugar donde puedes ver nuestra historia, para que nunca se te olvide cuanto te ama tu principe, para que sepas que aqui estare para cuidarte.
    Gracias por cada uno de estos momentos, gracias por tus caricias, gracias por tu amor.
    TE AMO, TE QUIERO Y TE EXTRAÑO, de aqui a las estrellas.
  `;

  // Función para mostrar un mensaje aleatorio al hacer clic en la luna
  const handleMoonClick = () => {
    const randomMsg = moonMessages[Math.floor(Math.random() * moonMessages.length)];
    setCurrentMessage(randomMsg);
    setClickKey(prev => prev + 1);

    // Ocultar el mensaje automáticamente después de 3.5 segundos
    setTimeout(() => {
      setCurrentMessage(null);
    }, 3500);
  };
  return (
    <div className="min-h-screen text-magia-sky-100 font-sans relative overflow-hidden">
      {!isUnlocked && (
        <MagicWordModal onUnlock={() => setIsUnlocked(true)} />
      )}

      {/* Fondo mágico global */}
      {isUnlocked && <SkyBackground />}

      {/* LUNA */}
      {isUnlocked && (
        <motion.div
          whileHover={{ scale: 1.15 }}
          whileTap={{ rotate: [0, -6, 6, -6, 6, 0], scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          onClick={handleMoonClick}
          className="fixed top-3 right-3 md:top-10 md:right-20 w-28 h-28 md:w-52 md:h-52 drop-shadow-[0_0_60px_rgba(255,255,255,0.6)] cursor-pointer pointer-events-auto z-40"
        >
          <img
            src="/image/luna sin fondo.png"
            alt="Luna"
            className="w-full h-full object-contain filter brightness-110 contrast-105 pointer-events-none"
          />
        </motion.div>
      )}

      {/*mensaje con estrellitas */}
      <AnimatePresence>
        {currentMessage && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center px-4">
            {/* Contenedor del mensaje con desvanecido */}
            <motion.div
              key={clickKey}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 15 }}
              className="relative px-6 py-4 rounded-3xl bg-magia-dark/90 backdrop-blur-xl border border-magia-pink-400/50 text-magia-sky-100 shadow-[0_0_40px_rgba(244,114,182,0.3)] text-center max-w-sm"
            >
              <p className="font-script text-xl md:text-2xl text-magia-pink-200 drop-shadow">
                {currentMessage}
              </p>

              {/* Efecto de estrellitas estallando alrededor del mensaje */}
              {[...Array(6)].map((_, i) => {
                const angle = (i * 360) / 6;
                const distance = 60;
                const x = Math.cos((angle * Math.PI) / 180) * distance;
                const y = Math.sin((angle * Math.PI) / 180) * distance;

                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], x: x, y: y, scale: [0.5, 1.2, 0.2] }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_10px_rgba(251,191,36,0.9)] pointer-events-none"
                  />
                );
              })}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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