import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, ChevronRight, Clock, Calendar, Users, Building2, Clapperboard, Globe, Share2 } from 'lucide-react';
import { kobisApi } from '@/api/kobis';
import type { MovieDetail } from '@/api/types';
import { useFavorites } from '@/hooks/useFavorites';
import { Loading, ErrorMessage } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn, formatDate } from '@/lib/utils';
import { getGradient } from '@/lib/gradients';

export function MovieDetailPage() {
  const { movieCd } = useParams<{ movieCd: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMovieFavorite = movieCd ? isFavorite(movieCd) : false;

  const fetchMovie = async () => {
    if (!movieCd) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await kobisApi.getMovieDetail(movieCd);
      setMovie(data);
    } catch (err) {
      console.error('영화 상세 정보 로드 실패:', err);
      setError('영화 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [movieCd]);

  const handleFavoriteClick = () => {
    if (!movie) return;

    toggleFavorite({
      movieCd: movie.movieCd,
      movieNm: movie.movieNm,
      movieNmEn: movie.movieNmEn,
      genreAlt: movie.genres.map((g) => g.genreNm).join(', '),
      prdtYear: movie.prdtYear,
      openDt: movie.openDt,
      directors: movie.directors.map((d) => d.peopleNm).join(', '),
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: movie?.movieNm,
          url: window.location.href,
        });
      } catch (err) {
        // 사용자가 공유를 취소한 경우
      }
    } else {
      // 클립보드에 복사
      await navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다.');
    }
  };

  if (isLoading) {
    return <Loading message="영화 정보를 불러오는 중..." />;
  }

  if (error || !movie) {
    return <ErrorMessage message={error || '영화를 찾을 수 없습니다.'} onRetry={fetchMovie} />;
  }

  const genres = movie.genres.map((g) => g.genreNm);
  const watchGrade = movie.audits[0]?.watchGradeNm || '정보 없음';
  const directors = movie.directors.map((d) => d.peopleNm).join(', ') || '정보 없음';
  const nations = movie.nations.map((n) => n.nationNm).join(', ') || '정보 없음';
  const productionCompany =
    movie.companys.find((c) => c.companyPartNm === '제작')?.companyNm ||
    movie.companys[0]?.companyNm ||
    '정보 없음';
  const distributionCompany =
    movie.companys.find((c) => c.companyPartNm === '배급')?.companyNm || '정보 없음';

  return (
    <div className="space-y-8">
      {/* 브레드크럼 (데스크톱) */}
      <nav className="hidden md:flex items-center gap-2 text-sm">
        <Link to="/" className="text-muted-foreground hover:text-indigo-600 transition-colors">
          홈
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
        <Link to="/search" className="text-muted-foreground hover:text-indigo-600 transition-colors">
          영화 검색
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
        <span className="text-foreground font-medium">{movie.movieNm}</span>
      </nav>

      {/* 모바일 헤더 */}
      <div className="md:hidden flex items-center justify-between -mt-4 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-semibold text-foreground">영화 상세</h1>
        <button
          onClick={handleFavoriteClick}
          className="p-2 -mr-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <Star
            className={cn(
              'h-5 w-5 transition-colors',
              isMovieFavorite ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'
            )}
          />
        </button>
      </div>

      {/* 메인 컨텐츠 카드 */}
      <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* 포스터 */}
          <div className="w-full max-w-[280px] mx-auto md:mx-0 md:w-72 lg:w-80 flex-shrink-0">
            <div
              className={cn(
                'relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl',
                getGradient(movie.movieCd)
              )}
            >
              {/* 패턴 오버레이 */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>

              {/* 어두운 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

              {/* 제목 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="w-16 h-0.5 bg-white/40 rounded-full mb-6" />
                <span className="text-white text-2xl md:text-3xl font-bold text-center leading-tight"
                      style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)' }}>
                  {movie.movieNm}
                </span>
                <div className="w-16 h-0.5 bg-white/40 rounded-full mt-6" />
              </div>

              {/* 하단 정보 */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center justify-center gap-2">
                  {movie.prdtYear && (
                    <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      {movie.prdtYear}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 액션 버튼 (데스크톱) */}
            <div className="hidden md:flex gap-3 mt-6">
              <Button
                onClick={handleFavoriteClick}
                className={cn(
                  'flex-1 h-12 rounded-xl shadow-md transition-all',
                  isMovieFavorite
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
                )}
              >
                <Star
                  className={cn('h-5 w-5 mr-2', isMovieFavorite && 'fill-current')}
                />
                {isMovieFavorite ? '즐겨찾기됨' : '즐겨찾기'}
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="h-12 px-6 rounded-xl border-2 hover:bg-gray-50"
              >
                <Share2 className="h-5 w-5 mr-2" />
                공유
              </Button>
            </div>
          </div>

          {/* 영화 정보 */}
          <div className="flex-1 space-y-6">
            {/* 제목 */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">{movie.movieNm}</h1>
              {movie.movieNmEn && (
                <p className="text-muted-foreground mt-2 text-lg">
                  {movie.movieNmEn} | {movie.prdtYear}
                </p>
              )}
            </div>

            {/* 장르 및 등급 배지 */}
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className="px-3 py-1 rounded-full border-indigo-200 text-indigo-600 bg-indigo-50/50"
                >
                  {genre}
                </Badge>
              ))}
              <Badge className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                {watchGrade}
              </Badge>
            </div>

            {/* 상세 정보 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <InfoItem
                icon={<Calendar className="h-4 w-4" />}
                label="개봉일"
                value={formatDate(movie.openDt) || '정보 없음'}
              />
              <InfoItem
                icon={<Clock className="h-4 w-4" />}
                label="상영시간"
                value={movie.showTm ? `${movie.showTm}분` : '정보 없음'}
              />
              <InfoItem
                icon={<Clapperboard className="h-4 w-4" />}
                label="감독"
                value={directors}
              />
              <InfoItem
                icon={<Globe className="h-4 w-4" />}
                label="제작국가"
                value={nations}
              />
              <InfoItem
                icon={<Building2 className="h-4 w-4" />}
                label="배급사"
                value={distributionCompany}
              />
              <InfoItem
                icon={<Building2 className="h-4 w-4" />}
                label="제작사"
                value={productionCompany}
              />
            </div>
          </div>
        </div>

        {/* 모바일 액션 버튼 */}
        <div className="md:hidden flex gap-3 mt-8">
          <Button
            onClick={handleFavoriteClick}
            className={cn(
              'flex-1 h-12 rounded-xl shadow-md transition-all',
              isMovieFavorite
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
            )}
          >
            <Star
              className={cn('h-5 w-5 mr-2', isMovieFavorite && 'fill-current')}
            />
            {isMovieFavorite ? '즐겨찾기됨' : '즐겨찾기'}
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            className="h-12 px-6 rounded-xl border-2 hover:bg-gray-50"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* 출연진 */}
      {movie.actors.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">출연진</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {movie.actors.slice(0, 8).map((actor, index) => (
              <div
                key={`${actor.peopleNm}-${index}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white font-bold shadow-md text-sm sm:text-base flex-shrink-0">
                  {actor.peopleNm.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {actor.peopleNm}
                  </p>
                  {actor.cast && (
                    <p className="text-xs text-muted-foreground truncate">
                      {actor.cast} 역
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-gray-100 rounded-lg text-muted-foreground">
        {icon}
      </div>
      <div>
        <dt className="text-xs text-muted-foreground uppercase tracking-wide">{label}</dt>
        <dd className="text-foreground font-medium mt-0.5">{value}</dd>
      </div>
    </div>
  );
}
