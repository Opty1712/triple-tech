import { ProgramsView } from './ProgramsView';
import { usePrograms } from './usePrograms';

export const Programs = () => {
  const params = usePrograms();

  return <ProgramsView {...params} />;
};
