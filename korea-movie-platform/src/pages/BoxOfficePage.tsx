import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { format, subDays } from 'date-fns';
import { Calendar, TrendingUp } from 'lucide-react';
import { kobisApi } from '@/api/kobis';
import type { DailyBoxOfficeItem } from '@/api/types';
import { boxOfficeDateAtom, boxOfficeTypeAtom, type BoxOfficeType } from '@/atoms';
import { MovieCard } from '@/components/movie';
import { MovieGridSkeleton, ErrorMessage } from '@/components/common';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatDateWithSpaces } from '@/lib/utils';
import { getGradientByIndex } from '@/lib/gradients';
import { cn } from '@/lib/utils';

export function BoxOfficePage() {
  const [date, setDate] = useAtom(boxOfficeDateAtom);
  const [type, setType] = useAtom(boxOfficeTypeAtom);
  const [movies, setMovies] = useState<DailyBoxOfficeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } else if (type === 'weekly') {
        data = await kobisApi.getWeeklyBoxOffice(date, '0');
      } else {
        data = await kobisApi.getWeeklyBoxOffice(date, '1');
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
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* 날짜 선택 */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl">
              <Calendar className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">조회 날짜</label>
              <Input
                type="date"
                value={dateInputValue}
                onChange={handleDateChange}
                max={maxDate}
                className="w-44 border-0 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* 타입 선택 (모바일용 Select) */}
          <div className="sm:hidden w-full">
            <Select value={type} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-full bg-gray-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">일별</SelectItem>
                <SelectItem value="weekly">주간</SelectItem>
                <SelectItem value="weekend">주말</SelectItem>
              </SelectContent>
            </Select>
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
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// 모바일용 영화 카드 컴포넌트
function MobileMovieCard({
  movie,
  gradientIndex,
}: {
  movie: DailyBoxOfficeItem;
  gradientIndex: number;
}) {
  return (
    <a
      href={`/movie/${movie.movieCd}`}
      className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border hover:shadow-md transition-shadow"
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

        {/* 순위 배지 */}
        <div className="absolute top-1.5 left-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/95 text-xs font-bold text-gray-800 shadow">
            {movie.rank}
          </span>
        </div>
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0 py-1">
        <h3 className="font-semibold text-foreground line-clamp-1">
          {movie.movieNm}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDateWithSpaces(movie.openDt)} 개봉
        </p>
        <div className="flex gap-3 mt-3 text-xs">
          <span className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded font-medium">오늘</span>
            <span className="font-medium">{parseInt(movie.audiCnt).toLocaleString()}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded font-medium">누적</span>
            <span className="font-medium">{parseInt(movie.audiAcc).toLocaleString()}</span>
          </span>
        </div>
      </div>
    </a>
  );
}
