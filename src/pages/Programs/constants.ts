import { Program, VisibleColumns } from './types';

export const statusMapper: Record<Program['status'], string> = {
  ACTIVE: 'Active',
  PAUSED: 'Paused',
  PAUSE_SCHEDULED: 'Pause Scheduled',
};

export const emptyColumn: VisibleColumns = {
  id: '',
  name: '',
  return_percentage: '',
  threshold: '',
  status: 'ACTIVE',
  pause_at: '',
};
