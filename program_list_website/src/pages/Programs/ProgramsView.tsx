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
              <TableCell component="th">Name</TableCell>
              <TableCell component="th">Cashback</TableCell>
              <TableCell component="th">Threshold</TableCell>
              <TableCell component="th">Status</TableCell>
              <TableCell component="th">Pause Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programs.map((program) => (
              <tr key={program.id}>
                <TableCell>{program.name}</TableCell>
                <TableCell>{program.return_percentage}</TableCell>
                <TableCell>{program.threshold}</TableCell>
                <TableCell>{program.status}</TableCell>
                <TableCell>{program.pause_at}</TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
);
ProgramsView.displayName = 'Programs';
