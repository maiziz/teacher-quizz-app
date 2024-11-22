// User Types
export type UserRole = 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Quiz Types
export type QuestionType = 
  | 'multiple_choice'
  | 'true_false'
  | 'short_answer'
  | 'long_answer'
  | 'matching'
  | 'ordering'
  | 'fill_blanks'
  | 'image_based'
  | 'matrix';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  points: number;
  options?: Option[];
  correctAnswer?: string | string[];
  imageUrl?: string;
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  duration: number; // in minutes
  dueDate?: Date;
  createdBy: string;
  status: 'draft' | 'published' | 'archived';
}

// Analytics Types
export interface Performance {
  quizId: string;
  studentId: string;
  score: number;
  completedAt: Date;
  timeSpent: number;
  answers: Record<string, string | string[]>;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}