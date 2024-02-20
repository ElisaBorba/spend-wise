import { useSelector, useDispatch } from 'react-redux';
import { GlobalState, Dispatch } from '../types';
import { deleteExpense, editExpense } from '../redux/actions/index';

function Table() {
  const dispatch: Dispatch = useDispatch();
  const expenses = useSelector((globalState: GlobalState) => globalState
    .wallet.expenses);

  const handleEdit = (id: number) => {
    const editedExpenses = expenses.find((expense) => expense.id === id);

    // dispatch(editExpense(editedExpenses));
  };

  const handleDelete = (id: number) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    dispatch(deleteExpense(newExpenses));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const expenseValue = parseFloat(expense.value);
            const currencyValue = parseFloat(expense
              .exchangeRates[expense.currency]?.ask);

            if (Number.isNaN(expenseValue) || Number.isNaN(currencyValue)) {
              return null;
            }
            const convertedValue = (expenseValue * currencyValue).toFixed(2);

            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{parseFloat(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {parseFloat(expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}
                </td>
                <td>{convertedValue}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    onClick={ () => handleEdit(expense.id) }
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    onClick={ () => handleDelete(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
