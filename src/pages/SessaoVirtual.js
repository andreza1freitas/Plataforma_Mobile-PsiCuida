import React from 'react';
import { Container, Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CallIcon from '@mui/icons-material/Call';

const SessaoVirtual = () => {
  return (
    <Container maxWidth="sm" sx={{ padding: '20px', borderRadius: '15px', marginTop: '40px' }}>
      <Box display="flex" justifyContent="center">
        <Card sx={{ marginTop: '10%', width: '100%', padding: '20px', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" align="center" sx={{ marginBottom: '20px' }}>
              Sessão com...
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center" sx={{ marginBottom: '10px' }}>
              Data: DD/MM/YYYY
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center" sx={{ marginBottom: '20px' }}>
              Horário: 00:00
            </Typography>

            <Box mt={2}>
              <Box display="flex" justifyContent="space-around">
                <IconButton color="primary">
                  <VideoCallIcon sx={{ fontSize: 50, color: '#007BFF' }} />
                </IconButton>

                <IconButton color="secondary">
                  <CallIcon sx={{ fontSize: 50, color: '#28A745' }} />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SessaoVirtual;
