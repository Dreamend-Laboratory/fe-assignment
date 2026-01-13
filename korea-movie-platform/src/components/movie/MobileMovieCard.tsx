import { Star } from 'lucide-react';
import type { DailyBoxOfficeItem } from '@/api/types';
import { formatDateWithSpaces } from '@/lib/utils';
import { getGradientByIndex } from '@/lib/gradients';
import { cn } from '@/lib/utils';

interface MobileMovieCardProps {
  movie: DailyBoxOfficeItem;
  gradientIndex: number;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export function MobileMovieCard({
  movie,
  gradientIndex,
  isFavorite,
  onFavoriteToggle,
}: MobileMovieCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle();
  };

  return (
    <a
      href={`/movie/${movie.movieCd}`}
      className="flex gap-3 p-3 rounded-2xl bg-white shadow-sm border active:bg-gray-50 transition-colors"
    >
      <div
        className={cn(
          'relative flex-shrink-0 w-[72px] h-[100px] rounded-xl overflow-hidden shadow-md',
          getGradientByIndex(gradientIndex)
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

        {/* 제목 */}
        <div className="absolute inset-0 flex items-center justify-center p-1.5">
          <span className="text-white text-[10px] text-center font-bold line-clamp-3"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            {movie.movieNm}
          </span>
        </div>

        {/* 순위 배지 */}
        <div className="absolute top-1 left-1">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/95 text-[10px] font-bold text-gray-800 shadow">
            {movie.rank}
          </span>
        </div>
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-semibold text-sm text-foreground line-clamp-1">
          {movie.movieNm}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatDateWithSpaces(movie.openDt)} 개봉
        </p>
        <div className="flex flex-wrap gap-2 mt-2 text-xs">
          <span className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded text-[10px] font-medium">오늘</span>
            <span className="font-medium text-xs">{parseInt(movie.audiCnt).toLocaleString()}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded text-[10px] font-medium">누적</span>
            <span className="font-medium text-xs">{parseInt(movie.audiAcc).toLocaleString()}</span>
          </span>
        </div>
      </div>

      {/* 즐겨찾기 버튼 */}
      <button
        onClick={handleFavoriteClick}
        className="self-center w-10 h-10 flex items-center justify-center rounded-xl transition-all active:scale-95"
        aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
      >
        <Star
          className={cn(
            'h-5 w-5 transition-colors',
            isFavorite
              ? 'fill-amber-400 text-amber-400'
              : 'text-gray-300'
          )}
        />
      </button>
    </a>
  );
}
