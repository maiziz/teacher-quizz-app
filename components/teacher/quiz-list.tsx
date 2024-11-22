"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit2, Trash2, Copy } from "lucide-react";

const quizzes = [
  {
    id: '1',
    title: 'Mathematics Quiz - Algebra',
    dueDate: '2024-04-15',
    status: 'published'
  },
  {
    id: '2',
    title: 'Science Test - Chemistry',
    dueDate: '2024-04-20',
    status: 'draft'
  },
];

export function QuizList() {
  return (
    <ScrollArea className="h-[300px] pr-4">
      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="flex items-center justify-between p-4 border rounded-lg mb-2 hover:bg-accent"
        >
          <div>
            <h3 className="font-medium">{quiz.title}</h3>
            <p className="text-sm text-muted-foreground">Due: {quiz.dueDate}</p>
            <span className={`text-xs px-2 py-1 rounded-full ${
              quiz.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {quiz.status}
            </span>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}