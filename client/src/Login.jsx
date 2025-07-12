import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
  Alert
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import api from './api';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onLogin && onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f8fa', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3, minWidth: 350, maxWidth: 400, width: '100%' }}>
          <Typography variant="h5" fontWeight={700} align="center" gutterBottom>Welcome Back</Typography>
          <Typography align="center" sx={{ color: '#555', mb: 2 }}>
            Enter your credentials to access your account.
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="m@example.com"
                fullWidth
                required
                InputProps={{ sx: { bgcolor: '#f3f4f6' } }}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                required
                InputProps={{ sx: { bgcolor: '#f3f4f6' } }}
              />
              <Button
                type="submit"
                variant="contained"
                startIcon={<LoginIcon />}
                sx={{ bgcolor: '#bae6fd', color: '#222', fontWeight: 600, fontSize: 16, borderRadius: 2, '&:hover': { bgcolor: '#7dd3fc' } }}
                fullWidth
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Stack>
          </form>
          <Typography align="center" sx={{ mt: 2, color: '#888', fontSize: 15 }}>
            Don&apos;t have an account?{' '}
            <Link underline="hover" onClick={() => navigate('/signup')} sx={{ cursor: 'pointer' }}>Sign up</Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login; 