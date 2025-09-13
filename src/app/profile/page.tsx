
'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useProblems } from '@/hooks/use-problems';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { StatCard } from '@/components/stat-card';
import { calculateStreaks } from '@/lib/dsa';
import { Flame, Star, Code } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { problems, loading: problemsLoading } = useProblems(user?.uid);

  const streaks = useMemo(() => calculateStreaks(problems), [problems]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user || problemsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length-1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name[0] || 'U';
  };


  return (
    <>
      <Header />
      <main className="container mx-auto max-w-4xl py-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your personal account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                    <AvatarFallback className="text-2xl">{getInitials(user.displayName)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                    <p className="text-2xl font-semibold">{user.displayName || 'Anonymous User'}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
            </div>
            <Separator />
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Account Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">User ID:</span> 
                    <span className="text-muted-foreground break-all">{user.uid}</span>
                  </div>
                   <div className="flex flex-col">
                    <span className="font-medium text-foreground">Email:</span> 
                    <span className="text-muted-foreground">{user.email}</span>
                  </div>
                   <div className="flex flex-col">
                    <span className="font-medium text-foreground">Account Created:</span> 
                    <span className="text-muted-foreground">{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">Last Signed In:</span> 
                    <span className="text-muted-foreground">{user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Your problem-solving stats.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard title="Problems Solved" value={problems.length} icon={Code} />
                    <StatCard title="Current Streak" value={`${streaks.currentStreak} Days`} icon={Flame} />
                    <StatCard title="Longest Streak" value={`${streaks.longestStreak} Days`} icon={Star} />
                </div>
            </CardContent>
        </Card>

      </main>
    </>
  );
}
