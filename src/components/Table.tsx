import { useSelector } from 'react-redux';
import { GlobalState } from '../types';

function Table() {
  const expenses = useSelector((globalState: GlobalState) => globalState
    .wallet.expenses);

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
            const expenseValor = parseFloat(expense.value);
            const currencyValue = parseFloat(expense
              .exchangeRates[expense.currency]?.ask);

            if (Number.isNaN(expenseValor) || Number.isNaN(currencyValue)) {
              return null;
            }
            const convertedValue = (expenseValor * currencyValue).toFixed(2);

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
                  <button>Editar</button>
                  <button>Excluir</button>
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
