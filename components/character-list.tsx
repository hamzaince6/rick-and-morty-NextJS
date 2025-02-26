'use client';

import { Character } from '@/types';
import { CharacterCard } from '@/components/character-card';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCharacters } from '@/lib/api';

interface CharacterListProps {
  characters: Character[];
}

export function CharacterList({ characters: initialCharacters }: CharacterListProps): JSX.Element {
  const searchParams = useSearchParams();
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // For static export, fetch characters client-side when URL params change
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(false);
      
      try {
        const status = searchParams.get('status');
        const gender = searchParams.get('gender');
        const page = searchParams.get('page');
        
        const { results } = await getCharacters({
          status: status && status !== 'all' ? status : undefined,
          gender: gender && gender !== 'all' ? gender : undefined,
          page: page ? parseInt(page) : 1,
        });
        
        setCharacters(results);
      } catch (err) {
        console.error('Error fetching characters:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    // Only run client-side fetching in production/static export
    if (process.env.NODE_ENV === 'production') {
      fetchCharacters();
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-2xl font-bold mb-2">Loading characters...</h2>
        <p className="text-muted-foreground">Please wait while we fetch the characters.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-2xl font-bold mb-2">Error loading characters</h2>
        <p className="text-muted-foreground">Please try refreshing the page or adjusting your filters.</p>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-2xl font-bold mb-2">No characters found</h2>
        <p className="text-muted-foreground">Try changing your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
      {characters.map(character => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}