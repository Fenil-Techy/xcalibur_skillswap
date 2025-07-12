import React, { useState } from 'react';
import { Box, Paper, Typography, Stack, Chip, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material';

const mockRequests = [
  { id: 1, name: 'Marc Demo', skill: 'Guitar', status: 'Pending' },
  { id: 2, name: 'Michael', skill: 'UI Design', status: 'Accepted' },
  { id: 3, name: 'Joe Wills', skill: 'Public Speaking', status: 'Rejected' },
  { id: 4, name: 'Jane Doe', skill: 'React', status: 'Pending' },
  { id: 5, name: 'Sam Smith', skill: 'Photography', status: 'Pending' },
];

function statusColor(status) {
  if (status === 'Accepted') return 'success';
  if (status === 'Rejected') return 'error';
  return 'warning';
}

function SwapRequestsList() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;
  const paginated = mockRequests.slice((page-1)*rowsPerPage, page*rowsPerPage);
  const pageCount = Math.ceil(mockRequests.length / rowsPerPage);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f8fa', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3, width: '100%', maxWidth: 700 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Swap Requests</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Skill</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.map(req => (
                  <TableRow key={req.id}>
                    <TableCell>{req.name}</TableCell>
                    <TableCell>{req.skill}</TableCell>
                    <TableCell><Chip label={req.status} color={statusColor(req.status)} /></TableCell>
                    <TableCell align="right">
                      {req.status === 'Pending' && <Button size="small" color="success">Accept</Button>}
                      {req.status === 'Pending' && <Button size="small" color="error">Reject</Button>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack alignItems="center" mt={2}>
            <Pagination count={pageCount} page={page} onChange={(_, v) => setPage(v)} color="primary" />
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}

export default SwapRequestsList; 