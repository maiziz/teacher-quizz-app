'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultipleChoiceQuestion } from '../../types/question.types';
import { Switch } from '@/components/ui/switch';
import { v4 as uuidv4 } from 'uuid';

interface MultipleChoiceEditorProps {
  question: MultipleChoiceQuestion;
  onChange: (updates: Partial<MultipleChoiceQuestion>) => void;
}

export function MultipleChoiceEditor({ question, onChange }: MultipleChoiceEditorProps) {
  const addOption = () => {
    onChange({
      options: [
        ...question.options,
        { id: uuidv4(), text: '', isCorrect: false }
      ]
    });
  };

  const updateOption = (optionId: string, updates: { text?: string; isCorrect?: boolean }) => {
    onChange({
      options: question.options.map(option =>
        option.id === optionId ? { ...option, ...updates } : option
      )
    });
  };

  const removeOption = (optionId: string) => {
    onChange({
      options: question.options.filter(option => option.id !== optionId)
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
          placeholder="Enter your question"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="allowMultiple"
          checked={question.allowMultipleAnswers}
          onCheckedChange={(checked) => onChange({ allowMultipleAnswers: checked })}
        />
        <Label htmlFor="allowMultiple">Allow multiple correct answers</Label>
      </div>

      <div className="space-y-2">
        <Label>Answer Options</Label>
        <div className="space-y-2">
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-4">
              <Checkbox
                id={`correct-${option.id}`}
                checked={option.isCorrect}
                onCheckedChange={(checked) => 
                  updateOption(option.id, { isCorrect: checked as boolean })
                }
              />
              <Input
                className="flex-1"
                value={option.text}
                onChange={(e) => updateOption(option.id, { text: e.target.value })}
                placeholder="Enter option text"
              />
              {question.options.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOption(option.id)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addOption}
      >
        Add Option
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
    </div>
  );
}
