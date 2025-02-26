'use client';

import { Button } from '@/components/ui/button';
import { useCharacterFilters } from '@/hooks/use-character-filters';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCharacters } from '@/lib/api';

interface PaginationProps {
  totalPages: number;
}

export function Pagination({ totalPages: initialTotalPages }: PaginationProps): JSX.Element {
  const { page, setPage } = useCharacterFilters();
  const searchParams = useSearchParams();
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);

  // For static export, get total pages client-side
  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const status = searchParams.get('status');
        const gender = searchParams.get('gender');
        
        const { info } = await getCharacters({
          status: status && status !== 'all' ? status : undefined,
          gender: gender && gender !== 'all' ? gender : undefined,
          page: 1,
        });
        
        setTotalPages(info.pages);
      } catch (err) {
        console.error('Error fetching pagination info:', err);
      }
    };

    // Only run client-side fetching in production/static export
    if (process.env.NODE_ENV === 'production') {
      fetchTotalPages();
    }
  }, [searchParams]);

  const handlePrevious = (): void => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = (): void => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  if (totalPages <= 1) {
    return <></>;
  }

  return (
    <div className="flex items-center justify-between py-4">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={page <= 1}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      
      <Button
        variant="outline"
        onClick={handleNext}
        disabled={page >= totalPages}
        className="flex items-center gap-2"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}