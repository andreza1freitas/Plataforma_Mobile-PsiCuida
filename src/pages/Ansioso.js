import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Ansioso = () => {
  return (
    <>
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        {/* Texto Descritivo */}
        <Typography variant="body1" align="center" paragraph style={{ fontSize: '15px' }}>
          Respire fundo. Viva o momento. A ansiedade pode ser algo difícil de lidar, 
          mas você é mais forte do que qualquer obstáculo. Muitas vezes, tudo o que a gente 
          precisa na vida é de um momento de pausa. Relaxe e lembre-se de que a ansiedade 
          não define quem você é. Você é um milhão de outras coisas que te fazem este ser 
          incrível e que todos admiram. Tente não pensar tanto no que está por vir. Viva o 
          presente. Tenha um pouco mais de calma, porque esse momento vai passar.
        </Typography>

        {/* Incorporando o vídeo do YouTube com iframe */}
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
          <iframe
             width="320" // Ajuste para o tamanho desejado
             height="180" // Ajuste para o tamanho desejado
            src="https://www.youtube.com/embed/AMu9YYKB3YU"
            title="YouTube video player"
            style={{ border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <Typography variant="caption" align="center" style={{ marginTop: '15px', fontWeight: 'bold' }}>
            OUÇA QUANDO ESTIVER NUMA CRISE DE ANSIEDADE
          </Typography>
        </Box>

        {/* Footer */}
        <Box mt={8} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            PsiCuida
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Ansioso;
