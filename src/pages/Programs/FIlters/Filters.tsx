import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { FormGroup, TextField } from '@mui/material';
import { memo } from 'react';
import { getKeys } from '../../../utils';
import { StatusFilter } from './StatusFilter';
import { FiltersParams } from './types';

export const Filters = memo<FiltersParams>(
  ({ name, handleNameChange, status, changeStatus }) => {
    return (
      <Root>
        <TextField value={name} onChange={handleNameChange} />
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
