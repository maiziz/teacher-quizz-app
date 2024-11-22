"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileText, Download, Video, Book } from "lucide-react";

const resources = [
  {
    id: '1',
    title: 'Algebra Fundamentals',
    type: 'pdf',
    size: '2.5 MB',
    icon: FileText
  },
  {
    id: '2',
    title: 'Chemistry Lab Safety',
    type: 'video',
    duration: '15:30',
    icon: Video
  },
  {
    id: '3',
    title: 'History Study Guide',
    type: 'pdf',
    size: '1.8 MB',
    icon: Book
  },
];

export function ResourceLibrary() {
  return (
    <ScrollArea className="h-[300px] pr-4">
      {resources.map((resource) => (
        <div
          key={resource.id}
          className="flex items-center justify-between p-4 border rounded-lg mb-2 hover:bg-accent"
        >
          <div className="flex items-center space-x-4">
            <resource.icon className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-medium">{resource.title}</h3>
              <p className="text-sm text-muted-foreground">
                {resource.type === 'video' ? resource.duration : resource.size}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </ScrollArea>
  );
}