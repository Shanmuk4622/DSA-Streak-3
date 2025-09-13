
'use client';

import type { User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error?: Error;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, loading, error] = useAuthState(auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };
  
  if (!isClient) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user: user ?? null, loading, error, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
