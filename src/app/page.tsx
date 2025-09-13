
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { BarChart, CalendarCheck, Lightbulb, ListPlus } from 'lucide-react';

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

  const features = [
    {
      icon: <CalendarCheck className="h-10 w-10 text-primary" />,
      title: 'Visualize Your Consistency',
      description: 'The calendar heatmap shows your daily problem-solving activity at a glance, helping you build a consistent habit.',
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: 'Track Progress by Topic',
      description: 'Identify your strengths and weaknesses with a clear breakdown of problems solved across different DSA topics.',
    },
    {
      icon: <ListPlus className="h-10 w-10 text-primary" />,
      title: 'Log Every Solve',
      description: 'Easily log every problem you solve with details like topic, difficulty, and a link to the problem.',
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: 'Get AI-Powered Insights',
      description: 'Leverage AI to analyze your solving history and get personalized recommendations on which topics to focus on next.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center md:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Master DSA, One Problem at a Time.
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                Track your Data Structures & Algorithms journey, visualize your progress, and stay motivated with powerful analytics and AI insights.
              </p>
              <Button size="lg" onClick={signInWithGoogle} className="mt-8">
                Get Started - It's Free
              </Button>
            </div>
            <div className="relative h-64 w-full max-w-md rounded-lg shadow-2xl overflow-hidden">
              <Image
                src="https://picsum.photos/seed/analytics/800/600"
                alt="DSA Analytics Dashboard"
                fill
                priority
                className="object-cover"
                data-ai-hint="code analytics"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-secondary/50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Everything You Need to Succeed</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                DSAlytics provides the tools to turn consistent effort into tangible skills.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-md">
                  {feature.icon}
                  <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Get Started in 3 Easy Steps</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">1</div>
                <h3 className="mt-4 text-xl font-bold">Sign Up</h3>
                <p className="mt-2 text-muted-foreground">Create your free account using your Google account in seconds.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">2</div>
                <h3 className="mt-4 text-xl font-bold">Log Problems</h3>
                <p className="mt-2 text-muted-foreground">Start logging the DSA problems you solve each day.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">3</div>
                <h3 className="mt-4 text-xl font-bold">Track & Improve</h3>
                <p className="mt-2 text-muted-foreground">Use the dashboard and AI insights to guide your learning.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        <p>Built for the modern problem solver.</p>
      </footer>
    </div>
  );
}
