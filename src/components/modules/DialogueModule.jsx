import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Volume2, Eye, EyeOff } from 'lucide-react';

const DialogueModule = ({ content }) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);

  const speakLine = (text, index) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;

      setPlayingIndex(index);
      utterance.onend = () => setPlayingIndex(null);

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-effect p-4 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <MessageCircle className="w-6 h-6 text-primary-400" />
          <h3 className="font-semibold text-primary-300">Listen & Understand</h3>
        </div>
        <p className="text-gray-400 text-sm">
          Read the dialogue below. Try to understand the context before looking at the translation.
          Click the speaker icon to hear each line.
        </p>
      </div>

      {/* Translation Toggle */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowTranslation(!showTranslation)}
          className="button-secondary flex items-center space-x-2"
        >
          {showTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showTranslation ? 'Hide' : 'Show'} Translation</span>
        </motion.button>
      </div>

      {/* Dialogue */}
      <div className="space-y-4">
        {content.dialogue.map((line, index) => {
          const translation = content.translation[index];
          const isPlaying = playingIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-md ${index % 2 === 0 ? '' : 'text-right'}`}>
                {/* Speaker Name */}
                <div className="text-xs font-semibold text-primary-400 mb-1 px-4">
                  {line.speaker}
                </div>

                {/* Dialogue Bubble */}
                <div
                  className={`glass-effect-strong p-4 rounded-2xl ${
                    index % 2 === 0 ? 'rounded-tl-sm' : 'rounded-tr-sm'
                  } relative group`}
                >
                  {/* Spanish Text */}
                  <div className="flex items-start space-x-3">
                    <p className="text-white flex-1">{line.line}</p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => speakLine(line.line, index)}
                      className={`bg-primary-600/30 hover:bg-primary-600/50 p-2 rounded-lg transition-colors ${
                        isPlaying ? 'animate-pulse' : ''
                      }`}
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4 text-primary-300" />
                    </motion.button>
                  </div>

                  {/* Translation */}
                  <AnimatePresence>
                    {showTranslation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-white/10"
                      >
                        <p className="text-sm text-gray-400 italic">{translation.line}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-effect p-4 rounded-xl border-l-4 border-primary-500"
      >
        <h4 className="font-semibold text-primary-300 mb-2">💡 Learning Tip</h4>
        <p className="text-sm text-gray-400">
          Listen to each line multiple times. Try to repeat what you hear before looking at the translation.
          This builds your comprehension skills naturally!
        </p>
      </motion.div>
    </div>
  );
};

export default DialogueModule;
