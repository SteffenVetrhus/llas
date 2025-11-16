import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Trophy, Flame, BookOpen, Star, Zap, Award, Lock } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

const Achievements = () => {
  const { progress } = useProgress();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const allAchievements = [
    // Streak achievements
    { id: 'streak_3', icon: Flame, title: '3 Day Streak', description: 'Learn for 3 consecutive days', color: 'from-orange-500 to-red-500', requirement: 3 },
    { id: 'streak_7', icon: Flame, title: '1 Week Streak', description: 'Learn for 7 consecutive days', color: 'from-orange-500 to-red-500', requirement: 7 },
    { id: 'streak_14', icon: Flame, title: '2 Week Streak', description: 'Learn for 14 consecutive days', color: 'from-orange-500 to-red-500', requirement: 14 },
    { id: 'streak_30', icon: Flame, title: '1 Month Streak', description: 'Learn for 30 consecutive days', color: 'from-orange-500 to-red-500', requirement: 30 },
    { id: 'streak_60', icon: Flame, title: '2 Month Streak', description: 'Learn for 60 consecutive days', color: 'from-orange-600 to-red-600', requirement: 60 },
    { id: 'streak_100', icon: Flame, title: '100 Day Streak', description: 'Learn for 100 consecutive days', color: 'from-orange-700 to-red-700', requirement: 100 },

    // Module completion achievements
    { id: 'modules_10', icon: BookOpen, title: 'Getting Started', description: 'Complete 10 modules', color: 'from-blue-500 to-cyan-500', requirement: 10 },
    { id: 'modules_25', icon: BookOpen, title: 'Quarter Way', description: 'Complete 25 modules', color: 'from-blue-500 to-cyan-500', requirement: 25 },
    { id: 'modules_50', icon: Star, title: 'Halfway There', description: 'Complete 50 modules', color: 'from-purple-500 to-pink-500', requirement: 50 },
    { id: 'modules_75', icon: Star, title: 'Almost Done', description: 'Complete 75 modules', color: 'from-purple-500 to-pink-500', requirement: 75 },
    { id: 'modules_100', icon: Award, title: 'Century', description: 'Complete 100 modules', color: 'from-yellow-500 to-orange-500', requirement: 100 },

    // Special achievements
    { id: 'first_module', icon: Zap, title: 'First Steps', description: 'Complete your first module', color: 'from-green-500 to-emerald-500', requirement: 1 },
    { id: 'week_1_complete', icon: Trophy, title: 'Week 1 Master', description: 'Complete all Week 1 modules', color: 'from-green-500 to-emerald-500' },
    { id: 'perfect_quiz', icon: Star, title: 'Perfect Score', description: 'Get 100% on a quiz', color: 'from-yellow-500 to-orange-500' },
  ];

  const isUnlocked = (achievement) => {
    return progress.achievements.includes(achievement.id);
  };

  const getProgress = (achievement) => {
    if (achievement.id.startsWith('streak_')) {
      return Math.min((progress.streak / achievement.requirement) * 100, 100);
    }
    if (achievement.id.startsWith('modules_')) {
      return Math.min((progress.completedModules.length / achievement.requirement) * 100, 100);
    }
    if (achievement.id === 'first_module') {
      return progress.completedModules.length > 0 ? 100 : 0;
    }
    return isUnlocked(achievement) ? 100 : 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="inline-block mb-4">
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-4 rounded-3xl glow">
            <Trophy className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="heading-1 mb-2">Achievements</h1>
        <p className="text-gray-400">
          {progress.achievements.length} of {allAchievements.length} unlocked
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card mb-8"
      >
        <div className="text-center">
          <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
            {Math.round((progress.achievements.length / allAchievements.length) * 100)}%
          </div>
          <p className="text-gray-400 mb-4">Achievement Completion</p>
          <div className="w-full bg-dark-800 rounded-full h-3 max-w-md mx-auto">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(progress.achievements.length / allAchievements.length) * 100}%` }}
              transition={{ delay: 0.3, duration: 1 }}
              className="progress-bar h-3"
            />
          </div>
        </div>
      </motion.div>

      {/* Achievements Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allAchievements.map((achievement, index) => {
          const Icon = achievement.icon;
          const unlocked = isUnlocked(achievement);
          const progressPercent = getProgress(achievement);

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ scale: unlocked ? 1.05 : 1.02 }}
              className={`card relative overflow-hidden ${
                unlocked ? 'border-2 border-yellow-500/30' : 'opacity-60'
              }`}
            >
              {/* Background gradient */}
              {unlocked && (
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-10`} />
              )}

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`bg-gradient-to-r ${achievement.color} p-3 rounded-xl ${unlocked ? 'glow' : 'grayscale'}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {!unlocked && (
                    <Lock className="w-5 h-5 text-gray-500" />
                  )}
                  {unlocked && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="bg-yellow-500 rounded-full p-1"
                    >
                      <Award className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>

                <h3 className={`font-bold mb-2 ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm mb-3 ${unlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                  {achievement.description}
                </p>

                {!unlocked && achievement.requirement && (
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="w-full bg-dark-800 rounded-full h-1.5">
                      <div
                        className={`h-1.5 bg-gradient-to-r ${achievement.color} rounded-full transition-all duration-500`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                {unlocked && (
                  <div className="flex items-center space-x-2">
                    <div className="h-1 flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
                    <span className="text-xs font-semibold text-yellow-500">UNLOCKED</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Motivational Message */}
      {progress.achievements.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 card"
        >
          <p className="text-gray-400 mb-4">
            Start completing modules to unlock achievements!
          </p>
          <p className="text-gray-500 text-sm">
            Each achievement brings bonus XP and shows your progress.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Achievements;
