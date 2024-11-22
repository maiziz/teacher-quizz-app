"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

const reports = [
  {
    id: '1',
    title: 'Monthly Progress Report',
    date: 'March 2024',
    type: 'Academic Performance'
  },
  {
    id: '2',
    title: 'Quiz Performance Analysis',
    date: 'February 2024',
    type: 'Assessment Report'
  },
  {
    id: '3',
    title: 'Attendance Report',
    date: 'January 2024',
    type: 'Administrative'
  },
];

export function ReportSection() {
  return (
    <ScrollArea className="h-[300px] pr-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="flex items-center justify-between p-4 border rounded-lg mb-2 hover:bg-accent"
        >
          <div className="flex items-center space-x-4">
            <FileText className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium">{report.title}</h3>
              <div className="flex space-x-2 text-sm text-muted-foreground">
                <span>{report.date}</span>
                <span>•</span>
                <span>{report.type}</span>
              </div>
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