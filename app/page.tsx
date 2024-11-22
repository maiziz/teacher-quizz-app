import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TeacherDashboard } from '@/components/teacher/dashboard';
import { StudentDashboard } from '@/components/student/dashboard';
import { ParentDashboard } from '@/components/parent/dashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto p-6">
        <Tabs defaultValue="teacher" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="parent">Parent</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="teacher">
            <TeacherDashboard />
          </TabsContent>

          <TabsContent value="student">
            <StudentDashboard />
          </TabsContent>

          <TabsContent value="parent">
            <ParentDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}