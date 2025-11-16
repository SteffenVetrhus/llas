import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Brain, Sparkles } from 'lucide-react';
import { courseData } from '../data/courseData';
import { useProgress } from '../contexts/ProgressContext';

const Home = () => {
  const { progress, isWeekCompleted } = useProgress();
  const totalWeeks = courseData.course.totalWeeks;

  const features = [
    {
      icon: Target,
      title: 'Task-Based Learning',
      description: 'Each week is a real-world mission. Learn what you need to complete it.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'Comprehensible Input',
      description: 'Understand messages first, then learn the grammar. Natural and effective.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Active Recall',
      description: 'Scenario-based quizzes that make your brain work. Build lasting memories.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Sparkles,
      title: 'Contextual Grammar',
      description: 'Grammar as a tool, not a rule. Learn it when you need it for your mission.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-block mb-6"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 rounded-3xl glow-strong">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        <h1 className="heading-1 mb-4 text-shadow">
          Spanish from Scratch
        </h1>
        <h2 className="heading-2 mb-6">The 10-Week Mission</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Crush Duolingo. Learn Spanish the right way with task-based missions,
          comprehensible input, and psychological tricks that make learning stick.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-primary flex items-center space-x-2 text-lg"
            >
              <span>Start Your Mission</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>

          {progress.completedModules.length > 0 && (
            <Link to={`/week/${progress.currentWeek}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="button-secondary flex items-center space-x-2 text-lg"
              >
                <span>Continue Learning</span>
              </motion.button>
            </Link>
          )}
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="card-interactive"
            >
              <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl inline-block mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="heading-3 mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Course Overview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="card mb-12"
      >
        <h3 className="heading-2 mb-6 text-center">Your 10-Week Journey</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {courseData.course.weeks.map((week) => {
            const weekCompleted = isWeekCompleted(week);
            const weekStarted = progress.weekProgress[week.weekNumber] > 0;

            return (
              <Link key={week.weekNumber} to={`/week/${week.weekNumber}`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-effect p-4 rounded-xl cursor-pointer border-2 border-transparent hover:border-primary-500/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-primary-400">Week {week.weekNumber}</span>
                    {weekCompleted ? (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">✓</span>
                      </div>
                    ) : weekStarted ? (
                      <div className="w-6 h-6 bg-orange-500/70 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">•••</span>
                      </div>
                    ) : null}
                  </div>
                  <h4 className="font-bold text-white mb-2">{week.title}</h4>
                  <p className="text-xs text-gray-400 line-clamp-2">{week.mission}</p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="card text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-2">
            {totalWeeks}
          </div>
          <div className="text-gray-400">Weeks of Content</div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            A1
          </div>
          <div className="text-gray-400">Target Level</div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
            {progress.completedModules.length}
          </div>
          <div className="text-gray-400">Modules Completed</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
