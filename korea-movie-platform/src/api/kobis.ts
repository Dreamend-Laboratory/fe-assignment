import { apiClient } from './client';
import type {
  BoxOfficeResponse,
  DailyBoxOfficeItem,
  MovieDetail,
  MovieDetailResponse,
  MovieListItem,
  MovieListResponse,
  MovieSearchParams,
} from './types';

export type WeekGb = '0' | '1' | '2'; // 0: 주간, 1: 주말, 2: 주중

export const kobisApi = {
  /**
   * 일별 박스오피스 조회
   * @param targetDt - 조회 날짜 (YYYYMMDD)
   */
  getDailyBoxOffice: async (targetDt: string): Promise<DailyBoxOfficeItem[]> => {
    const response = await apiClient
      .get('boxoffice/searchDailyBoxOfficeList.json', {
        searchParams: { targetDt },
      })
      .json<BoxOfficeResponse>();
    return response.boxOfficeResult.dailyBoxOfficeList || [];
  },

  /**
   * 주간/주말 박스오피스 조회
   * @param targetDt - 조회 날짜 (YYYYMMDD)
   * @param weekGb - 주간/주말 구분 (0: 주간, 1: 주말, 2: 주중)
   */
  getWeeklyBoxOffice: async (
    targetDt: string,
    weekGb: WeekGb = '0'
  ): Promise<DailyBoxOfficeItem[]> => {
    const response = await apiClient
      .get('boxoffice/searchWeeklyBoxOfficeList.json', {
        searchParams: { targetDt, weekGb },
      })
      .json<BoxOfficeResponse>();
    return response.boxOfficeResult.weeklyBoxOfficeList || [];
  },

  /**
   * 영화 목록 검색
   */
  searchMovies: async (
    params: MovieSearchParams
  ): Promise<{ movies: MovieListItem[]; totalCount: number }> => {
    const searchParams: Record<string, string | number> = {};

    if (params.movieNm) searchParams.movieNm = params.movieNm;
    if (params.directorNm) searchParams.directorNm = params.directorNm;
    if (params.openStartDt) searchParams.openStartDt = params.openStartDt;
    if (params.openEndDt) searchParams.openEndDt = params.openEndDt;
    if (params.prdtStartYear) searchParams.prdtStartYear = params.prdtStartYear;
    if (params.prdtEndYear) searchParams.prdtEndYear = params.prdtEndYear;
    if (params.repNationCd) searchParams.repNationCd = params.repNationCd;
    if (params.movieTypeCd) searchParams.movieTypeCd = params.movieTypeCd;
    searchParams.curPage = params.curPage || 1;
    searchParams.itemPerPage = params.itemPerPage || 10;

    const response = await apiClient
      .get('movie/searchMovieList.json', {
        searchParams,
      })
      .json<MovieListResponse>();

    return {
      movies: response.movieListResult.movieList,
      totalCount: response.movieListResult.totCnt,
    };
  },

  /**
   * 영화 상세 정보 조회
   * @param movieCd - 영화 코드
   */
  getMovieDetail: async (movieCd: string): Promise<MovieDetail> => {
    const response = await apiClient
      .get('movie/searchMovieInfo.json', {
        searchParams: { movieCd },
      })
      .json<MovieDetailResponse>();
    return response.movieInfoResult.movieInfo;
  },
};
