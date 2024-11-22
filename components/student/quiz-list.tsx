"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Clock } from "lucide-react";

const quizzes = [
  {
    id: '1',
    title: 'Mathematics Quiz - Algebra',
    dueDate: '2024-04-15',
    duration: '45 minutes',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Science Test - Chemistry',
    dueDate: '2024-04-20',
    duration: '60 minutes',
    status: 'completed'
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
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <p>Due: {quiz.dueDate}</p>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {quiz.duration}
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              quiz.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {quiz.status}
            </span>
          </div>
          {quiz.status === 'pending' && (
            <Button>
              <Play className="h-4 w-4 mr-2" />
              Start Quiz
            </Button>
          )}
        </div>
      ))}
    </ScrollArea>
  );
}