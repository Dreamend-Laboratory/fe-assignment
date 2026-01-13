import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { format, subDays, previousSunday, parse } from 'date-fns';
import { Calendar, TrendingUp } from 'lucide-react';
import { kobisApi } from '@/api/kobis';
import type { DailyBoxOfficeItem } from '@/api/types';
import { boxOfficeDateAtom, boxOfficeTypeAtom, type BoxOfficeType } from '@/atoms';
import { MovieCard, MobileMovieCard } from '@/components/movie';
import { MovieGridSkeleton, ErrorMessage } from '@/components/common';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';

export function BoxOfficePage() {
  const [date, setDate] = useAtom(boxOfficeDateAtom);
  const [type, setType] = useAtom(boxOfficeTypeAtom);
  const [movies, setMovies] = useState<DailyBoxOfficeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  // 날짜 입력 형식 변환 (YYYYMMDD <-> YYYY-MM-DD)
  const dateInputValue = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
  const maxDate = format(subDays(new Date(), 1), 'yyyy-MM-dd');

  const fetchBoxOffice = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let data: DailyBoxOfficeItem[];

      if (type === 'daily') {
        data = await kobisApi.getDailyBoxOffice(date);
      } else {
        // 주간/주말 박스오피스는 해당 주가 끝난 후에만 데이터 제공
        // 선택한 날짜 기준 지난 일요일로 조정
        const selectedDate = parse(date, 'yyyyMMdd', new Date());
        const lastSunday = previousSunday(selectedDate);
        const weeklyDate = format(lastSunday, 'yyyyMMdd');

        if (type === 'weekly') {
          data = await kobisApi.getWeeklyBoxOffice(weeklyDate, '0');
        } else {
          data = await kobisApi.getWeeklyBoxOffice(weeklyDate, '1');
        }
      }

      setMovies(data);
    } catch (err) {
      console.error('박스오피스 데이터 로드 실패:', err);
      setError('박스오피스 데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoxOffice();
  }, [date, type]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value.replace(/-/g, '');
    setDate(newDate);
  };

  const handleTypeChange = (value: string) => {
    setType(value as BoxOfficeType);
  };

  const getTitle = () => {
    switch (type) {
      case 'daily':
        return '일별 박스오피스';
      case 'weekly':
        return '주간 박스오피스';
      case 'weekend':
        return '주말 박스오피스';
      default:
        return '박스오피스';
    }
  };

  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
          <TrendingUp className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{getTitle()}</h1>
          <p className="text-muted-foreground mt-1">
            한국 영화 흥행 순위를 확인하세요
          </p>
        </div>
      </div>

      {/* 필터 카드 */}
      <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-6">
        <div className="flex flex-col gap-4">
          {/* 상단: 날짜 선택 + 데스크톱 탭 */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* 날짜 선택 */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="p-2 bg-indigo-100 rounded-xl flex-shrink-0">
                <Calendar className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1 sm:flex-initial">
                <label className="text-xs text-muted-foreground block mb-1">조회 날짜</label>
                <Input
                  type="date"
                  value={dateInputValue}
                  onChange={handleDateChange}
                  max={maxDate}
                  className="w-full sm:w-44 border-0 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* 타입 선택 (데스크톱용 Tabs) */}
            <Tabs
              value={type}
              onValueChange={handleTypeChange}
              className="hidden sm:block"
            >
              <TabsList className="bg-gray-100">
                <TabsTrigger value="daily" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                  일별
                </TabsTrigger>
                <TabsTrigger value="weekly" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                  주간
                </TabsTrigger>
                <TabsTrigger value="weekend" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                  주말
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* 모바일 타입 선택 버튼 */}
          <div className="sm:hidden grid grid-cols-3 gap-2">
            {(['daily', 'weekly', 'weekend'] as const).map((t) => (
              <button
                key={t}
                onClick={() => handleTypeChange(t)}
                className={cn(
                  'py-2.5 px-3 rounded-xl text-sm font-medium transition-all',
                  type === t
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {t === 'daily' ? '일별' : t === 'weekly' ? '주간' : '주말'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      {isLoading ? (
        <MovieGridSkeleton count={10} />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchBoxOffice} />
      ) : (
        <>
          {/* 데스크톱: 그리드 뷰 */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.map((movie, index) => (
              <MovieCard
                key={movie.movieCd}
                movieCd={movie.movieCd}
                movieNm={movie.movieNm}
                openDt={movie.openDt}
                rank={parseInt(movie.rank)}
                rankInten={parseInt(movie.rankInten)}
                rankOldAndNew={movie.rankOldAndNew}
                audiCnt={movie.audiCnt}
                audiAcc={movie.audiAcc}
                gradientIndex={index}
                showFavoriteButton
                isFavorite={isFavorite(movie.movieCd)}
                onFavoriteToggle={() => toggleFavorite({
                  movieCd: movie.movieCd,
                  movieNm: movie.movieNm,
                  openDt: movie.openDt,
                })}
              />
            ))}
          </div>

          {/* 모바일: 리스트 뷰 */}
          <div className="md:hidden space-y-3">
            {movies.map((movie, index) => (
              <MobileMovieCard
                key={movie.movieCd}
                movie={movie}
                gradientIndex={index}
                isFavorite={isFavorite(movie.movieCd)}
                onFavoriteToggle={() => toggleFavorite({
                  movieCd: movie.movieCd,
                  movieNm: movie.movieNm,
                  openDt: movie.openDt,
                })}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
