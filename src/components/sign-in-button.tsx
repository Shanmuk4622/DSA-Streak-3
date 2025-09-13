'use client';

import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';

export function SignInButton() {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <Button onClick={signInWithGoogle} disabled={loading}>
      <LogIn className="mr-2 h-4 w-4" />
      Sign in with Google
    </Button>
  );
}
