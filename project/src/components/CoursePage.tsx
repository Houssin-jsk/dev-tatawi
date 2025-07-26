import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle, 
  Lock, 
  Star,
  Trophy,
  Play
} from 'lucide-react';
import { courseContent } from '@/data/courseContent';
import { loadUserProgress, saveUserProgress } from '@/utils/progressManager';
import { UserProgress } from '@/types/course';

const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  
  useEffect(() => {
    const progress = loadUserProgress();
    setUserProgress(progress);
  }, []);

  if (!courseId || !courseContent[courseId] || !userProgress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const course = courseContent[courseId];
  const courseProgress = userProgress.courses.find(c => c.id === courseId);
  
  if (!courseProgress?.unlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center">
          <Lock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-bold mb-4">Course Locked</h1>
          <p className="text-blue-200 mb-6">Complete the previous course to unlock this one</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleLessonClick = (lessonId: string) => {
    navigate(`/lesson/${courseId}/${lessonId}`);
  };

  const isLessonUnlocked = (lessonIndex: number): boolean => {
    if (lessonIndex === 0) return true; // First lesson always unlocked
    const previousLesson = courseProgress.lessons[lessonIndex - 1];
    return previousLesson?.completed || false;
  };

  const completedLessons = courseProgress.lessons.filter(l => l.completed).length;
  const progressPercentage = (completedLessons / course.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
            <p className="text-blue-200">{course.description}</p>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-white font-semibold">Course Progress</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-blue-200">
              <span>{completedLessons}/{course.lessons.length} lessons</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{courseProgress.xpEarned} XP</span>
              </div>
            </div>
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-3">
            <motion.div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
          <p className="text-xs text-blue-300 mt-2">
            {progressPercentage.toFixed(0)}% complete
          </p>
        </motion.div>

        {/* Lessons List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Lessons</h2>
          
          <div className="space-y-4">
            {course.lessons.map((lesson, index) => {
              const isUnlocked = isLessonUnlocked(index);
              const isCompleted = courseProgress.lessons.find(l => l.id === lesson.id)?.completed || false;
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`
                    relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 
                    transition-all duration-300 group
                    ${isUnlocked 
                      ? 'hover:bg-white/20 hover:shadow-lg cursor-pointer' 
                      : 'opacity-60 cursor-not-allowed'
                    }
                  `}
                  onClick={() => isUnlocked && handleLessonClick(lesson.id)}
                >
                  <div className="flex items-center gap-4">
                    {/* Lesson Number/Status */}
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-bold
                      ${isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isUnlocked 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-500 text-gray-300'
                      }
                    `}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : isUnlocked ? (
                        <span>{index + 1}</span>
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {lesson.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-blue-200">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>Lesson {index + 1}</span>
                        </div>
                        {isCompleted && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>+10 XP</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    {isUnlocked && (
                      <motion.div
                        className="flex items-center gap-2 text-blue-300 group-hover:text-white transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <Play className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          {isCompleted ? 'Review' : 'Start'}
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Locked Overlay */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center backdrop-blur-[1px]">
                      <div className="text-center">
                        <Lock className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-400">Complete previous lesson</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Course Completion */}
        {courseProgress.completed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 text-center"
          >
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">🎉 Course Completed!</h3>
            <p className="text-green-200 mb-4">
              Congratulations! You've mastered {course.title}
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-300">
              <Star className="w-5 h-5" />
              <span className="font-semibold">Total XP Earned: {courseProgress.xpEarned}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;