import Container from '@mui/material/Container';
import { AppHeader } from './components';
import { Programs } from './pages';

const App = () => {
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

export default App;
