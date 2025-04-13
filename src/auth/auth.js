import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Login } from '../services/Login';

function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate()

  useEffect(
    ()=>{
      handleLogin(false)
    }, []
  )

  const handleLogin = async (e) =>{
    if (e) {
      e.preventDefault();
          // Проверка учетных данных (в реальном приложении это будет запрос к серверу)
    if (Login(username, password)) {
      //   setIsAuthenticated(true);
        await Cookies.set('username', username)
        await Cookies.set('password', password)
        navigate('/main')
        setError('');
      } else {
        setError('Неверное имя пользователя или пароль');
      }
    }else if (Login(Cookies.get('username'), Cookies.get('password'))){
      navigate('/main')
      setError('');
    }
    

    

  };

  return (
    <div className="Auth">
      <h1>Авторизация</h1>
      <form onSubmit={handleLogin} className="auth-form">
        {error && <div className="error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="username">Логин:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Auth;