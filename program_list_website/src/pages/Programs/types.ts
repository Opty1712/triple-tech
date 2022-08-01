export type Program = {
  id: number;
  name: string;
  return_percentage: string;
  threshold: number;
  status: 'ACTIVE' | 'PAUSED' | 'PAUSE_SCHEDULED';
  pause_at: string | null;
  currency: 'EUR';
};

export type VisibleColumns = Pick<
  Program,
  'name' | 'pause_at' | 'return_percentage'
> & { threshold: string; id: string; status: string };
