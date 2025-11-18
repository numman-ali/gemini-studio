"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tarotCards = [
  { name: "THE FOOL", meaning: "New beginnings, innocence, spontaneity", reversed: "Recklessness, risk-taking" },
  { name: "THE MAGICIAN", meaning: "Manifestation, resourcefulness, power", reversed: "Manipulation, poor planning" },
  { name: "THE HIGH PRIESTESS", meaning: "Intuition, sacred knowledge, divine feminine", reversed: "Secrets, disconnection" },
  { name: "THE EMPRESS", meaning: "Femininity, beauty, nature, abundance", reversed: "Creative block, dependence" },
  { name: "THE EMPEROR", meaning: "Authority, establishment, structure", reversed: "Domination, rigidity" },
  { name: "THE LOVERS", meaning: "Love, harmony, relationships, values", reversed: "Self-love, disharmony" },
  { name: "THE CHARIOT", meaning: "Control, willpower, success, determination", reversed: "Self-discipline, opposition" },
  { name: "STRENGTH", meaning: "Courage, persuasion, influence, compassion", reversed: "Inner strength, self-doubt" },
  { name: "THE HERMIT", meaning: "Soul searching, introspection, inner guidance", reversed: "Isolation, loneliness" },
  { name: "WHEEL OF FORTUNE", meaning: "Good luck, karma, life cycles, destiny", reversed: "Bad luck, lack of control" },
  { name: "JUSTICE", meaning: "Justice, fairness, truth, cause and effect", reversed: "Unfairness, accountability" },
  { name: "THE HANGED MAN", meaning: "Pause, surrender, letting go, new perspectives", reversed: "Delays, resistance" },
  { name: "DEATH", meaning: "Endings, change, transformation, transition", reversed: "Resistance to change, stagnation" },
  { name: "TEMPERANCE", meaning: "Balance, moderation, patience, purpose", reversed: "Imbalance, excess" },
  { name: "THE DEVIL", meaning: "Shadow self, attachment, addiction, restriction", reversed: "Releasing, exploring darkness" },
  { name: "THE TOWER", meaning: "Sudden change, upheaval, chaos, revelation", reversed: "Personal transformation, avoiding disaster" },
  { name: "THE STAR", meaning: "Hope, faith, purpose, renewal, spirituality", reversed: "Lack of faith, despair" },
  { name: "THE MOON", meaning: "Illusion, fear, anxiety, subconscious", reversed: "Release of fear, inner confusion" },
  { name: "THE SUN", meaning: "Positivity, fun, warmth, success, vitality", reversed: "Inner child, sadness" },
  { name: "JUDGEMENT", meaning: "Judgement, rebirth, inner calling, absolution", reversed: "Self-doubt, inner critic" },
  { name: "THE WORLD", meaning: "Completion, accomplishment, travel", reversed: "Seeking closure, delays" }
];

