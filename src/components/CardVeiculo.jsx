import React from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Certifique-se de instalar react-icons com `npm install react-icons`

const CardVeiculo = ({ veiculo, onDelete }) => {

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/veiculos/${veiculo.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      onDelete(veiculo.id); // Chama a função onDelete passada como prop
    } catch (error) {
      console.error('Erro ao deletar veículo:', error);
    }
  };



  return (
    <div
      key={veiculo.id}
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        width: '200px',
        boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        height: '15em',
        position: 'relative'
      }}
    >
      <h3>{veiculo.modelo}</h3>
      <p>Placa: {veiculo.placa}</p>
      <p>Marca: {veiculo.marca}</p>
      <p>Ano Fabricação: {veiculo.anoFabricacao}</p>
      <p>Ano Modelo: {veiculo.anoModelo}</p>
      <p>Cor: {veiculo.cor}</p>
      <FaTrash
        onClick={handleDelete}
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          cursor: 'pointer',
          color: 'red'
        }}
      />
    </div>
  );
};

export default CardVeiculo;
