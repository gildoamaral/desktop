import { useState, useEffect } from 'react';
import axios from 'axios';
import './Motoristas.css';

const Motoristas = () => {
  const [motoristas, setMotoristas] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    cnh: '',
    telefone: '',
    dataNascimento: '',
    status: 'ATIVO',
  });

  // buscar motoristas
  const fetchMotoristas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/motoristas');
      setMotoristas(response.data);
    } catch (error) {
      console.error('Erro ao buscar motoristas:', error);
    }
  };

  // atualiza a lista de motoristas
  useEffect(() => {
    fetchMotoristas();
  }, []);

  // atualiza os campos do form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // envia o form de cadastro
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDataNascimento = new Date(formData.dataNascimento).toISOString();
    const formattedFormData = {
      ...formData,
      dataNascimento: formattedDataNascimento,
    };
    setFormData(formattedFormData);
    console.log('formattedFormData:', formattedFormData);
    try {
      let response = await axios.post('http://localhost:3000/motoristas', formattedFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });  
      console.log('Veículo cadastrado com sucesso:', response.data);
      alert('Veículo cadastrado com sucesso!');
      fetchMotoristas(); // Atualiza a lista após o cadastro
    } catch (error) {
      alert('Erro ao cadastrar motorista:', error);
      console.error('Erro ao cadastrar motorista:', error);
    }
  };

  return (
    <div>

      {/* Formulário de cadastro */}
      <form onSubmit={handleSubmit}>
      <h3 style={{alignSelf: "center"}}>Cadastro de motoristas</h3>
      <label>Nome</label>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleInputChange}
          required
        />
        <label>CNH</label>
        <input
          type="text"
          name="cnh"
          placeholder="CNH"
          value={formData.cnh}
          onChange={handleInputChange}
          required
        />
        <label>Telefone</label>
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleInputChange}
          required
        />
        <label>Data de nascimento</label>
        <input
          type="date"
          name="dataNascimento"
          value={formData.dataNascimento}
          onChange={handleInputChange}
          required
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleInputChange}>
          <option value="ATIVO">ATIVO</option>
          <option value="INATIVO">INATIVO</option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>

      {/* Lista de motoristas */}
        <div className="motoristas">
          {motoristas.map((motorista) => (
            <div key={motorista.id} className="cards">
              <h3>{motorista.nome}</h3>
              <p>CNH: {motorista.cnh}</p>
              <p>Telefone: {motorista.telefone}</p>
              <p>Data de nascimento: {motorista.dataNascimento}</p>
              <p>Status: {motorista.status}</p>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Motoristas;