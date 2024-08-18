import React from 'react';
import { Container, Stack, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';

const Configuracao = () => {
    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                minHeight: '100vh',
                paddingTop: '100px'
            }}
        >
            <Stack spacing={5} style={{ width: '100%' }}>
                <Button
                    variant="contained"
                    fullWidth
                    style={{ backgroundColor: '#003366', textTransform: 'none', fontSize: '17px' }}
                    startIcon={<EditIcon />}
                >
                    Editar Perfil
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    style={{ backgroundColor: '#003366', textTransform: 'none', fontSize: '17px' }}
                    startIcon={<NotificationsIcon />}
                >
                    Configurar Notificações
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    style={{ backgroundColor: '#003366', textTransform: 'none', fontSize: '17px' }}
                    startIcon={<DeleteIcon />}
                >
                    Excluir Conta
                </Button>
            </Stack>
        </Container>
    );
}

export default Configuracao;
