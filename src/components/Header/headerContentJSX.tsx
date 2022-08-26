import { ReactNode } from 'react';
import { HeaderContentHome, HeaderContentProfile, HeaderContentSign } from './modules';

interface HeaderContent {
  [key: string]: ReactNode;
}

export const headerContentJSX: HeaderContent = {
  '/': <HeaderContentHome />,
  '/profile': <HeaderContentProfile />,
  '/signin': <HeaderContentSign />,
  '/signup': <HeaderContentSign />,
  '/test/new': <></>,
};
