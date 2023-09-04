import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ExpenseValues, Dispatch, GlobalState } from '../types';
import { fetchAPI } from '../redux/actions';
import { fetchCurrency } from '../services/currenciesAPI';

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
    .walletData.currencies);
  console.log(walletData);

  useEffect(() => {
    dispatch(fetchAPI());
  }, []);

  const [expensesValue, setExpensesValue] = useState<ExpenseValues>(INITIAL_STATE);

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name: targetName, value } = target;
    setExpensesValue({ ...expensesValue, [targetName]: value });
  };

  return (
    <form>
      <label htmlFor="valor">
        Valor:
        <input
          type="text"
          id="valor"
          name="valor"
          value={ expensesValue.valor }
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
          value={ expensesValue.description }
          onChange={ handleChange }
          data-testid="description-input"
        />
      </label>
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          value={ expensesValue.currency }
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

      {/* <button
        type="submit"
        onClick={ handleSubmit }
      >
        Entrar
      </button> */}
    </form>
  );
}

export default WalletForm;
