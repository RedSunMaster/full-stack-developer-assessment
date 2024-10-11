import * as React from 'react';
import '../index.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from '../logo.svg'
import { Padding } from '@mui/icons-material';

const pages = ['School Records', 'Edit Records'];

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
        <img id="Logo" src={Logo} alt="School Docs"/>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex'} }}>

            {pages.map((page) => (
                <Button
                    key={page}
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                    {page}
                </Button>
                ))}
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


export default Navbar;
