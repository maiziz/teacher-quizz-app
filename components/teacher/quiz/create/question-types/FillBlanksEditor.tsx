'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FillBlanksQuestion } from '../../types/question.types';
import { v4 as uuidv4 } from 'uuid';

interface FillBlanksEditorProps {
  question: FillBlanksQuestion;
  onChange: (updates: Partial<FillBlanksQuestion>) => void;
}

export function FillBlanksEditor({ question, onChange }: FillBlanksEditorProps) {
  const addBlank = () => {
    onChange({
      blanks: [
        ...question.blanks,
        { id: uuidv4(), prefix: '', answer: '', suffix: '' }
      ]
    });
  };

  const updateBlank = (
    blankId: string,
    updates: { prefix?: string; answer?: string; suffix?: string }
  ) => {
    onChange({
      blanks: question.blanks.map(blank =>
        blank.id === blankId ? { ...blank, ...updates } : blank
      )
    });
  };

  const removeBlank = (blankId: string) => {
    onChange({
      blanks: question.blanks.filter(blank => blank.id !== blankId)
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="questionText">Question Text</Label>
        <Input
          id="questionText"
          value={question.questionText}
          onChange={(e) => onChange({ questionText: e.target.value })}
          placeholder="Enter your fill-in-the-blanks question"
        />
      </div>

      <div className="space-y-2">
        <Label>Blanks</Label>
        <div className="space-y-4">
          {question.blanks.map((blank, index) => (
            <div key={blank.id} className="space-y-2 p-4 border rounded-md">
              <div className="flex items-center justify-between">
                <Label>Blank {index + 1}</Label>
                {question.blanks.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBlank(blank.id)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-sm">Text Before</Label>
                  <Input
                    value={blank.prefix}
                    onChange={(e) => updateBlank(blank.id, { prefix: e.target.value })}
                    placeholder="Text before blank"
                  />
                </div>
                <div>
                  <Label className="text-sm">Answer</Label>
                  <Input
                    value={blank.answer}
                    onChange={(e) => updateBlank(blank.id, { answer: e.target.value })}
                    placeholder="Correct answer"
                  />
                </div>
                <div>
                  <Label className="text-sm">Text After</Label>
                  <Input
                    value={blank.suffix}
                    onChange={(e) => updateBlank(blank.id, { suffix: e.target.value })}
                    placeholder="Text after blank"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addBlank}
      >
        Add Blank
      </Button>

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
          placeholder="Add any additional explanation"
        />
      </div>
    </div>
  );
}
