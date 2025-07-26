import { educationalContent, Course, Lesson, QuizQuestion } from '@/data/educationalContent';

// Export to CSV format
export function exportToCSV(): string {
  let csv = 'Course ID,Course Title,Lesson ID,Lesson Title,Difficulty,Estimated Time,Content Length,Quiz Questions\n';
  
  educationalContent.forEach(course => {
    course.lessons.forEach(lesson => {
      const row = [
        course.id,
        `"${course.title}"`,
        lesson.id,
        `"${lesson.title}"`,
        lesson.difficulty,
        lesson.estimatedTime,
        lesson.content.length,
        lesson.quiz.length
      ].join(',');
      csv += row + '\n';
    });
  });
  
  return csv;
}

// Export quiz questions to CSV
export function exportQuizToCSV(): string {
  let csv = 'Course ID,Lesson ID,Question ID,Question,Option A,Option B,Option C,Option D,Correct Answer,Explanation\n';
  
  educationalContent.forEach(course => {
    course.lessons.forEach(lesson => {
      lesson.quiz.forEach(question => {
        const row = [
          course.id,
          lesson.id,
          question.id,
          `"${question.question}"`,
          `"${question.options[0] || ''}"`,
          `"${question.options[1] || ''}"`,
          `"${question.options[2] || ''}"`,
          `"${question.options[3] || ''}"`,
          question.correctAnswer,
          `"${question.explanation}"`
        ].join(',');
        csv += row + '\n';
      });
    });
  });
  
  return csv;
}

// Export structured data for API consumption
export function exportForAPI() {
  return {
    metadata: {
      totalCourses: educationalContent.length,
      totalLessons: educationalContent.reduce((sum, course) => sum + course.lessons.length, 0),
      totalQuestions: educationalContent.reduce((sum, course) => 
        sum + course.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.quiz.length, 0), 0
      ),
      estimatedTotalHours: educationalContent.reduce((sum, course) => sum + course.estimatedHours, 0),
      lastUpdated: new Date().toISOString()
    },
    courses: educationalContent.map(course => ({
      ...course,
      lessons: course.lessons.map(lesson => ({
        ...lesson,
        contentPreview: lesson.content.substring(0, 200) + '...',
        quizCount: lesson.quiz.length
      }))
    }))
  };
}

// Generate learning statistics
export function generateLearningStats() {
  const stats = {
    coursesByDifficulty: {
      beginner: 0,
      intermediate: 0,
      advanced: 0
    },
    averageQuestionsPerLesson: 0,
    averageTimePerLesson: 0,
    totalContent: 0,
    coursePrerequisites: {} as Record<string, string[]>
  };

  let totalQuestions = 0;
  let totalTime = 0;
  let totalLessons = 0;

  educationalContent.forEach(course => {
    stats.coursePrerequisites[course.id] = course.prerequisites;
    
    course.lessons.forEach(lesson => {
      stats.coursesByDifficulty[lesson.difficulty]++;
      totalQuestions += lesson.quiz.length;
      totalTime += lesson.estimatedTime;
      totalLessons++;
      stats.totalContent += lesson.content.length;
    });
  });

  stats.averageQuestionsPerLesson = Math.round(totalQuestions / totalLessons * 100) / 100;
  stats.averageTimePerLesson = Math.round(totalTime / totalLessons);

  return stats;
}

// Export individual course data
export function exportCourse(courseId: string) {
  const course = educationalContent.find(c => c.id === courseId);
  if (!course) return null;

  return {
    course: {
      ...course,
      totalQuestions: course.lessons.reduce((sum, lesson) => sum + lesson.quiz.length, 0),
      totalContentLength: course.lessons.reduce((sum, lesson) => sum + lesson.content.length, 0)
    },
    lessons: course.lessons.map(lesson => ({
      ...lesson,
      wordCount: lesson.content.split(' ').length,
      readingTime: Math.ceil(lesson.content.split(' ').length / 200) // Average reading speed
    }))
  };
}

// Validate content structure
export function validateContent(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  educationalContent.forEach(course => {
    if (!course.id || !course.title || !course.description) {
      errors.push(`Course ${course.id || 'unknown'} is missing required fields`);
    }

    if (course.lessons.length === 0) {
      errors.push(`Course ${course.id} has no lessons`);
    }

    course.lessons.forEach(lesson => {
      if (!lesson.id || !lesson.title || !lesson.content) {
        errors.push(`Lesson ${lesson.id || 'unknown'} in course ${course.id} is missing required fields`);
      }

      if (lesson.quiz.length === 0) {
        errors.push(`Lesson ${lesson.id} in course ${course.id} has no quiz questions`);
      }

      lesson.quiz.forEach(question => {
        if (!question.question || question.options.length < 2 || !question.explanation) {
          errors.push(`Quiz question ${question.id} in lesson ${lesson.id} is incomplete`);
        }

        if (question.correctAnswer >= question.options.length) {
          errors.push(`Quiz question ${question.id} has invalid correct answer index`);
        }
      });
    });
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}