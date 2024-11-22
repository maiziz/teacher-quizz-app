"use client";

import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DataPoint {
  month: string;
  score: number;
}

const data: DataPoint[] = [
  { month: 'Jan', score: 85 },
  { month: 'Feb', score: 78 },
  { month: 'Mar', score: 92 },
  { month: 'Apr', score: 88 },
  { month: 'May', score: 95 },
  { month: 'Jun', score: 90 },
];

export function PerformanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis<DataPoint> 
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            padding={{ left: 10, right: 10 }}
            scale="point"
            type="category"
          />
          <YAxis<DataPoint>
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
            scale="linear"
            type="number"
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Month
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {label}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Score
                        </span>
                        <span className="font-bold">
                          {payload[0].value}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{
              stroke: "hsl(var(--primary))",
              fill: "hsl(var(--background))",
              strokeWidth: 2,
              r: 4,
            }}
            activeDot={{
              stroke: "hsl(var(--primary))",
              fill: "hsl(var(--primary))",
              strokeWidth: 2,
              r: 6,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}