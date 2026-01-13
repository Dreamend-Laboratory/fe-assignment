import { Filter, Search, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { kobisApi } from '@/api/kobis';
import type { MovieListItem } from '@/api/types';
import { EmptyState, ErrorMessage, MovieGridSkeleton } from '@/components/common';
import { MovieCard } from '@/components/movie';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

const movieTypes = [
  { value: 'all', label: '전체' },
  { value: '220101', label: '장편' },
  { value: '220102', label: '단편' },
  { value: '220103', label: '옴니버스' },
];

const nations = [
  { value: 'all', label: '전체' },
  { value: 'K', label: '한국' },
  { value: 'F', label: '외국' },
];

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL 파라미터에서 초기값 로드
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [year, setYear] = useState(searchParams.get('year') || 'all');
  const [movieType, setMovieType] = useState(searchParams.get('type') || 'all');
  const [nation, setNation] = useState(searchParams.get('nation') || 'all');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1', 10));

  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const searchMovies = useCallback(
    async (resetPage = false) => {
      const searchPage = resetPage ? 1 : page;

      // 검색어가 없으면 검색하지 않음
      if (!query.trim()) {
        setMovies([]);
        setTotalCount(0);
        setHasSearched(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        const { movies: results, totalCount: count } = await kobisApi.searchMovies({
          movieNm: query.trim(),
          prdtStartYear: year !== 'all' ? year : undefined,
          prdtEndYear: year !== 'all' ? year : undefined,
          movieTypeCd: movieType !== 'all' ? movieType : undefined,
          repNationCd: nation !== 'all' ? nation : undefined,
          curPage: searchPage,
          itemPerPage: itemsPerPage,
        });

        setMovies(results);
        setTotalCount(count);

        if (resetPage) {
          setPage(1);
        }

        // URL 파라미터 업데이트
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        if (year && year !== 'all') params.set('year', year);
        if (movieType && movieType !== 'all') params.set('type', movieType);
        if (nation && nation !== 'all') params.set('nation', nation);
        params.set('page', searchPage.toString());
        setSearchParams(params, { replace: true });
      } catch (err) {
        console.error('영화 검색 실패:', err);
        setError('영화 검색에 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [page, query, year, movieType, nation, setSearchParams]
  );

  // 초기 로드 시 URL 파라미터로 검색
  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam) {
      searchMovies();
    }
  }, [searchMovies, searchParams]);

  // 페이지 변경 시 검색
  useEffect(() => {
    if (hasSearched) {
      searchMovies();
    }
  }, [hasSearched, searchMovies]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchMovies(true);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
          <Search className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">영화 검색</h1>
          <p className="text-muted-foreground mt-1">원하는 영화를 검색해보세요</p>
        </div>
      </div>

      {/* 검색 폼 카드 */}
      <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          {/* 검색 입력 */}
          <div className="flex gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="영화명을 입력하세요"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base bg-gray-50 border-0 focus:bg-white transition-colors rounded-xl"
              />
            </div>
            <Button
              type="submit"
              className="h-11 sm:h-12 px-4 sm:px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl shadow-md text-sm sm:text-base"
            >
              검색
            </Button>
          </div>

          {/* 필터 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>필터</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-full bg-gray-50 border-0 rounded-lg text-sm">
                  <SelectValue placeholder="연도" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 연도</SelectItem>
                  {years.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}년
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={movieType} onValueChange={setMovieType}>
                <SelectTrigger className="w-full bg-gray-50 border-0 rounded-lg text-sm">
                  <SelectValue placeholder="유형" />
                </SelectTrigger>
                <SelectContent>
                  {movieTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={nation} onValueChange={setNation}>
                <SelectTrigger className="w-full bg-gray-50 border-0 rounded-lg text-sm">
                  <SelectValue placeholder="국가" />
                </SelectTrigger>
                <SelectContent>
                  {nations.map((n) => (
                    <SelectItem key={n.value} value={n.value}>
                      {n.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </div>

      {/* 검색 결과 수 */}
      {hasSearched && !isLoading && !error && (
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span className="text-sm text-muted-foreground">
            "<span className="text-foreground font-medium">{query}</span>" 검색 결과{' '}
            <span className="text-cyan-600 font-bold">{totalCount}</span>건
          </span>
        </div>
      )}

      {/* 컨텐츠 영역 */}
      {isLoading ? (
        <MovieGridSkeleton count={10} />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => searchMovies()} />
      ) : !hasSearched ? (
        <div className="py-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full mb-6">
            <Search className="h-10 w-10 text-cyan-500" />
          </div>
          <p className="text-lg text-muted-foreground">검색어를 입력하고 검색 버튼을 눌러주세요</p>
        </div>
      ) : movies.length === 0 ? (
        <EmptyState variant="search" />
      ) : (
        <>
          {/* 영화 그리드 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie, index) => (
              <MovieCard
                key={movie.movieCd}
                movieCd={movie.movieCd}
                movieNm={movie.movieNm}
                genreAlt={movie.genreAlt}
                prdtYear={movie.prdtYear}
                openDt={movie.openDt}
                directors={movie.directors.map((d) => d.peopleNm).join(', ')}
                gradientIndex={index}
              />
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

// 페이지네이션 컴포넌트
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const maxVisiblePages = 5;
  const mobileMaxPages = 3;
  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(maxVisiblePages / 2), totalPages - maxVisiblePages + 1)
  );
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  // 모바일용 페이지 목록 (3개만)
  const mobileStartPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(mobileMaxPages / 2), totalPages - mobileMaxPages + 1)
  );
  const mobileEndPage = Math.min(totalPages, mobileStartPage + mobileMaxPages - 1);
  const mobilePages = Array.from(
    { length: mobileEndPage - mobileStartPage + 1 },
    (_, i) => mobileStartPage + i
  );

  return (
    <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8 sm:mt-10">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg px-2 sm:px-3 text-xs sm:text-sm"
      >
        이전
      </Button>

      {/* 데스크톱 페이지네이션 */}
      <div className="hidden sm:flex items-center gap-2">
        {startPage > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(1)}
              className="rounded-lg"
            >
              1
            </Button>
            {startPage > 2 && <span className="px-2 text-muted-foreground">...</span>}
          </>
        )}

        {pages.map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === currentPage ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPageChange(pageNum)}
            className={
              pageNum === currentPage
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-0 rounded-lg'
                : 'rounded-lg'
            }
          >
            {pageNum}
          </Button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2 text-muted-foreground">...</span>}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              className="rounded-lg"
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>

      {/* 모바일 페이지네이션 */}
      <div className="flex sm:hidden items-center gap-1">
        {mobilePages.map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === currentPage ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPageChange(pageNum)}
            className={`w-8 h-8 p-0 text-xs ${
              pageNum === currentPage
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-0 rounded-lg'
                : 'rounded-lg'
            }`}
          >
            {pageNum}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg px-2 sm:px-3 text-xs sm:text-sm"
      >
        다음
      </Button>
    </div>
  );
}
