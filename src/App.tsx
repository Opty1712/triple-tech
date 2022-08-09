import { Container } from '@mui/material';
import { AppHeader } from './components';
import { Programs } from './pages';

export const App = () => {
  return (
    <>
      <AppHeader />
      <Container
        component="main"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Programs />
      </Container>
    </>
  );
};
