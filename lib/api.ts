import { Character, CharacterFilter, CharactersResponse } from '@/types';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters(
  filters: CharacterFilter
): Promise<CharactersResponse> {
  const queryParams = new URLSearchParams();
  
  if (filters.status && filters.status !== 'all') {
    queryParams.append('status', filters.status);
  }
  
  if (filters.gender && filters.gender !== 'all') {
    queryParams.append('gender', filters.gender);
  }
  
  if (filters.page) {
    queryParams.append('page', filters.page.toString());
  }
  
  const queryString = queryParams.toString();
  const url = `${API_BASE_URL}/character${queryString ? `?${queryString}` : ''}`;
  
  // Use different fetch options based on environment
  const fetchOptions = process.env.NODE_ENV === 'development' 
    ? { next: { revalidate: 3600 } }
    : {};
  
  const response = await fetch(url, fetchOptions);
  
  if (!response.ok) {
    if (response.status === 404) {
      // Return empty results when no characters match the filter
      return {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      };
    }
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}

export async function getCharacter(id: number): Promise<Character> {
  const response = await fetch(`${API_BASE_URL}/character/${id}`, {
    next: { revalidate: 3600 },
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}