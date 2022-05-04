import { User } from '../types/types';
import { atomWithStorage } from 'jotai/utils';

export const userAtom = atomWithStorage<null | User>('userData', null);
