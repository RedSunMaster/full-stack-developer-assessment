import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../logo.svg'
import { useNavigate } from 'react-router-dom';

//Ability to add more pages and urls
const pages = ['View Records'];
const urls = ['/'];

export const Navbar = () => {
  const [anchorNav, setAnchorNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleNavigate = (url : string) => {
    navigate(url);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorNav(null);
  };


  //Reactive menu which shrinks with window size and creates app draw when on smaller screen sizes
  return (
    <AppBar position="static" sx={{backgroundImage: 'linear-gradient(to right, #327D2E,#6CBB45);' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              width: '20%',
              minWidth:'20%'
            }}
            alt="SchoolDocsLogo"
            src={Logo}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={() => handleNavigate(urls[index])}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            component="img"
            sx={{ 
              display: { xs: 'flex', md: 'none' },
              mr: 1,
              width: '40%',
            }}
            alt="SchoolDocsLogo"
            src={Logo}
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={() => handleNavigate(urls[index])}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
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
