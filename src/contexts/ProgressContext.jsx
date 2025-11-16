import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  // Load initial state from localStorage
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('spanishMissionProgress');
    return saved ? JSON.parse(saved) : {
      completedModules: [],
      currentWeek: 1,
      currentModule: 0,
      streak: 0,
      lastVisit: new Date().toISOString().split('T')[0],
      totalXP: 0,
      achievements: [],
      quizResults: {},
      weekProgress: {}
    };
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem('spanishMissionProgress', JSON.stringify(progress));
  }, [progress]);

  // Update streak on visit
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (progress.lastVisit !== today) {
      if (progress.lastVisit === yesterday) {
        // Consecutive day - increase streak
        setProgress(prev => ({
          ...prev,
          streak: prev.streak + 1,
          lastVisit: today
        }));
        checkStreakAchievements(progress.streak + 1);
      } else if (progress.lastVisit < yesterday) {
        // Missed a day - reset streak
        setProgress(prev => ({
          ...prev,
          streak: 1,
          lastVisit: today
        }));
      }
    }
  }, []);

  const checkStreakAchievements = (streakCount) => {
    const streakMilestones = [3, 7, 14, 30, 60, 100];
    streakMilestones.forEach(milestone => {
      if (streakCount === milestone && !progress.achievements.includes(`streak_${milestone}`)) {
        unlockAchievement(`streak_${milestone}`, `${milestone} Day Streak!`, `You've maintained a ${milestone}-day learning streak!`);
      }
    });
  };

  const completeModule = (moduleId, weekNumber, xpEarned = 50) => {
    if (!progress.completedModules.includes(moduleId)) {
      setProgress(prev => {
        const newProgress = {
          ...prev,
          completedModules: [...prev.completedModules, moduleId],
          totalXP: prev.totalXP + xpEarned,
          weekProgress: {
            ...prev.weekProgress,
            [weekNumber]: (prev.weekProgress[weekNumber] || 0) + 1
          }
        };

        // Check for completion achievements
        checkCompletionAchievements(newProgress);

        return newProgress;
      });
    }
  };

  const checkCompletionAchievements = (currentProgress) => {
    const moduleCounts = [10, 25, 50, 75, 100];
    const completedCount = currentProgress.completedModules.length;

    moduleCounts.forEach(count => {
      if (completedCount >= count && !currentProgress.achievements.includes(`modules_${count}`)) {
        unlockAchievement(`modules_${count}`, `${count} Modules Completed!`, `You've completed ${count} learning modules!`);
      }
    });
  };

  const unlockAchievement = (id, title, description) => {
    if (!progress.achievements.includes(id)) {
      setProgress(prev => ({
        ...prev,
        achievements: [...prev.achievements, id],
        totalXP: prev.totalXP + 100 // Bonus XP for achievement
      }));

      // Show notification (you can customize this)
      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification(title, { body: description });
        }
      }
    }
  };

  const saveQuizResult = (quizId, score, totalQuestions) => {
    setProgress(prev => ({
      ...prev,
      quizResults: {
        ...prev.quizResults,
        [quizId]: {
          score,
          totalQuestions,
          percentage: Math.round((score / totalQuestions) * 100),
          completedAt: new Date().toISOString()
        }
      }
    }));

    // Award XP based on performance
    const xp = Math.round((score / totalQuestions) * 100);
    setProgress(prev => ({
      ...prev,
      totalXP: prev.totalXP + xp
    }));
  };

  const setCurrentLocation = (weekNumber, moduleIndex) => {
    setProgress(prev => ({
      ...prev,
      currentWeek: weekNumber,
      currentModule: moduleIndex
    }));
  };

  const resetProgress = () => {
    const resetData = {
      completedModules: [],
      currentWeek: 1,
      currentModule: 0,
      streak: 0,
      lastVisit: new Date().toISOString().split('T')[0],
      totalXP: 0,
      achievements: [],
      quizResults: {},
      weekProgress: {}
    };
    setProgress(resetData);
    localStorage.setItem('spanishMissionProgress', JSON.stringify(resetData));
  };

  const getWeekCompletion = (weekNumber, totalModules) => {
    const completed = progress.weekProgress[weekNumber] || 0;
    return totalModules > 0 ? Math.round((completed / totalModules) * 100) : 0;
  };

  const isModuleCompleted = (moduleId) => {
    return progress.completedModules.includes(moduleId);
  };

  const isWeekCompleted = (week) => {
    // A week is only completed if it has modules AND all modules are completed
    if (!week.modules || week.modules.length === 0) {
      return false;
    }

    return week.modules.every(module => progress.completedModules.includes(module.moduleId));
  };

  const value = {
    progress,
    completeModule,
    saveQuizResult,
    setCurrentLocation,
    resetProgress,
    getWeekCompletion,
    isModuleCompleted,
    isWeekCompleted,
    unlockAchievement
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
