import { Film, Search, Star } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type EmptyStateVariant = 'search' | 'favorites' | 'default';

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

const icons: Record<EmptyStateVariant, typeof Film> = {
  search: Search,
  favorites: Star,
  default: Film,
};

const defaultMessages: Record<EmptyStateVariant, { title: string; description: string }> = {
  search: {
    title: '검색 결과가 없습니다',
    description: '다른 검색어로 다시 시도해보세요.',
  },
  favorites: {
    title: '즐겨찾기한 영화가 없습니다',
    description: '관심 있는 영화를 즐겨찾기에 추가해보세요.',
  },
  default: {
    title: '데이터가 없습니다',
    description: '표시할 데이터가 없습니다.',
  },
};

export function EmptyState({
  variant = 'default',
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const Icon = icons[variant];
  const defaultMessage = defaultMessages[variant];

  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title || defaultMessage.title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6">
        {description || defaultMessage.description}
      </p>
      {action}
    </div>
  );
}
