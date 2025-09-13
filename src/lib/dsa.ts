
import { format, differenceInCalendarDays, startOfDay } from 'date-fns';

export const TOPICS = [
  'Array', 'String', 'Hash Table', 'Graph', 'Dynamic Programming', 'Tree', 'Binary Search', 'Linked List', 'Stack', 'Queue', 'Heap', 'Trie', 'Segment Tree', 'Bit Manipulation'
] as const;

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const;

export type Topic = typeof TOPICS[number];
export type Difficulty = typeof DIFFICULTIES[number];

export type Problem = {
  id: string;
  title: string;
  url: string;
  topic: Topic;
  difficulty: Difficulty;
  date: Date;
};

export type Streaks = {
  currentStreak: number;
  longestStreak: number;
};

export function calculateStreaks(problems: Problem[]): Streaks {
  if (problems.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const solvedDates = [
    ...new Set(problems.map(p => startOfDay(p.date).getTime())),
  ].sort((a, b) => a - b);

  if (solvedDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  let longestStreak = 0;
  let currentStreak = 0;

  if (solvedDates.length > 0) {
    longestStreak = 1;
    currentStreak = 1;
    for (let i = 1; i < solvedDates.length; i++) {
      const diff = differenceInCalendarDays(new Date(solvedDates[i]), new Date(solvedDates[i-1]));
      if (diff === 1) {
        currentStreak++;
      } else if (diff > 1) {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, currentStreak);
  }

  const today = startOfDay(new Date());
  const lastSolvedDate = new Date(solvedDates[solvedDates.length - 1]);
  
  const diffFromToday = differenceInCalendarDays(today, lastSolvedDate);

  if (diffFromToday > 1) {
    currentStreak = 0;
  }
  
  return { currentStreak, longestStreak };
}

export type HeatmapData = {
  [date: string]: number;
};

export function getHeatmapData(problems: Problem[]): HeatmapData {
  const data: HeatmapData = {};
  problems.forEach(problem => {
    const dateStr = format(problem.date, 'yyyy-MM-dd');
    data[dateStr] = (data[dateStr] || 0) + 1;
  });
  return data;
}

export type TagProgressData = {
  name: Topic;
  solved: number;
}[];

export function getTagProgressData(problems: Problem[]): TagProgressData {
    const counts = new Map<Topic, number>();
    TOPICS.forEach(topic => counts.set(topic, 0));

    problems.forEach(problem => {
        counts.set(problem.topic, (counts.get(problem.topic) || 0) + 1);
    });

    const data = Array.from(counts.entries()).map(([name, solved]) => ({ name, solved }));
    return data.filter(d => d.solved > 0).sort((a, b) => b.solved - a.solved);
}
