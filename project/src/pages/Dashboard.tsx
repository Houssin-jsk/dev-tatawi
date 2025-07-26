import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code, 
  Trophy, 
  Star, 
  LogOut, 
  Lock,
  CheckCircle,
  Zap
} from 'lucide-react';
import { courses } from '@/data/courses';
import { useProgress } from '@/context/ProgressContext';

interface DashboardProps {
  userName: string;
  onBackToLanding: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userName, onBackToLanding }) => {
  const navigate = useNavigate();
  const { progress, isCourseUnlocked } = useProgress();

  const handleCourseClick = (courseId: string) => {
    if (isCourseUnlocked(courseId)) {
      navigate(`/course/${courseId}`);
    }
  };

  const getCompletedLessonsForCourse = (courseId: string): number => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    
    return course.lessons.filter(lesson => 
      progress.completedLessons.includes(lesson.id)
    ).length;
  };

  const xpForNextLevel = progress.level * 100;
  const xpProgress = (progress.xp % 100) / 100 * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {userName}!
              </h1>
              <p className="text-blue-200">Ready to level up your coding skills?</p>
            </div>
          </div>
          
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* XP Progress */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-400" />
                <span className="text-white font-semibold">Level {progress.level}</span>
              </div>
              <span className="text-blue-200 text-sm">{progress.xp} XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <p className="text-xs text-blue-300 mt-2">
              {xpForNextLevel - (progress.xp % 100)} XP to next level
            </p>
          </div>

          {/* Completed Lessons */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-green-400" />
              <span className="text-white font-semibold">Completed</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {progress.completedLessons.length}
            </div>
            <p className="text-xs text-blue-300">Lessons finished</p>
          </div>

          {/* Current Streak */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-purple-400" />
              <span className="text-white font-semibold">Streak</span>
            </div>
            <div className="text-2xl font-bold text-white">{progress.currentStreak}</div>
            <p className="text-xs text-blue-300">Days learning</p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="mb-8">
          <motion.h2 
            className="text-2xl font-bold text-white mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Learning Path
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => {
              const isUnlocked = isCourseUnlocked(course.id);
              const completedLessons = getCompletedLessonsForCourse(course.id);
              const totalLessons = course.lessons.length;
              const progressPercentage = (completedLessons / totalLessons) * 100;
              const isCompleted = completedLessons === totalLessons;

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={isUnlocked ? { 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  } : {}}
                  className={`relative group ${
                    isUnlocked 
                      ? 'cursor-pointer' 
                      : 'cursor-not-allowed opacity-60'
                  }`}
                  onClick={() => handleCourseClick(course.id)}
                >
                  {/* Main Card */}
                  <div className={`
                    relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 
                    transition-all duration-300 overflow-hidden
                    ${isUnlocked 
                      ? 'hover:bg-white/20 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-white/30' 
                      : ''
                    }
                  `}>
                    
                    {/* Completion Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 500, 
                            delay: 0.5 
                          }}
                        >
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </motion.div>
                      ) : !isUnlocked ? (
                        <Lock className="w-5 h-5 text-gray-400" />
                      ) : null}
                    </div>

                    {/* Course Icon */}
                    <motion.div 
                      className={`${course.bgColor} p-4 rounded-2xl w-fit mb-4 transition-all duration-300`}
                      whileHover={isUnlocked ? { 
                        rotate: [0, -5, 5, 0],
                        scale: 1.1
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-3xl">{course.icon}</div>
                    </motion.div>

                    {/* Course Info */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors duration-200">
                        {course.title}
                      </h3>
                      <p className="text-blue-200 text-sm leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Progress Section */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center text-xs text-blue-300 mb-2">
                        <span className="font-medium">Progress</span>
                        <span className="font-mono">
                          {completedLessons}/{totalLessons} lessons
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full bg-gradient-to-r ${
                            course.color === 'text-orange-500' ? 'from-orange-500 to-orange-400' :
                            course.color === 'text-blue-500' ? 'from-blue-500 to-blue-400' :
                            course.color === 'text-yellow-500' ? 'from-yellow-500 to-yellow-400' :
                            course.color === 'text-gray-500' ? 'from-gray-500 to-gray-400' :
                            course.color === 'text-cyan-500' ? 'from-cyan-500 to-cyan-400' :
                            course.color === 'text-green-500' ? 'from-green-500 to-green-400' :
                            'from-purple-500 to-purple-400'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ 
                            duration: 1.2, 
                            delay: index * 0.1 + 0.5,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </div>

                    {/* XP Display */}
                    <div className="flex items-center gap-2">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      </motion.div>
                      <span className="text-sm text-blue-200 font-medium">
                        {completedLessons * 10} XP earned
                      </span>
                    </div>

                    {/* Locked Overlay */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center backdrop-blur-[1px]">
                        <div className="text-center">
                          <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-400 font-medium">Complete previous course</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;