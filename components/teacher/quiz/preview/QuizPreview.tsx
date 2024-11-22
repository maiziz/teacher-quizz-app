'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Quiz } from '../types/quiz.types';
import { QuestionPreview } from './QuestionPreview';
import { Clock, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface QuizPreviewProps {
  quiz: Quiz;
  onSubmit?: (answers: any[]) => void;
}

export function QuizPreview({ quiz, onSubmit }: QuizPreviewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : null);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswer = (answer: any) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit?.(answers);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{quiz.title}</CardTitle>
              <p className="text-sm text-gray-500 mt-1">{quiz.description}</p>
            </div>
            {timeRemaining !== null && (
              <div className="flex items-center space-x-2 text-orange-600">
                <Clock className="h-4 w-4" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
              <span>{progress.toFixed(0)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {currentQuestion && (
        <QuestionPreview
          question={currentQuestion}
          onAnswer={handleAnswer}
          showAnswer={showAnswers}
        />
      )}

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowAnswers(!showAnswers)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showAnswers ? 'Hide Answers' : 'Show Answers'}
          </Button>

          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <Button onClick={handleSubmit}>
              Submit Quiz
            </Button>
          ) : (
            <Button onClick={goToNextQuestion}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {quiz.metadata && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {quiz.metadata.difficulty && (
                <div>
                  <span className="font-medium">Difficulty:</span>{' '}
                  <span className="capitalize">{quiz.metadata.difficulty}</span>
                </div>
              )}
              {quiz.metadata.category && (
                <div>
                  <span className="font-medium">Category:</span>{' '}
                  {quiz.metadata.category}
                </div>
              )}
              {quiz.metadata.estimatedTime && (
                <div>
                  <span className="font-medium">Estimated Time:</span>{' '}
                  {quiz.metadata.estimatedTime} minutes
                </div>
              )}
              {quiz.metadata.tags && quiz.metadata.tags.length > 0 && (
                <div>
                  <span className="font-medium">Tags:</span>{' '}
                  {quiz.metadata.tags.join(', ')}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
