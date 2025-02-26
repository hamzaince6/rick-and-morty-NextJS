'use client';

import { useQueryState } from 'nuqs';
import { useFilterStore } from '@/store/filter-store';
import { useEffect } from 'react';
import { StatusType, GenderType } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useCharacterFilters(): {
  status: StatusType;
  gender: GenderType;
  page: number;
  setStatus: (status: StatusType) => void;
  setGender: (gender: GenderType) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
} {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // For static export compatibility
  const statusParam = searchParams.get('status') || 'all';
  const genderParam = searchParams.get('gender') || 'all';
  const pageParam = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;

  // Keep nuqs for development environment
  const [statusNuqs, setStatusNuqs] = useQueryState('status', {
    shallow: false,
  });
  
  const [genderNuqs, setGenderNuqs] = useQueryState('gender', {
    shallow: false,
  });
  
  const [pageNuqs, setPageNuqs] = useQueryState('page', {
    shallow: false,
    parse: (value) => (value ? parseInt(value) : 1),
    serialize: (value) => value.toString(),
  });

  const {
    status,
    gender,
    page,
    setStatus: setStoreStatus,
    setGender: setStoreGender,
    setPage: setStorePage,
    resetFilters: resetStoreFilters,
  } = useFilterStore();

  // Sync URL params to store
  useEffect(() => {
    setStoreStatus((statusParam || 'all') as StatusType);
    setStoreGender((genderParam || 'all') as GenderType);
    setStorePage(pageParam || 1);
  }, [statusParam, genderParam, pageParam, setStoreStatus, setStoreGender, setStorePage]);

  // Function to update URL params for static export
  const updateUrlParams = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    
    const newParamsString = newParams.toString();
    const query = newParamsString ? `?${newParamsString}` : '';
    
    // Update the URL without reloading the page
    window.history.pushState({}, '', `${pathname}${query}`);
    
    // Force a re-render to update the UI
    router.refresh();
  };

  const setStatus = (newStatus: StatusType): void => {
    // Update nuqs for development
    setStatusNuqs(newStatus === 'all' ? null : newStatus);
    
    // Update URL params for static export
    updateUrlParams({ 
      status: newStatus === 'all' ? null : newStatus,
      page: null // Reset page when changing filters
    });
    
    // Update store
    setStoreStatus(newStatus);
    setStorePage(1);
  };

  const setGender = (newGender: GenderType): void => {
    // Update nuqs for development
    setGenderNuqs(newGender === 'all' ? null : newGender);
    
    // Update URL params for static export
    updateUrlParams({ 
      gender: newGender === 'all' ? null : newGender,
      page: null // Reset page when changing filters
    });
    
    // Update store
    setStoreGender(newGender);
    setStorePage(1);
  };

  const setPage = (newPage: number): void => {
    // Update nuqs for development
    setPageNuqs(newPage === 1 ? null : newPage);
    
    // Update URL params for static export
    updateUrlParams({ 
      page: newPage === 1 ? null : newPage.toString()
    });
    
    // Update store
    setStorePage(newPage);
  };

  const resetFilters = (): void => {
    // Update nuqs for development
    setStatusNuqs(null);
    setGenderNuqs(null);
    setPageNuqs(null);
    
    // Update URL params for static export
    updateUrlParams({ 
      status: null,
      gender: null,
      page: null
    });
    
    // Update store
    resetStoreFilters();
  };

  return {
    status: status as StatusType,
    gender: gender as GenderType,
    page,
    setStatus,
    setGender,
    setPage,
    resetFilters,
  };
}