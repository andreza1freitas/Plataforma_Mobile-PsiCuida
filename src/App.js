
import { useSelector, useDispatch, Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { store } from './redux/store';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import Diario from './pages/Diario';
import Suporte from './pages/Suporte';
import Comunidade from './pages/Comunidade';
import Configuracao from './pages/Configuracao';
import ConteudoEducacional from './pages/ConteudoEducacional';
import AutoAjuda from './pages/AutoAjuda';
import AgendamentoSessao from './pages/AgendamentoSessao';
import SessaoVirtual from './pages/SessaoVirtual';
import Logout from './pages/Logout';
import AuthRedirect from './components/AuthRedirect';
import { login, logout} from './redux/userSlice';
import Ansioso from './pages/Ansioso';
import EditarPerfil from './pages/EditarPerfil';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginComponent />} /> {/* Usando LoginComponent */}
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/editar-perfil" element={<EditarPerfil />} />
          <Route path="/ansioso" element={<Ansioso />} /> 

          {/* Rotas Privadas */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/diario" element={<Diario />} />
            <Route path="/comunidade" element={<Comunidade />} />
            <Route path="/conteudo-educacional" element={<ConteudoEducacional />} />
            <Route path="/auto-ajuda" element={<AutoAjuda />} />
            <Route path="/agendamento-sessao" element={<AgendamentoSessao />} />
            <Route path="/sessao-virtual" element={<SessaoVirtual />} />
            <Route path="/configuracao" element={<Configuracao />} />
            <Route path="/suporte" element={<Suporte />} />
            <Route path="/logout" element={<LogoutComponent />} />               
          </Route>
          

          {/* Redirecionamento de Rotas Desconhecidas */}
          <Route path="*" element={<AuthRedirect />} />        
        </Routes>
      </Router>
    </Provider>
  );
}

function LoginComponent() {
  const dispatch = useDispatch();

  const handleLogin = (userData) => {
    dispatch(login(userData)); 
  };

  return <Login onLogin={handleLogin} />;
}

function LogoutComponent() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());  
  };

  return <Logout onLogout={handleLogout} />;
}

function PrivateRoutes() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <LayoutWithMenu>
      <Outlet />
    </LayoutWithMenu>
  );
}

function LayoutWithMenu() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Menu onLogout={handleLogout} />
      <Outlet />
    </>
  );
}

export default App;
