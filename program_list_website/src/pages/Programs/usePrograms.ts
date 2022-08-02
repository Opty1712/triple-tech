import { useCallback, useEffect, useState } from 'react';
import { getKeys } from '../../utils';
import { emptyColumn, statusMapper } from './constants';
import { Program, VisibleColumns } from './types';

type StatusStorage = Record<Program['status'], boolean>;

export const usePrograms = () => {
  const [programs, setPrograms] = useState<VisibleColumns[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [status, setStatus] = useState<StatusStorage>({
    ACTIVE: false,
    PAUSE_SCHEDULED: false,
    PAUSED: false,
  });

  const changeStatus = useCallback(
    (status: Program['status'], isChecked: boolean) => {
      setStatus((value) => ({
        ...value,
        [status]: isChecked,
      }));
    },
    []
  );

  useEffect(() => {
    async function loadPeople() {
      setIsLoading(true);

      await getPrograms({ name, status: adaptStatus(status) })
        .then((programs) => setPrograms(adaptPrograms(programs)))
        .catch((error) => {
          throw new Error(error);
        })
        .finally(() => setIsLoading(false));
    }

    loadPeople();
  }, [name, status]);

  return { programs, isLoading, setName, name, status, changeStatus };
};

type FetchProgramParams = {
  status?: Array<Program['status']>;
  name?: string;
};

async function getPrograms<T = Program[]>(
  params: FetchProgramParams
): Promise<T> {
  const response = await fetch(
    `http://localhost:4002/programs?${buildQuery(params)}`,
    {
      method: 'GET',
    }
  ).catch((error) => {
    throw new Error(error);
  });

  if (!response?.ok) {
    throw new Error(response?.statusText || 'Unknown error');
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

export const buildQuery = (args: FetchProgramParams): string => {
  const queryArray = getKeys(args).reduce<Array<string>>((accumulator, key) => {
    const value = args[key];

    if (Array.isArray(value)) {
      value.forEach((item) => {
        accumulator.push(`${key}=${item}`);
      });
    }

    if (typeof value === 'string') {
      accumulator.push(`${key}_like=${value}`);
    }

    return accumulator;
  }, []);

  return queryArray.join('&');
};

export const adaptStatus = (
  status: StatusStorage
): FetchProgramParams['status'] =>
  getKeys(status).filter((item) => status[item]);
