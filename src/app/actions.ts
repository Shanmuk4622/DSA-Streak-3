
'use server';

import { generateProgressTrackerNotes } from '@/ai/flows/generate-progress-tracker-notes';
import type { Problem } from '@/lib/dsa';
import { format } from 'date-fns';

export async function getAiNotes(problems: Problem[]) {
  try {
    const problemHistory = problems
      .map(
        p =>
          `- ${p.title} (Topic: ${p.topic}, Difficulty: ${
            p.difficulty
          }, Date: ${format(p.date, 'yyyy-MM-dd')})`
      )
      .join('\n');

    if (!problemHistory) {
      return {
        notes: "You haven't solved any problems yet. Solve some problems to get personalized notes.",
        progress: "No progress to track yet."
      }
    }
    
    const result = await generateProgressTrackerNotes({ problemHistory });
    return result;
  } catch (error) {
    console.error('Error generating AI notes:', error);
    return { error: 'Failed to generate AI notes. Please try again later.' };
  }
}