export default function GothicPage() {
  const [entered, setEntered] = useState(false);
  const [drawnCard, setDrawnCard] = useState<typeof tarotCards[0] | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [reading, setReading] = useState<string>("");

  const drawCard = () => {
    const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    const reversed = Math.random() > 0.5;
    setDrawnCard(randomCard);
    setIsReversed(reversed);

    // Generate a mystical reading
    const readings = [
      "The spirits whisper of changes yet to come...",
      "Your fate is intertwined with the shadows of the past...",
      "The ancient ones reveal a hidden truth...",
      "Destiny calls from beyond the veil...",
      "The cards speak of transformation and mystery..."
    ];
    setReading(readings[Math.floor(Math.random() * readings.length)]);
  };

  const resetReading = () => {
    setDrawnCard(null);
    setReading("");
  };

  if (!entered) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#1a0f0f] text-[#8a0909] font-serif flex flex-col items-center p-8 selection:bg-red-900 selection:text-white"
      >
        <Link href="/" className="absolute top-8 left-8 text-xs uppercase tracking-[0.3em] hover:text-white transition-colors z-50">
          Return
        </Link>

        <div className="border-[20px] border-double border-[#4a0404] p-12 max-w-3xl w-full relative mt-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#1a0f0f] border-4 border-[#4a0404] rotate-45"></div>

          <div className="text-center mb-16">
            <h1 className="text-7xl md:text-9xl mb-4 font-black tracking-tight mix-blend-difference text-[#ff0000] opacity-80" style={{ fontFamily: 'Impact, fantasy' }}>
              MORTALIS
            </h1>
            <p className="text-xl italic text-gray-500 tracking-widest border-t border-b border-[#4a0404] py-4 inline-block">
              Est. MMXXV
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 text-justify leading-loose text-gray-400">
            <p>
              <span className="text-6xl float-left mr-4 text-[#8a0909] font-black">W</span>elcome, seeker of forbidden knowledge.
              Within these hallowed halls lie the ancient secrets of the tarot, whispered by spirits long departed.
              The cards know your past, see your present, and divine your future.
            </p>
            <p>
              Dare you enter the crypt? Beyond this threshold awaits the Oracle of Shadows,
              keeper of the mystical deck. Your destiny awaits, written in symbols older than memory itself.
              But beware—once revealed, the truth cannot be unseen.
            </p>
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => setEntered(true)}
              className="px-12 py-4 border border-[#8a0909] text-[#8a0909] hover:bg-[#8a0909] hover:text-black transition-all duration-500 uppercase tracking-[0.5em] text-xs"
            >
              Enter Crypt
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-gradient-to-b from-[#0a0505] to-[#1a0f0f] text-[#8a0909] font-serif p-8 selection:bg-red-900 selection:text-white overflow-hidden relative"
      >
        {/* Animated candle flicker effect */}
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-radial from-orange-900/10 to-transparent"
          />
        </div>

        <button
          onClick={() => setEntered(false)}
          className="absolute top-8 left-8 text-xs uppercase tracking-[0.3em] hover:text-white transition-colors z-50 border border-[#4a0404] px-4 py-2"
        >
          ← Exit Crypt
        </button>

        <Link href="/" className="absolute top-8 right-8 text-xs uppercase tracking-[0.3em] hover:text-white transition-colors z-50 border border-[#4a0404] px-4 py-2">
          Return Home
        </Link>

        <div className="max-w-5xl mx-auto relative z-10 mt-20">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-8xl mb-4 font-black tracking-tight text-[#ff0000] opacity-80" style={{ fontFamily: 'Impact, fantasy' }}>
              THE ORACLE
            </h1>
            <p className="text-sm italic text-gray-500 tracking-[0.5em] uppercase">
              Of Shadows & Destiny
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left side - Card Drawing */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              <div className="border-4 border-double border-[#4a0404] p-8 bg-black/40 backdrop-blur">
                <h2 className="text-2xl font-black mb-6 text-center tracking-wider">DRAW YOUR FATE</h2>

                <div className="h-80 flex items-center justify-center mb-6 relative">
                  <AnimatePresence mode="wait">
                    {!drawnCard ? (
                      <motion.div
                        key="back"
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                        className="w-48 h-72 border-8 border-[#4a0404] bg-gradient-to-br from-[#2a0404] to-[#0a0000] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                        onClick={drawCard}
                      >
                        <div className="text-center">
                          <div className="text-6xl mb-4">🗝️</div>
                          <p className="text-xs uppercase tracking-widest">Click to Draw</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="front"
                        initial={{ rotateY: -180, scale: 0.8 }}
                        animate={{ rotateY: 0, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-48 h-72 border-8 border-[#8a0909] bg-[#1a0a0a] p-6 flex flex-col items-center justify-between"
                        style={{ transform: isReversed ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        <div className="text-xs uppercase tracking-widest text-center">
                          {isReversed && <span className="text-red-500">REVERSED</span>}
                        </div>
                        <div className="text-center">
                          <div className="text-4xl mb-4">🜏</div>
                          <h3 className="text-lg font-black tracking-tight leading-tight">{drawnCard.name}</h3>
                        </div>
                        <div className="text-xs">✦</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={drawCard}
                    className="flex-1 px-6 py-3 border-2 border-[#8a0909] text-[#8a0909] hover:bg-[#8a0909] hover:text-black transition-all uppercase tracking-widest text-xs font-bold"
                  >
                    Draw Card
                  </button>
                  {drawnCard && (
                    <button
                      onClick={resetReading}
                      className="flex-1 px-6 py-3 border-2 border-[#4a0404] text-[#4a0404] hover:bg-[#4a0404] hover:text-black transition-all uppercase tracking-widest text-xs font-bold"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right side - Reading */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-6"
            >
              <div className="border-4 border-double border-[#4a0404] p-8 bg-black/40 backdrop-blur min-h-[400px]">
                <h2 className="text-2xl font-black mb-6 text-center tracking-wider">YOUR READING</h2>

                <AnimatePresence mode="wait">
                  {drawnCard ? (
                    <motion.div
                      key="reading"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center">
                        <p className="text-3xl font-black mb-2 text-[#ff0000]">{drawnCard.name}</p>
                        {isReversed && (
                          <p className="text-sm text-red-500 italic mb-4">(Reversed)</p>
                        )}
                      </div>

                      <div className="border-t border-b border-[#4a0404] py-4">
                        <p className="italic text-gray-400 text-center text-sm leading-relaxed">
                          "{reading}"
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-gray-600 mb-2">Meaning</h4>
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {isReversed ? drawnCard.reversed : drawnCard.meaning}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-gray-600 mb-2">Guidance</h4>
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {isReversed
                              ? "The reversed position suggests resistance or internal struggle. Look inward to find balance and release what no longer serves you."
                              : "This card appears upright, showing aligned energy. Trust in the path before you and embrace the wisdom it offers."}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="waiting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex items-center justify-center"
                    >
                      <div className="text-center space-y-4 text-gray-600">
                        <div className="text-6xl">🕯️</div>
                        <p className="text-sm italic">The cards await your touch...</p>
                        <p className="text-xs">Draw a card to receive your reading</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mystical symbols */}
              <div className="flex justify-around text-2xl opacity-30">
                <span>☽</span>
                <span>✦</span>
                <span>⚝</span>
                <span>☾</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative corners */}
        <div className="fixed top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-[#4a0404] opacity-30"></div>
        <div className="fixed top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-[#4a0404] opacity-30"></div>
        <div className="fixed bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-[#4a0404] opacity-30"></div>
        <div className="fixed bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-[#4a0404] opacity-30"></div>
      </motion.div>
    </AnimatePresence>
  );
}

