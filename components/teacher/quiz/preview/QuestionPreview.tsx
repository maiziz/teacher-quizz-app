'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import { Question } from '../types/question.types';

interface QuestionPreviewProps {
  question: Question;
  showAnswerByDefault?: boolean;
}

export function QuestionPreview({ question, showAnswerByDefault = false }: QuestionPreviewProps) {
  const [showAnswer, setShowAnswer] = useState(showAnswerByDefault);
  const [userAnswer, setUserAnswer] = useState<any>(null);

  const renderMultipleChoice = () => {
    const q = question as any;
    return (
      <div className="space-y-4">
        <RadioGroup
          value={userAnswer}
          onValueChange={setUserAnswer}
          className="space-y-2"
        >
          {q.options.map((option: string, index: number) => (
            <div
              key={index}
              className={`flex items-center space-x-2 p-2 rounded ${
                showAnswer && index === q.correctOption
                  ? 'bg-green-100'
                  : showAnswer && userAnswer === index.toString() && index !== q.correctOption
                  ? 'bg-red-100'
                  : ''
              }`}
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
              {showAnswer && index === q.correctOption && (
                <span className="text-green-600 ml-2">(Correct Answer)</span>
              )}
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  const renderTrueFalse = () => {
    const q = question as any;
    return (
      <div className="space-y-4">
        <RadioGroup
          value={userAnswer}
          onValueChange={setUserAnswer}
          className="space-y-2"
        >
          {['True', 'False'].map((option, index) => (
            <div
              key={option}
              className={`flex items-center space-x-2 p-2 rounded ${
                showAnswer && q.correctAnswer === (index === 0)
                  ? 'bg-green-100'
                  : showAnswer && userAnswer === index.toString() && q.correctAnswer !== (index === 0)
                  ? 'bg-red-100'
                  : ''
              }`}
            >
              <RadioGroupItem value={index.toString()} id={`option-${option}`} />
              <Label htmlFor={`option-${option}`}>{option}</Label>
              {showAnswer && q.correctAnswer === (index === 0) && (
                <span className="text-green-600 ml-2">(Correct Answer)</span>
              )}
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  const renderShortAnswer = () => {
    const q = question as any;
    return (
      <div className="space-y-4">
        <Input
          placeholder="Type your answer here"
          value={userAnswer || ''}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        {showAnswer && (
          <div className="mt-2 p-2 bg-green-100 rounded">
            <p className="font-medium">Correct Answer:</p>
            <p>{q.correctAnswer}</p>
          </div>
        )}
      </div>
    );
  };

  const renderLongAnswer = () => {
    const q = question as any;
    return (
      <div className="space-y-4">
        <Textarea
          placeholder="Type your answer here"
          value={userAnswer || ''}
          onChange={(e) => setUserAnswer(e.target.value)}
          rows={4}
        />
        {showAnswer && q.sampleAnswer && (
          <div className="mt-2 p-2 bg-green-100 rounded">
            <p className="font-medium">Sample Answer:</p>
            <p>{q.sampleAnswer}</p>
          </div>
        )}
      </div>
    );
  };

  const renderMatching = () => {
    const q = question as any;
    return (
      <div className="space-y-4">
        {q.pairs.map((pair: any, index: number) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-1 p-2 border rounded">{pair.left}</div>
            <div className="flex-1">
              <Input
                placeholder="Match with..."
                value={userAnswer?.[index] || ''}
                onChange={(e) => {
                  const newAnswers = { ...userAnswer } || {};
                  newAnswers[index] = e.target.value;
                  setUserAnswer(newAnswers);
                }}
              />
            </div>
            {showAnswer && (
              <div className="flex-1 p-2 bg-green-100 rounded">
                {pair.right}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderOrdering = () => {
    const q = question as any;
    return (
      <div className="space-y-4">
        {q.items.map((item: string, index: number) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-2 border rounded"
          >
            <Input
              type="number"
              min={1}
              max={q.items.length}
              value={userAnswer?.[index] || ''}
              onChange={(e) => {
                const newAnswers = { ...userAnswer } || {};
                newAnswers[index] = e.target.value;
                setUserAnswer(newAnswers);
              }}
              className="w-20"
            />
            <div className="flex-1">{item}</div>
            {showAnswer && (
              <div className="text-green-600">
                Correct Position: {index + 1}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderFillInBlanks = () => {
    const q = question as any;
    const parts = q.text.split('___');
    return (
      <div className="space-y-4">
        {parts.map((part: string, index: number) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && (
              <>
                <Input
                  className="w-32 mx-2 inline-block"
                  value={userAnswer?.[index] || ''}
                  onChange={(e) => {
                    const newAnswers = { ...userAnswer } || {};
                    newAnswers[index] = e.target.value;
                    setUserAnswer(newAnswers);
                  }}
                />
                {showAnswer && (
                  <span className="text-green-600">
                    ({q.answers[index]})
                  </span>
                )}
              </>
            )}
          </span>
        ))}
      </div>
    );
  };

  const renderMatrix = () => {
    const q = question as any;
    return (
      <div className="space-y-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2"></th>
              {q.columns.map((col: string, index: number) => (
                <th key={index} className="border p-2">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {q.rows.map((row: string, rowIndex: number) => (
              <tr key={rowIndex}>
                <td className="border p-2">{row}</td>
                {q.columns.map((col: string, colIndex: number) => (
                  <td key={colIndex} className="border p-2">
                    <Checkbox
                      checked={userAnswer?.[`${rowIndex}-${colIndex}`] || false}
                      onCheckedChange={(checked) => {
                        const newAnswers = { ...userAnswer } || {};
                        newAnswers[`${rowIndex}-${colIndex}`] = checked;
                        setUserAnswer(newAnswers);
                      }}
                    />
                    {showAnswer && q.correctCells.includes(`${rowIndex}-${colIndex}`) && (
                      <span className="text-green-600 ml-2">✓</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple-choice':
        return renderMultipleChoice();
      case 'true-false':
        return renderTrueFalse();
      case 'short-answer':
        return renderShortAnswer();
      case 'long-answer':
        return renderLongAnswer();
      case 'matching':
        return renderMatching();
      case 'ordering':
        return renderOrdering();
      case 'fill-in-blanks':
        return renderFillInBlanks();
      case 'matrix':
        return renderMatrix();
      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{question.text}</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Answer
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Answer
              </>
            )}
          </Button>
        </div>

        {question.media && (
          <div className="mt-4">
            <img
              src={question.media}
              alt="Question media"
              className="max-w-full h-auto rounded"
            />
          </div>
        )}

        <div className="mt-4">{renderQuestion()}</div>

        {showAnswer && question.explanation && (
          <div className="mt-4 p-4 bg-blue-50 rounded">
            <p className="font-medium">Explanation:</p>
            <p>{question.explanation}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
