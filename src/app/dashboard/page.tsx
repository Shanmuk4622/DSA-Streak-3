
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Dashboard } from '@/components/dashboard';
import { placeholderProblems } from '@/lib/placeholder-data';
import { Header } from '@/components/header';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // In a real application, you would fetch user-specific data from your database (e.g., Firebase) here.
  // For demonstration, we are passing static placeholder data.
  const problems = placeholderProblems;

  return (
    <>
      <Header />
      <main>
        <Dashboard initialProblems={problems} />
      </main>
    </>
  );
}
