
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TOPICS, DIFFICULTIES } from '@/lib/dsa';
import type { Problem } from '@/lib/dsa';
import { useToast } from '@/hooks/use-toast';


const problemSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  url: z.string().url('Please enter a valid URL'),
  topic: z.enum(TOPICS),
  difficulty: z.enum(DIFFICULTIES),
  date: z.date(),
});

type ProblemFormValues = z.infer<typeof problemSchema>;

interface ProblemLogModalProps {
  children: React.ReactNode;
  onAddProblem: (problem: Omit<Problem, 'id'>) => Promise<void>;
}

export function ProblemLogModal({ children, onAddProblem }: ProblemLogModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ProblemFormValues>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: '',
      url: '',
      date: new Date(),
    },
  });

  const onSubmit = async (data: ProblemFormValues) => {
    setIsSubmitting(true);
    try {
      // Ensure the date is always the current date upon submission
      const problemData = { ...data, date: new Date() };
      await onAddProblem(problemData);
      toast({
          title: "Success!",
          description: `Problem "${data.title}" has been logged.`,
      })
      form.reset({ title: '', url: '', date: new Date() });
      setOpen(false);
    } catch (error) {
       toast({
          variant: 'destructive',
          title: "Error",
          description: "Failed to log problem. Please try again.",
      })
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log a New Problem</DialogTitle>
          <DialogDescription>
            Add details about the DSA problem you just solved. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Two Sum" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://leetcode.com/problems/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Topic/Tag</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {TOPICS.map(topic => (
                            <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {DIFFICULTIES.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
             <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary" disabled={isSubmitting}>Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Problem'}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
