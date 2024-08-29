import React from 'react';
import { Container, Typography, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Triste = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/dashboard');
    };

    return (
        <>
            <div style={{
                width: '100%',
                backgroundColor: '#003366',
                color: 'white',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
            }}>
                <IconButton onClick={handleBack} style={{ color: 'white' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" align="center"
                    style={{
                        flexGrow: 1,
                        textAlign: 'center',
                        paddingRight: '10%',
                        paddingTop: '8px',
                        fontSize: '33px',
                        fontFamily: 'Saturday'
                    }}>
                    Triste
                </Typography>
            </div>

            {/* Conteúdo principal */}
            <Container maxWidth="md" sx={{ marginTop: '20px' }}>
                <Typography variant="body1" align="center" paragraph sx={{ fontSize: '17px' }}>
                    A vida coloca diante de nós muitos obstáculos, muitos desvios, cria, algumas vezes, labirintos que não parecem ter saída.
                    Em algum momento da sua vida você pode se sentir completamente só e perdido. Mas não desista.
                    Por mais que nada pareça motivar você e que a própria vida pareça não fazer sentido, não desista de você.
                </Typography>
                <Typography variant="body1" align="center" paragraph sx={{ fontSize: '17px' }}>
                    Quando tudo à sua volta parecer desmoronar, pense que a sua fortaleza está dentro do seu coração.
                    Não deixe o fogo da vida se apagar. Não mate a sua vida aos poucos, não perca o ânimo, não perca a alegria de viver e de enfrentar os desafios.
                    É justamente nos momentos mais difíceis que você descobre ser mais forte do que alguma vez foi capaz de imaginar.
                </Typography>
                <Typography variant="body1" align="center" paragraph sx={{ fontSize: '17px' }}>
                    Tudo que uma pessoa é capaz de planejar, ela é capaz de realizar. Tenha fé, otimismo e ação.
                    Sua vida só você a vive, portanto ame mais, acredite mais, e seja mais feliz.
                    Procure plantar sementes de amor e otimismo na sua vida, e você colherá sempre maravilhosos frutos.
                </Typography>
                <Typography variant="h6" align="center" sx={{ marginTop: '20px', fontWeight: 'bold' }}>
                    Eu acredito em você!
                </Typography>

                {/* vídeo do YouTube */}
                <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
                    <iframe
                        width="320"
                        height="180"
                        src="https://www.youtube.com/embed/78WrEh__qKA"
                        title="Está Triste? Mensagem de Conforto Fé e Esperança"
                        style={{ border: 'none' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>

                    <Typography
                        variant="caption"
                        align="center"
                        sx={{
                            marginTop: '15px',
                            fontWeight: 'bold',
                            display: 'block',
                            fontSize: '14px'
                        }}
                    >
                        <Link
                            href="https://www.youtube.com/embed/78WrEh__qKA"
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="always"
                        >
                            Está triste? Mensagem de Conforto, Fé e Esperança
                        </Link>
                    </Typography>
                </Box>



                {/* Footer */}
                <Box mt={8} textAlign="center">
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Saturday' }}>
                        PsiCuida
                    </Typography>
                </Box>
            </Container >
        </>
    );
};

export default Triste;
