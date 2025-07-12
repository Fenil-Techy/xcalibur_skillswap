import React from 'react';
import { Box, Paper, Typography, Avatar, Stack, Chip, Button, Grid } from '@mui/material';

const mockProfile = {
  name: 'Alice Johnson',
  location: 'San Francisco, CA',
  skillsOffer: ['React', 'Photography', 'Baking'],
  skillsWant: ['Guitar', 'Public Speaking', 'UI Design'],
  availability: ['Weekdays', 'Evenings'],
  isPublic: true,
};

function UserProfile() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f8fa', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3, width: '100%', maxWidth: 600 }}>
        <Stack direction="row" spacing={3} alignItems="center" mb={3}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: '#e3e8ef', color: '#222', fontWeight: 700, fontSize: 32 }}>A</Avatar>
          <Box>
            <Typography variant="h5" fontWeight={700}>{mockProfile.name}</Typography>
            <Typography color="text.secondary">{mockProfile.location}</Typography>
            <Typography fontSize={15} color={mockProfile.isPublic ? 'success.main' : 'error.main'} fontWeight={600} mt={1}>
              Profile: {mockProfile.isPublic ? 'Public' : 'Private'}
            </Typography>
          </Box>
        </Stack>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600} mb={1}>Skills Offered</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {mockProfile.skillsOffer.map(skill => (
                <Chip key={skill} label={skill} sx={{ mb: 1 }} />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600} mb={1}>Skills Wanted</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {mockProfile.skillsWant.map(skill => (
                <Chip key={skill} label={skill} sx={{ mb: 1 }} />
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Typography fontWeight={600} mb={1}>Availability</Typography>
        <Stack direction="row" spacing={1} mb={3}>
          {mockProfile.availability.map(a => (
            <Chip key={a} label={a} variant="outlined" />
          ))}
        </Stack>
        <Button variant="contained" sx={{ bgcolor: '#bae6fd', color: '#222', fontWeight: 600, borderRadius: 2, '&:hover': { bgcolor: '#7dd3fc' } }}>
          Edit Profile
        </Button>
      </Paper>
    </Box>
  );
}

export default UserProfile; 