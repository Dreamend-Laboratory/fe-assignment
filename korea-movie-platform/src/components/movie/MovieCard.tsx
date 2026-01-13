import { Film, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getGradient, getGradientByIndex } from '@/lib/gradients';
import { cn, formatAudience } from '@/lib/utils';
import { FavoriteButton } from './FavoriteButton';
import { RankBadge } from './RankBadge';

interface MovieCardProps {
  movieCd: string;
  movieNm: string;
  genreAlt?: string;
  prdtYear?: string;
  openDt?: string;
  directors?: string;

  // 박스오피스용
  rank?: number;
  rankInten?: number;
  rankOldAndNew?: 'OLD' | 'NEW';
  audiCnt?: string;
  audiAcc?: string;

  // 즐겨찾기 페이지용
  showFavoriteBadge?: boolean;
  showDeleteButton?: boolean;
  addedAt?: string;
  onDelete?: () => void;

  showFavoriteButton?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;

  // 스타일링
  gradientIndex?: number;
  className?: string;
}

export function MovieCard({
  movieCd,
  movieNm,
  genreAlt,
  prdtYear,
  rank,
  rankInten,
  rankOldAndNew,
  audiCnt,
  audiAcc,
  showFavoriteBadge,
  showDeleteButton,
  addedAt,
  onDelete,
  showFavoriteButton,
  isFavorite,
  onFavoriteToggle,
  gradientIndex,
  className,
}: MovieCardProps) {
  const gradientClass =
    gradientIndex !== undefined ? getGradientByIndex(gradientIndex) : getGradient(movieCd);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.();
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle?.();
  };

  return (
    <Link to={`/movie/${movieCd}`} className={cn('group block', className)}>
      <div className="card-hover">
        {/* 그라디언트 카드 */}
        <div
          className={cn(
            'relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg',
            gradientClass
          )}
        >
          {/* 패턴 오버레이 */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* 어두운 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

          {/* 상단 장식 */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/30 to-transparent" />

          {/* 필름 아이콘 */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-30">
            <Film className="h-8 w-8 text-white" />
          </div>

          {/* 영화 제목 (카드 중앙) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-4">
            <div className="w-8 sm:w-12 h-0.5 bg-white/40 rounded-full mb-2 sm:mb-4" />
            <h3
              className="text-white text-center font-bold text-sm sm:text-lg md:text-xl leading-tight line-clamp-3 px-1 sm:px-2"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)' }}
            >
              {movieNm}
            </h3>
            <div className="w-8 sm:w-12 h-0.5 bg-white/40 rounded-full mt-2 sm:mt-4" />
          </div>

          {/* 하단 연도/장르 표시 */}
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
              {prdtYear && (
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-[10px] sm:text-xs font-medium">
                  {prdtYear}
                </span>
              )}
              {genreAlt && (
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-[10px] sm:text-xs font-medium line-clamp-1 max-w-[80px] sm:max-w-[100px]">
                  {genreAlt.split(',')[0]}
                </span>
              )}
            </div>
          </div>

          {/* 순위 배지 (좌상단) */}
          {rank !== undefined && rankInten !== undefined && rankOldAndNew && (
            <div className="absolute top-3 left-3 z-10">
              <RankBadge rank={rank} rankInten={rankInten} rankOldAndNew={rankOldAndNew} />
            </div>
          )}

          {/* 즐겨찾기 배지 (우상단) */}
          {showFavoriteBadge && (
            <div className="absolute top-3 right-3 z-10">
              <div className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              </div>
            </div>
          )}

          {/* 삭제 버튼 (우상단) */}
          {showDeleteButton && (
            <button
              onClick={handleDeleteClick}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-rose-500 hover:bg-white hover:text-rose-600 active:scale-95 transition-all shadow-md"
              aria-label="삭제"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* 즐겨찾기 버튼 (우상단) */}
          {showFavoriteButton && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
              <FavoriteButton
                isFavorite={isFavorite ?? false}
                onClick={handleFavoriteClick}
                size="sm"
                className="bg-white/90 backdrop-blur-sm shadow-md hover:bg-white"
              />
            </div>
          )}
        </div>

        {/* 영화 정보 */}
        <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-1.5">
          <h3 className="font-semibold text-foreground text-xs sm:text-sm line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {movieNm}
          </h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
            {genreAlt && <span>{genreAlt}</span>}
            {genreAlt && prdtYear && <span className="mx-1">·</span>}
            {prdtYear && <span>{prdtYear}</span>}
          </p>

          {/* 박스오피스 관객수 정보 */}
          {(audiCnt || audiAcc) && (
            <div className="flex flex-wrap gap-2 sm:gap-3 text-[10px] sm:text-xs">
              {audiCnt && (
                <span className="flex items-center gap-1">
                  <span className="px-1 sm:px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded font-medium">
                    오늘
                  </span>
                  <span className="text-foreground font-medium">{formatAudience(audiCnt)}</span>
                </span>
              )}
              {audiAcc && (
                <span className="flex items-center gap-1">
                  <span className="px-1 sm:px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded font-medium">
                    누적
                  </span>
                  <span className="text-foreground font-medium">{formatAudience(audiAcc)}</span>
                </span>
              )}
            </div>
          )}

          {/* 추가 날짜 (즐겨찾기용) */}
          {addedAt && (
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {new Date(addedAt).toLocaleDateString('ko-KR')} 추가
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
