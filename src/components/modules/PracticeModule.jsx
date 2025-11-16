import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Play, Square, Volume2, CheckCircle } from 'lucide-react';

const PracticeModule = ({ content }) => {
  const [recordedPhrases, setRecordedPhrases] = useState(new Set());
  const [isRecording, setIsRecording] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(null);

  const speakPhrase = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = (index) => {
    setIsRecording(!isRecording);
    setCurrentPhrase(index);

    // Simulate recording (in a real app, you'd use the MediaRecorder API)
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        const newRecorded = new Set(recordedPhrases);
        newRecorded.add(index);
        setRecordedPhrases(newRecorded);
        setCurrentPhrase(null);
      }, 2000);
    }
  };

  const progress = content.phrases ? (recordedPhrases.size / content.phrases.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-effect p-4 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <Mic className="w-6 h-6 text-primary-400" />
          <h3 className="font-semibold text-primary-300">Speech Lab</h3>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          {content.prompt || "Practice speaking these key phrases out loud. Repetition builds muscle memory!"}
        </p>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">Practice Progress</span>
            <span className="text-primary-400 font-semibold">
              {recordedPhrases.size} / {content.phrases?.length || 0} ({Math.round(progress)}%)
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

      {/* Practice Cards */}
      <div className="space-y-4">
        {content.phrases?.map((phrase, index) => {
          const isRecorded = recordedPhrases.has(index);
          const isCurrentlyRecording = isRecording && currentPhrase === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card-interactive ${
                isRecorded ? 'border-2 border-green-500/50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-gradient-to-r from-primary-600 to-secondary-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <h4 className="text-xl font-semibold text-white">{phrase}</h4>
                  </div>
                  <p className="text-sm text-gray-400 ml-13">
                    Click the microphone to practice saying this phrase
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Listen Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => speakPhrase(phrase)}
                    className="bg-blue-600/30 hover:bg-blue-600/50 p-3 rounded-xl transition-colors"
                    title="Listen"
                  >
                    <Volume2 className="w-5 h-5 text-blue-300" />
                  </motion.button>

                  {/* Record Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleRecording(index)}
                    disabled={isRecording && currentPhrase !== index}
                    className={`p-3 rounded-xl transition-all ${
                      isCurrentlyRecording
                        ? 'bg-red-600 animate-pulse'
                        : isRecorded
                        ? 'bg-green-600/50'
                        : 'bg-primary-600/30 hover:bg-primary-600/50'
                    }`}
                    title={isCurrentlyRecording ? 'Recording...' : 'Record yourself'}
                  >
                    {isRecorded ? (
                      <CheckCircle className="w-5 h-5 text-green-300" />
                    ) : isCurrentlyRecording ? (
                      <Square className="w-5 h-5 text-white" />
                    ) : (
                      <Mic className="w-5 h-5 text-primary-300" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Recording indicator */}
              {isCurrentlyRecording && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      {[0, 1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ scaleY: [1, 1.5, 1] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: i * 0.1
                          }}
                          className="w-1 h-4 bg-red-500 rounded-full"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-red-400">Recording... Speak clearly!</span>
                  </div>
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
        className="glass-effect p-4 rounded-xl border-l-4 border-orange-500"
      >
        <h4 className="font-semibold text-orange-300 mb-2">🎯 Speaking Tips</h4>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• Listen to the native pronunciation first</li>
          <li>• Practice each phrase 3-5 times</li>
          <li>• Focus on mimicking the rhythm and intonation</li>
          <li>• Don't worry about perfection - practice makes progress!</li>
        </ul>
      </motion.div>

      {/* Completion Message */}
      {recordedPhrases.size === content.phrases?.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card border-2 border-green-500/50 text-center"
        >
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3 className="heading-3 text-green-400 mb-2">Great Job!</h3>
          <p className="text-gray-400">
            You've practiced all the phrases. Keep reviewing them to build fluency!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default PracticeModule;
