
'use client';

import { useState, useTransition } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import type { Problem } from '@/lib/dsa';
import { getAiNotes } from '@/app/actions';

interface AiNotesGeneratorProps {
  problems: Problem[];
}

export function AiNotesGenerator({ problems }: AiNotesGeneratorProps) {
  const [isPending, startTransition] = useTransition();
  const [notes, setNotes] = useState<string | null>(null);
  const [progress, setProgress] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateNotes = () => {
    startTransition(async () => {
      setNotes(null);
      setProgress(null);
      const result = await getAiNotes(problems);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      } else if (result.notes && result.progress) {
        setNotes(result.notes);
        setProgress(result.progress);
        toast({
          title: 'Success!',
          description: 'Your personalized notes have been generated.',
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Progress Insights</CardTitle>
        <CardDescription>
          Generate personalized notes on which topics to focus on based on your problem history.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={handleGenerateNotes} disabled={isPending} className="w-full sm:w-auto">
            <Wand2 className="mr-2 h-4 w-4" />
            {isPending ? 'Generating...' : 'Generate Notes'}
          </Button>
          
          {isPending && (
            <div className="space-y-4 pt-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
            </div>
          )}

          {notes && progress && (
            <div className="space-y-4 pt-4">
              <div className="rounded-lg border bg-card-foreground/5 p-4">
                <h3 className="font-semibold text-primary">Summary</h3>
                <p className="text-sm text-muted-foreground">{progress}</p>
              </div>
               <div className="rounded-lg border bg-card-foreground/5 p-4">
                <h3 className="font-semibold text-primary">Improvement Areas</h3>
                <div className="prose prose-sm prose-invert max-w-none text-muted-foreground">
                  {notes.split('\n').map((line, index) => {
                    const trimmedLine = line.trim();
                    if (trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
                      return <p key={index} className="m-0">{trimmedLine}</p>;
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
