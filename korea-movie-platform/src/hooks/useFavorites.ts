import { useAtom, useAtomValue } from 'jotai';
import type { FavoriteMovie } from '@/api/types';
import { favoriteGenresAtom, favoritesAtom, favoritesCountAtom } from '@/atoms';

export function useFavorites() {
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const count = useAtomValue(favoritesCountAtom);
  const genres = useAtomValue(favoriteGenresAtom);

  const addFavorite = (movie: Omit<FavoriteMovie, 'addedAt'>) => {
    const exists = favorites.some((m) => m.movieCd === movie.movieCd);
    if (exists) return;

    setFavorites((prev) => [...prev, { ...movie, addedAt: new Date().toISOString() }]);
  };

  const removeFavorite = (movieCd: string) => {
    setFavorites((prev) => prev.filter((m) => m.movieCd !== movieCd));
  };

  const toggleFavorite = (movie: Omit<FavoriteMovie, 'addedAt'>) => {
    const isFav = favorites.some((m) => m.movieCd === movie.movieCd);
    if (isFav) {
      removeFavorite(movie.movieCd);
    } else {
      addFavorite(movie);
    }
  };

  const isFavorite = (movieCd: string) => favorites.some((m) => m.movieCd === movieCd);

  const clearAll = () => setFavorites([]);

  return {
    favorites,
    count,
    genres,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearAll,
  };
}
