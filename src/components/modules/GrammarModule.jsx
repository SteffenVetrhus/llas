import { motion } from 'framer-motion';
import { Wrench, BookOpen, Lightbulb } from 'lucide-react';

const GrammarModule = ({ content }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-effect p-4 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <Wrench className="w-6 h-6 text-primary-400" />
          <h3 className="font-semibold text-primary-300">Grammar Tool</h3>
        </div>
        <p className="text-gray-400 text-sm">
          Grammar is a tool to help you complete your mission. Focus on understanding how it helps you communicate.
        </p>
      </div>

      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card border-l-4 border-primary-500"
      >
        <div className="flex items-start space-x-3 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-white mb-2">Why This Matters</h4>
            <p className="text-gray-300 leading-relaxed">{content.explanation}</p>
          </div>
        </div>
      </motion.div>

      {/* Conjugation Table (if present) */}
      {content.conjugation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <h4 className="font-semibold text-primary-300 mb-4 flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Conjugation</span>
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {Object.entries(content.conjugation).map(([pronoun, conjugated], index) => (
              <motion.div
                key={pronoun}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="glass-effect p-4 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">{pronoun}</span>
                  <span className="text-white font-bold text-lg">{conjugated}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Examples */}
      {content.examples && content.examples.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h4 className="font-semibold text-primary-300 mb-4">Examples in Action</h4>
          <div className="space-y-4">
            {content.examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass-effect p-4 rounded-xl"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-gradient-to-r from-primary-600 to-secondary-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="text-white font-medium text-lg">{example.es}</p>
                </div>
                <p className="text-gray-400 ml-11 italic">{example.en}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Practice Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-effect p-4 rounded-xl border-l-4 border-green-500"
      >
        <h4 className="font-semibold text-green-300 mb-2">✏️ Quick Practice</h4>
        <p className="text-sm text-gray-400">
          Try creating your own sentences using this grammar pattern. Say them out loud and write them down.
          The more you use it in context, the better you'll remember it!
        </p>
      </motion.div>
    </div>
  );
};

export default GrammarModule;
