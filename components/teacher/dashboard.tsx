"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, BookOpen, Users, MessageSquare, Calendar } from 'lucide-react';
import { QuizList } from './quiz-list';
import { PerformanceChart } from '../charts/performance-chart';
import { MessagingPanel } from '../messaging/messaging-panel';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { useRouter } from 'next/navigation';

export function TeacherDashboard() {
  const router = useRouter();
  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <Button onClick={() => router.push('/teacher/create-quiz')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Quiz
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Quizzes</CardTitle>
            <CardDescription>Manage your created quizzes</CardDescription>
          </CardHeader>
          <CardContent>
            <QuizList />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Class Performance</CardTitle>
            <CardDescription>Average scores across all quizzes</CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Recent communications</CardDescription>
          </CardHeader>
          <CardContent>
            <MessagingPanel />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>Upcoming quiz dates</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}