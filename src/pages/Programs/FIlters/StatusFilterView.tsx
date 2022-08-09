import { Checkbox, FormControlLabel } from '@mui/material';
import { memo } from 'react';
import { statusMapper } from '../constants';
import { StatusFilterViewParams } from './types';

export const StatusFilterView = memo<StatusFilterViewParams>(
  ({ handleStatusChange, checked, name }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            onChange={handleStatusChange}
            inputProps={{ 'aria-label': 'controlled' }}
            checked={checked}
          />
        }
        label={statusMapper[name]}
      />
    );
  }
);
StatusFilterView.displayName = 'StatusFilterView';
