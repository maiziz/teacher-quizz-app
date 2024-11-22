'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Question, QuestionType } from '../types/question.types';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Copy, Eye, GripVertical, Trash2 } from 'lucide-react';
import { MultipleChoiceEditor } from './question-types/MultipleChoiceEditor';
import { TrueFalseEditor } from './question-types/TrueFalseEditor';
import { ShortAnswerEditor } from './question-types/ShortAnswerEditor';
import { LongAnswerEditor } from './question-types/LongAnswerEditor';
import { MatchingEditor } from './question-types/MatchingEditor';
import { OrderingEditor } from './question-types/OrderingEditor';
import { FillBlanksEditor } from './question-types/FillBlanksEditor';
import { MatrixEditor } from './question-types/MatrixEditor';
import { QuestionPreview } from '../preview/QuestionPreview';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface QuestionEditorProps {
  questions: Question[];
  onAddQuestion: (type: QuestionType) => void;
  onUpdateQuestion: (id: string, updates: Partial<Question>) => void;
  onRemoveQuestion: (id: string) => void;
  onDuplicateQuestion: (id: string) => void;
  onReorderQuestions: (startIndex: number, endIndex: number) => void;
}

export function QuestionEditor({
  questions,
  onAddQuestion,
  onUpdateQuestion,
  onRemoveQuestion,
  onDuplicateQuestion,
  onReorderQuestions,
}: QuestionEditorProps) {
  const questionTypes: { value: QuestionType; label: string }[] = [
    { value: 'multiple-choice', label: 'Multiple Choice' },
    { value: 'true-false', label: 'True/False' },
    { value: 'short-answer', label: 'Short Answer' },
    { value: 'long-answer', label: 'Long Answer' },
    { value: 'matching-pairs', label: 'Matching Pairs' },
    { value: 'ordering', label: 'Ordering' },
    { value: 'fill-blanks', label: 'Fill in the Blanks' },
    { value: 'matrix', label: 'Matrix/Grid' },
  ];

  const renderQuestionEditor = (question: Question) => {
    const commonProps = {
      question,
      onChange: (updates: Partial<Question>) => onUpdateQuestion(question.id, updates),
    };

    switch (question.type) {
      case 'multiple-choice':
        return <MultipleChoiceEditor {...commonProps} question={question} />;
      case 'true-false':
        return <TrueFalseEditor {...commonProps} question={question} />;
      case 'short-answer':
        return <ShortAnswerEditor {...commonProps} question={question} />;
      case 'long-answer':
        return <LongAnswerEditor {...commonProps} question={question} />;
      case 'matching-pairs':
        return <MatchingEditor {...commonProps} question={question} />;
      case 'ordering':
        return <OrderingEditor {...commonProps} question={question} />;
      case 'fill-blanks':
        return <FillBlanksEditor {...commonProps} question={question} />;
      case 'matrix':
        return <MatrixEditor {...commonProps} question={question} />;
      default:
        return null;
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    onReorderQuestions(result.source.index, result.destination.index);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Questions</h3>
        <div className="flex items-center space-x-2">
          <Select onValueChange={onAddQuestion}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Add Question" />
            </SelectTrigger>
            <SelectContent>
              {questionTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {questions.map((question, index) => (
                <Draggable key={question.id} draggableId={question.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="group"
                    >
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-move hover:text-primary"
                            >
                              <GripVertical className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-base">
                              Question {index + 1}
                            </CardTitle>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Question Preview</DialogTitle>
                                </DialogHeader>
                                <QuestionPreview question={question} />
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDuplicateQuestion(question.id)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveQuestion(question.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>{renderQuestionEditor(question)}</CardContent>
                      </Card>
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
  );
}