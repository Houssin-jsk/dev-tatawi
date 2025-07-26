import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code,
  Trophy,
  Star,
  LogOut,
  Award,
  Download,
  Zap
} from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import { Course, UserProgress } from '@/types/course';
import { 
  loadUserProgress, 
  saveUserProgress, 
  calculateLevel, 
  getXPForNextLevel,
  updateCourseProgress,
  isAllCoursesCompleted
} from '@/utils/progressManager';

interface DashboardProps {
  userName: string;
  onBackToLanding: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userName, onBackToLanding }) => {
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalXP: 0,
    level: 1,
    streak: 1,
    courses: [],
    lastUpdated: ''
  });
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    const progress = loadUserProgress();
    setUserProgress(progress);
    setShowCertificate(isAllCoursesCompleted(progress.courses));
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (userProgress.courses.length > 0) {
      saveUserProgress(userProgress);
    }
  }, [userProgress]);

  const handleCourseClick = (courseId: string) => {
    const course = userProgress.courses.find(c => c.id === courseId);
    if (course?.unlocked) {
      navigate(`/course/${courseId}`);
    }
  };


  const handleDownloadCertificate = () => {
    // This would generate and download a PDF certificate
    alert(`🎉 Congratulations ${userName}! Your certificate is being generated...`);
  };

  const xpForCurrentLevel = getXPForNextLevel(userProgress.level);
  const xpProgress = (userProgress.totalXP % xpForCurrentLevel) / xpForCurrentLevel * 100;
  const completedCourses = userProgress.courses.filter(c => c.completed).length;

  return (
    <div className="min-h-screen p-4 md:p-6">
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
                <span className="text-white font-semibold">Level {userProgress.level}</span>
              </div>
              <span className="text-blue-200 text-sm">{userProgress.totalXP} XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <p className="text-xs text-blue-300 mt-2">
              {xpForCurrentLevel - (userProgress.totalXP % xpForCurrentLevel)} XP to next level
            </p>
          </div>

          {/* Completed Courses */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-green-400" />
              <span className="text-white font-semibold">Completed</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {completedCourses}/{userProgress.courses.length}
            </div>
            <p className="text-xs text-blue-300">Courses finished</p>
          </div>

          {/* Current Streak */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-purple-400" />
              <span className="text-white font-semibold">Streak</span>
            </div>
            <div className="text-2xl font-bold text-white">{userProgress.streak}</div>
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
            {userProgress.courses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
                onCourseClick={handleCourseClick}
              />
            ))}
          </div>
        </div>

        {/* Certificate Section */}
        {showCertificate && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.7 }}
                >
                  <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">🎉 Congratulations!</h3>
                <p className="text-green-200 mb-6">
                  You've completed all courses and earned your Developer Certificate!
                </p>
                <motion.button
                  onClick={handleDownloadCertificate}
                  className="flex items-center gap-3 mx-auto px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" />
                  Download Certificate
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}


        {/* Coming Soon Features */}
        {!showCertificate && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-2">More Features Coming Soon!</h3>
              <p className="text-blue-200 mb-4">
                Complete all courses to unlock the final certificate and additional features
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['🎮 Mini-Games', '📝 Quizzes', '🏆 Certificates', '📊 Leaderboards'].map((feature, index) => (
                  <motion.span
                    key={feature}
                    className={`px-3 py-1 rounded-full text-sm ${
                      index === 0 ? 'bg-blue-500/20 text-blue-300' :
                      index === 1 ? 'bg-purple-500/20 text-purple-300' :
                      index === 2 ? 'bg-green-500/20 text-green-300' :
                      'bg-yellow-500/20 text-yellow-300'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {feature}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;