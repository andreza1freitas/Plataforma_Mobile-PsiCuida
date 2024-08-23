import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Button, List, ListItem, TextField, IconButton, Box } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RespostasForum = () => {
    const { id } = useParams();
    const [pergunta, setPergunta] = useState(null);
    const [respostas, setRespostas] = useState([]);
    const [novaResposta, setNovaResposta] = useState('');
    const [error, setError] = useState('');
    const pacienteId = useSelector((state) => state.user.userId);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/forum-apoio');
    };

    useEffect(() => {
        axios.get(`${apiUrl}/perguntas/${id}`)
            .then(response => setPergunta(response.data))
            .catch(error => {
                setError('Erro ao carregar a pergunta');
                console.error(error);
            });

        axios.get(`${apiUrl}/perguntas/${id}/respostas`)
            .then(response => setRespostas(response.data))
            .catch(error => {
                setError('Erro ao carregar as respostas');
                console.error(error);
            });
    }, [id, apiUrl]);

    const handleAddResposta = () => {
        axios.post(`${apiUrl}/respostas`, { conteudo: novaResposta, perguntaId: id, pacienteId })
            .then(response => {
                setRespostas([...respostas, response.data]);
                setNovaResposta('');
            })
            .catch(error => {
                setError('Erro ao adicionar resposta');
                console.error(error);
            });
    };

    if (!pergunta) {
        return <Typography>Carregando...</Typography>;
    }

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
                <Typography variant="h5" align="center" style={{ flexGrow: 1, textAlign: 'center', paddingRight: '10%', paddingTop: '8px', fontSize: '33px', fontFamily: 'Saturday' }}>
                    Respostas
                </Typography>
            </div>

            <Container>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontSize: '18px',
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        color: '#003366',
                        backgroundColor: '#d1f7c0',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        marginTop: '30px',
                    }}
                >
                    {pergunta.descricao}
                </Typography>
                <List>
                    {respostas.map(resposta => (
                        <ListItem
                            key={resposta.id}
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '16px',
                                marginBottom: '12px',
                                backgroundColor: '#f9f9f9',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontStyle: 'italic',
                                    color: 'gray',
                                    marginBottom: '8px'
                                }}
                            >
                                Resposta:
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '16px',
                                    lineHeight: '1.5',
                                    color: '#333'
                                }}
                            >
                                {resposta.conteudo}
                            </Typography>
                        </ListItem>
                    ))}
                </List>

                <TextField
                    label="Sua resposta"
                    fullWidth
                    multiline
                    rows={4}
                    value={novaResposta}
                    onChange={(e) => setNovaResposta(e.target.value)}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Button
                        variant="contained"
                        onClick={handleAddResposta}
                        style={{ background: '#003366', textTransform: 'none' }}
                    >
                        Enviar Resposta
                    </Button>
                </Box>

                {error && <Typography color="error">{error}</Typography>}
            </Container>
        </>
    );
};

export default RespostasForum;
