import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, List, ListItemButton, ListItemText, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Obtém a URL base da API a partir das variáveis de ambiente
const apiUrl = process.env.REACT_APP_API_BASE_URL;

const ForumApoio = () => {
    const [perguntas, setPerguntas] = useState([]);
    const [open, setOpen] = useState(false);
    const [novaPergunta, setNovaPergunta] = useState({ titulo: '', descricao: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const pacienteId = useSelector((state) => state.user.userId);

    useEffect(() => {
        // Buscar perguntas da API para o paciente específico
        axios.get(`${apiUrl}/perguntas`, { params: { pacienteId } })
            .then(response => {
                setPerguntas(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Erro ao carregar perguntas');
                setLoading(false);
                console.error(error);
            });
    }, [pacienteId]);

    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovaPergunta(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddPergunta = () => {
        axios.post(`${apiUrl}/perguntas`, { ...novaPergunta, pacienteId })  
            .then(response => {
                setPerguntas([...perguntas, response.data]);
                setNovaPergunta({ titulo: '', descricao: '' });
                handleDialogClose();
            })
            .catch(error => {
                setError('Erro ao adicionar pergunta');
                console.error(error);
            });
    };

    if (loading) {
        return <Typography>Carregando...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Container>
            <List>
                {perguntas.map((pergunta) => (
                    <ListItemButton key={pergunta.id}>
                        <ListItemText primary={pergunta.titulo} secondary={`${pergunta.respostas.length} respostas`} />
                    </ListItemButton>
                ))}
            </List>
            <Button variant="contained" color="primary" fullWidth onClick={handleDialogOpen}>+ Novo tópico</Button>
            
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Nova Pergunta</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="titulo"
                        label="Título"
                        fullWidth
                        value={novaPergunta.titulo}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="descricao"
                        label="Descrição"
                        fullWidth
                        multiline
                        rows={4}
                        value={novaPergunta.descricao}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">Cancelar</Button>
                    <Button onClick={handleAddPergunta} color="primary">Adicionar</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ForumApoio;
