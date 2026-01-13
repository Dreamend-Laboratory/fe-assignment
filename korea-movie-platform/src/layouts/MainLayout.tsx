import { Outlet } from 'react-router-dom';
import { BottomNav, Header } from '@/components/common';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-screen-xl px-3 sm:px-4 py-4 sm:py-6 pb-20 md:pb-6">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
