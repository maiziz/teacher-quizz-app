'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShortAnswerQuestion } from '../../types/question.types';
import { Switch } from '@/components/ui/switch';

interface ShortAnswerEditorProps {
  question: ShortAnswerQuestion;
  onChange: (updates: Partial<ShortAnswerQuestion>) => void;
}

export function ShortAnswerEditor({ question, onChange }: ShortAnswerEditorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="questionText">Question Text</Label>
        <Input
          id="questionText"
          value={question.questionText}
          onChange={(e) => onChange({ questionText: e.target.value })}
          placeholder="Enter your question"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="correctAnswer">Correct Answer</Label>
        <Input
          id="correctAnswer"
          value={question.correctAnswer}
          onChange={(e) => onChange({ correctAnswer: e.target.value })}
          placeholder="Enter the correct answer"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="caseSensitive"
          checked={question.caseSensitive}
          onCheckedChange={(checked) => onChange({ caseSensitive: checked })}
        />
        <Label htmlFor="caseSensitive">Case sensitive</Label>
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
          placeholder="Explain what makes a correct answer"
        />
      </div>
    </div>
  );
}
