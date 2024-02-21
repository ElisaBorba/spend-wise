import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ExpenseValues, Dispatch, GlobalState } from '../types';
import { fetchAPI, fetchExpensesAPI } from '../redux/actions';
import styles from './WalletForm.module.css';

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

const errorMessage = 'o campo "Valor", precisa ser numérico! Exemplo: 5000.00';

function WalletForm() {
  const dispatch: Dispatch = useDispatch();

  const walletData = useSelector((globalState: GlobalState) => globalState
    .wallet.currencies);

  const [expensesValues, setExpensesValues] = useState<ExpenseValues>(INITIAL_STATE);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchAPI());
  }, []);

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name: targetName, value } = target;
    const formattedValue = value.replace(',', '.');
    setExpensesValues({ ...expensesValues, [targetName]: formattedValue });

    if (targetName === 'value' && Number.isNaN(Number(formattedValue))) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValidValue = /^\d+(\.\d{1,2})?$/.test(expensesValues.value);

    if (isValidValue) {
      setShowErrorMessage(false);
      dispatch(fetchExpensesAPI(expensesValues));
      setExpensesValues({ ...INITIAL_STATE, id: expensesValues.id + 1 });
    }
  };

  return (
    <form className={ styles.formContainer }>
      <div className={ styles.inputText }>
        <label htmlFor="value">
          Valor:
          <input
            type="text"
            id="value"
            name="value"
            value={ expensesValues.value }
            onChange={ handleChange }
            data-testid="value-input"
            placeholder="0.00"
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
            placeholder="exemplo: McDonalds"
          />
        </label>
      </div>
      <div className={ styles.inputText }>
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
      </div>
      <button
        type="submit"
        disabled={ showErrorMessage }
        onClick={ handleSubmit }
      >
        Adicionar despesa
      </button>
      {showErrorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default WalletForm;
