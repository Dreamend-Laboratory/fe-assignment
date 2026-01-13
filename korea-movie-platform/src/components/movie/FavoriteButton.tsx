import { Heart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
  variant?: 'star' | 'heart';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FavoriteButton({
  isFavorite,
  onClick,
  variant = 'star',
  size = 'md',
  className,
}: FavoriteButtonProps) {
  const Icon = variant === 'star' ? Star : Heart;

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const buttonSizeClasses = {
    sm: 'p-1',
    md: 'p-1.5',
    lg: 'p-2',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full transition-all hover:scale-110',
        buttonSizeClasses[size],
        isFavorite ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-gray-500',
        className
      )}
      aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
    >
      <Icon className={cn(sizeClasses[size], isFavorite && 'fill-current')} />
    </button>
  );
}
