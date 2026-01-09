import { Link, useLocation } from 'react-router-dom';
import { Film, Search, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: '박스오피스', icon: Film },
  { path: '/search', label: '영화 검색', icon: Search },
  { path: '/favorites', label: '즐겨찾기', icon: Heart },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-white/20 shadow-sm">
        <div className="container mx-auto flex h-14 sm:h-16 max-w-screen-xl items-center justify-between px-3 sm:px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-base sm:text-lg shadow-lg">
                K
              </div>
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg gradient-text">KOBIS</span>
              <span className="hidden sm:inline text-muted-foreground text-sm ml-1">영화정보</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
