import React, { useState } from 'react';
import { Button, TextField, Container, Typography, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Recebe a função onLogin como prop
const Login = ({ onLogin }) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          senha: credentials.password
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();

        // Passa os dados do usuário para a função onLogin
        onLogin({ userId: data.userId, userName: data.userName });

        navigate('/dashboard');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container component="main"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>

      <IconButton
        sx={{ alignSelf: 'flex-start', position: 'absolute', top: 20, left: 20 }}
        onClick={handleBackToHome}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h3" component="h1" gutterBottom
        sx={{ color: '#003366', marginBottom: '50px', fontFamily:'Saturday' }}>
        PsiCuida
      </Typography>

      <form onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <TextField
          sx={{ marginTop: '20px' }}
          required
          fullWidth
          name="email"
          label="E-mail"
          type="email"
          value={credentials.email}
          onChange={handleChange}
          autoComplete="email"
          autoFocus
        />
        <TextField
          sx={{ marginTop: '10px' }}
          required
          fullWidth
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          value={credentials.password}
          onChange={handleChange}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ backgroundColor: '#003366', marginTop: '10px', textTransform: 'none', fontSize: '17px'}}
        >
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
