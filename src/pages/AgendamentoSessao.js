import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Container, TextField, MenuItem, Select, InputLabel, FormControl, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Grid, Alert } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

dayjs.extend(utc);
dayjs.extend(timezone);

const AgendamentoSessao = () => {

  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const userId = useSelector((state) => state.user.userId);
  const userName = useSelector((state) => state.user.userName);

  const [medicos, setMedicos] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [selectedMedico, setSelectedMedico] = useState('');
  const [data, setData] = useState(null);
  const [horario, setHorario] = useState('');
  const [observacao, setObservacao] = useState('');
  const [agendamentoId, setAgendamentoId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [agendamentoToDelete, setAgendamentoToDelete] = useState(null);

  const horariosDisponiveis = [
    '08:00',
    '10:00',
    '14:00',
    '16:00',
    '18:00',
  ];

  const statusColors = {
    PENDENTE: '#fffba0',
    AGENDADO: '#4CAF50',
  };

  const fetchMedicos = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/profissionais`);
      if (response.ok) {
        const data = await response.json();
        setMedicos(data);
      } else {
        console.error('Erro ao buscar médicos:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
    }
  }, [apiUrl]);

  const fetchAgendamentos = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/agendamentos/por-paciente?pacienteId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setAgendamentos(data);
      } else {
        console.error('Erro ao buscar agendamentos:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  }, [apiUrl, userId]);

  useEffect(() => {
    fetchMedicos();
    fetchAgendamentos();
  }, [fetchMedicos, fetchAgendamentos]);

  const handleAgendar = async () => {
    const dataHora = dayjs(`${dayjs(data).format('YYYY-MM-DD')}T${horario}:00`).format('YYYY-MM-DDTHH:mm:ss');

    // Verifica se já existe um agendamento para o mesmo paciente na mesma data, ignorando o agendamento atual em caso de atualização
    const dataFormatada = dayjs(data).format('YYYY-MM-DD');
    const agendamentoExistente = agendamentos.find(
      (agendamento) =>
        dayjs(agendamento.dataHora).format('YYYY-MM-DD') === dataFormatada &&
        agendamento.id !== agendamentoId
    );

    if (agendamentoExistente) {
      setSnackbarMessage('Você já possui um agendamento nesta data.');
      setSnackbarErrorOpen(true);
      return;
    }

    const agendamento = {
      pacienteId: userId,
      profissionalId: selectedMedico,
      dataHora: dataHora,
      status: 'PENDENTE',
      observacao,
    };

    try {
      const method = agendamentoId ? 'PUT' : 'POST';
      const url = agendamentoId
        ? `${apiUrl}/agendamentos/${agendamentoId}`
        : `${apiUrl}/agendamentos`;

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agendamento),
      });

      if (response.ok && response.status === 200) {
        const data = await response.json();
        const msg = agendamentoId ? 'Agendamento atualizado com sucesso' : 'Agendamento realizado com sucesso. Aguarde confirmação.';
        setSnackbarMessage(msg);
        setSnackbarOpen(true);
        console.log('Agendamento realizado/atualizado com sucesso', data);
        fetchAgendamentos();
        clearForm();
      } else if (response.status === 204) {
        setSnackbarMessage('Agendamento já existente para este horário e profissional');
        setSnackbarErrorOpen(true);
      } else {
        console.error('Erro ao realizar/atualizar agendamento:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao realizar/atualizar agendamento:', error);
    }
  };

  const handleExcluir = async (agendamentoId) => {
    try {
      const response = await fetch(`${apiUrl}/agendamentos/${agendamentoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Agendamento cancelado com sucesso');
        setSnackbarMessage('Agendamento cancelado com sucesso');
        setSnackbarOpen(true);
        fetchAgendamentos();
        handleCloseConfirmDialog();
      } else {
        console.error('Erro ao excluir agendamento:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
    }
  };

  const clearForm = () => {
    setSelectedMedico('');
    setData(null);
    setHorario('');
    setObservacao('');
    setAgendamentoId(null);
  };

  const handleEditar = (agendamento) => {
    setAgendamentoId(agendamento.id);
    setSelectedMedico(agendamento.profissionalId);
    setData(dayjs(agendamento.dataHora));
    setHorario(dayjs(agendamento.dataHora).format('HH:mm'));
    setObservacao(agendamento.observacao || '');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarErrorOpen(false);
  };

  const handleOpenConfirmDialog = (agendamentoId) => {
    setAgendamentoToDelete(agendamentoId);
    setDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setDialogOpen(false);
    setAgendamentoToDelete(null);
  };

  /**
   * Desabilita finais de semana e datas anteriores ao dia atual
   * @param {*} date 
   * @returns 
   */
  const disableDates = (date) => {
    const today = dayjs().startOf('day');
    return date.day() === 0 || date.day() === 6 || date.isBefore(today, 'day');
  };

  /**
   * Verifica se todos os campos obrigatórios estão preenchidos
   * @returns {boolean}
   */
  const isFormValid = () => {
    return selectedMedico && data && horario;
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        padding: '20px',
        borderRadius: '10px',
        marginTop: '20px',
      }}
    >
      <Grid container spacing={2}>
        {/* Nome */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            value={userName}
            disabled
          />
        </Grid>

        {/* Selecionar o médico */}
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" required>
            <InputLabel>Selecione o médico</InputLabel>
            <Select
              label="Selecione o médico"
              value={selectedMedico}
              onChange={(e) => setSelectedMedico(e.target.value)}
            >

              {medicos.map((medico) => (
                <MenuItem key={medico.id} value={medico.id}>
                  {medico.nome} - {medico.profissao}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Data */}
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Selecione a data"
              value={data}
              format="DD/MM/YYYY"
              onChange={(newValue) => setData(newValue)}
              shouldDisableDate={disableDates}
              allowKeyboardControl
              slots={{
                textField: (params) => (
                  <TextField {...params} fullWidth variant="outlined" required />
                ),
              }}
            />
          </LocalizationProvider>
        </Grid>

        {/* Selecionar o horário */}
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" required>
            <InputLabel>Selecione o horário</InputLabel>
            <Select
              label="Selecione o horário"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
            >
              {horariosDisponiveis.map((horario) => (
                <MenuItem key={horario} value={horario}>
                  {horario}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Observações */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Observações"
            variant="outlined"
            multiline
            rows={4}
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />
        </Grid>

        {/* Botão de Agendar */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleAgendar}
            disabled={!isFormValid()} 
            style={{ marginTop: 10, backgroundColor: !isFormValid() ? '' : '#003366', textTransform: 'none', fontSize: '17px' }}
          >
            <Typography>{agendamentoId ? 'Atualizar Agendamento' : 'Agendar'}</Typography>

          </Button>
        </Grid>
      </Grid>

      {/* Tabela de Agendamentos */}
      <TableContainer component={Paper} style={{ marginTop: '30px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold'}}> Data, Hora e Médico </TableCell>
              <TableCell sx={{fontWeight: 'bold'}}> Ação </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agendamentos.map((agendamento) => {
              const nomeProfissional = agendamento.profissionalNome;
              const rowStyle = { backgroundColor: statusColors[agendamento.status] };
              return (
                <TableRow key={agendamento.id} style={rowStyle}>
                  <TableCell>
                    <Box display="flex" flexDirection="column">
                      <Typography>{dayjs(agendamento.dataHora).format('DD/MM/YYYY')} - {dayjs(agendamento.dataHora).format('HH:mm')}</Typography>
                      <Typography>{nomeProfissional}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {agendamento.status === 'PENDENTE' && (
                      <>
                        <IconButton onClick={() => handleEditar(agendamento)} sx={{color:'#003366'}}>
                          <EditIcon />
                        </IconButton>

                        <IconButton onClick={() => handleOpenConfirmDialog(agendamento.id)} sx={{color:'#003366'}}>
                          <CancelIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Legenda das cores */}
      <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginTop: '10px' }}>
        <Box display="flex" alignItems="center" gap={2}>
          {Object.keys(statusColors).map((status) => (
            <Box key={status} display="flex" alignItems="center" gap={1}>
              <Box style={{ width: '20px', height: '20px', backgroundColor: statusColors[status] }}></Box>
              <Typography variant="body2">{status}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={snackbarErrorOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Dialogo de confirmação de exclusão */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseConfirmDialog}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#f5f5f', 
            borderRadius: '12px', 
            padding: '16px',
          }
        }}
      >
        <DialogTitle>Confirmar Cancelamento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja cancelar este agendamento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Não
          </Button>
          <Button onClick={() => {
            handleExcluir(agendamentoToDelete);
            handleCloseConfirmDialog();
          }} color="secondary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AgendamentoSessao;
