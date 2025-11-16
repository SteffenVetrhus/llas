import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Flame, Target, TrendingUp, Calendar, Award } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import { courseData } from '../data/courseData';

const Dashboard = () => {
  const { progress, getWeekCompletion } = useProgress();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const calculateLevel = (xp) => {
    return Math.floor(xp / 500) + 1;
  };

  const xpToNextLevel = (xp) => {
    const level = calculateLevel(xp);
    return level * 500 - xp;
  };

  const level = calculateLevel(progress.totalXP);
  const xpNeeded = xpToNextLevel(progress.totalXP);
  const xpProgress = ((progress.totalXP % 500) / 500) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="heading-1 mb-2">Your Dashboard</h1>
        <p className="text-gray-400">Track your progress and stay motivated</p>
      </motion.div>

      {/* Top Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {/* Level */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-3 rounded-xl glow">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-primary-400">Lv. {level}</span>
          </div>
          <h3 className="text-sm text-gray-400 mb-2">Your Level</h3>
          <div className="w-full bg-dark-800 rounded-full h-2 mb-2">
            <div
              className="progress-bar"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">{xpNeeded} XP to next level</p>
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 rounded-xl">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-orange-400">{progress.streak}</span>
          </div>
          <h3 className="text-sm text-gray-400 mb-2">Day Streak</h3>
          <p className="text-xs text-gray-500">
            {progress.streak > 0 ? 'Keep it going!' : 'Start your streak today!'}
          </p>
        </motion.div>

        {/* Total XP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-green-400">{progress.totalXP}</span>
          </div>
          <h3 className="text-sm text-gray-400 mb-2">Total XP</h3>
          <p className="text-xs text-gray-500">Experience points earned</p>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-3 rounded-xl">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-yellow-400">{progress.achievements.length}</span>
          </div>
          <h3 className="text-sm text-gray-400 mb-2">Achievements</h3>
          <Link to="/achievements" className="text-xs text-primary-400 hover:text-primary-300">
            View all →
          </Link>
        </motion.div>
      </div>

      {/* Week Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading-2">Week Progress</h2>
          <Calendar className="w-6 h-6 text-primary-400" />
        </div>
        <div className="space-y-4">
          {courseData.course.weeks.map((week) => {
            const totalModules = week.modules?.length || 7; // Default 7 modules per week
            const completion = getWeekCompletion(week.weekNumber, totalModules);
            const isCurrentWeek = week.weekNumber === progress.currentWeek;

            return (
              <Link key={week.weekNumber} to={`/week/${week.weekNumber}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`glass-effect p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    isCurrentWeek ? 'border-2 border-primary-500/50' : 'border border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-primary-400">
                        Week {week.weekNumber}
                      </span>
                      <span className="text-sm text-gray-300">{week.title}</span>
                      {isCurrentWeek && (
                        <span className="badge text-xs">Current</span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-gray-400">
                      {completion}%
                    </span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${completion}%` }}
                      transition={{ delay: 0.5 + week.weekNumber * 0.05, duration: 0.5 }}
                      className="progress-bar"
                    />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading-2">Continue Learning</h2>
          <Target className="w-6 h-6 text-primary-400" />
        </div>

        {progress.completedModules.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">You haven't started any modules yet!</p>
            <Link to="/week/1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="button-primary"
              >
                Start Week 1
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <Link to={`/week/${progress.currentWeek}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-effect p-4 rounded-xl cursor-pointer border-2 border-primary-500/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-primary-400 font-semibold">
                      Week {progress.currentWeek}
                    </span>
                    <p className="text-gray-300 mt-1">
                      {courseData.course.weeks[progress.currentWeek - 1]?.title}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="button-primary"
                  >
                    Continue
                  </motion.button>
                </div>
              </motion.div>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
