import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ExpenseValues, Dispatch, GlobalState } from '../types';
import { fetchAPI } from '../redux/actions';

const INITIAL_STATE = {
  id: 0,
  valor: '0',
  description: 'Hot Dog',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

function WalletForm() {
  const dispatch: Dispatch = useDispatch();

  const walletData = useSelector((globalState: GlobalState) => globalState
    .wallet.currencies);

  useEffect(() => {
    dispatch(fetchAPI());
  }, []);

  const [expensesValues, setExpensesValues] = useState<ExpenseValues>(INITIAL_STATE);

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name: targetName, value } = target;
    setExpensesValues({ ...expensesValues, [targetName]: value });
  };

  return (
    <form>
      <label htmlFor="valor">
        Valor:
        <input
          type="text"
          id="valor"
          name="valor"
          value={ expensesValues.valor }
          onChange={ handleChange }
          data-testid="value-input"
        />
      </label>
      <label htmlFor="description">
        Descrição:
        <input
          type="text"
          id="description"
          name="description"
          value={ expensesValues.description }
          onChange={ handleChange }
          data-testid="description-input"
        />
      </label>
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          value={ expensesValues.currency }
          onChange={ handleChange }
          data-testid="currency-input"
        >
          {walletData.map((currency) => (
            <option key={ currency } value={ currency }>
              {currency}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="method">
        Método de Pagamento:
        <select
          id="method"
          name="method"
          value={ expensesValues.method }
          onChange={ handleChange }
          data-testid="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="tag">
        Tag:
        <select
          id="tag"
          name="tag"
          value={ expensesValues.tag }
          onChange={ handleChange }
          data-testid="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>

      <button
        type="submit"
        // onClick={ handleSubmit }
      >
        Adicionar despesa
      </button>
    </form>
  );
}

export default WalletForm;
