import { useEffect, useState } from 'react';
import { getKeys } from '../../utils';
import { emptyColumn, statusMapper } from './constants';
import { Program, VisibleColumns } from './types';

export const usePrograms = () => {
  const [programs, setPrograms] = useState<VisibleColumns[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadPeople() {
      setIsLoading(true);

      await getPrograms()
        .then((programs) => setPrograms(adaptPrograms(programs)))
        .catch((error) => console.error(error))
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

type ColumnFormatters = Record<
  keyof VisibleColumns,
  (value: Program) => string
>;

const columnFormatters: ColumnFormatters = {
  id: (program: Program) => String(program.id),
  name: (program: Program) => program.name,
  return_percentage: (program: Program) => program.return_percentage,
  threshold: (program: Program) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: program.currency,
    }).format(program.threshold / 100),
  status: (program: Program) => statusMapper[program.status],
  pause_at: (program: Program) =>
    program.pause_at ? formatDate(program.pause_at) : '-',
};

export const formatDate = (date: string): string => {
  try {
    const dateObject = new Date(date);

    const year = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
    }).format(dateObject);

    const month = new Intl.DateTimeFormat('en-GB', {
      month: '2-digit',
    }).format(dateObject);

    const day = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
    }).format(dateObject);

    return `${year}/${month}/${day}`;
  } catch {
    return '-';
  }
};

export const adaptPrograms = (programs: Program[]): VisibleColumns[] =>
  programs.map(adaptProgram);

export const adaptProgram = (program: Program): VisibleColumns => {
  const keys = getKeys(program);

  const formattedProgram = keys.reduce<VisibleColumns>(
    (accumulator, current) => {
      if (checkIsKeyOfVisibleProgram(current)) {
        const formatColumn = columnFormatters[current];
        accumulator[current] = formatColumn(program);
      }

      return accumulator;
    },
    { ...emptyColumn }
  );

  return formattedProgram;
};

const checkIsKeyOfVisibleProgram = (
  value: string
): value is keyof VisibleColumns => {
  return value in emptyColumn;
};
