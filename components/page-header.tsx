import { Skull, AlignCenter as Alien } from 'lucide-react';

export function PageHeader(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center mb-8 text-center">
      <div className="flex items-center gap-3 mb-4">
        <Skull className="h-10 w-10 text-primary" />
        <h1 className="text-4xl font-extrabold tracking-tight">Rick and Morty Explorer</h1>
        <Alien className="h-10 w-10 text-primary" />
      </div>
      <p className="text-muted-foreground max-w-2xl">
        Explore characters from the Rick and Morty universe. Filter by status and gender to find your favorite characters.
      </p>
    </div>
  );
}