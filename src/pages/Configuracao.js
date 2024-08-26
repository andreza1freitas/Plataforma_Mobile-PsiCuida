import React, { useState } from 'react';
import { Container, Stack, Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Configuracao = () => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

    const handleEditProfile = () => {
        navigate('/editar-perfil');
    };

    const handleNotificationProfile = () => {
        navigate('/notificacoes');
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = () => {
        // TODO adicionar lógica para excluir a conta
        console.log('Conta excluída');
        handleCloseDialog();
    };

    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '100vh',
                paddingTop: '100px',
                paddingBottom: '20px'
            }}
        >
            <Stack spacing={5} style={{ width: '100%' }}>
                <Button
                    variant="contained"
                    fullWidth
                    style={{ backgroundColor: '#003366', textTransform: 'none', fontSize: '17px' }}
                    startIcon={<EditIcon />}
                    onClick={handleEditProfile}
                >
                    Editar Perfil
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    style={{ backgroundColor: '#003366', textTransform: 'none', fontSize: '17px' }}
                    startIcon={<NotificationsIcon />}
                    onClick={handleNotificationProfile}
                >
                    Configurar Notificações
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    style={{ backgroundColor: '#003366', textTransform: 'none', fontSize: '17px' }}
                    startIcon={<DeleteIcon />}
                    onClick={handleOpenDialog}
                >
                    Excluir Conta
                </Button>
            </Stack>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Excluir Conta"}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Você realmente deseja excluir sua conta? Esta ação não pode ser desfeita.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Footer */}
            <Box mt={8} textAlign="center">
                <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Saturday', marginBottom: '80px' }}>
                    PsiCuida
                </Typography>
            </Box>
        </Container>
    );
};

export default Configuracao;
