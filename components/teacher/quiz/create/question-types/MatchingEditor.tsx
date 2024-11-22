'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MatchingQuestion } from '../../types/question.types';
import { v4 as uuidv4 } from 'uuid';

interface MatchingEditorProps {
  question: MatchingQuestion;
  onChange: (updates: Partial<MatchingQuestion>) => void;
}

export function MatchingEditor({ question, onChange }: MatchingEditorProps) {
  const addPair = () => {
    onChange({
      pairs: [
        ...question.pairs,
        { id: uuidv4(), left: '', right: '' }
      ]
    });
  };

  const updatePair = (pairId: string, updates: { left?: string; right?: string }) => {
    onChange({
      pairs: question.pairs.map(pair =>
        pair.id === pairId ? { ...pair, ...updates } : pair
      )
    });
  };

  const removePair = (pairId: string) => {
    onChange({
      pairs: question.pairs.filter(pair => pair.id !== pairId)
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
          placeholder="Enter your matching question"
        />
      </div>

      <div className="space-y-2">
        <Label>Matching Pairs</Label>
        <div className="space-y-2">
          {question.pairs.map((pair) => (
            <div key={pair.id} className="flex items-center space-x-4">
              <Input
                className="flex-1"
                value={pair.left}
                onChange={(e) => updatePair(pair.id, { left: e.target.value })}
                placeholder="Left item"
              />
              <div className="flex-shrink-0">→</div>
              <Input
                className="flex-1"
                value={pair.right}
                onChange={(e) => updatePair(pair.id, { right: e.target.value })}
                placeholder="Right item"
              />
              {question.pairs.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePair(pair.id)}
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
        onClick={addPair}
      >
        Add Pair
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
