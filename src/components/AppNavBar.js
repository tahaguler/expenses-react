import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { Link } from 'react-router-dom';

const navItems = {
  Home: "/",
  Expenses: "/expenses",
  Categories: "/categories",
};

function AppNavBar(props) {

  const { window } = props;

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar color='warning' component="nav">
          <Toolbar>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}
            >
              Micronomy
            </Typography>
            <Box sx={{ display: { sm: 'block' } }}>
                {Object.keys(navItems).map(key => (
                  <Button id={"button-"+ key} className={"button-"+ key} key={key} variant="text"
                    size='large'
                    component={Link}
                    to={navItems[key]}
                    sx={{ fontWeight: 'bold', color: '#fff' }}>{key}</Button>
                ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Toolbar />
    </>

  );
}
export default AppNavBar;