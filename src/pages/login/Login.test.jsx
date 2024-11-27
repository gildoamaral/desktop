import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import { vi } from 'vitest'; // Importando vi do Vitest para mocks

vi.mock('axios'); // Mock do axios para simular requisições

// Teste de renderização do componente Login
test('Teste Unitário - Renderiza o componente login (sucesso)', () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
});

// Teste de login com sucesso
test('Teste de Integração - Login realizado (sucesso)', async () => {
    // Configurando o mock para a requisição POST
    axios.post.mockResolvedValueOnce({
        data: { token: 'fake-token' },
    });

    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    // Preenche o formulário
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
        target: { value: 'email@teste.com' },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
        target: { value: 'senha12' },
    });

    // Submit formulário
    fireEvent.click(screen.getByRole('button', { name: /LOGIN/i }));

    // Esperando que o login seja realizado e a mensagem de sucesso apareça
    await waitFor(() => {
        expect(screen.getByText(/Login realizado com sucesso!/i)).toBeInTheDocument();
    });
});
