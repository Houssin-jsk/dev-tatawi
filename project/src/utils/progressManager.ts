import { Course, UserProgress } from '@/types/course';

const STORAGE_KEY = 'devTatawiProgress';

export const getInitialCourses = (): Course[] => [
  {
    id: 'html',
    title: 'HTML Fundamentals',
    description: 'Learn the building blocks of web development - tags, elements, and structure',
    icon: '🏗️',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/20',
    totalLessons: 10,
    completedLessons: 0,
    xpEarned: 0,
    unlocked: true,
    completed: false,
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `html-${i + 1}`,
      title: `HTML Lesson ${i + 1}`,
      completed: false,
      xp: 10
    }))
  },
  {
    id: 'css',
    title: 'CSS Styling',
    description: 'Master layout, colors, animations and responsive design techniques',
    icon: '🎨',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/20',
    totalLessons: 12,
    completedLessons: 0,
    xpEarned: 0,
    unlocked: false,
    completed: false,
    lessons: Array.from({ length: 12 }, (_, i) => ({
      id: `css-${i + 1}`,
      title: `CSS Lesson ${i + 1}`,
      completed: false,
      xp: 12
    }))
  },
  {
    id: 'javascript',
    title: 'JavaScript Magic',
    description: 'Variables, functions, DOM manipulation and interactive web experiences',
    icon: '⚡',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/20',
    totalLessons: 15,
    completedLessons: 0,
    xpEarned: 0,
    unlocked: false,
    completed: false,
    lessons: Array.from({ length: 15 }, (_, i) => ({
      id: `js-${i + 1}`,
      title: `JavaScript Lesson ${i + 1}`,
      completed: false,
      xp: 15
    }))
  },
  {
    id: 'github',
    title: 'GitHub & Git',
    description: 'Version control, commits, branches and collaboration workflows',
    icon: '🔀',
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/20',
    totalLessons: 8,
    completedLessons: 0,
    xpEarned: 0,
    unlocked: false,
    completed: false,
    lessons: Array.from({ length: 8 }, (_, i) => ({
      id: `git-${i + 1}`,
      title: `Git Lesson ${i + 1}`,
      completed: false,
      xp: 20
    }))
  },
  {
    id: 'react',
    title: 'React Development',
    description: 'Components, hooks, props, state management and modern web apps',
    icon: '⚛️',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/20',
    totalLessons: 18,
    completedLessons: 0,
    xpEarned: 0,
    unlocked: false,
    completed: false,
    lessons: Array.from({ length: 18 }, (_, i) => ({
      id: `react-${i + 1}`,
      title: `React Lesson ${i + 1}`,
      completed: false,
      xp: 18
    }))
  },
  {
    id: 'cmd',
    title: 'Command Line',
    description: 'Terminal basics, CLI tools and developer productivity workflows',
    icon: '💻',
    color: 'text-green-500',
    bgColor: 'bg-green-500/20',
    totalLessons: 6,
    completedLessons: 0,
    xpEarned: 0,
    unlocked: false,
    completed: false,
    lessons: Array.from({ length: 6 }, (_, i) => ({
      id: `cmd-${i + 1}`,
      title: `CMD Lesson ${i + 1}`,
      completed: false,
      xp: 25
    }))
  },
  {
    id: 'algorithms',
    title: 'Algorithms & Logic',
    description: 'Problem-solving, data structures and thinking like a programmer',
    icon: '🧠',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/20',
    totalLessons: 20,
    completedLessons: 0,
    xpEarned: 0,
    unlocked: false,
    completed: false,
    lessons: Array.from({ length: 20 }, (_, i) => ({
      id: `algo-${i + 1}`,
      title: `Algorithm Lesson ${i + 1}`,
      completed: false,
      xp: 30
    }))
  }
];

export const loadUserProgress = (): UserProgress => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const progress = JSON.parse(saved);
      return {
        ...progress,
        courses: progress.courses || getInitialCourses()
      };
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
  
  return {
    totalXP: 0,
    level: 1,
    streak: 1,
    courses: getInitialCourses(),
    lastUpdated: new Date().toISOString()
  };
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...progress,
      lastUpdated: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

export const getXPForNextLevel = (level: number): number => {
  return level * 100;
};

export const updateCourseProgress = (
  courses: Course[], 
  courseId: string, 
  lessonId: string
): { updatedCourses: Course[], xpGained: number } => {
  let xpGained = 0;
  
  const updatedCourses = courses.map(course => {
    if (course.id === courseId) {
      const updatedLessons = course.lessons.map(lesson => {
        if (lesson.id === lessonId && !lesson.completed) {
          xpGained = lesson.xp;
          return { ...lesson, completed: true };
        }
        return lesson;
      });
      
      const completedLessons = updatedLessons.filter(l => l.completed).length;
      const xpEarned = updatedLessons.filter(l => l.completed).reduce((sum, l) => sum + l.xp, 0);
      const completed = completedLessons === course.totalLessons;
      
      return {
        ...course,
        lessons: updatedLessons,
        completedLessons,
        xpEarned,
        completed
      };
    }
    return course;
  });
  
  // Update unlock status for next courses
  const finalCourses = updatedCourses.map((course, index) => {
    if (index === 0) return course; // First course always unlocked
    
    const previousCourse = updatedCourses[index - 1];
    return {
      ...course,
      unlocked: previousCourse.completed
    };
  });
  
  return { updatedCourses: finalCourses, xpGained };
};

export const isAllCoursesCompleted = (courses: Course[]): boolean => {
  return courses.every(course => course.completed);
};