import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack, Avatar } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: '#fff', borderBottom: '1px solid #eee' }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 6 } }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: '#e3e8ef', color: '#222', fontWeight: 700, fontSize: 20, borderRadius: 2 }}>S</Avatar>
          <Typography variant="h6" fontWeight={700} color="#222">SkillSwap</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button component={NavLink} to="/" sx={{ textTransform: 'none', color: '#222', fontWeight: 500 }} exact="true">Home</Button>
          {isLoggedIn && <Button component={NavLink} to="/swap-requests" sx={{ textTransform: 'none', color: '#222', fontWeight: 500 }}>Swap Requests</Button>}
          {isAdmin && <Button component={NavLink} to="/admin" sx={{ textTransform: 'none', color: '#222', fontWeight: 500 }}>Admin</Button>}
          {!isLoggedIn ? (
            <Button variant="outlined" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 500, borderColor: '#d1d5db', color: '#222', bgcolor: '#fff', '&:hover': { borderColor: '#bdbdbd', bgcolor: '#f3f4f6' } }} onClick={() => navigate('/login')}>
              Login
            </Button>
          ) : (
            <>
              <Button variant="outlined" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 500, borderColor: '#d1d5db', color: '#222', bgcolor: '#fff', '&:hover': { borderColor: '#bdbdbd', bgcolor: '#f3f4f6' } }} onClick={handleLogout}>
                Logout
              </Button>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Button component={NavLink} to="/profile" sx={{ textTransform: 'none', color: '#222', fontWeight: 500, minWidth: 0, px: 1 }}>
                  Profile
                </Button>
                <Typography fontWeight={500}>{user.email}</Typography>
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#e3e8ef', color: '#222', fontWeight: 700 }}>{user.email ? user.email[0].toUpperCase() : 'U'}</Avatar>
              </Stack>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar; 