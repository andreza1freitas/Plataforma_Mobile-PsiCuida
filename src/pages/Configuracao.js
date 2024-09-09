import React, { useState } from 'react';
import { Container, Stack, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Configuracao = () => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false); 
    const [snackbarMessage, setSnackbarMessage] = useState(''); 
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

    const pacienteId = useSelector((state) => state.user.userId);

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

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/pacientes/${pacienteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                setSnackbarMessage('Conta excluída com sucesso');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate("/");
                }, 3000); 
            } else {
                setSnackbarMessage('Falha ao excluir conta');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        } catch (error) {
            setSnackbarMessage('Erro ao excluir conta');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
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
            <Stack spacing={6} style={{ width: '100%' }}>
                <Button
                    variant="contained"
                    fullWidth
                    style={{
                        backgroundColor: '#003366',
                        textTransform: 'none',
                        fontSize: '17px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                    endIcon={<EditIcon />}
                    onClick={handleEditProfile}
                >
                    Editar Perfil
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    style={{
                        backgroundColor: '#003366',
                        textTransform: 'none',
                        fontSize: '17px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                    endIcon={<NotificationsIcon />}
                    onClick={handleNotificationProfile}
                >
                    Configurar Notificações
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    style={{
                        backgroundColor: '#003366',
                        textTransform: 'none',
                        fontSize: '17px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                    endIcon={<DeleteIcon />}
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
                    Você realmente deseja excluir sua conta? Esta ação não pode ser desfeita,
                    mas suas perguntas e respostas no fórum continuarão anonimamente.
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

            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Configuracao;
