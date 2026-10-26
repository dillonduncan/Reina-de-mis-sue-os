import { useState } from 'react';
import {MagicWordModal} from './components/auth/MagicWordModal';
import { Heart, Sparkles } from 'lucide-react';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-magia-dark text-magia-sky-100 font-sans relative overflow-hidden">
        {/*Modal de autenticacion (Palabra magica)*/}
        {!isUnlocked &&(
           <MagicWordModal onUnlock={() => setIsUnlocked(true)}/>
        )}
          
        {/*Contenido principal de la app*/}
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
          <div className="mb-6 p-4 rounded-full bg-magia-pink-500/10 border border-magia-pink-400/30 text-magia-pink-300 animate-pulse">
            <Heart className="w-12 h-12 fill-magia-pink-400 stroke-magia-pink-300" />
          </div>

          <h1 className="text-4xl md:text-6xl font-script text-magia-sky-100 mb-4">Reina de mis sueños</h1>
          <p className="text-magia-sky-200/80 max-w-md mb-8 text-sm md:text-base">Bienvenida a la Patria Milagro</p>/*Bienvenida a nuestro universo*/

          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-magia-pink-600/20 border border-magia-pink-500/30 text-magia-pink-300 font-semibold shadow-lg">
            <Sparkles className="w-5 h-5"/>
            <span>linea del tiempo y discos vinilo</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
