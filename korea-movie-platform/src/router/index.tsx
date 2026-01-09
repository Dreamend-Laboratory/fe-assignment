import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { BoxOfficePage } from '@/pages/BoxOfficePage';
import { SearchPage } from '@/pages/SearchPage';
import { MovieDetailPage } from '@/pages/MovieDetailPage';
import { FavoritesPage } from '@/pages/FavoritesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <BoxOfficePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'movie/:movieCd',
        element: <MovieDetailPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
