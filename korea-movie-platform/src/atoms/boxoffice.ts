import { format, subDays } from 'date-fns';
import { atom } from 'jotai';

export type BoxOfficeType = 'daily' | 'weekly' | 'weekend';

// 어제 날짜를 YYYYMMDD 형식으로 반환 (KOBIS는 전날 데이터부터 제공)
const getYesterdayDate = () => format(subDays(new Date(), 1), 'yyyyMMdd');

// 박스오피스 조회 날짜
export const boxOfficeDateAtom = atom<string>(getYesterdayDate());

// 박스오피스 타입 (일별/주간/주말)
export const boxOfficeTypeAtom = atom<BoxOfficeType>('daily');
