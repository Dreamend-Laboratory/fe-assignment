import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { FavoriteMovie } from '@/api/types';

// LocalStorage에 저장되는 즐겨찾기 목록
export const favoritesAtom = atomWithStorage<FavoriteMovie[]>('kobis-favorites', []);

// 즐겨찾기 개수
export const favoritesCountAtom = atom((get) => get(favoritesAtom).length);

// 즐겨찾기에서 고유 장르 목록
export const favoriteGenresAtom = atom((get) => {
  const favorites = get(favoritesAtom);
  const genres = new Set(favorites.map((f) => f.genreAlt).filter((g): g is string => !!g));
  return Array.from(genres);
});
