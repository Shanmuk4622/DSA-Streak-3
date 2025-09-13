
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { BarChart, CalendarCheck, Lightbulb, ListPlus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const features = [
    {
      icon: <CalendarCheck className="h-8 w-8 text-primary" />,
      title: 'Visualize Your Consistency',
      description: 'The calendar heatmap shows your daily problem-solving activity, helping you build a consistent habit.',
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: 'Track Progress by Topic',
      description: 'Identify your strengths and weaknesses with a clear breakdown of problems solved across different topics.',
    },
    {
      icon: <ListPlus className="h-8 w-8 text-primary" />,
      title: 'Log Every Solve',
      description: 'Easily log every problem you solve with details like topic, difficulty, and a link to the problem.',
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: 'Get AI-Powered Insights',
      description: 'Leverage AI to analyze your solving history and get personalized recommendations on where to focus next.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
           <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/30 z-0"></div>
           <div className="container mx-auto px-4 relative z-10">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    Master DSA, <span className="text-primary">One Problem at a Time.</span>
                  </h1>
                  <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
                    Track your Data Structures & Algorithms journey, visualize your progress, and stay motivated with powerful analytics and AI insights.
                  </p>
                  <Button size="lg" asChild className="mt-8 text-lg group">
                    <Link href="/login">
                        Get Started - It's Free 
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
                <div className="relative h-80 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border-4 border-primary/20">
                  <Image
                    src="https://picsum.photos/seed/analytics/1200/800"
                    alt="DSA Analytics Dashboard"
                    fill
                    priority
                    className="object-cover"
                    data-ai-hint="code analytics dashboard"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
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
                <Card key={feature.title} className="flex flex-col items-center text-center p-6 bg-card hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="p-4 bg-primary/10 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground flex-1">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Get Started in 3 Easy Steps</h2>
            <div className="relative mt-16">
                 <div className="absolute top-8 left-0 w-full h-0.5 bg-border -z-10 md:block hidden"></div>
                 <div className="grid gap-12 md:grid-cols-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground ring-8 ring-background">1</div>
                    <h3 className="mt-6 text-xl font-bold">Sign Up</h3>
                    <p className="mt-2 text-muted-foreground">Create your free account using Google in seconds.</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground ring-8 ring-background">2</div>
                    <h3 className="mt-6 text-xl font-bold">Log Problems</h3>
                    <p className="mt-2 text-muted-foreground">Start logging the DSA problems you solve each day.</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground ring-8 ring-background">3</div>
                    <h3 className="mt-6 text-xl font-bold">Track & Improve</h3>
                    <p className="mt-2 text-muted-foreground">Use the dashboard and AI insights to guide your learning.</p>
                  </div>
                </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-secondary/50 py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight">Ready to Start Your Streak?</h2>
                <p className="mt-4 text-lg text-muted-foreground">Stop guessing, start growing. Join for free today.</p>
                <Button size="lg" asChild className="mt-8 text-lg group">
                    <Link href="/login">
                        Begin Your Journey
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
        </section>

      </main>
      <footer className="py-6 border-t border-border/50">
        <div className="container mx-auto flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Built for the modern problem solver.</p>
        </div>
      </footer>
    </div>
  );
}
