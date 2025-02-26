import { Character } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/lib/utils';
import Image from 'next/image';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps): JSX.Element {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-64 w-full">
          <Image
            src={character.image}
            alt={character.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg truncate">{character.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className={`h-3 w-3 rounded-full ${getStatusColor(character.status)}`} />
          <span className="text-sm text-muted-foreground">
            {character.status} - {character.species}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        <Badge variant="outline">{character.gender}</Badge>
        <Badge variant="secondary">{character.origin.name}</Badge>
      </CardFooter>
    </Card>
  );
}