import { getKeys } from '../../../utils';
import { Program } from '../types';

export type FetchProgramParams = {
  status?: Array<Program['status']>;
  name?: string;
};

export async function getPrograms<T = Program[]>(
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
