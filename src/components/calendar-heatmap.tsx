
'use client';

import { subMonths, startOfMonth, endOfMonth, eachDayOfInterval, format, getDay, isSameDay, startOfDay } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { HeatmapData } from '@/lib/dsa';

interface CalendarHeatmapProps {
  data: HeatmapData;
  monthsToShow?: number;
}

const getColorClass = (count: number) => {
  if (count === 0) return 'bg-muted/50';
  if (count <= 2) return 'bg-primary/20';
  if (count <= 4) return 'bg-primary/50';
  return 'bg-primary/80';
};

export function CalendarHeatmap({ data, monthsToShow = 6 }: CalendarHeatmapProps) {
  const endDate = new Date();
  const startDate = startOfMonth(subMonths(endDate, monthsToShow - 1));

  const months = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    months.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4 overflow-x-auto p-1">
        <div className="grid grid-flow-col justify-start gap-2">
            <div className="flex flex-col gap-1 items-start">
                <div className="h-4 text-xs"></div>
                <div className="h-4 text-xs text-muted-foreground">Sun</div>
                <div className="h-4 text-xs text-muted-foreground">Mon</div>
                <div className="h-4 text-xs text-muted-foreground">Tue</div>
                <div className="h-4 text-xs text-muted-foreground">Wed</div>
                <div className="h-4 text-xs text-muted-foreground">Thu</div>
                <div className="h-4 text-xs text-muted-foreground">Fri</div>
                <div className="h-4 text-xs text-muted-foreground">Sat</div>
            </div>
          {months.map((monthStart) => {
            const daysInMonth = eachDayOfInterval({
              start: startOfMonth(monthStart),
              end: endOfMonth(monthStart),
            });
            const firstDayOfMonth = getDay(daysInMonth[0]);

            return (
              <div key={format(monthStart, 'yyyy-MM')} className="flex flex-col gap-1 items-start">
                <div className="h-4 text-xs font-medium text-center w-full mb-1">{format(monthStart, 'MMM')}</div>
                <div className="grid grid-cols-1 grid-rows-7 grid-flow-col gap-1">
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-4 w-4" />
                  ))}
                  {daysInMonth.map((day) => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const count = data[dateStr] || 0;
                    return (
                      <Tooltip key={dateStr} delayDuration={0}>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              'h-4 w-4 rounded-sm',
                              getColorClass(count)
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{`${count} problem${count !== 1 ? 's' : ''} on ${format(day, 'MMM d, yyyy')}`}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="h-3 w-3 rounded-sm bg-muted/50" />
          <div className="h-3 w-3 rounded-sm bg-primary/20" />
          <div className="h-3 w-3 rounded-sm bg-primary/50" />
          <div className="h-3 w-3 rounded-sm bg-primary/80" />
          <span>More</span>
        </div>
      </div>
    </TooltipProvider>
  );
}
