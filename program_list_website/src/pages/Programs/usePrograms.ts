import { useEffect, useState } from 'react';
import { Program } from './types';

export const usePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadPeople() {
      setIsLoading(true);

      await getPrograms()
        .then((programs) => setPrograms(programs))
        .finally(() => setIsLoading(false));
    }

    loadPeople();
  }, []);

  return { programs, isLoading };
};

async function getPrograms<T = Program[]>(): Promise<T> {
  const response = await fetch(`http://localhost:4002/programs`, {
    method: 'GET',
  }).catch((error) => console.error(error));

  if (!response?.ok) {
    throw new Error(response?.statusText);
  }

  return await (response.json() as Promise<T>);
}
