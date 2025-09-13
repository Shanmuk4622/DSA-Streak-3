
'use client';

import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SignInButton() {
  return (
    <Button asChild>
      <Link href="/login">
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Link>
    </Button>
  );
}
