import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Editar.module.css'

function EditProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUserId(decodedToken.id);
        setEmail(decodedToken.email);
        setName(decodedToken.name);
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };

    fetchUserDetails();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/usuarios/${userId}`,
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Informações atualizadas com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Erro ao atualizar informações', error);
      alert('Erro ao atualizar informações.');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.');

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/usuarios/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Conta excluída com sucesso!');
        localStorage.removeItem('token');
        navigate('/cadastro');
      } catch (error) {
        console.error('Erro ao excluir a conta', error);
        alert('Erro ao excluir a conta.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleUpdate}>
      <h2>Editar informações da conta</h2>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nova Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar Nova Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className={styles.buttonCont}>
          <button onClick={handleUpdate} className={styles.attButton}>Atualizar Informações</button>
          <button onClick={handleDelete} className={styles.excludButton}>Excluir Conta</button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
