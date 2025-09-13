
import { Target } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight font-headline">
            DSAlytics
          </h1>
        </div>
      </div>
    </header>
  );
}
