import { css } from '@emotion/css';
import styled from '@emotion/styled';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';
import { ChangeEventHandler, memo, useCallback } from 'react';
import { getKeys } from '../../../utils';
import { statusMapper } from '../constants';
import { Program } from '../types';

export type FiltersParams = {
  name: string;
  setName: (name: string) => void;
  status: Record<Program['status'], boolean>;
  changeStatus: (status: Program['status'], isChecked: boolean) => void;
};

export const Filters = memo<FiltersParams>(
  ({ name, setName, status, changeStatus }) => {
    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (event) => {
        setName(event.target.value);
      },
      [setName]
    );

    return (
      <Root>
        <TextField value={name} onChange={handleChange} />
        <Status>
          <FormGroup className={checkboxesStyle}>
            {getKeys(status).map((item) => (
              <StatusFilter
                key={item}
                checked={status[item]}
                name={item}
                changeStatus={changeStatus}
              />
            ))}
          </FormGroup>
        </Status>
      </Root>
    );
  }
);
Filters.displayName = 'Filters';

type StatusFilterParams = Pick<FiltersParams, 'changeStatus'> & {
  checked: boolean;
  name: Program['status'];
};

const StatusFilter = memo<StatusFilterParams>(
  ({ changeStatus, checked, name }) => {
    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (a) => {
        changeStatus(name, a.target.checked);
      },
      [changeStatus, name]
    );

    return (
      <FormControlLabel
        control={
          <Checkbox
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            checked={checked}
          />
        }
        label={statusMapper[name]}
      />
    );
  }
);
StatusFilter.displayName = 'StatusFilter';

const Root = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Status = styled.div`
  display: block;
`;

const checkboxesStyle = css`
  && {
    display: block;
  }
`;
