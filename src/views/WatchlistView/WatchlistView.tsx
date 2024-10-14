// @/src/views/WatchlistView/WatchlistView.tsx
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/src/components/Navbar';
import Sidebar from '@/src/components/Sidebar';
import WatchlistTable from '@/src/components/WatchlistTable';
import { Button } from "@/src/components/shadcn/button";

export default function WatchlistView() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Watchlist</h1>
          {status === 'loading' ? (
            <div>Loading...</div>
          ) : status === 'unauthenticated' ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold mb-4">Please sign in to view your watchlist</h2>
              <Button onClick={() => router.push('/sign-in')}>Sign In</Button>
            </div>
          ) : (
            <WatchlistTable />
          )}
        </main>
      </div>
    </div>
  );
}