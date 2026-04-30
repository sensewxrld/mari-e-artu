import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Heart, Calendar, Clock, Stars, Music, Camera, Quote, Sparkles, Pause, Play } from 'lucide-react';

// Componente para partículas suaves no fundo
const Particles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const initialParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 10,
    }));
    setParticles(initialParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{ 
            y: [0, -200, 0],
            x: [0, 50, 0],
            opacity: [0, 0.4, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "linear" 
          }}
          className="absolute bg-romantic-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.4)]"
          style={{ 
            left: `${p.left}%`, 
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
};

// Componente para corações flutuantes no fundo com parallax
const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 5000], [0, -1000]);

  useEffect(() => {
    const initialHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * (30 - 10) + 10,
      duration: Math.random() * (20 - 10) + 10,
      delay: Math.random() * 5,
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <motion.div 
      style={{ y: yRange }}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0.1 }}
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: heart.duration, 
            repeat: Infinity, 
            delay: heart.delay,
            ease: "easeInOut" 
          }}
          className="absolute text-romantic-200"
          style={{ 
            left: `${heart.left}%`, 
            top: `${heart.top}%` 
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}
    </motion.div>
  );
};

const TimeCounter = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const startDate = new Date('2024-06-01T00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-10"
    >
      {[
        { label: 'Dias', value: timeLeft.days },
        { label: 'Horas', value: timeLeft.hours },
        { label: 'Minutos', value: timeLeft.minutes },
        { label: 'Segundos', value: timeLeft.seconds },
      ].map((data) => (
        <motion.div
          key={data.label}
          variants={item}
          className="bg-white/60 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-romantic-100/50 text-center transform transition-transform hover:scale-105"
        >
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-romantic-600 to-romantic-400 bg-clip-text text-transparent">
            {data.value}
          </div>
          <div className="text-xs text-romantic-400 uppercase tracking-[0.2em] mt-2 font-bold">{data.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

function App() {
  const scrollRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play blocked by browser. Click again!"));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-[#fffafa] text-slate-800 relative selection:bg-romantic-200 selection:text-romantic-900 overflow-x-hidden" ref={scrollRef}>
      <Particles />
      <FloatingHearts />
      
      {/* Audio Element */}
      <audio 
         ref={audioRef}
         src="/my-eyes.mp3" 
         preload="auto"
         loop
       />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              filter: ["drop-shadow(0 0 0px rgba(244, 63, 94, 0))", "drop-shadow(0 0 20px rgba(244, 63, 94, 0.4))", "drop-shadow(0 0 0px rgba(244, 63, 94, 0))"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <Heart size={100} className="text-romantic-500 fill-romantic-500" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0"
              >
                <Heart size={100} className="text-romantic-400 fill-romantic-400" />
              </motion.div>
            </div>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-dancing text-romantic-600 mb-6 drop-shadow-sm">
            Marina & Arthur
          </h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-3 text-romantic-400 mb-8"
          >
            <Sparkles size={20} />
            <p className="text-xl md:text-3xl font-light tracking-wide">
              1 Ano e 11 Meses de Amor
            </p>
            <Sparkles size={20} />
          </motion.div>
          
          <TimeCounter />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20"
          >
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <p className="text-romantic-300 text-xs mb-4 uppercase tracking-[0.3em] font-bold">Descubra nossa jornada</p>
              <div className="w-[2px] h-16 bg-gradient-to-b from-romantic-300 to-transparent rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Nossa História Section */}
      <section className="py-32 px-4 max-w-5xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-romantic-400 uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Timeline</span>
          <h2 className="text-5xl md:text-6xl font-dancing text-romantic-600 mb-6">Nossa História</h2>
          <div className="w-20 h-1 bg-romantic-300 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Linha vertical central para desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-romantic-100 -translate-x-1/2" />

          <div className="space-y-24">
            {[
              {
                title: "O Primeiro Encontro",
                date: "01 de Junho de 2024",
                content: "O dia em que nos conhecemos no Shopping Del Rey. Fomos ao cinema ver aquele filme de Tarot e mal sabíamos que ali começava a história mais linda de nossas vidas.",
                icon: <Stars className="text-white" size={24} />
              },
              {
                title: "Nossa Viagem ao Chile",
                date: "Aventura Internacional",
                content: "Explorando novas paisagens e vivendo momentos mágicos no frio do Chile. Uma viagem que ficará para sempre guardada em nossos corações.",
                icon: <Camera className="text-white" size={24} />
              },
              {
                title: "Show do Luan Santana",
                date: "Noite de Música e Amor",
                content: "Cantando cada letra a plenos pulmões ao seu lado. Uma noite inesquecível onde o som da nossa felicidade foi a melhor trilha sonora.",
                icon: <Music className="text-white" size={24} />
              },
              {
                title: "1 Ano e 11 Meses",
                date: "Hoje, 01 de Maio de 2026",
                content: "Continuamos escrevendo os capítulos mais felizes. Marina, cada dia ao seu lado é uma nova razão para me apaixonar novamente. Always and Forever.",
                icon: <Heart className="text-white" size={24} fill="currentColor" />
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 w-full">
                  <div className={`bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] border border-romantic-100 shadow-xl hover:shadow-2xl transition-shadow duration-500 relative group`}>
                    <div className="absolute -top-4 -left-4 bg-romantic-500 p-4 rounded-2xl shadow-lg transform group-hover:rotate-12 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-romantic-600 mb-2">{item.title}</h3>
                    <p className="text-romantic-400 text-sm mb-6 font-bold uppercase tracking-widest">{item.date}</p>
                    <p className="text-slate-600 leading-relaxed text-lg">{item.content}</p>
                  </div>
                </div>
                <div className="hidden md:block w-4 h-4 bg-romantic-500 rounded-full border-4 border-white shadow-md z-20" />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-white/0 via-romantic-100/30 to-white/0 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <div className="inline-block p-4 bg-romantic-100 rounded-3xl mb-6">
              <Camera className="text-romantic-500" size={32} />
            </div>
            <h2 className="text-5xl md:text-6xl font-dancing text-romantic-600 mb-6">Nossos Momentos</h2>
            <p className="text-romantic-400 text-lg max-w-xl mx-auto">Cada foto guarda um pedaço do nosso amor e a promessa de muitos outros registros felizes.</p>
          </motion.div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                className="relative group rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
              >
                <img 
                  src={`/${i}.jpeg`} 
                  alt={`Memória ${i}`}
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-romantic-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="flex items-center gap-3 text-white"
                  >
                    <Heart size={20} fill="currentColor" />
                    <span className="font-bold tracking-widest uppercase text-xs">Para sempre Marina</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Carta de Amor Section */}
      <section className="py-32 px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl border border-romantic-50 relative"
        >
          <Quote className="absolute top-10 left-10 text-romantic-100" size={80} />
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-dancing text-romantic-600 mb-10">Marina, meu amor...</h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-light italic">
              <p>
                "Minha moranguinho, minha borboletinha... Desde o primeiro dia no Del Rey, eu soube que você era a pessoa da minha vida. Cada aventura que vivemos — desde o frio inesquecível da nossa viagem para o Chile até a emoção de cantarmos juntos no show do Luan Santana — só me deu a certeza de que fomos feitos um para o outro."
              </p>
              <p>
                "Completar 1 ano e 11 meses ao seu lado é apenas o começo de uma eternidade. Mal posso esperar por todas as outras aventuras que ainda vamos viver. Estaremos juntos, Always and Forever."
              </p>
              <p className="font-bold text-romantic-500 pt-6">
                Te amo infinitamente, Marina!
              </p>
            </div>
            <motion.div
               animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="mt-12 inline-block"
             >
               <Heart size={40} className="text-romantic-500 fill-romantic-500" />
             </motion.div>
          </div>
        </motion.div>
      </section>

      <footer className="py-16 text-center z-10 relative border-t border-romantic-50">
        <div className="flex justify-center gap-6 mb-8">
          <Stars className="text-romantic-200" />
          <Heart className="text-romantic-300 fill-romantic-300" />
          <Stars className="text-romantic-200" />
        </div>
        <p className="text-romantic-400 font-bold tracking-[0.3em] uppercase text-xs mb-2">Marina & Arthur</p>
        <p className="text-romantic-300 text-sm">Celebrando 1 ano e 11 meses • 01 de Maio de 2026</p>
      </footer>

      {/* Botão de música flutuante */}
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-4"
      >
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-romantic-100 text-romantic-600 text-sm font-medium flex items-center gap-2"
            >
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 12, 4] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1 bg-romantic-500 rounded-full"
                  />
                ))}
              </div>
              My Eyes - Travis Scott
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className={`p-4 rounded-full shadow-2xl border backdrop-blur-md transition-all duration-300 ${
            isPlaying 
              ? 'bg-romantic-500 text-white border-romantic-400' 
              : 'bg-white/80 text-romantic-500 border-romantic-100'
          }`}
        >
          {isPlaying ? <Pause size={24} /> : <Music size={24} />}
        </motion.button>
      </motion.div>
    </div>
  );
}

export default App;
