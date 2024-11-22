export type QuestionType = 
  | 'multiple-choice'
  | 'true-false'
  | 'short-answer'
  | 'long-answer'
  | 'matching-pairs'
  | 'ordering'
  | 'fill-blanks'
  | 'matrix';

interface BaseQuestion {
  id: string;
  type: QuestionType;
  questionText: string;
  points: number;
  feedback?: {
    correct?: string;
    incorrect?: string;
  };
  explanation?: string;
  mediaUrl?: string;
}

export interface MultipleChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: MultipleChoiceOption[];
  allowMultipleAnswers: boolean;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short-answer';
  correctAnswer: string;
  caseSensitive?: boolean;
}

export interface LongAnswerQuestion extends BaseQuestion {
  type: 'long-answer';
  sampleAnswer?: string;
  wordLimit?: number;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching-pairs';
  pairs: MatchingPair[];
}

export interface OrderingItem {
  id: string;
  text: string;
  correctPosition: number;
}

export interface OrderingQuestion extends BaseQuestion {
  type: 'ordering';
  items: OrderingItem[];
}

export interface BlankItem {
  id: string;
  prefix: string;
  answer: string;
  suffix: string;
}

export interface FillBlanksQuestion extends BaseQuestion {
  type: 'fill-blanks';
  blanks: BlankItem[];
}

export interface MatrixOption {
  id: string;
  text: string;
}

export interface MatrixRow {
  id: string;
  text: string;
  correctOptions: string[]; // IDs of correct options
}

export interface MatrixQuestion extends BaseQuestion {
  type: 'matrix';
  columns: MatrixOption[];
  rows: MatrixRow[];
}

export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | ShortAnswerQuestion
  | LongAnswerQuestion
  | MatchingQuestion
  | OrderingQuestion
  | FillBlanksQuestion
  | MatrixQuestion;