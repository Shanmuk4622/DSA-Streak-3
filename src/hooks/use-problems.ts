
'use client';

import { useState, useEffect, useCallback } from 'react';
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Problem } from '@/lib/dsa';

async function addProblemToFirestore(userId: string, problem: Omit<Problem, 'id'>) {
    const docRef = await addDoc(collection(db, 'users', userId, 'problems'), {
        ...problem,
        date: Timestamp.fromDate(problem.date),
    });
    return docRef.id;
}

async function fetchProblemsFromFirestore(userId: string): Promise<Problem[]> {
    const q = query(collection(db, 'users', userId, 'problems'), orderBy('date', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            date: (data.date as Timestamp).toDate(),
        } as Problem;
    });
}

export function useProblems(userId?: string) {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            setLoading(true);
            fetchProblemsFromFirestore(userId)
                .then(setProblems)
                .catch(console.error)
                .finally(() => setLoading(false));
        } else {
            setProblems([]);
            setLoading(false);
        }
    }, [userId]);

    const addProblem = useCallback(async (newProblem: Omit<Problem, 'id'>) => {
        if (!userId) {
            throw new Error("User is not authenticated.");
        }
        const newId = await addProblemToFirestore(userId, newProblem);
        setProblems(prev => [...prev, { ...newProblem, id: newId }]);
    }, [userId]);

    return { problems, loading, addProblem };
}
