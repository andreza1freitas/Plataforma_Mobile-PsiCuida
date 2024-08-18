import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    // Recupera o userName e userId do estado global do Redux
    const userName = useSelector((state) => state.user.userName);

    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',  
                minHeight: '100vh',
                paddingTop: '20px'
            }}
        >
            <Typography align="center" style={{ marginBottom: '32px', paddingTop: 30, color: '#003366', textTransform: 'none', fontSize: '25px'}}>
                Olá, {userName}! Como você está agora?
            </Typography>
  
            <Button
                variant="contained"
                fullWidth
                style={{ margin: '8px 0', textTransform: 'none', backgroundColor: '#FF6F61', fontSize: '17px' }} 
            >
                Ansioso(a)
            </Button>
            <Button
                variant="contained"
                fullWidth
                style={{ margin: '8px 0', textTransform: 'none', backgroundColor: '#64B5F6', fontSize: '17px' }} 
            >
                Culpado(a)
            </Button>
            <Button
                variant="contained"
                fullWidth
                style={{ margin: '8px 0', textTransform: 'none', backgroundColor: '#81C784', fontSize: '17px' }} 
            >
                Desanimado(a)
            </Button>
            <Button
                variant="contained"
                fullWidth
                style={{ margin: '8px 0', textTransform: 'none', backgroundColor: '#FFD54F', fontSize: '17px' }} 
            >
                Desatento(a)
            </Button>
            <Button
                variant="contained"
                fullWidth
                style={{ margin: '8px 0', textTransform: 'none', backgroundColor: '#CE93D8', fontSize: '17px' }} 
            >
                Estressado(a)
            </Button>
            <Button
                variant="contained"
                fullWidth
                style={{ margin: '8px 0', textTransform: 'none', backgroundColor: '#FFAB91', fontSize: '17px' }} 
            >
                Insone
            </Button>
            <Button
                variant="contained"
                fullWidth
                style={{ margin: '8px 0', textTransform: 'none', backgroundColor: '#4DB6AC', fontSize: '17px' }} 
            >
                Triste
            </Button>
        </Container>
    );
}

export default Dashboard;
