import { Question } from './question.types';

export interface Quiz {
  id?: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt?: Date;
  updatedAt?: Date;
  timeLimit?: number; // in minutes
  passingScore?: number; // percentage
  shuffleQuestions?: boolean;
  showFeedback?: boolean;
  allowReview?: boolean;
  status: 'draft' | 'published' | 'archived';
  metadata?: {
    category?: string;
    tags?: string[];
    difficulty?: 'easy' | 'medium' | 'hard';
    estimatedTime?: number; // in minutes
  };
}

export interface QuizSubmission {
  id: string;
  quizId: string;
  userId: string;
  answers: {
    questionId: string;
    answer: any; // Type depends on question type
    isCorrect?: boolean;
    points?: number;
  }[];
  score: number;
  startedAt: Date;
  completedAt?: Date;
  timeSpent?: number; // in seconds
  status: 'in-progress' | 'completed' | 'abandoned';
}

export interface QuizStats {
  totalAttempts: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  averageTimeSpent: number;
  questionStats: {
    questionId: string;
    correctAnswers: number;
    incorrectAnswers: number;
    averagePoints: number;
  }[];
}