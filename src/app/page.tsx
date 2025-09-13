'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Welcome to DSAlytics
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          Track your Data Structures & Algorithms problem-solving journey, visualize your progress, and stay motivated with our powerful analytics tools.
        </p>
        <Button size="lg" onClick={signInWithGoogle}>
          Get Started - Sign in with Google
        </Button>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        <p>Built for the modern problem solver.</p>
      </footer>
    </div>
  );
}
