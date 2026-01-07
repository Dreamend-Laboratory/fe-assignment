import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 숫자 문자열을 파싱
 */
export const parseNumber = (str: string): number => parseInt(str, 10) || 0;

/**
 * 관객수 포맷팅 (1000 이상 K, 1000000 이상 M)
 */
export const formatAudience = (count: string): string => {
  const num = parseNumber(count);
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)}천만`;
  if (num >= 10000) return `${(num / 10000).toFixed(0)}만`;
  return num.toLocaleString();
};

/**
 * 날짜 포맷팅 (YYYYMMDD -> YYYY.MM.DD)
 */
export const formatDate = (dateStr: string): string => {
  if (!dateStr || dateStr.length < 8) return dateStr;
  return `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)}`;
};

/**
 * 날짜 포맷팅 (YYYYMMDD -> YYYY. MM. DD.)
 */
export const formatDateWithSpaces = (dateStr: string): string => {
  if (!dateStr || dateStr.length < 8) return dateStr;
  return `${dateStr.slice(0, 4)}. ${dateStr.slice(4, 6)}. ${dateStr.slice(6, 8)}.`;
};

/**
 * ISO 날짜 문자열을 한국어 형식으로 변환
 */
export const formatKoreanDate = (isoString: string): string => {
  const date = new Date(isoString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} 추가`;
};
