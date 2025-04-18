export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface CharacterFilter {
  status?: string;
  gender?: string;
  page?: number;
}

export type StatusType = 'alive' | 'dead' | 'unknown' | 'all';
export type GenderType = 'female' | 'male' | 'genderless' | 'unknown' | 'all';