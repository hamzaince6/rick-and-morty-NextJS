'use client';

import { useCharacterFilters } from '@/hooks/use-character-filters';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw } from 'lucide-react';

export function FilterBar(): JSX.Element {
  const { status, gender, setStatus, setGender, resetFilters } = useCharacterFilters();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-card rounded-lg shadow">
      <div className="flex-1">
        <Select value={status} onValueChange={(value) => setStatus(value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="alive">Alive</SelectItem>
            <SelectItem value="dead">Dead</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <Select value={gender} onValueChange={(value) => setGender(value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="genderless">Genderless</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        variant="outline" 
        onClick={resetFilters}
        className="flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  );
}