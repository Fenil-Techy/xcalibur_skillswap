import React from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Chip,
  Button,
  Box,
  Stack,
  Grid
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';

function UserCard({ user, requestSwapDisabled, onRequestSwap }) {
  const displayName = user.name || (user.userId && user.userId.email) || 'User';
  const offers = user.skillsOffer || [];
  const wants = user.skillsWant || [];
  const location = user.location || '';
  const availability = user.availability || [];

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, minHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" mb={1}>
          <Avatar sx={{ width: 56, height: 56, bgcolor: '#e3e8ef', color: '#888', fontWeight: 700, fontSize: 18 }}>100×100</Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700} lineHeight={1.1}>{displayName}</Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <LocationOnIcon sx={{ color: '#bdbdbd', fontSize: 18 }} />
              <Typography variant="body2" color="text.secondary">{location}</Typography>
            </Stack>
            {user.rating && (
              <Stack direction="row" alignItems="center" spacing={0.5} mt={0.2}>
                <StarIcon sx={{ color: '#fbbf24', fontSize: 18 }} />
                <Typography variant="body2" color="text.secondary" fontWeight={600}>{user.rating.toFixed(1)}</Typography>
                <Typography variant="caption" color="text.secondary">({user.ratingsCount} ratings)</Typography>
              </Stack>
            )}
          </Box>
        </Stack>
        <Typography variant="subtitle2" fontWeight={600} mt={1}>Offers</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
          {offers.map(skill => (
            <Chip key={skill} label={skill} size="small" sx={{ bgcolor: '#e3e8ef', fontSize: 14, fontWeight: 500 }} />
          ))}
        </Stack>
        <Typography variant="subtitle2" fontWeight={600}>Wants</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
          {wants.map(skill => (
            <Chip key={skill} label={skill} size="small" sx={{ bgcolor: '#f1f5f9', fontSize: 14, fontWeight: 500 }} />
          ))}
        </Stack>
        <Typography variant="subtitle2" fontWeight={600}>Availability</Typography>
        <Stack direction="row" spacing={1} mb={2}>
          {availability.map(a => (
            <Chip key={a} label={a} size="small" variant="outlined" sx={{ fontSize: 14, fontWeight: 500, borderColor: '#e3e8ef', bgcolor: '#fff' }} />
          ))}
        </Stack>
      </CardContent>
      <Box px={2} pb={2}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: requestSwapDisabled ? '#f3f4f6' : '#fef08a',
            color: '#222',
            fontWeight: 600,
            fontSize: 16,
            borderRadius: 2,
            boxShadow: 'none',
            '&:hover': { bgcolor: requestSwapDisabled ? '#f3f4f6' : '#fde047', boxShadow: 'none' }
          }}
          disabled={requestSwapDisabled}
          onClick={onRequestSwap}
        >
          Request Swap
        </Button>
      </Box>
    </Card>
  );
}

export default UserCard; 