import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import api from './api';

const availabilityOptions = ['Weekdays', 'Evenings', 'Weekends'];

function SwapLanding({ isLoggedIn, setIsLoggedIn }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get('/users')
      .then(res => setUsers(res.data))
      .catch(() => setError('Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      (user.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (user.skillsOffer || []).some(skill => skill.toLowerCase().includes(search.toLowerCase())) ||
      (user.skillsWant || []).some(skill => skill.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter =
      filter.length === 0 || filter.some(f => (user.availability || []).includes(f));
    return matchesSearch && matchesFilter;
  });

  const handleFilterChange = (option) => {
    setFilter(prev =>
      prev.includes(option)
        ? prev.filter(f => f !== option)
        : [...prev, option]
    );
  };

  const handleRequestSwap = (user) => {
    if (!isLoggedIn) {
      setLoginPromptOpen(true);
    } else {
      navigate(`/swap-request/${user.userId?._id || user.userId}`);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f7f8fa', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      <Box sx={{ pt: 6, pb: 4, px: { xs: 1, sm: 2, md: 4, lg: 8 }, width: '100%' }}>
        <Typography variant="h4" fontWeight={700} align="center" gutterBottom sx={{ color: '#222' }}>
          Find Your Perfect Swap
        </Typography>
        <Typography align="center" sx={{ color: '#555', mb: 3 }}>
          Search for talented individuals by name or skill. Offer what you know, learn what you don't.
        </Typography>
        <Stack alignItems="center" spacing={2} mb={3} sx={{ width: '100%' }}>
          <TextField
            variant="outlined"
            placeholder="Search by skill or name (e.g. 'React', 'Alice')..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{ width: { xs: '100%', sm: 400 }, maxWidth: 600, bgcolor: '#fff', borderRadius: 2 }}
            size="medium"
          />
          <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', justifyContent: 'center' }}>
            <Typography sx={{ color: '#888', fontSize: 15 }}>Filter by availability:</Typography>
            {availabilityOptions.map(option => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={filter.includes(option)}
                    onChange={() => handleFilterChange(option)}
                    sx={{ color: '#bdbdbd', '&.Mui-checked': { color: '#222' } }}
                  />
                }
                label={<Typography fontSize={15}>{option}</Typography>}
              />
            ))}
          </Stack>
        </Stack>
        {loading ? (
          <Stack alignItems="center" mt={6}><CircularProgress /></Stack>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
            {filteredUsers.map((user, idx) => (
              <Grid item xs={12} sm={6} md={3} key={user._id || idx} display="flex">
                <UserCard
                  user={user}
                  requestSwapDisabled={!isLoggedIn}
                  onRequestSwap={() => handleRequestSwap(user)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Dialog open={loginPromptOpen} onClose={() => setLoginPromptOpen(false)}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <Typography>You must be logged in to request a swap.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginPromptOpen(false)}>Cancel</Button>
          <Button onClick={() => { setLoginPromptOpen(false); navigate('/login'); }} variant="contained">Login</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SwapLanding; 