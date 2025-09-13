
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Dashboard } from '@/components/dashboard';
import { Header } from '@/components/header';
import { useProblems } from '@/hooks/use-problems';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { problems, loading: problemsLoading, addProblem } = useProblems(user?.uid);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Dashboard 
          problems={problems} 
          isLoading={problemsLoading} 
          onAddProblem={addProblem} 
        />
      </main>
    </>
  );
}
