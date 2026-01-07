// Box Office Types
export interface DailyBoxOfficeItem {
  rnum: string;
  rank: string;
  rankInten: string;
  rankOldAndNew: 'OLD' | 'NEW';
  movieCd: string;
  movieNm: string;
  openDt: string;
  salesAmt: string;
  salesShare: string;
  salesInten: string;
  salesChange: string;
  salesAcc: string;
  audiCnt: string;
  audiInten: string;
  audiChange: string;
  audiAcc: string;
  scrnCnt: string;
  showCnt: string;
}

export interface BoxOfficeResponse {
  boxOfficeResult: {
    boxofficeType: string;
    showRange: string;
    dailyBoxOfficeList?: DailyBoxOfficeItem[];
    weeklyBoxOfficeList?: DailyBoxOfficeItem[];
  };
}

// Movie List Types
export interface MovieListItem {
  movieCd: string;
  movieNm: string;
  movieNmEn: string;
  prdtYear: string;
  openDt: string;
  typeNm: string;
  prdtStatNm: string;
  nationAlt: string;
  genreAlt: string;
  repNationNm: string;
  repGenreNm: string;
  directors: Array<{ peopleNm: string }>;
  companys: Array<{ companyCd: string; companyNm: string }>;
}

export interface MovieListResponse {
  movieListResult: {
    totCnt: number;
    source: string;
    movieList: MovieListItem[];
  };
}

// Movie Detail Types
export interface MovieDetail {
  movieCd: string;
  movieNm: string;
  movieNmEn: string;
  movieNmOg: string;
  showTm: string;
  prdtYear: string;
  openDt: string;
  prdtStatNm: string;
  typeNm: string;
  nations: Array<{ nationNm: string }>;
  genres: Array<{ genreNm: string }>;
  directors: Array<{ peopleNm: string; peopleNmEn: string }>;
  actors: Array<{
    peopleNm: string;
    peopleNmEn: string;
    cast: string;
    castEn: string;
  }>;
  showTypes: Array<{ showTypeGroupNm: string; showTypeNm: string }>;
  companys: Array<{
    companyCd: string;
    companyNm: string;
    companyNmEn: string;
    companyPartNm: string;
  }>;
  audits: Array<{ auditNo: string; watchGradeNm: string }>;
  staffs: Array<{ staffRoleNm: string; peopleNm: string; peopleNmEn: string }>;
}

export interface MovieDetailResponse {
  movieInfoResult: {
    source: string;
    movieInfo: MovieDetail;
  };
}

// Search Parameters
export interface MovieSearchParams {
  movieNm?: string;
  directorNm?: string;
  openStartDt?: string;
  openEndDt?: string;
  prdtStartYear?: string;
  prdtEndYear?: string;
  repNationCd?: string;
  movieTypeCd?: string;
  curPage?: number;
  itemPerPage?: number;
}

// Favorites
export interface FavoriteMovie {
  movieCd: string;
  movieNm: string;
  movieNmEn?: string;
  genreAlt?: string;
  prdtYear?: string;
  openDt?: string;
  directors?: string;
  addedAt: string;
}
