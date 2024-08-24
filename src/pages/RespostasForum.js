import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Button, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const RespostasForum = () => {
    const { id } = useParams();
    const [pergunta, setPergunta] = useState(null);
    const [respostas, setRespostas] = useState([]);
    const [novaResposta, setNovaResposta] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const pacienteId = useSelector((state) => state.user.userId);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPergunta = async () => {
            try {
                const response = await fetch(`${apiUrl}/perguntas/${id}`);
                if (!response.ok) throw new Error('Erro ao carregar a pergunta');
                const data = await response.json();
                setPergunta(data);
            } catch (error) {
                setError('Erro ao carregar a pergunta');
                console.error(error);
            }
        };

        const fetchRespostas = async () => {
            try {
                const response = await fetch(`${apiUrl}/perguntas/${id}/respostas`);
                if (!response.ok) throw new Error('Erro ao carregar as respostas');
                const data = await response.json();
                setRespostas(data);
            } catch (error) {
                setError('Erro ao carregar as respostas');
                console.error(error);
            }
        };

        fetchPergunta();
        fetchRespostas();
    }, [id, apiUrl]);

    const handleAddResposta = () => {
        axios.post(`${apiUrl}/respostas`, { conteudo: novaResposta, perguntaId: id, pacienteId })
            .then(response => {
                setRespostas([...respostas, response.data]);
                setNovaResposta('');
                handleDialogClose();
            })
            .catch(error => {
                setError('Erro ao adicionar resposta');
                console.error(error);
            });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const utcDate = new Date(date.toUTCString().slice(0, -4));
        return utcDate.toLocaleDateString();
    };

    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);

    const handleInputChange = (e) => {
        setNovaResposta(e.target.value);
    };

    const handleBack = () => {
        navigate('/forum-apoio');
    };

    return (
        <>
            <Box sx={{
                width: '100%',
                backgroundColor: '#003366',
                color: 'white',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                paddingX: 2
            }}>
                <IconButton onClick={handleBack} sx={{ color: 'white' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" align="center" style={{ flexGrow: 1, textAlign: 'center', paddingRight: '15%', paddingTop: '8px', fontSize: '30px', fontFamily: 'Saturday' }}>
                    Fórum de Apoio
                </Typography>
            </Box>

            <Container maxWidth="md" sx={{ marginTop: '20px' }}>
                {pergunta ? (
                    <Box>
                        <Box sx={{ marginBottom: '30px' }}>
                            <Typography variant="h5" gutterBottom>
                                {pergunta.descricao}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                <strong>Autor: Anônimo - Publicado em: {formatDate(pergunta.data)}</strong>
                            </Typography>
                        </Box>

                        <Typography variant="h6" gutterBottom sx={{ marginBottom: '30px', fontFamily:'Rubica', fontSize:'20px' }}>
                            Respostas
                        </Typography>

                        {respostas.map((resposta) => (
                            <Box key={resposta.id} sx={{
                                backgroundColor: '#dddddd',
                                padding: '15px',
                                borderRadius: '8px',
                                marginBottom: '15px',
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                            }}>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    <strong>Autor: Anônimo - Publicado em: {formatDate(resposta.data)}</strong>
                                </Typography>
                                <Typography variant="body1">
                                    {resposta.conteudo}
                                </Typography>
                            </Box>
                        ))}

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleDialogOpen}
                            sx={{
                                marginTop: '40px',
                                paddingTop: '8px',
                                backgroundColor: '#003366',
                                textTransform: 'none',
                                fontSize: '17px',
                            }}
                        >
                            Responder
                        </Button>
                        <Dialog open={open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
                            <DialogTitle>Responder</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Digite sua resposta"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={novaResposta}
                                    onChange={handleInputChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogClose} color="secondary">Cancelar</Button>
                                <Button onClick={handleAddResposta} color="primary">Adicionar</Button>
                            </DialogActions>
                        </Dialog>

                        {error && <Typography color="error">{error}</Typography>}
                    </Box>
                ) : (
                    <Typography>Carregando...</Typography>
                )}
            </Container>
        </>
    );
};

export default RespostasForum;
