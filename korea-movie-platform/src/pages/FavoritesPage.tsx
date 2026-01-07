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
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">내 즐겨찾기</h1>
            <p className="text-muted-foreground mt-1">
              저장한 영화 목록을 확인하세요
            </p>
          </div>
        </div>
        {count > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="text-rose-500 border-rose-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 rounded-xl"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            전체 삭제
          </Button>
        )}
      </div>

      {/* 통계 카드 */}
      {count > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border p-5 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md">
              <Star className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{count}</p>
              <p className="text-sm text-muted-foreground">저장된 영화</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border p-5 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
              <Film className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{genres.length}</p>
              <p className="text-sm text-muted-foreground">장르</p>
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
      className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border hover:shadow-md transition-all"
    >
      {/* 포스터 */}
      <div
        className={cn(
          'relative flex-shrink-0 w-20 h-28 rounded-xl overflow-hidden shadow-md',
          getGradientByIndex(gradientIndex)
        )}
      >
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

        {/* 제목 */}
        <div className="absolute inset-0 flex items-center justify-center p-2">
          <span className="text-white text-xs text-center font-bold line-clamp-3"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            {movie.movieNm}
          </span>
        </div>

        {/* 즐겨찾기 배지 */}
        <div className="absolute top-1.5 right-1.5">
          <div className="p-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          </div>
        </div>
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-1">
            {movie.movieNm}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {movie.genreAlt && <span>{movie.genreAlt}</span>}
            {movie.genreAlt && movie.prdtYear && <span className="mx-1">·</span>}
            {movie.prdtYear && <span>{movie.prdtYear}</span>}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {new Date(movie.addedAt).toLocaleDateString('ko-KR')} 추가
        </p>
      </div>

      {/* 삭제 버튼 */}
      <button
        onClick={handleRemove}
        className="self-center p-2.5 text-rose-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
        aria-label="삭제"
      >
        <X className="h-5 w-5" />
      </button>
    </Link>
  );
}
