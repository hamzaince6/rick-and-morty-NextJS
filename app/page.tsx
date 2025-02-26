'use client';

import { CharacterList } from '@/components/character-list';
import { FilterBar } from '@/components/filter-bar';
import { PageHeader } from '@/components/page-header';
import { Pagination } from '@/components/pagination';
import { getCharacters } from '@/lib/api';
import { parseQueryParams } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const { status, gender, page } = parseQueryParams(Object.fromEntries(searchParams.entries()));
        const { results, info } = await getCharacters({
          status: status && status !== 'all' ? status : undefined,
          gender: gender && gender !== 'all' ? gender : undefined,
          page: page ? parseInt(page) : 1,
        });
        setCharacters(results);
        setTotalPages(info.pages);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <PageHeader />
        <FilterBar />
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h2 className="text-2xl font-bold mb-2">Loading characters...</h2>
            <p className="text-muted-foreground">
              Please wait while we load the characters...
            </p>
          </div>
        ) : (
          <>
            <CharacterList characters={characters} />
            <Pagination totalPages={totalPages} />
          </>
        )}
      </div>
    </main>
  );
}