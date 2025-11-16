import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ArrowRight, Trophy } from 'lucide-react';
import { courseData } from '../data/courseData';
import { useProgress } from '../contexts/ProgressContext';
import DialogueModule from '../components/modules/DialogueModule';
import VocabularyModule from '../components/modules/VocabularyModule';
import GrammarModule from '../components/modules/GrammarModule';
import CultureModule from '../components/modules/CultureModule';
import PracticeModule from '../components/modules/PracticeModule';
import QuizModule from '../components/modules/QuizModule';

const ModuleViewer = () => {
  const { weekNumber, moduleId } = useParams();
  const navigate = useNavigate();
  const { completeModule, isModuleCompleted, saveQuizResult } = useProgress();

  // Scroll to top when navigating to a new module
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [moduleId, weekNumber]);

  const week = courseData.course.weeks.find(w => w.weekNumber === parseInt(weekNumber));
  const module = week?.modules?.find(m => m.moduleId === moduleId);
  const moduleIndex = week?.modules?.findIndex(m => m.moduleId === moduleId) || 0;
  const nextModule = week?.modules?.[moduleIndex + 1];

  if (!week || !module) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card text-center">
          <h2 className="heading-2 mb-4">Module not found</h2>
          <Link to="/">
            <button className="button-primary">Go Home</button>
          </Link>
        </div>
      </div>
    );
  }

  const completed = isModuleCompleted(moduleId);

  const handleModuleComplete = () => {
    if (!completed) {
      completeModule(moduleId, parseInt(weekNumber));

      // Show celebration
      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification('Module Completed! 🎉', {
            body: `You earned 50 XP for completing ${module.title}!`
          });
        }
      }
    }
  };

  const handleQuizComplete = (score, total) => {
    saveQuizResult(moduleId, score, total);
    completeModule(moduleId, parseInt(weekNumber));
  };

  const renderModuleContent = () => {
    switch (module.type) {
      case 'comprehensibleInput':
        return <DialogueModule content={module.content} />;
      case 'vocabulary':
        return <VocabularyModule content={module.content} />;
      case 'grammar':
        return <GrammarModule content={module.content} />;
      case 'culture':
        return <CultureModule content={module.content} />;
      case 'practice':
        return <PracticeModule content={module.content} />;
      case 'quiz':
        return <QuizModule content={module.content} onComplete={handleQuizComplete} />;
      default:
        return <div className="card">Module type not supported yet.</div>;
    }
  };

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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(`/week/${weekNumber}`)}
        className="button-secondary flex items-center space-x-2 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Week {weekNumber}</span>
      </motion.button>

      {/* Module Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-4xl">{getModuleIcon(module.type)}</span>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="badge">Week {weekNumber}</span>
                  {completed && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-600/30 border border-green-500/30 text-green-200">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Completed
                    </span>
                  )}
                </div>
                <h1 className="heading-2">{module.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Module Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {renderModuleContent()}
      </motion.div>

      {/* Complete Module Button (for non-quiz modules) */}
      {module.type !== 'quiz' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          {completed ? (
            <div className="card text-center border-2 border-green-500/50">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="heading-3 text-green-400 mb-2">Module Completed!</h3>
              <p className="text-gray-400 mb-4">Great job! Ready for the next challenge?</p>

              {nextModule && (
                <Link to={`/week/${weekNumber}/module/${nextModule.moduleId}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="button-primary flex items-center justify-center space-x-2 mx-auto"
                  >
                    <span>Next Module</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              )}
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleModuleComplete}
              className="button-primary w-full flex items-center justify-center space-x-2 text-lg py-4"
            >
              <Trophy className="w-5 h-5" />
              <span>Mark as Complete & Earn 50 XP</span>
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Navigation to next module after completion */}
      {completed && nextModule && module.type !== 'quiz' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <Link
            to={`/week/${weekNumber}/module/${nextModule.moduleId}`}
            className="text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center space-x-2"
          >
            <span>Continue to: {nextModule.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default ModuleViewer;
