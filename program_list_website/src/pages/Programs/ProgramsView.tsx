import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { memo } from 'react';
import { Filters, FiltersParams } from './FIlters/Filters';
import { VisibleColumns } from './types';

type ProgramsViewProps = FiltersParams & {
  isLoading: boolean;
  programs: VisibleColumns[];
};

export const ProgramsView = memo<ProgramsViewProps>(
  ({ isLoading, programs, name, setName, changeStatus, status }) => {
    return (
      <div>
        <Filters
          name={name}
          setName={setName}
          status={status}
          changeStatus={changeStatus}
        />
        <br />
        <br />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(({ name }, index) => (
                  <TableCell component="th" key={name + index}>
                    {name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <tr>
                  <TableCell colSpan={columns.length}>Loading...</TableCell>
                </tr>
              ) : (
                programs.map((program) => (
                  <tr key={program.id}>
                    {columns.map(({ key }, index) => (
                      <TableCell key={key + index}>{program[key]}</TableCell>
                    ))}
                  </tr>
                ))
              )}

              {!isLoading && programs.length === 0 && (
                <tr>
                  <TableCell colSpan={columns.length}>Nothing found</TableCell>
                </tr>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
);
ProgramsView.displayName = 'Programs';

type ProgramColumn = {
  key: keyof VisibleColumns;
  name: string;
};

const columns: Array<ProgramColumn> = [
  { name: 'Name', key: 'name' },
  { name: 'Cashback', key: 'return_percentage' },
  { name: 'Threshold', key: 'threshold' },
  { name: 'Status', key: 'status' },
  { name: 'Pause Date', key: 'pause_at' },
];
