
'use client';

import { useState, useMemo } from 'react';
import { Flame, Star, PlusCircle, Code } from 'lucide-react';
import { Header } from '@/components/header';
import { StatCard } from '@/components/stat-card';
import { CalendarHeatmap } from '@/components/calendar-heatmap';
import { ProblemLogModal } from '@/components/problem-log-modal';
import { ProblemHistoryTable } from '@/components/problem-history-table';
import { TagProgressChart } from '@/components/tag-progress-chart';
import { AiNotesGenerator } from '@/components/ai-notes-generator';
import type { Problem } from '@/lib/dsa';
import { calculateStreaks, getHeatmapData, getTagProgressData } from '@/lib/dsa';
import { Button } from '@/components/ui/button';

interface DashboardProps {
  initialProblems: Problem[];
}

export function Dashboard({ initialProblems }: DashboardProps) {
  const [problems, setProblems] = useState<Problem[]>(initialProblems);

  const streaks = useMemo(() => calculateStreaks(problems), [problems]);
  const heatmapData = useMemo(() => getHeatmapData(problems), [problems]);
  const tagProgressData = useMemo(() => getTagProgressData(problems), [problems]);

  const addProblem = (newProblem: Omit<Problem, 'id'>) => {
    setProblems(prevProblems => [
      ...prevProblems,
      { ...newProblem, id: new Date().toISOString() },
    ].sort((a,b) => a.date.getTime() - b.date.getTime()));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8 space-y-8">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Current Streak" value={`${streaks.currentStreak} Days`} icon={Flame} />
          <StatCard title="Longest Streak" value={`${streaks.longestStreak} Days`} icon={Star} />
          <StatCard title="Problems Solved" value={problems.length} icon={Code} />
          <ProblemLogModal onAddProblem={addProblem}>
             <Button className="w-full h-full text-lg">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Problem
            </Button>
          </ProblemLogModal>
        </section>

        <section>
          <CalendarHeatmap data={heatmapData} />
        </section>

        <section className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
                <ProblemHistoryTable problems={problems} />
            </div>
            <div className="lg:col-span-2">
                <TagProgressChart data={tagProgressData} />
            </div>
        </section>

        <section>
            <AiNotesGenerator problems={problems} />
        </section>

      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        <p>Built for the modern problem solver.</p>
      </footer>
    </div>
  );
}
