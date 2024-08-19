import React from 'react';
import { Container, Button, Typography, List, ListItem, Grid, Link, Box } from '@mui/material';

const Suporte = () => {

    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                minHeight: '100vh',
                padding: '20px',
            }}
        >
            <Typography
                gutterBottom
                align="center"
                style={{ marginTop: '15px', marginBottom: '40px', fontSize: '35px', color: 'red' }}
            >
                Precisa de ajuda imediata?
            </Typography>

            <Typography
                paragraph
                align="center"
                style={{ marginTop: '15px', marginBottom: '20px', fontSize: '16px', fontWeight: 'bold' }}
            >
                Se você está em uma situação de emergência ou precisa falar com alguém agora, por favor, utilize uma das opções abaixo.
            </Typography>

            <Grid container direction="column" spacing={3} style={{ padding: '20px', marginBottom: '40px' }}>
                <Grid item>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        style={{ textTransform: 'none', fontSize: '18px', height: '50px' }}
                    >
                        Ligar para o CVV (188)
                    </Button>
                </Grid>

                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ textTransform: 'none', fontSize: '18px', height: '50px' }}
                    >
                        Falar com Alguém
                    </Button>
                </Grid>
            </Grid>

            <Typography
                variant="subtitle1"
                align="center"
                style={{ marginBottom: '20px', fontWeight: 'bold' }}
            >
                Você também pode encontrar ajuda nos seguintes recursos:
            </Typography>

            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: '40px',
                    marginTop: '15px',
                }}
            >
                <List style={{ width: '100%', padding: 0 }}>
                    <ListItem
                        style={{
                            justifyContent: 'center',
                            padding: '8px 0',
                        }}
                    >
                        <Link href="https://cvv.org.br/" target="_blank" rel="noopener" underline="hover">
                            Centro de Valorização da Vida (CVV)
                        </Link>
                    </ListItem>
                    <ListItem
                        style={{
                            justifyContent: 'center',
                            padding: '8px 0',
                        }}
                    >
                        <Link href="https://www.aa.org.br/" target="_blank" rel="noopener" underline="hover">
                            Alcoólicos Anônimos (aa)
                        </Link>
                    </ListItem>
                    <ListItem
                        style={{
                            justifyContent: 'center',
                            padding: '8px 0',
                        }}
                    >
                        <Link href="https://www.na.org.br/" target="_blank" rel="noopener" underline="hover">
                            Narcóticos Anônimos (na)
                        </Link>
                    </ListItem>
                </List>
            </Box>

            {/* Footer */}
            <Box mt={8} textAlign="center">
                <Typography variant="body2" color="textSecondary">
                    PsiCuida
                </Typography>
            </Box>
        </Container>
    );
}

export default Suporte;
