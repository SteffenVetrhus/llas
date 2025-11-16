import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, BookOpen, CheckCircle2, Lock, Play } from 'lucide-react';
import { courseData } from '../data/courseData';
import { useProgress } from '../contexts/ProgressContext';

const WeekOverview = () => {
  const { weekNumber } = useParams();
  const navigate = useNavigate();
  const { progress, isModuleCompleted } = useProgress();

  const week = courseData.course.weeks.find(w => w.weekNumber === parseInt(weekNumber));

  if (!week) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card text-center">
          <h2 className="heading-2 mb-4">Week not found</h2>
          <Link to="/">
            <button className="button-primary">Go Home</button>
          </Link>
        </div>
      </div>
    );
  }

  const hasModules = week.modules && week.modules.length > 0;
  const completedCount = hasModules
    ? week.modules.filter(m => isModuleCompleted(m.moduleId)).length
    : 0;
  const totalModules = week.modules?.length || 0;
  const completionPercentage = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  const getModuleIcon = (type) => {
    const icons = {
      comprehensibleInput: '💬',
      vocabulary: '📚',
      grammar: '⚙️',
      culture: '🌍',
      practice: '🎤',
      quiz: '📝'
    };
    return icons[type] || '📖';
  };

  const getModuleTypeLabel = (type) => {
    const labels = {
      comprehensibleInput: 'Dialogue',
      vocabulary: 'Vocabulary',
      grammar: 'Grammar',
      culture: 'Culture',
      practice: 'Practice',
      quiz: 'Quiz'
    };
    return labels[type] || 'Lesson';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="button-secondary flex items-center space-x-2 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </motion.button>

      {/* Week Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="badge">Week {week.weekNumber}</span>
              {completionPercentage === 100 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-600/30 border border-green-500/30 text-green-200">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Completed
                </span>
              )}
            </div>
            <h1 className="heading-1 mb-4">{week.title}</h1>
          </div>
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 rounded-2xl glow">
            <Target className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Mission */}
        <div className="glass-effect p-4 rounded-xl mb-4">
          <div className="flex items-start space-x-3">
            <Target className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-primary-300 mb-1">Your Mission</h3>
              <p className="text-gray-300">{week.mission}</p>
            </div>
          </div>
        </div>

        {/* Key Concepts */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Key Concepts</h3>
          <div className="flex flex-wrap gap-2">
            {week.keyConcepts.map((concept, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="px-3 py-1 bg-primary-600/20 border border-primary-500/30 rounded-full text-sm text-primary-200"
              >
                {concept}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        {hasModules && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-400">Progress</span>
              <span className="text-primary-400 font-semibold">
                {completedCount} / {totalModules} modules ({completionPercentage}%)
              </span>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="progress-bar h-3"
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Modules List */}
      <div className="space-y-4">
        <h2 className="heading-2 mb-4 flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-primary-400" />
          <span>Learning Modules</span>
        </h2>

        {!hasModules ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card text-center py-12"
          >
            <Lock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="heading-3 mb-2">Coming Soon</h3>
            <p className="text-gray-400 mb-4">
              Modules for this week are being prepared.
            </p>
            <p className="text-sm text-gray-500">
              Week 1 is fully available with all module types!
            </p>
          </motion.div>
        ) : (
          week.modules.map((module, index) => {
            const completed = isModuleCompleted(module.moduleId);
            const isLocked = false; // You can add logic to lock modules based on previous completion

            return (
              <motion.div
                key={module.moduleId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  to={isLocked ? '#' : `/week/${weekNumber}/module/${module.moduleId}`}
                  className={isLocked ? 'pointer-events-none' : ''}
                >
                  <motion.div
                    whileHover={isLocked ? {} : { scale: 1.02, x: 5 }}
                    whileTap={isLocked ? {} : { scale: 0.98 }}
                    className={`card-interactive relative overflow-hidden ${
                      completed ? 'border-2 border-green-500/30' : ''
                    } ${isLocked ? 'opacity-50' : ''}`}
                  >
                    {/* Module number background */}
                    <div className="absolute -right-4 -top-4 text-8xl font-bold text-white/5">
                      {index + 1}
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {/* Icon */}
                        <div className={`text-4xl ${completed ? 'animate-bounce-slow' : ''}`}>
                          {getModuleIcon(module.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-semibold text-primary-400">
                              Module {index + 1}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-secondary-600/30 border border-secondary-500/30 rounded text-secondary-200">
                              {getModuleTypeLabel(module.type)}
                            </span>
                          </div>
                          <h3 className="font-bold text-white mb-1">{module.title}</h3>
                          <p className="text-sm text-gray-400">
                            {module.type === 'quiz'
                              ? `${module.content?.questions?.length || 0} questions`
                              : module.type === 'vocabulary'
                              ? `${module.content?.length || 0} words`
                              : 'Interactive lesson'}
                          </p>
                        </div>
                      </div>

                      {/* Status Icon */}
                      <div>
                        {isLocked ? (
                          <Lock className="w-6 h-6 text-gray-600" />
                        ) : completed ? (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                          >
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                          </motion.div>
                        ) : (
                          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-full glow">
                            <Play className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WeekOverview;
