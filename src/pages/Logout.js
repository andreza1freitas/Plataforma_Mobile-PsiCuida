import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout(); 
    // Redireciona para a página inicial
    navigate('/'); 
  }, [onLogout, navigate]);

  // Não renderiza nada
  return null; 
}

export default Logout;
