import { useSelector } from 'react-redux';
import { GlobalState } from '../types';

function Header() {
  const data = useSelector((globalState: GlobalState) => globalState.user);
  const expenses = useSelector((globalState: GlobalState) => globalState
    .wallet.expenses);

  const calculateTotalExpense = () => {
    if (expenses.length > 0) {
      const total = expenses.reduce((acc, expense) => {
        const expenseValor = parseFloat(expense.value);
        const currencyValue = parseFloat(expense.exchangeRates[expense.currency].ask);
        acc += expenseValor * currencyValue;
        return acc;
      }, 0);
      return total;
    }
    return 0;
  };

  const totalExpense = calculateTotalExpense();

  return (
    <div>
      <h3 data-testid="email-field">{`Email: ${data.email}`}</h3>
      <h4>
        {'Total: '}
        <strong data-testid="total-field">
          {`${totalExpense.toFixed(2)}`}
        </strong>
      </h4>
      <h4 data-testid="header-currency-field">BRL</h4>
    </div>
  );
}

export default Header;
