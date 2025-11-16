import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Volume2, Check, X } from 'lucide-react';

const VocabularyModule = ({ content }) => {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [masteredWords, setMasteredWords] = useState(new Set());

  const toggleFlip = (index) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(index)) {
      newFlipped.delete(index);
    } else {
      newFlipped.add(index);
    }
    setFlippedCards(newFlipped);
  };

  const speakWord = (text, e) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const markMastered = (index, e) => {
    e.stopPropagation();
    const newMastered = new Set(masteredWords);
    if (newMastered.has(index)) {
      newMastered.delete(index);
    } else {
      newMastered.add(index);
    }
    setMasteredWords(newMastered);
  };

  const masteredCount = masteredWords.size;
  const totalWords = content.length;
  const progress = totalWords > 0 ? (masteredCount / totalWords) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-effect p-4 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <BookOpen className="w-6 h-6 text-primary-400" />
          <h3 className="font-semibold text-primary-300">Vocabulary Builder</h3>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Click any card to reveal the translation. Mark words as mastered when you know them well!
        </p>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">Words Mastered</span>
            <span className="text-primary-400 font-semibold">
              {masteredCount} / {totalWords} ({Math.round(progress)}%)
            </span>
          </div>
          <div className="w-full bg-dark-800 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="progress-bar"
            />
          </div>
        </div>
      </div>

      {/* Vocabulary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.map((item, index) => {
          const isFlipped = flippedCards.has(index);
          const isMastered = masteredWords.has(index);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                onClick={() => toggleFlip(index)}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                className={`relative cursor-pointer ${
                  isMastered ? 'opacity-75' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front (Spanish) */}
                <div
                  className={`card min-h-[160px] flex flex-col justify-between ${
                    isMastered ? 'border-2 border-green-500/50' : ''
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <div className="flex-1 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white text-center">
                      {item.term}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => speakWord(item.term, e)}
                      className="bg-primary-600/30 hover:bg-primary-600/50 p-2 rounded-lg transition-colors"
                    >
                      <Volume2 className="w-4 h-4 text-primary-300" />
                    </motion.button>

                    <span className="text-xs text-gray-500">Click to flip</span>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => markMastered(index, e)}
                      className={`p-2 rounded-lg transition-colors ${
                        isMastered
                          ? 'bg-green-600/50 text-green-300'
                          : 'bg-gray-600/30 text-gray-400 hover:bg-gray-600/50'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Back (English) */}
                <div
                  className="card min-h-[160px] flex flex-col justify-center absolute inset-0 bg-gradient-to-br from-secondary-900/50 to-primary-900/50"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-xl text-gray-300 text-center px-4">
                      {item.translation}
                    </p>
                  </div>

                  <div className="text-center">
                    <span className="text-xs text-gray-500">Click to flip back</span>
                  </div>
                </div>
              </motion.div>

              {/* Mastered Badge */}
              {isMastered && (
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg z-10"
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-effect p-4 rounded-xl border-l-4 border-primary-500"
      >
        <h4 className="font-semibold text-primary-300 mb-2">💡 Learning Tip</h4>
        <p className="text-sm text-gray-400">
          Use spaced repetition: Review words you haven't mastered multiple times.
          Say each word out loud and try to use it in a sentence!
        </p>
      </motion.div>
    </div>
  );
};

export default VocabularyModule;
