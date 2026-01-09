import { Star, Film, X, Heart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import { MovieCard } from '@/components/movie';
import { EmptyState } from '@/components/common';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getGradientByIndex } from '@/lib/gradients';

export function FavoritesPage() {
  const { favorites, count, genres, removeFavorite, clearAll } = useFavorites();

  const handleClearAll = () => {
    if (confirm('모든 즐겨찾기를 삭제하시겠습니까?')) {
      clearAll();
    }
  };

  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl sm:rounded-2xl shadow-lg">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">내 즐겨찾기</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-0.5 sm:mt-1">
              저장한 영화 목록을 확인하세요
            </p>
          </div>
        </div>
        {count > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="w-full sm:w-auto text-rose-500 border-rose-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 rounded-xl active:bg-rose-100"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            전체 삭제
          </Button>
        )}
      </div>

      {/* 통계 카드 */}
      {count > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-3 sm:p-5 flex items-center gap-3 sm:gap-4">
            <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md flex-shrink-0">
              <Star className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">{count}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">저장된 영화</p>
            </div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-3 sm:p-5 flex items-center gap-3 sm:gap-4">
            <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md flex-shrink-0">
              <Film className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">{genres.length}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">장르</p>
            </div>
          </div>
        </div>
      )}

      {/* 컨텐츠 영역 */}
      {count === 0 ? (
        <EmptyState
          variant="favorites"
          action={
            <Button
              asChild
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl shadow-md"
            >
              <Link to="/search">영화 검색하기</Link>
            </Button>
          }
        />
      ) : (
        <>
          {/* 데스크톱: 그리드 뷰 */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-6">
            {favorites.map((movie, index) => (
              <MovieCard
                key={movie.movieCd}
                movieCd={movie.movieCd}
                movieNm={movie.movieNm}
                genreAlt={movie.genreAlt}
                prdtYear={movie.prdtYear}
                addedAt={movie.addedAt}
                showFavoriteBadge
                gradientIndex={index}
              />
            ))}
          </div>

          {/* 모바일: 리스트 뷰 */}
          <div className="md:hidden space-y-3">
            {favorites.map((movie, index) => (
              <MobileFavoriteCard
                key={movie.movieCd}
                movie={movie}
                gradientIndex={index}
                onRemove={() => removeFavorite(movie.movieCd)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// 모바일용 즐겨찾기 카드
function MobileFavoriteCard({
  movie,
  gradientIndex,
  onRemove,
}: {
  movie: {
    movieCd: string;
    movieNm: string;
    genreAlt?: string;
    prdtYear?: string;
    addedAt: string;
  };
  gradientIndex: number;
  onRemove: () => void;
}) {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove();
  };

  return (
    <Link
      to={`/movie/${movie.movieCd}`}
      className="flex gap-3 p-3 rounded-xl bg-white shadow-sm border active:bg-gray-50 transition-colors"
    >
      {/* 포스터 */}
      <div
        className={cn(
          'relative flex-shrink-0 w-[72px] h-[100px] rounded-lg overflow-hidden shadow-md',
          getGradientByIndex(gradientIndex)
        )}
      >
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

        {/* 제목 */}
        <div className="absolute inset-0 flex items-center justify-center p-1.5">
          <span className="text-white text-[10px] text-center font-bold line-clamp-3"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            {movie.movieNm}
          </span>
        </div>

        {/* 즐겨찾기 배지 */}
        <div className="absolute top-1 right-1">
          <div className="p-0.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
            <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
          </div>
        </div>
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-semibold text-sm text-foreground line-clamp-1">
          {movie.movieNm}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
          {movie.genreAlt && <span>{movie.genreAlt}</span>}
          {movie.genreAlt && movie.prdtYear && <span className="mx-1">·</span>}
          {movie.prdtYear && <span>{movie.prdtYear}</span>}
        </p>
        <p className="text-[10px] text-muted-foreground mt-1">
          {new Date(movie.addedAt).toLocaleDateString('ko-KR')} 추가
        </p>
      </div>

      {/* 삭제 버튼 */}
      <button
        onClick={handleRemove}
        className="self-center w-10 h-10 flex items-center justify-center text-rose-400 hover:text-rose-500 active:bg-rose-50 rounded-xl transition-all"
        aria-label="삭제"
      >
        <X className="h-5 w-5" />
      </button>
    </Link>
  );
}
