import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, ArrowRight, RotateCcw } from 'lucide-react';

const QuizModule = ({ content, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  const questions = content.questions || [];
  const question = questions[currentQuestion];

  const handleAnswer = (answer) => {
    setUserAnswer(answer);
    const isCorrect = answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();

    setAnswers({
      ...answers,
      [currentQuestion]: { answer, isCorrect }
    });

    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setUserAnswer('');
    } else {
      // Quiz completed
      setQuizCompleted(true);
      const score = Object.values(answers).filter(a => a.isCorrect).length;
      if (onComplete) {
        onComplete(score, questions.length);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowFeedback(false);
    setQuizCompleted(false);
    setUserAnswer('');
  };

  const calculateScore = () => {
    const correct = Object.values(answers).filter(a => a.isCorrect).length;
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };
  };

  if (quizCompleted) {
    const score = calculateScore();
    const isPerfect = score.percentage === 100;
    const isGood = score.percentage >= 70;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        {/* Results Card */}
        <div className={`card border-2 ${
          isPerfect ? 'border-yellow-500/50' : isGood ? 'border-green-500/50' : 'border-orange-500/50'
        }`}>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className={`bg-gradient-to-r ${
                isPerfect ? 'from-yellow-600 to-orange-600' : isGood ? 'from-green-600 to-emerald-600' : 'from-orange-600 to-red-600'
              } p-6 rounded-3xl glow-strong`}>
                <Trophy className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            <h2 className="heading-1 mb-4">
              {isPerfect ? '¡Perfecto!' : isGood ? '¡Bien hecho!' : '¡Buen intento!'}
            </h2>

            <div className="text-6xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-4">
              {score.percentage}%
            </div>

            <p className="text-xl text-gray-300 mb-6">
              You got {score.correct} out of {score.total} correct
            </p>

            <div className="w-full bg-dark-800 rounded-full h-4 mb-8 max-w-md mx-auto">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score.percentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className={`h-4 rounded-full ${
                  isPerfect ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                  isGood ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                  'bg-gradient-to-r from-orange-500 to-red-500'
                }`}
              />
            </div>

            {/* XP Earned */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-effect p-4 rounded-xl inline-block mb-6"
            >
              <p className="text-sm text-gray-400 mb-1">XP Earned</p>
              <p className="text-2xl font-bold text-primary-400">
                +{Math.round((score.correct / score.total) * 100)}
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restartQuiz}
                className="button-secondary flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Review Answers */}
        <div className="card">
          <h3 className="heading-3 mb-4">Review Your Answers</h3>
          <div className="space-y-3">
            {questions.map((q, index) => {
              const userAns = answers[index];
              return (
                <div
                  key={q.questionId}
                  className={`glass-effect p-4 rounded-xl border-l-4 ${
                    userAns?.isCorrect ? 'border-green-500' : 'border-red-500'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {userAns?.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="text-white mb-2">{q.prompt}</p>
                      <p className="text-sm text-gray-400">
                        Your answer: <span className={userAns?.isCorrect ? 'text-green-400' : 'text-red-400'}>
                          {userAns?.answer}
                        </span>
                      </p>
                      {!userAns?.isCorrect && (
                        <p className="text-sm text-green-400">
                          Correct answer: {q.correctAnswer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="glass-effect p-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-primary-400 font-semibold">
            {Object.keys(answers).length} answered
          </span>
        </div>
        <div className="w-full bg-dark-800 rounded-full h-2">
          <motion.div
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            className="progress-bar"
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="card"
        >
          {/* Question Type Badge */}
          <div className="mb-4">
            <span className="badge">
              {question.type === 'fillInBlank' ? '✍️ Fill in the Blank' :
               question.type === 'multipleChoice' ? '✓ Multiple Choice' :
               question.type === 'scenario' ? '🎭 Scenario' : 'Question'}
            </span>
          </div>

          {/* Question */}
          <h3 className="text-xl font-semibold text-white mb-6">
            {question.prompt}
          </h3>

          {/* Answer Options */}
          {question.type === 'multipleChoice' || question.type === 'scenario' ? (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    showFeedback
                      ? option === question.correctAnswer
                        ? 'bg-green-600/30 border-2 border-green-500'
                        : option === userAnswer
                        ? 'bg-red-600/30 border-2 border-red-500'
                        : 'glass-effect opacity-50'
                      : 'glass-effect hover:bg-white/10 border border-white/5 hover:border-primary-500/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      showFeedback && option === question.correctAnswer
                        ? 'bg-green-500 text-white'
                        : showFeedback && option === userAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-primary-600/30 text-primary-300'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-white flex-1">{option}</span>
                    {showFeedback && option === question.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                    {showFeedback && option === userAnswer && option !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            // Fill in the blank
            <div className="space-y-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && userAnswer.trim()) {
                    handleAnswer(userAnswer);
                  }
                }}
                disabled={showFeedback}
                placeholder="Type your answer here..."
                className="input-field"
                autoFocus
              />
              {!showFeedback && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(userAnswer)}
                  disabled={!userAnswer.trim()}
                  className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </motion.button>
              )}
            </div>
          )}

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                <div className={`glass-effect p-4 rounded-xl border-l-4 ${
                  answers[currentQuestion]?.isCorrect ? 'border-green-500' : 'border-orange-500'
                }`}>
                  <div className="flex items-start space-x-3 mb-3">
                    {answers[currentQuestion]?.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    )}
                    <div>
                      <p className={`font-semibold mb-2 ${
                        answers[currentQuestion]?.isCorrect ? 'text-green-400' : 'text-orange-400'
                      }`}>
                        {answers[currentQuestion]?.isCorrect ? 'Correct!' : 'Not quite!'}
                      </p>
                      <p className="text-gray-300 text-sm">{question.feedback}</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextQuestion}
                    className="button-primary w-full flex items-center justify-center space-x-2"
                  >
                    <span>{currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizModule;
