import { ChangeEventHandler, memo, useCallback } from 'react';
import { Program } from '../types';
import { StatusFilterView } from './StatusFilterView';
import { FiltersParams, StatusFilterParams } from './types';

function useStatusFilter(
  changeStatus: FiltersParams['changeStatus'],
  name: Program['status']
) {
  const handleStatusChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      changeStatus(name, event.target.checked);
    },
    [changeStatus, name]
  );

  return { handleStatusChange };
}

export const StatusFilter = memo<StatusFilterParams>(
  ({ changeStatus, checked, name }) => {
    const { handleStatusChange } = useStatusFilter(changeStatus, name);

    return (
      <StatusFilterView
        name={name}
        checked={checked}
        handleStatusChange={handleStatusChange}
      />
    );
  }
);
StatusFilter.displayName = 'StatusFilter';
