'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LongAnswerQuestion } from '../../types/question.types';

interface LongAnswerEditorProps {
  question: LongAnswerQuestion;
  onChange: (updates: Partial<LongAnswerQuestion>) => void;
}

export function LongAnswerEditor({ question, onChange }: LongAnswerEditorProps) {
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
        <Label htmlFor="sampleAnswer">Sample Answer (Optional)</Label>
        <Textarea
          id="sampleAnswer"
          value={question.sampleAnswer || ''}
          onChange={(e) => onChange({ sampleAnswer: e.target.value })}
          placeholder="Enter a sample answer"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="wordLimit">Word Limit (Optional)</Label>
        <Input
          id="wordLimit"
          type="number"
          value={question.wordLimit || ''}
          onChange={(e) => onChange({ wordLimit: parseInt(e.target.value) || undefined })}
          placeholder="Enter word limit"
          className="w-32"
        />
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
        <Label htmlFor="explanation">Grading Guidelines (Optional)</Label>
        <Textarea
          id="explanation"
          value={question.explanation || ''}
          onChange={(e) => onChange({ explanation: e.target.value })}
          placeholder="Enter guidelines for grading this answer"
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
}
