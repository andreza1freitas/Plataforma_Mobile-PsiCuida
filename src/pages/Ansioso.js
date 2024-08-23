import React from 'react';
import { Container, Typography, Box, IconButton, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Ansioso = () => {
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
        <Typography variant="h5" align="center" style={{ flexGrow: 1, textAlign: 'center', paddingRight: '10%', paddingTop: '8px', fontSize: '33px', fontFamily:'Saturday' }}>
          Ansioso(a)
        </Typography>
      </div>

      <Container maxWidth="md" sx={{ marginTop: '20px' }}>
        <Typography variant="body1" align="center" paragraph sx={{ fontSize: '15px' }}>
          Respire fundo. Viva o momento. A ansiedade pode ser algo difícil de lidar,
          mas você é mais forte do que qualquer obstáculo. Muitas vezes, tudo o que a gente
          precisa na vida é de um momento de pausa. Relaxe e lembre-se de que a ansiedade
          não define quem você é. Você é um milhão de outras coisas que te fazem este ser
          incrível e que todos admiram. Tente não pensar tanto no que está por vir. Viva o
          presente. Tenha um pouco mais de calma, porque esse momento vai passar.
        </Typography>

        {/* vídeo do YouTube */}
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
          <iframe
            width="320"
            height="180"
            src="https://www.youtube.com/embed/AMu9YYKB3YU"
            title="OUÇA QUANDO ESTIVER NUMA CRISE DE ANSIEDADE"
            style={{ border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <Typography
            variant="caption"
            align="center"
            sx={{ marginTop: '15px', fontWeight: 'bold', display: 'block' }}
          >
            <Link
              href="https://www.youtube.com/embed/AMu9YYKB3YU"
              target="_blank"
              rel="noopener noreferrer"
              underline="always"
            >
              OUÇA QUANDO ESTIVER NUMA CRISE DE ANSIEDADE
            </Link>
          </Typography>

          <Typography
            variant="h6"
            align="center"
            sx={{ marginTop: '40px', fontWeight: 'bold' }}
          >
            RMR - Ansiedade
          </Typography>

          <Typography
            variant="body1"
            align="center"
            paragraph
            sx={{ fontSize: '15px', marginTop: '10px' }}
          >
            Para promover mudanças tranquilizadoras na sua mente subconsciente através do Recondicionamento da mente
            pelo Relaxamento <strong>(RMR)</strong>.<br></br>
            Com o <strong>RMR</strong>, além de você experimentar um relaxamento profundo, a sua mente se tornará mais
            permeável para que a mudança se torne mais fácil e natural.
          </Typography>

          <Typography
            variant="body1"
            align="center"
            paragraph
            sx={{ fontSize: '15px', marginTop: '10px' }}
          >
            O <strong>RMR</strong> pode ser usado a qualquer momento, mas note que o vídeo dura 10 minutos. Reserve o tempo necessário.
            Se dormir durante o áudio, procure fazê-lo sentado(a).<br></br>
            <strong>Para melhores resultados, ouça com fones de ouvido.</strong>
          </Typography>

          {/* vídeo do YouTube */}
          <iframe
            width="320"
            height="180"
            src="https://www.youtube.com/embed/1fYt92gSJ_U"
            title="MINDFULNESS: ANSIEDADE ZERO (MEDITAÇÃO GUIADA)"
            style={{ border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <Typography
            variant="caption"
            align="center"
            sx={{ marginTop: '15px', fontWeight: 'bold', display: 'block' }}
          >
            <Link
              href="https://www.youtube.com/embed/1fYt92gSJ_U"
              target="_blank"
              rel="noopener noreferrer"
              underline="always"
            >
              MINDFULNESS: ANSIEDADE ZERO (MEDITAÇÃO GUIADA)
            </Link>
          </Typography>
        </Box>

        {/* Footer */}
        <Box mt={8} textAlign="center">
          <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Saturday'}}>
            PsiCuida
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Ansioso;
