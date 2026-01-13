import { Film, Heart, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: '박스오피스', icon: Film },
  { path: '/search', label: '검색', icon: Search },
  { path: '/favorites', label: '즐겨찾기', icon: Heart },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t shadow-lg">
      <div className="flex items-center justify-around h-16 px-2 max-w-screen-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors',
                isActive ? 'text-indigo-600' : 'text-gray-400 active:text-gray-600'
              )}
            >
              <div className={cn('p-1.5 rounded-xl transition-all', isActive && 'bg-indigo-100')}>
                <Icon
                  className={cn('h-5 w-5 transition-transform', isActive && 'scale-110')}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span className={cn('text-[10px] font-medium', isActive && 'font-semibold')}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* iOS Safe Area */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
