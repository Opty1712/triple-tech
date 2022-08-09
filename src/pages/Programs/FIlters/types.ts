import { ChangeEventHandler } from 'react';
import { Program, StatusStorage } from '../types';

export type FiltersParams = {
  name: string;
  handleNameChange: ChangeEventHandler<HTMLInputElement>;
  status: StatusStorage;
  changeStatus: (status: Program['status'], isChecked: boolean) => void;
};

export type StatusFilterParams = Pick<
  StatusFilterViewParams,
  'checked' | 'name'
> &
  Pick<FiltersParams, 'changeStatus'>;

export type StatusFilterViewParams = {
  checked: boolean;
  name: Program['status'];
  handleStatusChange: ChangeEventHandler<HTMLInputElement>;
};
