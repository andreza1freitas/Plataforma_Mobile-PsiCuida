import React from 'react';
import { Container, Typography, Card, CardContent, Button, Box, CardMedia } from '@mui/material';

const ConteudoEducacional = () => {
  const artigos = [
    {
      title: 'Técnicas de Autoajuda',
      description: 'Descubra técnicas simples para melhorar a sua qualidade de vida.',
      image: '/assets/image/imagem-autoajuda.jpg',
    },
    {
      title: 'Saúde Mental e Bem-Estar',
      description: 'Artigos e dicas para cuidar da sua saúde mental.',
      image: '/assets/image/imagem-bem-estar.jpg',
    },
    {
      title: 'Histórias de Sucesso',
      description: 'Inspire-se com histórias de superação e resiliência.',
      image: '/assets/image/imagem-sucesso.jpg',
    },

  ];

  const videos = [
    {
      title: 'Práticas de Meditação',
      description: 'Aprenda a meditar para reduzir o estresse e aumentar o foco.',
      videoUrl: 'https://www.youtube.com/embed/1MrQPZuSs7A',
    },
    {
      title: 'Exercícios de Relaxamento',
      description: 'Técnicas para relaxar e aliviar a tensão do dia a dia.',
      videoUrl: 'https://www.youtube.com/embed/n8zb-rSgTBo',
    },
  ];

  return (
    <Container>

      <Typography variant="h6" component="h2" gutterBottom sx={{marginTop: 3, textAlign: 'center', color: '#003366', fontSize: '25px', fontFamily: 'Saturday' }}>
        Artigos
      </Typography>

      <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={2}>
        {artigos.map((artigo, index) => (
          <Box key={index} flexBasis={{ xs: '100%', sm: '48%', md: '30%' }} mb={4}>
            <Card>
              <CardMedia component="img" height="150" image={artigo.image} alt={artigo.title} />
              <CardContent>
                <Typography variant="h6" component="h3">
                  {artigo.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {artigo.description}
                </Typography>
                <Button href={artigo.link} variant="contained" color="primary" sx={{ marginTop: 2 }}>
                  Ler mais
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Typography variant="h6" component="h2" gutterBottom sx={{marginTop: 3, textAlign: 'center', color: '#003366', fontSize: '25px', fontFamily: 'Saturday' }}>
        Vídeos Informativos
      </Typography>

      <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={2}>
        {videos.map((video, index) => (
          <Box key={index} flexBasis={{ xs: '100%', sm: '48%', md: '30%' }} mb={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3">
                  {video.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {video.description}
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  <iframe
                    width="100%"
                    height="200"
                    src={video.videoUrl}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box mt={8} textAlign="center">
        <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Saturday' }}>
          PsiCuida
        </Typography>
      </Box>
    </Container>
  );
};

export default ConteudoEducacional;
