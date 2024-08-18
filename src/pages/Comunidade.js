import React from 'react';
import { Container, Typography, Button, List, ListItemButton, ListItemText } from '@mui/material';

const Comunidade = () => {
    return (
        <Container>
            <Typography variant="h5" gutterBottom>Comunidade de Apoio</Typography>
            <List>
                <ListItemButton>
                    <ListItemText primary="Como lidar com a ansiedade no trabalho?" secondary="15 respostas" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemText primary="Estratégias para combater a depressão" secondary="8 respostas" />
                </ListItemButton>
            </List>
            <Button variant="contained" color="primary" fullWidth>+ Novo tópico</Button>
        </Container>
    );
}

export default Comunidade;
