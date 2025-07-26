import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  BookOpen, 
  Code, 
  CheckCircle, 
  X,
  Star,
  Trophy,
  RefreshCw
} from 'lucide-react';
import { courses } from '@/data/courses';
import { useProgress } from '@/context/ProgressContext';

const LessonPage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { progress, completeLesson, isLessonCompleted, unlockCourse } = useProgress();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const course = courses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  
  useEffect(() => {
    if (lessonId && isLessonCompleted(lessonId)) {
      setQuizCompleted(true);
    }
  }, [lessonId, isLessonCompleted]);

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
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

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < lesson.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
    
    // Check if all answers are correct
    const allCorrect = lesson.quiz.every((question, index) => 
      selectedAnswers[index] === question.correctAnswer
    );

    if (allCorrect && !quizCompleted) {
      // Award XP and mark lesson as complete
      completeLesson(lessonId!, 10);
      setQuizCompleted(true);
      
      // Check if this completes the course and unlock next course
      const completedLessonsInCourse = course.lessons.filter(l => 
        isLessonCompleted(l.id) || l.id === lessonId
      ).length;
      
      if (completedLessonsInCourse === course.lessons.length) {
        // Course completed, unlock next course
        const currentCourseIndex = courses.findIndex(c => c.id === courseId);
        if (currentCourseIndex < courses.length - 1) {
          const nextCourse = courses[currentCourseIndex + 1];
          unlockCourse(nextCourse.id);
        }
      }
    }
  };

  const handleRetryQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const correctAnswers = lesson.quiz.filter((question, index) => 
    selectedAnswers[index] === question.correctAnswer
  ).length;

  const allCorrect = correctAnswers === lesson.quiz.length;

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
            onClick={() => navigate(`/course/${courseId}`)}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
            <p className="text-blue-200">{course.title}</p>
          </div>
          {quizCompleted && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-medium">Completed</span>
            </div>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {!showQuiz ? (
            /* Lesson Content */
            <motion.div
              key="lesson-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Content Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">Lesson Content</h2>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <div className="text-blue-100 leading-relaxed whitespace-pre-line">
                    {lesson.content}
                  </div>
                </div>
              </div>

              {/* Code Example */}
              {lesson.codeExample && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Code className="w-6 h-6 text-green-400" />
                    <h2 className="text-2xl font-bold text-white">Code Example</h2>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-300 text-sm">
                      <code>{lesson.codeExample}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Start Quiz Button */}
              <div className="text-center">
                <motion.button
                  onClick={handleStartQuiz}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={quizCompleted}
                >
                  {quizCompleted ? 'Review Quiz' : 'Start Quiz'}
                </motion.button>
              </div>
            </motion.div>
          ) : !showResults ? (
            /* Quiz Questions */
            <motion.div
              key="quiz-questions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Quiz Time!</h2>
                <div className="flex items-center gap-4">
                  <span className="text-blue-200">
                    Question {currentQuestion + 1} of {lesson.quiz.length}
                  </span>
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  {lesson.quiz[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {lesson.quiz[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`
                        w-full p-4 text-left rounded-lg border transition-all duration-200
                        ${selectedAnswers[currentQuestion] === index
                          ? 'bg-blue-500/30 border-blue-500 text-white'
                          : 'bg-white/5 border-white/20 text-blue-100 hover:bg-white/10'
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion === lesson.quiz.length - 1 ? 'Submit Quiz' : 'Next'}
                </button>
              </div>
            </motion.div>
          ) : (
            /* Quiz Results */
            <motion.div
              key="quiz-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              {/* Results Header */}
              <div className={`
                bg-white/10 backdrop-blur-sm rounded-2xl p-8 border text-center
                ${allCorrect ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}
              `}>
                {allCorrect ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-2">🎉 Perfect Score!</h2>
                    <p className="text-green-200 mb-4">
                      You got all {lesson.quiz.length} questions correct!
                    </p>
                    {!quizCompleted && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-center gap-2 text-yellow-300 text-lg font-semibold"
                      >
                        <Star className="w-6 h-6" />
                        <span>You earned 10 XP!</span>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <div>
                    <X className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-2">Try Again!</h2>
                    <p className="text-red-200 mb-4">
                      You got {correctAnswers} out of {lesson.quiz.length} questions correct.
                    </p>
                    <p className="text-blue-200">
                      Review the explanations below and try again to earn XP!
                    </p>
                  </div>
                )}
              </div>

              {/* Question Review */}
              <div className="space-y-4">
                {lesson.quiz.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`
                        bg-white/10 backdrop-blur-sm rounded-xl p-6 border
                        ${isCorrect ? 'border-green-500/30' : 'border-red-500/30'}
                      `}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                        ) : (
                          <X className="w-6 h-6 text-red-400 mt-1" />
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Question {index + 1}: {question.question}
                          </h3>
                          
                          <div className="space-y-2 mb-4">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`
                                  p-3 rounded-lg text-sm
                                  ${optionIndex === question.correctAnswer
                                    ? 'bg-green-500/20 text-green-200 border border-green-500/30'
                                    : optionIndex === userAnswer && !isCorrect
                                      ? 'bg-red-500/20 text-red-200 border border-red-500/30'
                                      : 'bg-white/5 text-blue-100'
                                  }
                                `}
                              >
                                <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span> {option}
                                {optionIndex === question.correctAnswer && (
                                  <span className="ml-2 text-green-400">✓ Correct</span>
                                )}
                                {optionIndex === userAnswer && !isCorrect && (
                                  <span className="ml-2 text-red-400">✗ Your answer</span>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {question.explanation && (
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                              <p className="text-blue-200 text-sm">
                                <strong>Explanation:</strong> {question.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                {!allCorrect && (
                  <motion.button
                    onClick={handleRetryQuiz}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw className="w-5 h-5" />
                    Try Again
                  </motion.button>
                )}
                
                <motion.button
                  onClick={() => navigate(`/course/${courseId}`)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {allCorrect ? 'Continue Learning' : 'Back to Course'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LessonPage;