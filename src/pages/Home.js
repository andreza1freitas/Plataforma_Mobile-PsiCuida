import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container 
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                maxWidth : '100%',
                backgroundColor: '#003366' // cor azul escuro do projeto
            }}
            
        >
            <Container maxWidth="lg">

           
            <Typography 
                variant="h4" 
                align="center" 
                style={{ color: 'white', marginBottom: '80px' }}
            >
                PsiCuida
            </Typography>
            <Button 
                variant="contained" 
                fullWidth 
                onClick={() => navigate('/login')}
                style={{ textTransform: 'none', marginBottom: '16px', backgroundColor: '#1E90FF', color: 'white', fontSize: '17px' }}
            >
                Entrar
            </Button>
            <Button 
                variant="outlined" 
                fullWidth 
                onClick={() => navigate('/cadastro')}
                style={{ textTransform: 'none', color: 'white', borderColor: 'white', fontSize: '17px' }}             
            >
                Cadastre-se
            </Button>
            </Container>
        </Container>
    );
}

export default Home;
