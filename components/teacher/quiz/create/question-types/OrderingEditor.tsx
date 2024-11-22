'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OrderingQuestion } from '../../types/question.types';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';

interface OrderingEditorProps {
  question: OrderingQuestion;
  onChange: (updates: Partial<OrderingQuestion>) => void;
}

export function OrderingEditor({ question, onChange }: OrderingEditorProps) {
  const addItem = () => {
    const newItems = [...question.items];
    newItems.push({
      id: uuidv4(),
      text: '',
      correctPosition: newItems.length
    });
    onChange({ items: newItems });
  };

  const updateItem = (itemId: string, text: string) => {
    onChange({
      items: question.items.map(item =>
        item.id === itemId ? { ...item, text } : item
      )
    });
  };

  const removeItem = (itemId: string) => {
    const newItems = question.items
      .filter(item => item.id !== itemId)
      .map((item, index) => ({
        ...item,
        correctPosition: index
      }));
    onChange({ items: newItems });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(question.items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    // Update correctPosition for all items
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      correctPosition: index
    }));

    onChange({ items: updatedItems });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="questionText">Question Text</Label>
        <Input
          id="questionText"
          value={question.questionText}
          onChange={(e) => onChange({ questionText: e.target.value })}
          placeholder="Enter your ordering question"
        />
      </div>

      <div className="space-y-2">
        <Label>Items (Drag to set correct order)</Label>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="ordering-items">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {question.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center space-x-4 bg-white p-2 rounded-md border"
                      >
                        <div className="flex-shrink-0 text-gray-500">
                          {index + 1}.
                        </div>
                        <Input
                          className="flex-1"
                          value={item.text}
                          onChange={(e) => updateItem(item.id, e.target.value)}
                          placeholder={`Item ${index + 1}`}
                        />
                        {question.items.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addItem}
      >
        Add Item
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
          placeholder="Explain the correct order"
        />
      </div>
    </div>
  );
}
