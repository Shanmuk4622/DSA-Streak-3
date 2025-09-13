
'use client';

import { useState } from 'react';
import type { Problem } from '@/lib/dsa';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ArrowUpDown, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

interface ProblemHistoryTableProps {
  problems: Problem[];
}

type SortKey = 'title' | 'topic' | 'difficulty' | 'date';

export function ProblemHistoryTable({ problems }: ProblemHistoryTableProps) {
    const [sortKey, setSortKey] = useState<SortKey>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const sortedProblems = [...problems].sort((a, b) => {
        let compareA, compareB;

        switch (sortKey) {
            case 'difficulty':
                const difficultyOrder = { Easy: 0, Medium: 1, Hard: 2 };
                compareA = difficultyOrder[a.difficulty];
                compareB = difficultyOrder[b.difficulty];
                break;
            case 'date':
                compareA = a.date.getTime();
                compareB = b.date.getTime();
                break;
            default:
                compareA = a[sortKey];
                compareB = b[sortKey];
        }

        if (compareA < compareB) {
            return sortDirection === 'asc' ? -1 : 1;
        }
        if (compareA > compareB) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const getSortIcon = (key: SortKey) => {
        if (sortKey !== key) {
            return <ArrowUpDown className="ml-2 h-4 w-4 opacity-30" />;
        }
        return sortDirection === 'asc' ? '▲' : '▼';
    }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Problem History</CardTitle>
        <CardDescription>A log of all your solved problems.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative max-h-[400px] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('title')}>
                        Title {getSortIcon('title')}
                    </Button>
                </TableHead>
                <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('topic')}>
                        Topic {getSortIcon('topic')}
                    </Button>
                </TableHead>
                <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('difficulty')}>
                        Difficulty {getSortIcon('difficulty')}
                    </Button>
                </TableHead>
                <TableHead>
                     <Button variant="ghost" onClick={() => handleSort('date')}>
                        Date {getSortIcon('date')}
                    </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProblems.map((problem) => (
                <TableRow key={problem.id}>
                  <TableCell className="font-medium">
                    <a href={problem.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
                      {problem.title}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{problem.topic}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={problem.difficulty === 'Easy' ? 'default' : problem.difficulty === 'Medium' ? 'outline' : 'destructive'} 
                      className={
                        problem.difficulty === 'Easy' ? 'bg-green-700' :
                        problem.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-500' :
                        'bg-red-700'
                      }>
                      {problem.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(problem.date, 'MMM d, yyyy')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
