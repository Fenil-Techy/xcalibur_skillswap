import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Switch,
  FormControlLabel,
  Checkbox,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import api from './api';

const availabilityOptions = ['Weekdays', 'Evenings', 'Weekends'];

function ProfileSetup({ onSave }) {
  const [location, setLocation] = useState('');
  const [skillsOffer, setSkillsOffer] = useState('');
  const [skillsWant, setSkillsWant] = useState('');
  const [availability, setAvailability] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get('/profile')
      .then(res => {
        setLocation(res.data.location || '');
        setSkillsOffer((res.data.skillsOffer || []).join(', '));
        setSkillsWant((res.data.skillsWant || []).join(', '));
        setAvailability(res.data.availability || []);
        setIsPublic(res.data.isPublic !== false);
      })
      .catch(() => setError('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handleAvailabilityChange = (option) => {
    setAvailability(prev =>
      prev.includes(option)
        ? prev.filter(f => f !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.put('/profile', {
        location,
        skillsOffer: skillsOffer.split(',').map(s => s.trim()).filter(Boolean),
        skillsWant: skillsWant.split(',').map(s => s.trim()).filter(Boolean),
        availability,
        isPublic
      });
      onSave && onSave();
    } catch (err) {
      setError('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f8fa', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, minWidth: { xs: 0, sm: 300 }, maxWidth: 600, width: '100%' }}>
          <Typography variant="h5" fontWeight={700} align="center" gutterBottom>Set Up Your Profile</Typography>
          <Typography align="center" sx={{ color: '#555', mb: 3 }}>
            Tell the community about yourself. You can change this information later.
          </Typography>
          {loading ? (
            <Stack alignItems="center" my={4}><CircularProgress /></Stack>
          ) : (
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                  label="Location (optional)"
                  placeholder="e.g., San Francisco, CA"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  fullWidth
                  InputProps={{ sx: { bgcolor: '#ededed' } }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Skills You Offer"
                      placeholder="e.g., React, Photography, Baking (comma-separated)"
                      value={skillsOffer}
                      onChange={e => setSkillsOffer(e.target.value)}
                      fullWidth
                      multiline
                      minRows={2}
                      InputProps={{ sx: { bgcolor: '#ededed' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Skills You Want to Learn"
                      placeholder="e.g., Guitar, Public Speaking, UI Design (comma-separated)"
                      value={skillsWant}
                      onChange={e => setSkillsWant(e.target.value)}
                      fullWidth
                      multiline
                      minRows={2}
                      InputProps={{ sx: { bgcolor: '#ededed' } }}
                    />
                  </Grid>
                </Grid>
                <Box>
                  <Typography fontWeight={500} mb={1}>Availability</Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {availabilityOptions.map(option => (
                      <FormControlLabel
                        key={option}
                        control={
                          <Checkbox
                            checked={availability.includes(option)}
                            onChange={() => handleAvailabilityChange(option)}
                            sx={{ color: '#bdbdbd', '&.Mui-checked': { color: '#222' } }}
                          />
                        }
                        label={<Typography fontSize={15}>{option}</Typography>}
                      />
                    ))}
                  </Stack>
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isPublic}
                        onChange={() => setIsPublic(v => !v)}
                        color="primary"
                      />
                    }
                    label={<Box><Typography fontWeight={500}>Public Profile</Typography><Typography fontSize={14} color="#888">Make your profile visible to others.</Typography></Box>}
                    sx={{ alignItems: 'flex-start', mt: 1, mb: 2, width: '100%' }}
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: '#fef08a', color: '#222', fontWeight: 600, fontSize: 16, borderRadius: 2, '&:hover': { bgcolor: '#fde047' } }}
                  fullWidth
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save and Continue'}
                </Button>
              </Stack>
            </form>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default ProfileSetup; 