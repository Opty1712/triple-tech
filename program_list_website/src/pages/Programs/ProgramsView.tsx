import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { memo } from 'react';
import { Program } from './types';

type ProgramsViewProps = {
  isLoading: boolean;
  programs: Program[];
};
export const ProgramsView = memo<ProgramsViewProps>(
  ({ isLoading, programs }) => {
    if (isLoading) {
      return <div>Loading</div>;
    }

    return (
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
            {programs.map((program) => (
              <tr key={program.id}>
                {columns.map(({ key }, index) => (
                  <TableCell key={key + index}>{program[key]}</TableCell>
                ))}
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
);
ProgramsView.displayName = 'Programs';

type ProgramColumn = {
  key: keyof Program;
  name: string;
};

const columns: Array<ProgramColumn> = [
  { name: 'Name', key: 'name' },
  { name: 'Cashback', key: 'return_percentage' },
  { name: 'Threshold', key: 'threshold' },
  { name: 'Status', key: 'status' },
  { name: 'Pause Date', key: 'pause_at' },
];
