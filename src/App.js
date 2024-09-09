import { useSelector, useDispatch, Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { store } from './redux/store';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Diario from './pages/Diario';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import Suporte from './pages/Suporte';
import ForumApoio from './pages/ForumApoio';
import Configuracao from './pages/Configuracao';
import ConteudoEducacional from './pages/ConteudoEducacional';
import AutoAjuda from './pages/AutoAjuda';
import AgendamentoSessao from './pages/AgendamentoSessao';
import SessaoVirtual from './pages/SessaoVirtual';
import Logout from './pages/Logout';
import AuthRedirect from './components/AuthRedirect';
import { login, logout } from './redux/userSlice';
import Ansioso from './pages/Ansioso';
import EditarPerfil from './pages/EditarPerfil';
import Insone from './pages/Insone';
import Triste from './pages/Triste';
import RespostasForum from './pages/RespostasForum';
import Notificacoes from './pages/Notificacoes';
import Estressado from './pages/Estressado';
import Inseguro from './pages/Inseguro';
import './App.css';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/cadastro" element={<Cadastro />} />


          {/* Rotas Privadas */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/diario" element={<Diario />} />
            <Route path="/forum-apoio" element={<ForumApoio />} />
            <Route path="/conteudo-educacional" element={<ConteudoEducacional />} />
            <Route path="/auto-ajuda" element={<AutoAjuda />} />
            <Route path="/agendamento-sessao" element={<AgendamentoSessao />} />
            <Route path="/sessao-virtual" element={<SessaoVirtual />} />
            <Route path="/configuracao" element={<Configuracao />} />
            <Route path="/suporte" element={<Suporte />} />
            <Route path="/logout" element={<LogoutComponent />} />
          </Route>

          {/* Outras Rotas */}
          <Route path="/editar-perfil" element={<EditarPerfil />} />
          <Route path="/ansioso" element={<Ansioso />} />
          <Route path="/insone" element={<Insone />} />
          <Route path="/perguntas/:id" element={<RespostasForum />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/triste" element={<Triste />} />
          <Route path="/estressado" element={<Estressado />} />
          <Route path="/inseguro" element={<Inseguro />} />

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
