import React from 'react';
import { HeaderContentHome, HeaderContentProfile, HeaderContentSign } from './modules';

interface HeaderContent {
  [key: string]: (userName: string | undefined) => React.ReactNode;
}

export const headerContentJSX: HeaderContent = {
  '/': (userName) => <HeaderContentHome userName={userName} />,
  '/profile': () => <HeaderContentProfile />,
  '/signin': () => <HeaderContentSign />,
  '/signup': () => <HeaderContentSign />,
  '/test/new': () => <></>,
};
