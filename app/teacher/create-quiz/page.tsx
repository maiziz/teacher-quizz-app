'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreateQuiz() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-muted-foreground">Quiz creation form will be added here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
