import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Star, ChevronRight, CheckCircle } from 'lucide-react';
import { Course } from '@/types/course';

interface CourseCardProps {
  course: Course;
  index: number;
  onCourseClick: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index, onCourseClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const progressPercentage = (course.completedLessons / course.totalLessons) * 100;

  const handleClick = () => {
    if (course.unlocked) {
      onCourseClick(course.id);
    }
  };

  const getProgressBarColor = () => {
    switch (course.color) {
      case 'text-orange-500': return 'bg-gradient-to-r from-orange-500 to-orange-400';
      case 'text-blue-500': return 'bg-gradient-to-r from-blue-500 to-blue-400';
      case 'text-yellow-500': return 'bg-gradient-to-r from-yellow-500 to-yellow-400';
      case 'text-gray-500': return 'bg-gradient-to-r from-gray-500 to-gray-400';
      case 'text-cyan-500': return 'bg-gradient-to-r from-cyan-500 to-cyan-400';
      case 'text-green-500': return 'bg-gradient-to-r from-green-500 to-green-400';
      case 'text-purple-500': return 'bg-gradient-to-r from-purple-500 to-purple-400';
      default: return 'bg-gradient-to-r from-blue-500 to-blue-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={course.unlocked ? { 
        scale: 1.05,
        transition: { duration: 0.2 }
      } : {}}
      className={`relative group ${
        course.unlocked 
          ? 'cursor-pointer' 
          : 'cursor-not-allowed opacity-60'
      }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div className={`
        relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 
        transition-all duration-300 overflow-hidden
        ${course.unlocked 
          ? 'hover:bg-white/20 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-white/30' 
          : ''
        }
      `}>
        
        {/* Completion Badge */}
        <div className="absolute top-4 right-4 z-10">
          {course.completed ? (
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
          ) : !course.unlocked ? (
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400" />
              {/* Tooltip */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute -top-12 -left-24 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20 shadow-lg"
                >
                  Complete previous course to unlock
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </motion.div>
              )}
            </div>
          ) : null}
        </div>

        {/* Course Icon */}
        <motion.div 
          className={`${course.bgColor} p-4 rounded-2xl w-fit mb-4 transition-all duration-300`}
          whileHover={course.unlocked ? { 
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
              {course.completedLessons}/{course.totalLessons} lessons
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div 
              className={`h-full rounded-full ${getProgressBarColor()}`}
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

        {/* XP and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </motion.div>
            <span className="text-sm text-blue-200 font-medium">
              {course.xpEarned} XP earned
            </span>
          </div>
          
          {course.unlocked && (
            <motion.div
              animate={{ 
                x: isHovered ? 5 : 0,
                opacity: isHovered ? 1 : 0.7
              }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1"
            >
              <span className="text-xs text-blue-300 font-medium">
                {course.completed ? 'Review' : 'Start'}
              </span>
              <ChevronRight className="w-4 h-4 text-blue-300 group-hover:text-white transition-colors duration-200" />
            </motion.div>
          )}
        </div>

        {/* Locked Overlay */}
        {!course.unlocked && (
          <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center backdrop-blur-[1px]">
            <div className="text-center">
              <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-400 font-medium">Locked</p>
            </div>
          </div>
        )}

        {/* Hover Glow Effect */}
        {course.unlocked && (
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${course.color.replace('text-', '').replace('-500', '')}/10 0%, transparent 70%)`
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default CourseCard;