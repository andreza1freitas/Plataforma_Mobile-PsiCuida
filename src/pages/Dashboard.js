import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    // Recupera o userName e userId do estado global do Redux
    const userName = useSelector((state) => state.user.userName);
    const navigate = useNavigate(); // Inicializa o hook de navegação

    const handleAnsiosoClick = () => {
        navigate('/ansioso'); // Navega para a página "Ansioso"
    };

    const handleInsoneClick = () => {
        navigate('/insone'); // Navega para a página "Insone"
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                minHeight: '100vh',
                paddingTop: '20px'
            }}
        >
            <Typography align="center" style={{ paddingTop: 30, color: '#003366', textTransform: 'none', fontSize: '33px', fontFamily: 'Saturday' }}>
                Olá, {userName}!
            </Typography>

            <Typography align="center" style={{ marginBottom: '32px', color: '#003366', textTransform: 'none', fontSize: '33px', fontFamily: 'Saturday' }}>
                Como você está agora?
            </Typography>

            <Button
                variant="contained"
                fullWidth
                sx={{ margin: '8px 0', textTransform: 'none', backgroundColor: '#FF6F61', fontSize: '17px' }}
                onClick={handleAnsiosoClick}
            >
                Ansioso(a)
            </Button>
            <Button
                variant="contained"
                fullWidth
                sx={{ margin: '8px 0', textTransform: 'none', backgroundColor: '#64B5F6', fontSize: '17px' }}
            >
                Estressado(a)
            </Button>
            <Button
                variant="contained"
                fullWidth
                sx={{ margin: '8px 0', textTransform: 'none', backgroundColor: '#81C784', fontSize: '17px' }}
            >
                Triste
            </Button>
            <Button
                variant="contained"
                fullWidth
                sx={{ margin: '8px 0', textTransform: 'none', backgroundColor: '#FFD54F', fontSize: '17px' }}
            >
                Inseguro(a)
            </Button>
            <Button
                variant="contained"
                fullWidth
                sx={{ margin: '8px 0', textTransform: 'none', backgroundColor: '#CE93D8', fontSize: '17px' }}
            >
                Culpado(a)
            </Button>
            <Button
                variant="contained"
                fullWidth
                sx={{ margin: '8px 0', textTransform: 'none', backgroundColor: '#FFAB91', fontSize: '17px' }}
                onClick={handleInsoneClick}
            >
                Insone
            </Button>
            <Button
                variant="contained"
                fullWidth
                sx={{ margin: '8px 0', textTransform: 'none', backgroundColor: '#4DB6AC', fontSize: '17px' }}
            >
                Desatento(a)
            </Button>
        </Container>
    );
}

export default Dashboard;
