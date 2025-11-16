import { motion } from 'framer-motion';
import { Globe, Sparkles } from 'lucide-react';

const CultureModule = ({ content }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-effect p-4 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="w-6 h-6 text-primary-400" />
          <h3 className="font-semibold text-primary-300">Culture Byte</h3>
        </div>
        <p className="text-gray-400 text-sm">
          Language and culture go hand in hand. Understanding cultural context makes you a better communicator.
        </p>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-interactive border-l-4 border-purple-500"
      >
        <div className="flex items-start space-x-4 mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl glow flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-gray-200 leading-relaxed text-lg">
              {content.snippet}
            </p>
          </div>
        </div>

        {/* Image placeholder */}
        {content.imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-xl p-4 text-center"
          >
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg py-12 px-4">
              <Globe className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
              <p className="text-sm text-gray-500">
                Cultural illustration: {content.imageUrl.split('/').pop().replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Did You Know */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-effect p-4 rounded-xl border-l-4 border-yellow-500"
      >
        <h4 className="font-semibold text-yellow-300 mb-2">🌟 Cultural Insight</h4>
        <p className="text-sm text-gray-400">
          These cultural nuances will help you communicate more naturally and avoid misunderstandings.
          Native speakers will appreciate your cultural awareness!
        </p>
      </motion.div>

      {/* Interactive Element */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid sm:grid-cols-2 gap-4"
      >
        <div className="card">
          <h4 className="font-semibold text-primary-300 mb-2">🎭 In Spain</h4>
          <p className="text-sm text-gray-400">
            Different regions may have unique variations in customs and language use.
          </p>
        </div>
        <div className="card">
          <h4 className="font-semibold text-secondary-300 mb-2">🌎 In Latin America</h4>
          <p className="text-sm text-gray-400">
            Each country has its own rich cultural traditions and expressions.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CultureModule;
