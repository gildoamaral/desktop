import { useState, useEffect } from 'react';
import axios from 'axios';
import CardVeiculo from '../../components/CardVeiculo';
import styles from './Veiculos.module.css';


const Veiculos = () => {

  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    anoFabricacao: '',
    anoModelo: '',
    cor: ''
  });
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        await axios.get('http://localhost:3000/veiculos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Envia o token JWT no cabeçalho
          }
        })
        .then(response => {
          const userVeiculos = response.data.filter(veiculo => veiculo.usuarioId === localStorage.getItem('userId'));
          setVeiculos(userVeiculos); // Salva os veículos na state
        })
      } catch (error) {
        console.error('Erro ao buscar veículos:', error);
      }
    };
    fetchVeiculos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = (id) => {
    setVeiculos(veiculos.filter(veiculo => veiculo.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      anoFabricacao: parseInt(formData.anoFabricacao, 10),
      anoModelo: parseInt(formData.anoModelo, 10)
    };
    setFormData(updatedFormData);
    try {
      const response = await axios.post('http://localhost:3000/veiculos', updatedFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Veículo cadastrado com sucesso:', response.data);
      alert('Veículo cadastrado com sucesso!');
      setVeiculos([...veiculos, response.data]); // Atualiza a lista de veículos
    } catch (error) {
      console.error('Erro ao cadastrar o veículo:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 style={{alignSelf: "center", marginBottom: "2em"}}>Cadastre um Veículo</h3>

        <label htmlFor="placa">Placa</label>
        <input
          type="text"
          name="placa"
          placeholder="Placa"
          value={formData.placa}
          onChange={handleChange}
          required
        />
        <label htmlFor="marca">Marca</label>
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={formData.marca}
          onChange={handleChange}
          required
        />
        <label htmlFor="placa">Modelo</label>
        <input
          type="text"
          name="modelo"
          placeholder="Model do Veículo"
          value={formData.modelo}
          onChange={handleChange}
          required
        />
        <label htmlFor="placa">Ano de Fabricação</label>
        <input
          type="number"
          name="anoFabricacao"
          placeholder="Ano de Fabricação"
          value={formData.anoFabricacao}
          onChange={handleChange}
          required
        />
        <label htmlFor="placa">Ano do Modelo</label>
        <input
          type="number"
          name="anoModelo"
          placeholder="Ano do Modelo"
          value={formData.anoModelo}
          onChange={handleChange}
          required
        />
        <label htmlFor="placa">Cor</label>
        <input
          type="text"
          name="cor"
          placeholder="Cor"
          value={formData.cor}
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar Veículo</button>
      </form>

      <div className={styles.veiculos}>
        {veiculos.map((veiculo) => (
          <CardVeiculo key={veiculo.id} veiculo={veiculo} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Veiculos;