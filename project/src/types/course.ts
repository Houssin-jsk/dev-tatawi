export interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  xp: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  totalLessons: number;
  completedLessons: number;
  xpEarned: number;
  unlocked: boolean;
  completed: boolean;
  lessons: Lesson[];
}

export interface UserProgress {
  totalXP: number;
  level: number;
  streak: number;
  courses: Course[];
  lastUpdated: string;
}