import { useState } from 'react';
import { Question, Quiz, QuestionType } from '@/components/teacher/quiz/types/question.types';
import { v4 as uuidv4 } from 'uuid';

export const useQuizForm = () => {
  const [quiz, setQuiz] = useState<Quiz>({
    title: '',
    description: '',
    questions: []
  });

  const addQuestion = (type: QuestionType) => {
    const baseQuestion = {
      id: uuidv4(),
      type,
      questionText: '',
      points: 1,
    };

    let newQuestion: Question;

    switch (type) {
      case 'multiple-choice':
        newQuestion = {
          ...baseQuestion,
          type: 'multiple-choice',
          options: [],
          allowMultipleAnswers: false,
        };
        break;
      case 'true-false':
        newQuestion = {
          ...baseQuestion,
          type: 'true-false',
          correctAnswer: true,
        };
        break;
      case 'short-answer':
        newQuestion = {
          ...baseQuestion,
          type: 'short-answer',
          correctAnswer: '',
          caseSensitive: false,
        };
        break;
      case 'long-answer':
        newQuestion = {
          ...baseQuestion,
          type: 'long-answer',
          sampleAnswer: '',
        };
        break;
      case 'matching-pairs':
        newQuestion = {
          ...baseQuestion,
          type: 'matching-pairs',
          pairs: [],
        };
        break;
      case 'ordering':
        newQuestion = {
          ...baseQuestion,
          type: 'ordering',
          items: [],
        };
        break;
      case 'fill-blanks':
        newQuestion = {
          ...baseQuestion,
          type: 'fill-blanks',
          blanks: [],
        };
        break;
      case 'matrix':
        newQuestion = {
          ...baseQuestion,
          type: 'matrix',
          columns: [],
          rows: [],
        };
        break;
      default:
        throw new Error('Invalid question type');
    }

    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === questionId ? { ...q, ...updates } : q
      ),
    }));
  };

  const removeQuestion = (questionId: string) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId),
    }));
  };

  const duplicateQuestion = (questionId: string) => {
    const question = quiz.questions.find(q => q.id === questionId);
    if (question) {
      const duplicatedQuestion = {
        ...question,
        id: uuidv4(),
        questionText: `${question.questionText} (Copy)`,
      };
      setQuiz(prev => ({
        ...prev,
        questions: [...prev.questions, duplicatedQuestion],
      }));
    }
  };

  const reorderQuestions = (startIndex: number, endIndex: number) => {
    const result = Array.from(quiz.questions);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    setQuiz(prev => ({
      ...prev,
      questions: result,
    }));
  };

  return {
    quiz,
    setQuiz,
    addQuestion,
    updateQuestion,
    removeQuestion,
    duplicateQuestion,
    reorderQuestions,
  };
};
