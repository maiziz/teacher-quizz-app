"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const messages = [
  {
    id: '1',
    sender: 'John Doe',
    content: 'How is the progress on the math quiz?',
    timestamp: '10:30 AM',
    avatar: 'JD'
  },
  {
    id: '2',
    sender: 'Jane Smith',
    content: 'The science test results are ready',
    timestamp: '11:45 AM',
    avatar: 'JS'
  },
];

export function MessagingPanel() {
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="flex flex-col h-[400px]">
      <ScrollArea className="flex-1 p-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start space-x-4 mb-4">
            <Avatar>
              <AvatarFallback>{message.avatar}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold">{message.sender}</span>
                <span className="text-xs text-muted-foreground">{message.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground">{message.content}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t flex space-x-2">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button>Send</Button>
      </div>
    </div>
  );
}