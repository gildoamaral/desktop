/* eslint-disable no-undef */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Veiculos from './Veiculos';
import { vi } from 'vitest'; // Importando vi do Vitest para mocks

vi.mock('axios'); // Mock do axios para simular requisições

// Teste de renderização do componente Veiculos
test('Teste Unitário - Renderiza o componente Veiculos', () => {
  render(
    <MemoryRouter>
      <Veiculos />
    </MemoryRouter>
  );
  expect(screen.getByText(/Cadastre um Veículo/i)).toBeInTheDocument();
});


// Teste de submissão do formulário e adição de novo veículo
test('Teste de Integração - Submete o formulário e adiciona novo veículo', async () => {
  axios.get.mockResolvedValueOnce({ data: [] });
  axios.post.mockResolvedValueOnce({
    data: { id: 3, placa: 'DEF-9012', marca: 'Ford', modelo: 'Focus', anoFabricacao: 2018, anoModelo: 2019, cor: 'Azul', usuarioId: '1' }
  });


  render(
    <MemoryRouter>
      <Veiculos />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/Placa/i), { target: { value: 'DEF-9012' } });
  fireEvent.change(screen.getByPlaceholderText(/Marca/i), { target: { value: 'Ford' } });
  fireEvent.change(screen.getByPlaceholderText(/Modelo/i), { target: { value: 'Focus' } });
  fireEvent.change(screen.getByPlaceholderText(/Ano de Fabricação/i), { target: { value: 2018 } });
  fireEvent.change(screen.getByPlaceholderText(/Ano do Modelo/i), { target: { value: 2019 } });
  fireEvent.change(screen.getByPlaceholderText(/Cor/i), { target: { value: 'Azul' } });

  fireEvent.click(screen.getByRole('button', { name: /Cadastrar Veículo/i }));

  await waitFor(() => {
    expect(screen.getByDisplayValue(/Ford/i)).toBeInTheDocument();
  });
});