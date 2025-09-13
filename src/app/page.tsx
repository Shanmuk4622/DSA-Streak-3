
import { Dashboard } from '@/components/dashboard';
import { placeholderProblems } from '@/lib/placeholder-data';

export default function Home() {
  // In a real application, you would fetch user-specific data from your database (e.g., Firebase) here.
  // For demonstration, we are passing static placeholder data.
  const problems = placeholderProblems;

  return (
    <main>
      <Dashboard initialProblems={problems} />
    </main>
  );
}
