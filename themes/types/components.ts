import type { FC } from 'react';
import type {
  ThemeArchiveProps,
  ThemeCategoryProps,
  ThemeCategoryDetailProps,
  ThemeHomeProps,
  ThemePageNotFoundProps,
  ThemePageProps,
} from '@/pages/types';

export type ArchiveComponent = FC<ThemeArchiveProps>;
export type CategoryComponent = FC<ThemeCategoryProps>;
export type CategoryDetailComponent = FC<ThemeCategoryDetailProps>;
export type HomeComponent = FC<ThemeHomeProps>;
export type PageNotFoundComponent = FC<ThemePageNotFoundProps>;
export type PostComponents = FC;
export type PostListComponent = FC<ThemePageProps>;
export type SearchComponent = FC;
export type TagComponent = FC;
