'use server';

/**
 * @fileOverview A progress tracker notes generator AI agent.
 *
 * - generateProgressTrackerNotes - A function that generates personalized notes based on DSA problem-solving history.
 * - GenerateProgressTrackerNotesInput - The input type for the generateProgressTrackerNotes function.
 * - GenerateProgressTrackerNotesOutput - The return type for the generateProgressTrackerNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProgressTrackerNotesInputSchema = z.object({
  problemHistory: z
    .string()
    .describe(
      'A string containing the user problem solving history including problem title, topic, difficulty, and date.'
    ),
});
export type GenerateProgressTrackerNotesInput = z.infer<typeof GenerateProgressTrackerNotesInputSchema>;

const GenerateProgressTrackerNotesOutputSchema = z.object({
  notes: z.string().describe('Personalized notes on which tags/topics of DSA problems the user should focus on.'),
  progress: z.string().describe('A short summary of the generated notes.'),
});
export type GenerateProgressTrackerNotesOutput = z.infer<typeof GenerateProgressTrackerNotesOutputSchema>;

export async function generateProgressTrackerNotes(
  input: GenerateProgressTrackerNotesInput
): Promise<GenerateProgressTrackerNotesOutput> {
  return generateProgressTrackerNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProgressTrackerNotesPrompt',
  input: {schema: GenerateProgressTrackerNotesInputSchema},
  output: {schema: GenerateProgressTrackerNotesOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized notes to users for improving their Data Structures and Algorithms (DSA) skills.

  Based on the user's problem-solving history, identify areas where the user needs to focus more to improve their problem-solving skills.

  Problem Solving History:
  {{problemHistory}}

  Provide a list of specific topics or tags the user should prioritize.
  Be concise.
  Also, add one short, one-sentence summary of the notes in the progress field.
  `,
});

const generateProgressTrackerNotesFlow = ai.defineFlow(
  {
    name: 'generateProgressTrackerNotesFlow',
    inputSchema: GenerateProgressTrackerNotesInputSchema,
    outputSchema: GenerateProgressTrackerNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
