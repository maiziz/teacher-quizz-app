'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QuestionEditor } from './QuestionEditor';
import { QuizPreview } from '../preview/QuizPreview';
import { useQuizForm } from '@/hooks/useQuizForm';
import { Eye } from 'lucide-react';

export function QuizForm() {
  const {
    quiz,
    setQuiz,
    addQuestion,
    updateQuestion,
    removeQuestion,
    duplicateQuestion,
    reorderQuestions,
    saveQuiz,
    publishQuiz,
  } = useQuizForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveQuiz();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Create Quiz</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview Quiz
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Quiz Preview</DialogTitle>
            </DialogHeader>
            <QuizPreview quiz={quiz} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Quiz Title</Label>
            <Input
              id="title"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              placeholder="Enter quiz title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
              placeholder="Enter quiz description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <Input
                id="timeLimit"
                type="number"
                value={quiz.timeLimit || ''}
                onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || undefined })}
                placeholder="Optional"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passingScore">Passing Score (%)</Label>
              <Input
                id="passingScore"
                type="number"
                value={quiz.passingScore || ''}
                onChange={(e) => setQuiz({ ...quiz, passingScore: parseInt(e.target.value) || undefined })}
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={quiz.metadata?.difficulty}
                onValueChange={(value) => setQuiz({
                  ...quiz,
                  metadata: { ...quiz.metadata, difficulty: value as 'easy' | 'medium' | 'hard' }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={quiz.metadata?.category || ''}
                onChange={(e) => setQuiz({
                  ...quiz,
                  metadata: { ...quiz.metadata, category: e.target.value }
                })}
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="shuffleQuestions">Shuffle Questions</Label>
              <Switch
                id="shuffleQuestions"
                checked={quiz.shuffleQuestions || false}
                onCheckedChange={(checked) => setQuiz({ ...quiz, shuffleQuestions: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showFeedback">Show Feedback</Label>
              <Switch
                id="showFeedback"
                checked={quiz.showFeedback || false}
                onCheckedChange={(checked) => setQuiz({ ...quiz, showFeedback: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="allowReview">Allow Review</Label>
              <Switch
                id="allowReview"
                checked={quiz.allowReview || false}
                onCheckedChange={(checked) => setQuiz({ ...quiz, allowReview: checked })}
              />
            </div>
          </div>
        </div>
      </Card>

      <QuestionEditor
        questions={quiz.questions}
        onAddQuestion={addQuestion}
        onUpdateQuestion={updateQuestion}
        onRemoveQuestion={removeQuestion}
        onDuplicateQuestion={duplicateQuestion}
        onReorderQuestions={reorderQuestions}
      />

      <div className="flex justify-end space-x-4">
        <Button variant="outline" type="submit">
          Save as Draft
        </Button>
        <Button
          type="button"
          onClick={publishQuiz}
          disabled={quiz.questions.length === 0}
        >
          Publish Quiz
        </Button>
      </div>
    </form>
  );
}