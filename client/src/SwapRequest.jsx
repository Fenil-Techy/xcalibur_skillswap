import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Stack, MenuItem, TextField } from '@mui/material';

const yourSkills = ['React', 'Photography', 'Baking'];
const theirSkills = ['Guitar', 'Public Speaking', 'UI Design'];

function SwapRequest() {
  const [offered, setOffered] = useState('');
  const [wanted, setWanted] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit
    alert('Swap request submitted!');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f8fa', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3, minWidth: 350, maxWidth: 400, width: '100%' }}>
          <Typography variant="h6" fontWeight={700} align="center" mb={2}>Request a Swap</Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                select
                label="Choose one of your offered skills"
                value={offered}
                onChange={e => setOffered(e.target.value)}
                required
              >
                {yourSkills.map(skill => (
                  <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Choose one of their wanted skills"
                value={wanted}
                onChange={e => setWanted(e.target.value)}
                required
              >
                {theirSkills.map(skill => (
                  <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                multiline
                minRows={3}
                placeholder="Add a message (optional)"
              />
              <Button type="submit" variant="contained" sx={{ bgcolor: '#bae6fd', color: '#222', fontWeight: 600, borderRadius: 2, '&:hover': { bgcolor: '#7dd3fc' } }}>
                Submit
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}

export default SwapRequest; 