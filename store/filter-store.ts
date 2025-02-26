'use client';

import { create } from 'zustand';
import { StatusType, GenderType } from '@/types';

interface FilterState {
  status: StatusType;
  gender: GenderType;
  page: number;
  setStatus: (status: StatusType) => void;
  setGender: (gender: GenderType) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  status: 'all',
  gender: 'all',
  page: 1,
  setStatus: (status) => set({ status, page: 1 }),
  setGender: (gender) => set({ gender, page: 1 }),
  setPage: (page) => set({ page }),
  resetFilters: () => set({ status: 'all', gender: 'all', page: 1 }),
}));