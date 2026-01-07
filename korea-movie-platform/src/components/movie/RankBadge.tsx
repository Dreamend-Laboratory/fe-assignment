import { TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RankBadgeProps {
  rank: number;
  rankInten: number;
  rankOldAndNew: 'OLD' | 'NEW';
  className?: string;
}

export function RankBadge({
  rank,
  rankInten,
  rankOldAndNew,
  className,
}: RankBadgeProps) {
  const isNew = rankOldAndNew === 'NEW';
  const isUp = rankInten > 0;
  const isDown = rankInten < 0;
  const isSame = rankInten === 0 && !isNew;

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {/* 순위 번호 */}
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/95 backdrop-blur-sm text-sm font-bold text-gray-800 shadow-md">
        {rank}
      </span>

      {/* 순위 변동 */}
      {isNew ? (
        <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold rounded-md shadow-sm">
          <Sparkles className="h-3 w-3" />
          NEW
        </span>
      ) : isUp ? (
        <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-rose-500/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-md shadow-sm">
          <TrendingUp className="h-3 w-3" />
          {rankInten}
        </span>
      ) : isDown ? (
        <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-500/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-md shadow-sm">
          <TrendingDown className="h-3 w-3" />
          {Math.abs(rankInten)}
        </span>
      ) : isSame ? (
        <span className="flex items-center px-1.5 py-0.5 bg-gray-500/80 backdrop-blur-sm text-white rounded-md">
          <Minus className="h-3 w-3" />
        </span>
      ) : null}
    </div>
  );
}
