import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export interface UserProgress {
  xp: number;
  level: number;
  completedLessons: string[];
  unlockedCourses: string[];
  currentStreak: number;
  lastActiveDate: string;
}

interface ProgressState extends UserProgress {}

type ProgressAction =
  | { type: 'COMPLETE_LESSON'; payload: { lessonId: string; xpGained: number } }
  | { type: 'UNLOCK_COURSE'; payload: string }
  | { type: 'LOAD_PROGRESS'; payload: UserProgress }
  | { type: 'RESET_PROGRESS' };

interface ProgressContextType {
  progress: ProgressState;
  completeLesson: (lessonId: string, xpGained: number) => void;
  unlockCourse: (courseId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isCourseUnlocked: (courseId: string) => boolean;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'devTatawiProgress';

const initialState: ProgressState = {
  xp: 0,
  level: 1,
  completedLessons: [],
  unlockedCourses: ['html'], // HTML is unlocked by default
  currentStreak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0]
};

function calculateLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

function progressReducer(state: ProgressState, action: ProgressAction): ProgressState {
  switch (action.type) {
    case 'COMPLETE_LESSON': {
      const { lessonId, xpGained } = action.payload;
      if (state.completedLessons.includes(lessonId)) {
        return state; // Already completed
      }
      
      const newXp = state.xp + xpGained;
      const newLevel = calculateLevel(newXp);
      const today = new Date().toISOString().split('T')[0];
      
      // Update streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      let newStreak = state.currentStreak;
      if (state.lastActiveDate === yesterdayStr) {
        newStreak += 1;
      } else if (state.lastActiveDate !== today) {
        newStreak = 1;
      }
      
      return {
        ...state,
        xp: newXp,
        level: newLevel,
        completedLessons: [...state.completedLessons, lessonId],
        currentStreak: newStreak,
        lastActiveDate: today
      };
    }
    
    case 'UNLOCK_COURSE': {
      const courseId = action.payload;
      if (state.unlockedCourses.includes(courseId)) {
        return state;
      }
      return {
        ...state,
        unlockedCourses: [...state.unlockedCourses, courseId]
      };
    }
    
    case 'LOAD_PROGRESS':
      return action.payload;
    
    case 'RESET_PROGRESS':
      return initialState;
    
    default:
      return state;
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, dispatch] = useReducer(progressReducer, initialState);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedProgress = JSON.parse(saved);
        dispatch({ type: 'LOAD_PROGRESS', payload: parsedProgress });
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [progress]);

  const completeLesson = (lessonId: string, xpGained: number = 10) => {
    dispatch({ type: 'COMPLETE_LESSON', payload: { lessonId, xpGained } });
  };

  const unlockCourse = (courseId: string) => {
    dispatch({ type: 'UNLOCK_COURSE', payload: courseId });
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return progress.completedLessons.includes(lessonId);
  };

  const isCourseUnlocked = (courseId: string): boolean => {
    return progress.unlockedCourses.includes(courseId);
  };

  const resetProgress = () => {
    dispatch({ type: 'RESET_PROGRESS' });
  };

  const value: ProgressContextType = {
    progress,
    completeLesson,
    unlockCourse,
    isLessonCompleted,
    isCourseUnlocked,
    resetProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}