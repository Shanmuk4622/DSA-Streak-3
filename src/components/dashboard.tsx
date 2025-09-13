
'use client';

import { useMemo } from 'react';
import { Flame, Star, PlusCircle, Code } from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { CalendarHeatmap } from '@/components/calendar-heatmap';
import { ProblemLogModal } from '@/components/problem-log-modal';
import { ProblemHistoryTable } from '@/components/problem-history-table';
import { TagProgressChart } from '@/components/tag-progress-chart';
import { AiNotesGenerator } from '@/components/ai-notes-generator';
import type { Problem } from '@/lib/dsa';
import { calculateStreaks, getHeatmapData, getTagProgressData } from '@/lib/dsa';
import { Button } from '@/components/ui/button';
import { Skeleton } from './ui/skeleton';

interface DashboardProps {
  problems: Problem[];
  isLoading: boolean;
  onAddProblem: (newProblem: Omit<Problem, 'id'>) => Promise<void>;
}

export function Dashboard({ problems, isLoading, onAddProblem }: DashboardProps) {

  const streaks = useMemo(() => calculateStreaks(problems), [problems]);
  const heatmapData = useMemo(() => getHeatmapData(problems), [problems]);
  const tagProgressData = useMemo(() => getTagProgressData(problems), [problems]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-8 space-y-8 animate-pulse">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </section>
        <section>
          <Skeleton className="h-40" />
        </section>
        <section className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Skeleton className="h-96" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-96" />
            </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto p-4 md:p-8 space-y-8">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Current Streak" value={`${streaks.currentStreak} Days`} icon={Flame} />
          <StatCard title="Longest Streak" value={`${streaks.longestStreak} Days`} icon={Star} />
          <StatCard title="Problems Solved" value={problems.length} icon={Code} />
          <ProblemLogModal onAddProblem={onAddProblem}>
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
    </div>
  );
}
