import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import mockData from './mockData';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import * as APIModule from '../../services/currenciesAPI';

beforeEach(() => {
  vi.spyOn(APIModule, 'fetchCurrency').mockResolvedValue(mockData);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Testa a página de entrada \'Login\'', () => {
  it('Ao efetuar o Login é exibido as informações corretamente na página Wallet', async () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByRole('textbox', { name: /e-mail:/i });
    const password = screen.getByLabelText(/senha:/i);
    const submitBtn = screen.getByRole('button', { name: /entrar/i });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    await userEvent.type(email, 'tryber@teste.com');
    await userEvent.type(password, '123456789');
    await userEvent.click(submitBtn);

    const showEmailInHeader = screen.getByRole('heading', { name: /email: tryber@teste\.com/i });
    expect(showEmailInHeader).toBeInTheDocument();
  });
});
