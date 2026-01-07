import { Outlet } from 'react-router-dom';
import { Header } from '@/components/common';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-screen-xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
