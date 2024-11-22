'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MatrixQuestion } from '../../types/question.types';
import { v4 as uuidv4 } from 'uuid';

interface MatrixEditorProps {
  question: MatrixQuestion;
  onChange: (updates: Partial<MatrixQuestion>) => void;
}

export function MatrixEditor({ question, onChange }: MatrixEditorProps) {
  const addColumn = () => {
    const newColumn = { id: uuidv4(), text: '' };
    onChange({
      columns: [...question.columns, newColumn]
    });
  };

  const updateColumn = (columnId: string, text: string) => {
    onChange({
      columns: question.columns.map(col =>
        col.id === columnId ? { ...col, text } : col
      )
    });
  };

  const removeColumn = (columnId: string) => {
    onChange({
      columns: question.columns.filter(col => col.id !== columnId),
      rows: question.rows.map(row => ({
        ...row,
        correctOptions: row.correctOptions.filter(id => id !== columnId)
      }))
    });
  };

  const addRow = () => {
    const newRow = { id: uuidv4(), text: '', correctOptions: [] };
    onChange({
      rows: [...question.rows, newRow]
    });
  };

  const updateRow = (rowId: string, text: string) => {
    onChange({
      rows: question.rows.map(row =>
        row.id === rowId ? { ...row, text } : row
      )
    });
  };

  const removeRow = (rowId: string) => {
    onChange({
      rows: question.rows.filter(row => row.id !== rowId)
    });
  };

  const toggleOption = (rowId: string, columnId: string) => {
    onChange({
      rows: question.rows.map(row => {
        if (row.id !== rowId) return row;
        
        const correctOptions = row.correctOptions.includes(columnId)
          ? row.correctOptions.filter(id => id !== columnId)
          : [...row.correctOptions, columnId];
        
        return { ...row, correctOptions };
      })
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
          placeholder="Enter your matrix/grid question"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Columns</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addColumn}
          >
            Add Column
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {question.columns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-32">
              <div className="space-y-1">
                <Input
                  value={column.text}
                  onChange={(e) => updateColumn(column.id, e.target.value)}
                  placeholder="Column header"
                />
                {question.columns.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => removeColumn(column.id)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Rows</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addRow}
          >
            Add Row
          </Button>
        </div>
        <div className="space-y-2">
          {question.rows.map((row) => (
            <div key={row.id} className="flex items-start gap-2">
              <div className="w-32 space-y-1">
                <Input
                  value={row.text}
                  onChange={(e) => updateRow(row.id, e.target.value)}
                  placeholder="Row label"
                />
                {question.rows.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => removeRow(row.id)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {question.columns.map((column) => (
                  <div key={column.id} className="flex-shrink-0 w-32 flex justify-center">
                    <Checkbox
                      checked={row.correctOptions.includes(column.id)}
                      onCheckedChange={() => toggleOption(row.id, column.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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
          placeholder="Add any additional explanation"
        />
      </div>
    </div>
  );
}
