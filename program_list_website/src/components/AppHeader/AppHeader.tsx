import { AppBar, Toolbar, Typography } from '@mui/material';

export const AppHeader = () => {
  return (
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      sx={{
        position: 'relative',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Triple
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
