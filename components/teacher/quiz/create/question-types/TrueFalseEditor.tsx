'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrueFalseQuestion } from '../../types/question.types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface TrueFalseEditorProps {
  question: TrueFalseQuestion;
  onChange: (updates: Partial<TrueFalseQuestion>) => void;
}

export function TrueFalseEditor({ question, onChange }: TrueFalseEditorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="questionText">Question Text</Label>
        <Input
          id="questionText"
          value={question.questionText}
          onChange={(e) => onChange({ questionText: e.target.value })}
          placeholder="Enter your true/false question"
        />
      </div>

      <div className="space-y-2">
        <Label>Correct Answer</Label>
        <RadioGroup
          value={question.correctAnswer ? 'true' : 'false'}
          onValueChange={(value) => onChange({ correctAnswer: value === 'true' })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="true" />
            <Label htmlFor="true">True</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="false" />
            <Label htmlFor="false">False</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="points">Points</Label>
        <Input
          id="points"
          type="number"
          value={question.points}
          onChange={(e) => onChange({ points: parseInt(e.target.value) || 0 })}
          className="w-24"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="explanation">Explanation (Optional)</Label>
        <Input
          id="explanation"
          value={question.explanation || ''}
          onChange={(e) => onChange({ explanation: e.target.value })}
          placeholder="Explain why this answer is correct"
        />
      </div>
    </div>
  );
}
