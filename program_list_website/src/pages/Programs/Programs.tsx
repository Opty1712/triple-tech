import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';

export const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadPeople() {
      setIsLoading(true);

      await getPrograms()
        .then((programs) => setPrograms(programs))
        .finally(() => setIsLoading(false));
    }

    loadPeople();
  }, []);

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
};

type Program = {
  id: number;
  name: string;
  return_percentage: string;
  threshold: number;
  status: string;
  pause_at: string | null;
};

async function getPrograms<T = Program[]>(): Promise<T> {
  const response = await fetch(`http://localhost:4002/programs`, {
    method: 'GET',
  }).catch((error) => console.error(error));

  if (!response?.ok) {
    throw new Error(response?.statusText);
  }

  return await (response.json() as Promise<T>);
}
